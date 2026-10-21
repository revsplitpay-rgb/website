#!/usr/bin/env node
// Content guards for the RevSplitPay site. Walks the filesystem (so new,
// untracked files are checked too) and fails on template residue, stale
// prices and v2 design-system violations. Run: npm run check:content
//   --scope live   only the live site (src outside src/v2, index.html)
//   --scope v2     only the v2 preview (src/v2, public/v2)
// Output: one "check-content: FAIL <rule> <file>:<line> ..." line per hit,
// then "check-content: <n> problems" (exit 1) or "check-content: OK" (exit 0).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TEXT_EXT = new Set([".ts", ".tsx", ".js", ".mjs", ".css", ".html", ".json", ".md", ".svg"]);
const SKIP_DIRS = new Set(["node_modules", "dist", ".git", ".gstack"]);

const isV2 = (rel) => rel.startsWith("src/v2/");
const isLive = (rel) => (rel.startsWith("src/") && !rel.startsWith("src/v2/")) || rel === "index.html";
const isTest = (rel) => /\.test\.(ts|tsx|mjs)$/.test(rel);
// Owner-supplied legal documents are kept verbatim; src/lib/legal.test.ts keeps
// their fees and limits in step with src/lib/pricing.ts instead.
const isLegalText = (rel) => rel.startsWith("src/content/legal/");

// Strip the parts of a line that legitimately hold numbers: Tailwind arbitrary
// values like w-[50%] and SVG geometry attributes like x="50%".
const stripNumericMarkup = (line) =>
  line.replace(/\[[^\]]*\]/g, "").replace(/\b(x|y|x1|x2|y1|y2|width|height|offset|cx|cy|r|rx|ry)=["'{][^"'}]*["'}]/g, "");

