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
      <Section>
        <Container className="max-w-[720px]">
          <h1 className="v2-display text-foreground">This page moved or never existed.</h1>
          <p className="mt-5 break-all font-mono text-sm text-muted-foreground">{pathname}</p>
          <div className="mt-10 flex flex-wrap gap-3">
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
