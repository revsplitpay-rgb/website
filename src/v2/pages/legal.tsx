import { LEGAL_DOCS, LegalBody, legalToc, legalUpdated, type LegalSlug } from "@/lib/legal";
import { useEffect, useState } from "react";
import { Reveal } from "../components/motion";
import PageHero from "../components/page-hero";
import PageMeta from "../components/page-meta";
import { Container, Section } from "../components/ui";
import { breadcrumbLd } from "../seo/jsonld";

const DESCRIPTIONS: Record<LegalSlug, string> = {
  terms: "The terms that govern your use of RevSplitPay: plans, fees, payouts, payment providers and your responsibilities.",
  privacy: "How RevSplitPay collects, uses, shares and protects personal data, and your rights under the GDPR.",
  cookies: "The cookies and similar technologies RevSplitPay uses, and how to manage them.",
};

/** Highlights the section currently in view in the contents list. */
const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
};

const LegalPage = ({ slug }: { slug: LegalSlug }) => {
  const doc = LEGAL_DOCS[slug];
  const toc = legalToc(doc);
  const updated = legalUpdated(doc);
  const active = useActiveSection(toc.map((item) => item.id));
  const path = `/legal/${slug}`;

  return (
    <>
      <PageMeta
        title={`${doc.title} | RevSplitPay`}
        description={DESCRIPTIONS[slug]}
        path={path}
        jsonLd={[breadcrumbLd([{ name: doc.title, path }])]}
      />
      <PageHero eyebrow="Legal" title={doc.title} support={updated ? `Last updated ${updated}` : undefined} />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Sections" className="hidden lg:block">
            <ol className="v2-card sticky top-24 max-h-[calc(100vh-8rem)] space-y-0.5 overflow-y-auto p-2 text-sm">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? "true" : undefined}
                    className={
                      active === item.id
                        ? "block rounded-lg bg-[rgb(0_114_228/0.08)] px-3 py-1.5 font-medium text-[rgb(var(--v2-deep))]"
                        : "block rounded-lg px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    }
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <Reveal blur={false} y={12}>
            <article className="v2-card px-6 py-8 sm:px-10 sm:py-10">
              <LegalBody doc={doc} className="v2-prose v2-legal max-w-[72ch]" />
            </article>
          </Reveal>
        </Container>
      </Section>
    </>
  );
};

export default LegalPage;
