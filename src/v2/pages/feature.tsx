import { cn } from "@/lib/utils";
import { APP_SIGNUP_URL } from "@/lib/links";
import { USAGE_WARNING_PCTS } from "@/lib/pricing";
import {
  AlertTriangle,
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
  Palette,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type CSSProperties, type ComponentType } from "react";
import CtaBand from "../components/cta-band";
import { LeaderboardExample, PayoutExample } from "../components/examples";
import { InvoiceVisual, PayTypesVisual, SplitVisual } from "../components/product-bento";
import { INTEGRATION_LOGOS, WEBHOOK_TOOL_LOGOS, paymentProviderLogos } from "../content/logos";
import { Reveal } from "../components/motion";
import PageHero from "../components/page-hero";
import PageMeta from "../components/page-meta";
import { breadcrumbLd } from "../seo/jsonld";
import { ButtonLink, Container, ExampleLabel, Grad, Section, SectionHeading } from "../components/ui";
import { featureGroups, roles } from "../content/copy";
import { providerPhrase } from "../content/providers";

// Soft brand-family tints, rotated across the feature groups.
const TINTS = [
  {
    card: "bg-[linear-gradient(160deg,#eef5ff_0%,#ffffff_55%)]",
    tile: "bg-[linear-gradient(140deg,#3fc1ff,#0058b8)]",
    tick: "bg-[rgb(0_114_228/0.1)] text-primary",
    panel: "bg-[linear-gradient(160deg,#e8f2ff,#f8fbff)] ring-[rgb(0_114_228/0.12)]",
  },
  {
    card: "bg-[linear-gradient(160deg,#ebfaff_0%,#ffffff_55%)]",
    tile: "bg-[linear-gradient(140deg,#5ad8ff,#0087c2)]",
    tick: "bg-[rgb(0_135_194/0.12)] text-[rgb(0_110_160)]",
    panel: "bg-[linear-gradient(160deg,#e3f7ff,#f8fdff)] ring-[rgb(0_135_194/0.14)]",
  },
  {
    card: "bg-[linear-gradient(160deg,#f1f0ff_0%,#ffffff_55%)]",
    tile: "bg-[linear-gradient(140deg,#8f8cff,#4f46e5)]",
    tick: "bg-[rgb(79_70_229/0.1)] text-[rgb(67_56_202)]",
    panel: "bg-[linear-gradient(160deg,#eeedff,#fafaff)] ring-[rgb(79_70_229/0.12)]",
  },
  {
    card: "bg-[linear-gradient(160deg,#ebfbf6_0%,#ffffff_55%)]",
    tile: "bg-[linear-gradient(140deg,#34d3a5,#0f9d7a)]",
    tick: "bg-[rgb(16_160_110/0.12)] text-[rgb(4_120_87)]",
    panel: "bg-[linear-gradient(160deg,#e6f9f2,#f8fdfb)] ring-[rgb(16_160_110/0.14)]",
  },
];

const TeamVisual = () => (
  <ul className="grid grid-cols-2 gap-2" aria-hidden="true">
    {roles.map((item) => {
      const RoleIcon = ROLE_ICONS[item.role] ?? Users;
      return (
        <li key={item.role} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm text-foreground ring-1 ring-border">
          <RoleIcon className="h-3.5 w-3.5 text-primary" />
          {item.role}
        </li>
      );
    })}
  </ul>
);

const ReportingVisual = () => (
  <div className="rounded-xl bg-white ring-1 ring-border" aria-hidden="true">
    <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
      <p className="text-sm font-medium text-foreground">Alerts</p>
      <ExampleLabel />
    </div>
    <ul className="divide-y divide-border text-sm">
      {[
        { icon: CreditCard, text: "New sale recorded", tone: "bg-[rgb(0_114_228/0.1)] text-primary" },
        { icon: Send, text: "Payout sent to Closer", tone: "bg-[rgb(16_160_110/0.12)] text-[rgb(4_120_87)]" },
        { icon: AlertTriangle, text: "Failed payment flagged", tone: "bg-[rgb(var(--destructive)/0.1)] text-destructive" },
        { icon: BarChart3, text: `Plan at ${USAGE_WARNING_PCTS[0]}% of sales limit`, tone: "bg-[rgb(245_165_36/0.14)] text-[rgb(146_92_0)]" },
      ].map((row) => (
        <li key={row.text} className="flex items-center gap-3 px-4 py-2.5 text-foreground">
          <span className={cn("flex h-7 w-7 items-center justify-center rounded-lg", row.tone)}>
            <row.icon className="h-3.5 w-3.5" />
          </span>
          {row.text}
        </li>
      ))}
    </ul>
  </div>
);

