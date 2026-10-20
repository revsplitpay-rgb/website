import { SITE_URL } from "@/lib/links";
import { Helmet } from "react-helmet-async";

/** Per-page title, description and canonical (v2 is noindex while in preview). */
const PageMeta = ({ title, description, path }: { title: string; description: string; path: string }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={`${SITE_URL}${path}`} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
  </Helmet>
);

export default PageMeta;
