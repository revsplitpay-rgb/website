import { APP_SIGNUP_URL, APP_URL } from "@/lib/links";
import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../../LOGO BLUE.png";
import { v2Path } from "../lib/paths";
import { buttonClass, Container } from "./ui";

export const NAV_LINKS = [
  { label: "Product", to: v2Path("/feature") },
  { label: "Pricing", to: v2Path("/pricing") },
  { label: "Integrations", to: v2Path("/integration") },
  { label: "Blog", to: v2Path("/blog") },
];

export const Logo = () => (
  <Link to={v2Path("/")} className="flex items-center gap-2.5" aria-label="RevSplitPay home">
    <img src={logo} alt="" width={28} height={28} className="h-7 w-7 rounded-md" />
    <span className="text-[1.125rem] font-semibold tracking-tight text-foreground">RevSplitPay</span>
  </Link>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route changes only (not on search-param changes).
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background transition-colors duration-200",
        scrolled ? "border-border" : "border-transparent",
      )}
    >
      <Container className="flex h-14 items-center justify-between lg:h-16">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "relative py-2 text-[0.9375rem] transition-colors duration-150 hover:text-foreground",
                      isActive
                        ? "text-foreground after:absolute after:inset-x-0 after:-bottom-[19px] after:h-0.5 after:bg-[rgb(var(--v2-highlight))]"
                        : "text-muted-foreground",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={APP_URL} className="text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground">
            Log in
          </a>
          <a href={APP_SIGNUP_URL} className={buttonClass("primary", "min-h-10 px-4")}>
            Get started
          </a>
        </div>

        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground hover:bg-muted lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/20 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-background p-4 v2-raised data-[state=open]:animate-in data-[state=open]:slide-in-from-right">
              <div className="flex h-12 items-center justify-between">
                <Dialog.Title className="text-base font-semibold">Menu</Dialog.Title>
                <Dialog.Close
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-muted"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Dialog.Close>
              </div>
              <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
              <nav aria-label="Mobile" className="mt-4 flex-1">
                <ul className="divide-y divide-border border-y border-border">
                  {NAV_LINKS.map((link) => (
                    <li key={link.to}>
                      <NavLink to={link.to} className="flex min-h-12 items-center text-[1.0625rem] text-foreground">
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="grid gap-3 pt-4">
                <a href={APP_URL} className={buttonClass("secondary", "min-h-12 w-full")}>
                  Log in
                </a>
                <a href={APP_SIGNUP_URL} className={buttonClass("primary", "min-h-12 w-full")}>
                  Get started
                </a>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Container>
    </header>
  );
};

export default Navbar;
