import Container from "@/components/container";
import Layout from "@/components/layout";
import SEO from "@/components/seo";
import LegalHero from "@/components/sections/legal/hero";
import { LEGAL_DOCS, LegalBody, legalUpdated, type LegalSlug } from "@/lib/legal";

// Live (dark) site rendering of the owner's legal documents. The text comes
// from src/content/legal/*.md, shared with the v2 site.

const DESCRIPTIONS: Record<LegalSlug, string> = {
  terms: "The terms that govern your use of RevSplitPay: plans, fees, payouts, payment providers and your responsibilities.",
  privacy: "How RevSplitPay collects, uses, shares and protects personal data, and your rights under the GDPR.",
  cookies: "The cookies and similar technologies RevSplitPay uses, and how to manage them.",
};

const PROSE = [
  "text-white/75 leading-relaxed",
  "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:scroll-mt-28 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white",
  "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white",
  "[&_p]:mb-4 [&_strong]:text-white [&_a]:text-[#3FC1FF] [&_a]:underline",
  "[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_li>ul]:mt-2 [&_li>ul]:mb-0 [&_li>ul]:list-[circle] [&_li>p]:mt-2",
  "[&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm",
  "[&_hr]:my-8 [&_hr]:border-white/10",
  "[&_.legal-table]:mb-6 [&_.legal-table]:overflow-x-auto [&_.legal-table]:rounded-xl [&_.legal-table]:border [&_.legal-table]:border-white/10",
  "[&_table]:w-full [&_table]:text-sm [&_th]:bg-white/5 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-white",
  "[&_td]:border-t [&_td]:border-white/10 [&_td]:px-4 [&_td]:py-3 [&_td]:align-top",
].join(" ");

const LegalPage = ({ slug }: { slug: LegalSlug }) => {
  const doc = LEGAL_DOCS[slug];
  const updated = legalUpdated(doc);
  return (
    <Layout>
      <SEO title={`${doc.title} | RevSplitPay`} description={DESCRIPTIONS[slug]} canonicalUrl={`/legal/${slug}`} />
      <LegalHero title={doc.title} description={updated ? `Last updated ${updated}` : DESCRIPTIONS[slug]} />
      <section>
        <Container className="flex justify-center py-[60px]">
          <article className="w-full max-w-[860px]">
            <LegalBody doc={doc} className={PROSE} />
          </article>
        </Container>
      </section>
    </Layout>
  );
};

export default LegalPage;
