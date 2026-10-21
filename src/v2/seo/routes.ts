import { INTEGRATIONS } from "@/lib/integrations";

/**
 * Every public v2 page, as its final (post-switchover) path. Drives the
 * build-time prerender, sitemap.xml and llms.txt. Blog posts are added at
 * build time from the database.
 */
export interface SeoRoute {
  path: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: number;
}

export const STATIC_ROUTES: SeoRoute[] = [
  { path: "/", changefreq: "weekly", priority: 1 },
  { path: "/pricing", changefreq: "monthly", priority: 0.9 },
  { path: "/features", changefreq: "monthly", priority: 0.8 },
  { path: "/integrations", changefreq: "monthly", priority: 0.7 },
  ...INTEGRATIONS.map((item) => ({ path: `/integrations/${item.slug}`, changefreq: "monthly" as const, priority: 0.6 })),
  { path: "/about", changefreq: "yearly", priority: 0.5 },
  { path: "/contact", changefreq: "yearly", priority: 0.5 },
  { path: "/blog", changefreq: "weekly", priority: 0.6 },
];
