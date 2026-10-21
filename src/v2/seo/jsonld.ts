import { PLANS } from "@/lib/pricing";
import type { BlogPost } from "@/lib/services/blog-service";
import { home } from "../content/copy";
import { providerPhrase } from "../content/providers";
import { LOGO_URL, OG_IMAGE, ORGANIZATION, SITE_NAME, absoluteUrl } from "./site";

// schema.org JSON-LD builders. Values come from the same content and pricing
// files as the pages, so structured data can never disagree with what is shown.
// No AggregateRating or Review markup until there are real, verifiable reviews.

const ORG_ID = `${ORGANIZATION.url}/#organization`;
const SITE_ID = `${ORGANIZATION.url}/#website`;

export const organizationLd = () => ({
  "@type": "Organization",
  "@id": ORG_ID,
  name: ORGANIZATION.name,
  url: ORGANIZATION.url,
  logo: { "@type": "ImageObject", url: LOGO_URL, width: 400, height: 400 },
  email: ORGANIZATION.email,
  address: { "@type": "PostalAddress", addressCountry: ORGANIZATION.country },
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: ORGANIZATION.email, availableLanguage: "en" },
  ...(ORGANIZATION.sameAs.length ? { sameAs: ORGANIZATION.sameAs } : {}),
});

export const websiteLd = () => ({
  "@type": "WebSite",
  "@id": SITE_ID,
  name: SITE_NAME,
  url: ORGANIZATION.url,
  inLanguage: "en",
  publisher: { "@id": ORG_ID },
});

export const softwareLd = () => ({
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  url: ORGANIZATION.url,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Sales commission and payout software",
  operatingSystem: "Web",
  description: `${home.heroSupport} Runs on ${providerPhrase()}.`,
  image: OG_IMAGE,
  publisher: { "@id": ORG_ID },
  offers: PLANS.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    price: plan.priceUsd.toFixed(2),
    priceCurrency: "USD",
    description: plan.summary,
    url: absoluteUrl("/pricing"),
    category: "subscription",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: plan.priceUsd.toFixed(2),
      priceCurrency: "USD",
      unitText: "MONTH",
      billingDuration: "P1M",
    },
  })),
});

export const faqLd = (items: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

export const breadcrumbLd = (crumbs: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

export const blogPostingLd = (post: BlogPost) => ({
  "@type": "BlogPosting",
  headline: post.title,
  url: absoluteUrl(`/blog/${post.slug}`),
  mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  image: post.image || OG_IMAGE,
  datePublished: post.created_at,
  dateModified: post.updated_at || post.created_at,
  articleSection: post.category,
  author: { "@type": "Person", name: post.author },
  publisher: { "@id": ORG_ID },
});

/** Wraps nodes in one @graph so a page carries a single JSON-LD block. */
export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });
