import { Helmet } from "react-helmet-async";
import { graph, organizationLd, websiteLd } from "../seo/jsonld";
import { IS_PREVIEW, OG_IMAGE, SITE_NAME, absoluteUrl } from "../seo/site";

/**
 * Per-page head: title, description, canonical, Open Graph, Twitter and one
 * JSON-LD graph (Organization + WebSite on every page, plus `jsonLd` nodes).
 * `path` is the final public path, without any preview prefix.
 */
const PageMeta = ({
  title,
  description,
  path,
  type = "website",
  image = OG_IMAGE,
  jsonLd = [],
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  jsonLd?: object[];
  noindex?: boolean;
}) => {
  const url = absoluteUrl(path);
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {(noindex || IS_PREVIEW) && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <script type="application/ld+json">{JSON.stringify(graph(organizationLd(), websiteLd(), ...jsonLd))}</script>
    </Helmet>
  );
};

export default PageMeta;