const IntegrationsVisual = () => (
  <ul className="grid grid-cols-2 gap-2" aria-hidden="true">
    {[...paymentProviderLogos(), INTEGRATION_LOGOS.slack!, ...WEBHOOK_TOOL_LOGOS].map((mark) => (
      <li key={mark.name} className="flex h-14 items-center justify-center rounded-xl bg-white ring-1 ring-border">
        <img src={mark.src} alt="" style={{ height: Math.round(mark.height * 0.8) }} className="w-auto" />
      </li>
    ))}
  </ul>
);

const OnboardingVisual = () => (
  <div className="rounded-xl bg-white p-4 ring-1 ring-border" aria-hidden="true">
    <p className="text-sm font-medium text-foreground">Setup checklist</p>
    <ul className="mt-3 space-y-2.5 text-sm">
      {[
        { text: "Connect your payment account", done: true },
        { text: "Invite your team", done: true },
        { text: "Create your first checkout link", done: false },
      ].map((step) => (
        <li key={step.text} className="flex items-center gap-2.5">
          <span
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-full",
              step.done ? "bg-[rgb(16_160_110)] text-white" : "ring-2 ring-[rgb(0_114_228/0.35)]",
            )}
          >
            {step.done && <Check className="h-3 w-3" />}
          </span>
          <span className={step.done ? "text-muted-foreground line-through" : "font-medium text-foreground"}>{step.text}</span>
        </li>
      ))}
    </ul>
  </div>
);

// The eight preset brand colours offered in the app, as RGB channels.
const BRAND_PRESETS = [
  { name: "Violet", rgb: "124 58 237" },
  { name: "Indigo", rgb: "79 70 229" },
  { name: "Teal", rgb: "13 148 136" },
  { name: "Emerald", rgb: "5 150 105" },
  { name: "Amber", rgb: "217 119 6" },
  { name: "Orange", rgb: "234 88 12" },
  { name: "Rose", rgb: "225 29 72" },
  { name: "Slate", rgb: "51 65 85" },
];