export const RULES = [
  { id: "lovable", re: /lovable/i, scope: () => true, fix: "remove Lovable scaffold traces" },
  { id: "paymark", re: /paymark/i, scope: () => true, fix: "replace template brand with RevSplitPay" },
  { id: "template-brands", re: /morganblake|\brevio\b/i, scope: () => true, fix: "use the RevSplitPay name and SITE_URL" },
  {
    id: "banking-copy",
    re: /\bFDIC\b|cash ?backs?|wire transfers?|virtual cards?|cryptocurrenc[a-z]*|payment gateway ecosystem/i,
    // Legal page bodies stay untouched until the owner supplies the real text (owner, 2026-10-19).
    scope: (rel) => !rel.startsWith("src/pages/legal/"),
    fix: "remove neobank template copy; use product.md",
  },
  {
    id: "fake-integrations",
    re: /BudgetBe|LedgerLink|FinSync|CapitalConnect|WealthBri|EquityFlow|PayStream|RiskSphere/,
    scope: () => true,
    fix: "only Stripe, Whop, Slack and Webhooks are real integrations",
  },
  { id: "fake-people", re: /Albert Flores|Wade Warren|Annette Black|Esther Howard/, scope: () => true, fix: "no invented people" },
  { id: "stale-price", re: /"\$(300|600|900|1,500)"|3\.5%/, scope: () => true, fix: "use PLANS and fee constants from src/lib/pricing.ts" },
  {
    id: "stale-fee-copy",
    re: /no platform fee|0% platform fee|3% fee|payment requests are 3%/i,
    scope: (rel) => !isLegalText(rel),
    fix: "use COMMISSION_FEE_LABEL / INVOICE_FEE_LABEL from src/lib/pricing.ts",
  },
  {
    id: "dead-routes",
    re: /["'`]\/(signup|early-access)["'`]/,
    scope: (rel) => rel.startsWith("src/"),
    allow: ["src/app-tree.tsx"], // the route table (redirects for old URLs)
    fix: "link to APP_SIGNUP_URL from src/lib/links.ts",
  },
  { id: "app-url", re: /app\.revsplitpay\.com/, scope: (rel) => rel.startsWith("src/") && !isLegalText(rel), allow: ["src/lib/links.ts"], fix: "import APP_URL / APP_SIGNUP_URL from src/lib/links.ts" },
  { id: "google-fonts", re: /fonts\.(googleapis|gstatic)\.com/, scope: () => true, fix: "self-host fonts (GDPR)" },
  { id: "offer-code", re: /WELCOME50/, scope: (rel) => rel.startsWith("src/") && !isTest(rel), allow: ["src/lib/pricing.ts"], fix: "render the code from WELCOME_OFFER in src/lib/pricing.ts" },

  // v2 design-system and content rules
  {
    // Brand gradient stops may appear inside Tailwind arbitrary values and SVG
    // colour attributes; anything else uses theme tokens or v2.css utilities.
    id: "hardcoded-color",
    test: (line) =>
      /#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?\b/.test(
        line.replace(/\[[^\]]*\]/g, "").replace(/\b(stopColor|fill|stroke)=["'][^"']*["']/g, ""),
      ),
    scope: (rel) => rel.startsWith("src/v2/") && !rel.endsWith(".css") && !isTest(rel),
    fix: "use theme tokens or the gradient utilities in src/v2/v2.css",
  },
  { id: "lottie", re: /lottie/i, scope: (rel) => rel.startsWith("src/v2/"), fix: "use v2 example visuals, not Lottie" },
  { id: "next-imports", re: /from\s+["']next\//, scope: (rel) => rel.startsWith("src/v2/"), fix: "use plain <img> and react-router, not next/*" },
  {
    id: "registry-style",
    re: /text-\[\d+px\]|@tabler/,
    scope: (rel) => rel.startsWith("src/v2/") && /\.(tsx|ts)$/.test(rel) && !isTest(rel),
    fix: "use rem-based type sizes and lucide icons",
  },
  {
    id: "v2-links",
    re: /\b(to|href)=["']\/(?!legal\/|fonts\/|logos\/)/,
    scope: (rel) => rel.startsWith("src/v2/") && rel.endsWith(".tsx") && !isTest(rel),
    fix: "build internal links with v2Path() from src/v2/lib/paths.ts",
  },
  {
    id: "bare-whop",
    re: /\bWhop\b/,
    scope: (rel) => /^src\/v2\/(content|sections|pages)\//.test(rel) && !isTest(rel),
    allow: ["src/v2/content/providers.ts", "src/v2/content/logos.ts"],
    fix: "use the helpers in src/v2/content/providers.ts (WHOP_LIVE)",
  },
  {
    id: "literal-money",
    test: (line) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return false;
      // 100% is a bound in validation copy, not a price or fee.
      // Quoted CSS-like values ("0%", "-30% 0px") are layout and motion, not money.
      const text = stripNumericMarkup(line)
        .replace(/\b100%/g, "")
        .replace(/(["'`])[-\d.\s%px]*%[-\d.\s%px]*\1/g, "");
      return /\$\d/.test(text) || /\d+(\.\d+)?%/.test(text) || /\b\d+-day\b/.test(text);
    },
    scope: (rel) => rel.startsWith("src/v2/") && /\.(tsx|ts)$/.test(rel) && !isTest(rel),
    allow: ["src/v2/content/examples.ts"],
    fix: "render numbers from src/lib/pricing.ts constants (illustrative ones live in src/v2/content/examples.ts)",
  },
];

// Every style rule in v2 CSS must be scoped under html[data-v2-theme] so nothing
// applies on live routes after a v2 visit. @font-face and @keyframes are exempt
// (keyframe names must start with v2-).
export function checkCssScope(text) {
  const problems = [];
  let depth = 0;
  let buffer = "";
  let line = 1;
  let startLine = 1;
  const atStack = [];
  for (const ch of text) {
    if (ch === "\n") line += 1;
    if (ch === "{") {
      const selector = buffer.replace(/\/\*[\s\S]*?\*\//g, "").trim();
      const insideKeyframes = atStack.some((a) => a.startsWith("@keyframes"));
      if (selector.startsWith("@")) {
        atStack.push(selector);
        if (selector.startsWith("@keyframes") && !/^@keyframes\s+v2-/.test(selector)) {
          problems.push({ line: startLine, text: selector, why: "keyframes name must start with v2-" });
        }
      } else if (!insideKeyframes && !atStack.some((a) => a.startsWith("@font-face"))) {
        const parts = selector.split(",").map((s) => s.trim()).filter(Boolean);
        for (const part of parts) {
          if (!part.startsWith("html[data-v2-theme")) problems.push({ line: startLine, text: part, why: "unscoped selector" });
        }
        atStack.push("rule");
      } else {
        atStack.push("rule");
      }
      depth += 1;
      buffer = "";
      continue;
    }
    if (ch === "}") {
      depth -= 1;
      atStack.pop();
      buffer = "";
      startLine = line;
      continue;
    }
    if (ch === ";" && depth >= 0) {
      buffer = "";
      startLine = line;
      continue;
    }
    if (buffer.trim() === "" && ch.trim() !== "") startLine = line;
    buffer += ch;
  }
  return problems;
}

function walk(dir, root, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    const rel = path.relative(root, full).split(path.sep).join("/");
    if (entry.isDirectory()) {
      if (rel === "src/assets/lottie") continue; // animation data, removed at v2 switch-over
      walk(full, root, out);
    } else if (TEXT_EXT.has(path.extname(entry.name))) {
      out.push(rel);
    }
  }
  return out;
}

export function runChecks({ root, scope = "all" }) {
  const files = [];
  for (const start of ["src", "public", "index.html"]) {
    const full = path.join(root, start);
    if (!fs.existsSync(full)) continue;
    if (fs.statSync(full).isDirectory()) walk(full, root, files);
    else files.push(start);
  }
  const inScope = files.filter((rel) => (scope === "live" ? isLive(rel) : scope === "v2" ? isV2(rel) : true));
  const hits = [];
  for (const rel of inScope) {
    if (/^scripts\//.test(rel)) continue;
    const text = fs.readFileSync(path.join(root, rel), "utf8");
    const lines = text.split(/\r?\n/);
    for (const rule of RULES) {
      if (!rule.scope(rel) || rule.allow?.includes(rel)) continue;
      lines.forEach((line, index) => {
        const matched = rule.test ? rule.test(line) : rule.re.test(line);
        if (matched) hits.push({ rule: rule.id, rel, line: index + 1, text: line.trim().slice(0, 80), fix: rule.fix });
      });
    }
    if (rel.startsWith("src/v2/") && rel.endsWith(".css")) {
      for (const problem of checkCssScope(text)) {
        hits.push({ rule: "v2-css-scope", rel, line: problem.line, text: problem.text.slice(0, 80), fix: `scope under html[data-v2-theme] (${problem.why})` });
      }
    }
  }
  return { hits, fileCount: inScope.length };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isMain) {
  const scopeIndex = process.argv.indexOf("--scope");
  const scope = scopeIndex > -1 ? process.argv[scopeIndex + 1] : "all";
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const { hits, fileCount } = runChecks({ root, scope });
  for (const hit of hits) {
    console.log(`check-content: FAIL ${hit.rule} ${hit.rel}:${hit.line} matched "${hit.text}" fix: ${hit.fix}`);
  }
  if (hits.length) {
    console.log(`check-content: ${hits.length} problems`);
    process.exit(1);
  }
  console.log(`check-content: OK (${RULES.length + 1} rules, ${fileCount} files, scope ${scope})`);
}
