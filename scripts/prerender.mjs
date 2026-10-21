// Build-time prerender for the marketing site, plus sitemap.xml, robots.txt and
// llms.txt. Runs after `vite build` (client) and `vite build --ssr` (server):
//   node scripts/prerender.mjs
// Each public route is rendered to static HTML with its own head tags, so
// search engines and AI crawlers that don't run JavaScript see the full page.
// The browser then hydrates that HTML (src/main.tsx). Also writes:
//   spa.html  the empty app shell, for client-only routes (login, dashboard,
//             blog posts published after the last build); see vercel.json
//   404.html  the not-found page, served by Vercel with a 404 status

import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const serverDir = path.join(root, "dist-server");

const server = await import(pathToFileURL(path.join(serverDir, "entry-server.js")).href);
const { render, listBlogPosts, STATIC_ROUTES, SITE_URL, IS_PREVIEW, v2Path, buildLlmsTxt, buildLlmsFullTxt } = server;

const template = await readFile(path.join(dist, "index.html"), "utf8");
// Saved before the home page overwrites index.html.
await writeFile(path.join(dist, "spa.html"), template);
const manifest = JSON.parse(await readFile(path.join(dist, ".vite", "manifest.json"), "utf8"));

// The v2 app is a lazy chunk; link its CSS up front so prerendered HTML is
// styled before JavaScript runs, and preload its JS to speed up hydration.
const v2Chunk = manifest["src/v2/app.tsx"];
if (!v2Chunk) throw new Error("prerender: v2 app chunk missing from the Vite manifest");
const v2Assets = [
  ...(v2Chunk.css ?? []).map((file) => `<link rel="stylesheet" crossorigin href="/${file}">`),
  `<link rel="modulepreload" crossorigin href="/${v2Chunk.file}">`,
].join("\n    ");

// Default head tags in index.html that every v2 page replaces with its own.
const OVERRIDDEN = [
  /\s*<title>[\s\S]*?<\/title>/,
  /\s*<meta name="description"[^>]*>/g,
  /\s*<meta property="og:(?!site_name)[^"]+"[^>]*>/g,
  /\s*<meta name="twitter:[^"]+"[^>]*>/g,
  /\s*<link rel="canonical"[^>]*>/g,
];

const headFrom = (helmet) =>
  helmet ? [helmet.title, helmet.meta, helmet.link, helmet.script].map((part) => part.toString()).filter(Boolean).join("\n    ") : "";

const page = ({ html, helmet, state }) => {
  let out = template;
  for (const re of OVERRIDDEN) out = out.replace(re, "");
  const json = JSON.stringify(state).replace(/</g, "\\u003c");
  return out
    .replace("<html lang=\"en\">", '<html lang="en" data-v2-theme="light">')
    .replace("</head>", `    ${headFrom(helmet)}\n    ${v2Assets}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>\n    <script>window.__RQ_STATE__=${json}</script>`);
};

const posts = await listBlogPosts();
const routes = [
  ...STATIC_ROUTES.map((route) => ({ ...route, lastmod: null })),
  ...posts.map((post) => ({
    path: `/blog/${post.slug}`,
    changefreq: "monthly",
    priority: 0.6,
    lastmod: (post.updated_at || post.created_at || "").slice(0, 10) || null,
  })),
];

const today = new Date().toISOString().slice(0, 10);
let written = 0;
for (const route of routes) {
  const url = v2Path(route.path);
  const result = await render(url, route.path);
  // "/pricing" -> pricing.html, served at /pricing by Vercel's cleanUrls.
  const file = path.join(dist, url === "/" ? "index.html" : `${url}.html`);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, page(result));
  written += 1;
}

// Any path no route matches renders the not-found page (noindex).
await writeFile(path.join(dist, "404.html"), page(await render("/404", "/404")));

// sitemap.xml lists final public URLs (what each page's canonical points to).
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map(
    (route) =>
      `  <url><loc>${SITE_URL}${route.path}</loc><lastmod>${route.lastmod ?? today}</lastmod><changefreq>${route.changefreq}</changefreq><priority>${route.priority.toFixed(1)}</priority></url>`,
  ),
  "</urlset>",
  "",
].join("\n");

// AI search and assistant crawlers are explicitly welcome (owner decision, 2026-10-21).
const AI_BOTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Applebot-Extended", "CCBot", "Bingbot",
];
const rules = ["Allow: /", "Disallow: /dashboard", "Disallow: /login"];
const robots = [
  "# RevSplitPay",
  "User-agent: *",
  ...rules,
  "",
  "# AI search engines and assistants",
  ...AI_BOTS.map((bot) => `User-agent: ${bot}`),
  ...rules,
  "",
  // Only advertised when the build is the live site, not a /v2 preview.
  ...(IS_PREVIEW ? ["# Sitemap is advertised once v2 replaces the live site."] : [`Sitemap: ${SITE_URL}/sitemap.xml`]),
  "",
].join("\n");

await writeFile(path.join(dist, "sitemap.xml"), sitemap);
await writeFile(path.join(dist, "robots.txt"), robots);
await writeFile(path.join(dist, "llms.txt"), buildLlmsTxt());
await writeFile(path.join(dist, "llms-full.txt"), buildLlmsFullTxt());
await rm(serverDir, { recursive: true, force: true });

console.log(`prerender: ${written} pages (${posts.length} blog posts), 404.html, spa.html, sitemap.xml, robots.txt, llms.txt, llms-full.txt${IS_PREVIEW ? " [preview: v2 stays noindex]" : ""}`);
