import { CONTACT_EMAIL } from "@/lib/links";
import { Link } from "react-router-dom";
import { v2Path } from "../lib/paths";
import { Logo } from "./navbar";
import { Container } from "./ui";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", to: v2Path("/feature") },
      { label: "Pricing", to: v2Path("/pricing") },
      { label: "Integrations", to: v2Path("/integration") },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: v2Path("/about") },
      { label: "Blog", to: v2Path("/blog") },
      { label: "Contact", to: v2Path("/contact") },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms and conditions", to: "/legal/terms-&-condition" },
      { label: "Privacy policy", to: "/legal/privacy-policy" },
      { label: "Cookie policy", to: "/legal/cookie-policy" },
    ],
  },
];

const Footer = () => (
  <footer className="border-t border-border bg-background">
    <Container className="py-14 lg:py-16">
      <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-[0.9375rem] text-muted-foreground">
            Commissions, splits and payouts on autopilot for sales teams.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-sm font-semibold text-foreground">{column.title}</h2>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>RevSplitPay is registered in Ireland. Prices in USD.</p>
        <p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-foreground">
            {CONTACT_EMAIL}
          </a>
          <span className="mx-2" aria-hidden="true">·</span>© {new Date().getFullYear()} RevSplitPay
        </p>
      </div>
    </Container>
  </footer>
);

export default Footer;
