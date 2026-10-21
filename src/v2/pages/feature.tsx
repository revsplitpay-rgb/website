import { cn } from "@/lib/utils";
import { APP_SIGNUP_URL } from "@/lib/links";
import {
  ArrowRight,
  BarChart3,
  Check,
  CreditCard,
  FileText,
  Plug,
  Rocket,
  Send,
  SplitSquareHorizontal,
  Trophy,
  Users,
  Crown,
  ShieldCheck,
  Handshake,
  CalendarCheck,
  LifeBuoy,
  Eye,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type ComponentType } from "react";
import CtaBand from "../components/cta-band";
import { LeaderboardExample, PayoutExample } from "../components/examples";
import { InvoiceVisual, PayTypesVisual, SplitVisual } from "../components/product-bento";
import { Reveal } from "../components/motion";
import PageHero from "../components/page-hero";
import PageMeta from "../components/page-meta";
import { breadcrumbLd } from "../seo/jsonld";
import { ButtonLink, Container, Grad, Section, SectionHeading } from "../components/ui";
import { featureGroups, roles } from "../content/copy";
import { providerPhrase } from "../content/providers";

const GROUP_VISUALS: Record<string, ComponentType> = {
  selling: PayTypesVisual,
  commissions: SplitVisual,
  payouts: PayoutExample,
  invoices: InvoiceVisual,
  rewards: LeaderboardExample,
};

const ROLE_ICONS: Record<string, LucideIcon> = {
  Owner: Crown,
  Admin: ShieldCheck,
  "Sales Manager": BarChart3,
  Closer: Handshake,
  Setter: CalendarCheck,
  Partner: Users,
  Staff: LifeBuoy,
  Viewer: Eye,
};

const GROUP_ICONS: Record<string, LucideIcon> = {
  selling: CreditCard,
  commissions: SplitSquareHorizontal,
  payouts: Send,
  invoices: FileText,
  rewards: Trophy,
  team: Users,
  reporting: BarChart3,
  integrations: Plug,
  onboarding: Rocket,
};

/** Highlights the feature group currently in view. */
const useActiveGroup = () => {
  const [active, setActive] = useState(featureGroups[0].id);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    featureGroups.forEach((group) => {
      const el = document.getElementById(group.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
};

const Feature = () => {
  const active = useActiveGroup();
  return (
    <>
      <PageMeta
        title="Features | RevSplitPay"
        description="Checkout links, automatic commission splits, payouts, invoices, rewards and reporting for sales teams."
        path="/features"
        jsonLd={[breadcrumbLd([{ name: "Features", path: "/features" }])]}
      />
      <PageHero
        eyebrow="Product"
        title={
          <>
            One platform to sell, split <Grad>and pay your team</Grad>.
          </>
        }
        support={`Sell, split every commission, pay the team and keep them motivated, all on ${providerPhrase()}.`}
      >
        <ButtonLink href={APP_SIGNUP_URL}>
          Get started <ArrowRight aria-hidden="true" />
        </ButtonLink>
      </PageHero>

      <section aria-label="Features" className="bg-background">
        <Container className="grid gap-10 py-16 md:py-24 lg:grid-cols-[240px_1fr] lg:gap-14">
          <nav aria-label="On this page" className="hidden lg:block">
            <ul className="v2-card sticky top-24 space-y-0.5 p-2 text-[0.9375rem]">
              {featureGroups.map((group) => {
                const Icon = GROUP_ICONS[group.id] ?? Check;
                const isActive = active === group.id;
                return (
                  <li key={group.id}>
                    <a
                      href={`#${group.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors",
                        isActive
                          ? "bg-[rgb(0_114_228/0.08)] font-medium text-[rgb(var(--v2-deep))]"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {group.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="space-y-6">
            {featureGroups.map((group, index) => {
              const Icon = GROUP_ICONS[group.id] ?? Check;
              const Visual = GROUP_VISUALS[group.id];
              return (
                <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="scroll-mt-24">
                  <Reveal>
                    <div className="v2-card p-7 lg:p-10">
                      <div className="flex items-start gap-5">
                        <span className="v2-icon-tile h-12 w-12 shrink-0">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="v2-num text-xs font-medium tracking-[0.14em] text-muted-foreground">
                            {String(index + 1).padStart(2, "0")} / {String(featureGroups.length).padStart(2, "0")}
                          </p>
                          <h2 id={`${group.id}-title`} className="mt-1 text-[1.75rem] font-semibold leading-tight tracking-tight text-foreground">
                            {group.title}
                          </h2>
                          <p className="mt-2 max-w-[60ch] text-muted-foreground">{group.summary}</p>
                        </div>
                      </div>
                      <div className={cn("mt-8", Visual && "grid gap-8 xl:grid-cols-[1fr_minmax(0,380px)] xl:items-center")}>
                        <ul className={cn("grid gap-x-8 gap-y-3.5 text-[0.9375rem] text-foreground", !Visual && "sm:grid-cols-2")}>
                          {group.points.map((point) => (
                            <li key={point} className="flex gap-3">
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgb(0_114_228/0.1)] text-primary">
                                <Check className="h-3 w-3" aria-hidden="true" />
                              </span>
                              {point}
                            </li>
                          ))}
                        </ul>
                        {Visual && (
                          <div className="rounded-[20px] bg-[linear-gradient(160deg,#eef6ff,#f8fbff)] p-4 ring-1 ring-[rgb(0_114_228/0.1)]">
                            <Visual />
                          </div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                </section>
              );
            })}
          </div>
        </Container>
      </section>

      <Section tone="tint" labelledBy="roles-title">
        <Container>
          <SectionHeading
            id="roles-title"
            center
            eyebrow="Roles"
            title={
              <>
                The right view <Grad>for every role</Grad>.
              </>
            }
            support="Eight roles, each seeing exactly what it needs."
          />
          <dl className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((item, index) => (
              <Reveal key={item.role} delay={(index % 4) * 80} className="h-full">
                <div className="v2-card v2-card-hover h-full p-6">
                  {(() => {
                    const RoleIcon = ROLE_ICONS[item.role] ?? Users;
                    return (
                      <span className="v2-icon-tile h-10 w-10" aria-hidden="true">
                        <RoleIcon className="h-4 w-4" />
                      </span>
                    );
                  })()}
                  <dt className="mt-4 text-base font-semibold text-foreground">{item.role}</dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">{item.text}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
};

export default Feature;