/** A Scale workspace's sidebar in the visitor's chosen colour. */
const BrandingVisual = () => {
  const [brand, setBrand] = useState(BRAND_PRESETS[0]);
  return (
    <div className="overflow-hidden rounded-xl bg-white ring-1 ring-border" style={{ "--brand": brand.rgb } as CSSProperties}>
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <p className="text-sm font-medium text-foreground">Your dashboard</p>
        <ExampleLabel />
      </div>
      <div className="grid grid-cols-[112px_1fr]" aria-hidden="true">
        <div className="flex flex-col border-r border-border bg-[rgb(248_250_252)] p-2.5">
          <div className="flex items-center gap-2 px-1.5 py-1">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[rgb(var(--brand))] text-[0.6875rem] font-bold text-white transition-colors duration-300">
              Y
            </span>
            <span className="text-xs font-semibold text-foreground">Your logo</span>
          </div>
          <ul className="mt-3 space-y-0.5 text-xs">
            {["Overview", "Deals", "Payouts", "Team"].map((item, index) => (
              <li
                key={item}
                className={cn(
                  "rounded-md px-2 py-1.5 transition-colors duration-300",
                  index === 0 ? "bg-[rgb(var(--brand)/0.12)] font-medium text-[rgb(var(--brand))]" : "text-muted-foreground",
                )}
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-auto px-1.5 pt-6 text-[0.625rem] leading-tight text-muted-foreground">Powered by RevSplitPay</p>
        </div>
        <div className="p-3">
          <p className="text-xs text-muted-foreground">Sales this month</p>
          <div className="mt-2 flex h-16 items-end gap-1.5">
            {[40, 62, 48, 80, 100].map((height, index) => (
              <span
                key={index}
                className="flex-1 rounded-t bg-[rgb(var(--brand))] transition-colors duration-300"
                style={{ height: `${height}%`, opacity: 0.35 + index * 0.16 }}
              />
            ))}
          </div>
          <span className="mt-3 block rounded-full bg-[rgb(var(--brand))] py-1.5 text-center text-xs font-medium text-white transition-colors duration-300">
            New checkout link
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
        <p className="text-xs text-muted-foreground">Try a colour</p>
        <div role="group" aria-label="Try a brand colour" className="flex gap-1.5">
          {BRAND_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              aria-label={preset.name}
              aria-pressed={preset.name === brand.name}
              onClick={() => setBrand(preset)}
              className={cn(
                "h-5 w-5 rounded-full ring-offset-2 transition-transform hover:scale-110",
                preset.name === brand.name && "ring-2 ring-[rgb(var(--brand))]",
              )}
              style={{ backgroundColor: `rgb(${preset.rgb})` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const GROUP_VISUALS: Record<string, ComponentType> = {
  selling: PayTypesVisual,
  commissions: SplitVisual,
  payouts: PayoutExample,
  invoices: InvoiceVisual,
  rewards: LeaderboardExample,
  team: TeamVisual,
  branding: BrandingVisual,
  reporting: ReportingVisual,
  integrations: IntegrationsVisual,
  onboarding: OnboardingVisual,
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
  branding: Palette,
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
          Start free trial <ArrowRight aria-hidden="true" />
        </ButtonLink>
      </PageHero>

      <section aria-label="Features" className="bg-background">
        <Container className="grid gap-10 py-16 md:py-24 lg:grid-cols-[240px_1fr] lg:gap-14">
          <nav aria-label="On this page" className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <ul className="v2-card space-y-0.5 p-2 text-[0.9375rem]">
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
              const tint = TINTS[index % TINTS.length];
              return (
                <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="scroll-mt-24">
                  <Reveal>
                    <div className={cn("v2-card p-7 lg:p-10", tint.card)}>
                      <div className="flex items-start gap-5">
                        <span
                          className={cn(
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_8px_18px_-8px_rgb(0_40_120/0.55)]",
                            tint.tile,
                          )}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="v2-num text-xs font-medium tracking-[0.14em] text-muted-foreground">
                            {String(index + 1).padStart(2, "0")} / {String(featureGroups.length).padStart(2, "0")}
                          </p>
                          <h2 id={`${group.id}-title`} className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[1.75rem] font-semibold leading-tight tracking-tight text-foreground">
                            {group.title}
                            {group.badge && (
                              <span className="rounded-full bg-[rgb(0_114_228/0.1)] px-2.5 py-1 text-xs font-semibold tracking-normal text-[rgb(var(--v2-deep))]">
                                {group.badge} plan
                              </span>
                            )}
                          </h2>
                          <p className="mt-2 max-w-[60ch] text-muted-foreground">{group.summary}</p>
                        </div>
                      </div>
                      <div className={cn("mt-8 md:pl-[68px]", Visual && "grid gap-8 xl:grid-cols-[1fr_minmax(0,360px)] xl:items-center")}>
                        <ul className={cn("grid gap-x-8 gap-y-3.5 text-[0.9375rem] text-foreground", !Visual && "sm:grid-cols-2")}>
                          {group.points.map((point) => (
                            <li key={point} className="flex gap-3">
                              <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full", tint.tick)}>
                                <Check className="h-3 w-3" aria-hidden="true" />
                              </span>
                              {point}
                            </li>
                          ))}
                        </ul>
                        {Visual && (
                          <div className={cn("rounded-[20px] p-4 ring-1", tint.panel)}>
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
