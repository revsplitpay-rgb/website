import { useLocation } from "react-router-dom";
import PageMeta from "../components/page-meta";
import { ButtonLink, Container, Section } from "../components/ui";
import { v2Path } from "../lib/paths";

const links = [
  { label: "Home", to: "/" },
  { label: "Product", to: "/feature" },
  { label: "Pricing", to: "/pricing" },
  { label: "Integrations", to: "/integration" },
  { label: "Contact", to: "/contact" },
];

const NotFound = () => {
  const { pathname } = useLocation();
  return (
    <>
      <PageMeta title="Page not found | RevSplitPay" description="This page moved or never existed." path={pathname} />
      <Section tone="sky" className="-mt-16 pt-36 md:pt-44">
        <div className="v2-grid-bg absolute inset-0" aria-hidden="true" />
        <Container className="relative max-w-[760px] text-center">
          <p className="v2-num v2-gradient-text text-[6rem] font-semibold leading-none tracking-tight md:text-[8rem]">404</p>
          <h1 className="v2-h2 mt-6 text-foreground">This page moved or never existed.</h1>
          <p className="mx-auto mt-5 inline-block break-all rounded-full bg-white px-4 py-1.5 font-mono text-sm text-muted-foreground ring-1 ring-border">{pathname}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {links.map((link, index) => (
              <ButtonLink key={link.to} href={v2Path(link.to)} variant={index === 0 ? "primary" : "secondary"}>
                {link.label}
              </ButtonLink>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default NotFound;
