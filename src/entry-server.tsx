import { QueryClient, QueryClientProvider, dehydrate, type DehydratedState } from "@tanstack/react-query";
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import AppShell from "./app-shell";
import { getBlogPostBySlug, getBlogPosts } from "./lib/services/blog-service";
import V2Boundary from "./v2/boundary";
import { V2_BASE } from "./v2/lib/paths";

// Build-time renderer (see scripts/prerender.mjs). Renders the same shell as
// the browser with only the v2 route, which is all that is prerendered; the
// live site's pages pull in browser-only code (Lottie) and stay client-rendered.

export { SITE_URL } from "./lib/links";
export { V2_BASE, v2Path } from "./v2/lib/paths";
export { STATIC_ROUTES } from "./v2/seo/routes";
export { IS_PREVIEW } from "./v2/seo/site";
export { buildLlmsFullTxt, buildLlmsTxt } from "./v2/seo/llms";

export interface RenderResult {
  html: string;
  helmet?: HelmetServerState;
  state: DehydratedState;
}

/** Fetches what a route needs so the HTML includes it (blog lists and posts). */
const prefetch = async (queryClient: QueryClient, sitePath: string) => {
  if (sitePath === "/blog") {
    await queryClient.prefetchQuery({ queryKey: ["v2-blog-posts"], queryFn: () => getBlogPosts() });
  }
  const post = sitePath.match(/^\/blog\/([^/]+)$/);
  if (post) {
    await queryClient.prefetchQuery({ queryKey: ["v2-blog-post", post[1]], queryFn: () => getBlogPostBySlug(post[1]) });
  }
};

/** Published blog posts, for sitemap entries and per-post pages. Empty if the database is unreachable. */
export const listBlogPosts = async () => {
  try {
    return await getBlogPosts();
  } catch {
    return [];
  }
};

export async function render(url: string, sitePath: string): Promise<RenderResult> {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: Infinity } } });
  await prefetch(queryClient, sitePath);
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = await new Promise<string>((resolve, reject) => {
    let out = "";
    const sink = new PassThrough();
    sink.on("data", (chunk) => (out += chunk));
    sink.on("end", () => resolve(out));
    const { pipe } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <QueryClientProvider client={queryClient}>
          <StaticRouter location={url}>
            <AppShell>
              <Routes>
                <Route path={`${V2_BASE}/*`} element={<V2Boundary />} />
              </Routes>
            </AppShell>
          </StaticRouter>
        </QueryClientProvider>
      </HelmetProvider>,
      {
        // Wait for lazy chunks and data so the HTML is complete, not a fallback.
        onAllReady: () => pipe(sink),
        onShellError: reject,
        onError: (error) => reject(error),
      },
    );
  });

  return { html, helmet: helmetContext.helmet, state: dehydrate(queryClient) };
}
