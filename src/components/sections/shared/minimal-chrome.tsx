import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import revSplitPayLogo from "../../../../LOGO BLUE.png";
import { APP_URL, CONTACT_EMAIL } from "@/lib/links";

// Stripped chrome for pages that are finished while the rest of the site is
// still template. Carries no links to unfinished pages.
export const MinimalNavbar = () => (
    <header className="absolute inset-x-0 top-0 z-40 py-6 md:py-8">
        <Container className="flex items-center justify-between gap-4">
            <Link to="/" className="flex shrink-0 items-center space-x-2">
                <img src={revSplitPayLogo} alt="RevSplitPay" className="h-9 w-9 rounded-xl object-cover" />
                <span className="text-xl font-semibold tracking-tight text-white">RevSplitPay</span>
            </Link>
            <Button asChild size="sm">
                <a href={APP_URL} target="_blank" rel="noopener noreferrer">
                    Open Account
                </a>
            </Button>
        </Container>
    </header>
);

export const MinimalFooter = () => (
    <footer className="border-t border-white/[0.07] bg-[#07090d] py-10 text-white">
        <Container className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Link to="/" className="flex items-center space-x-2">
                <img src={revSplitPayLogo} alt="RevSplitPay" className="h-7 w-7 rounded-lg object-cover" />
                <span className="text-base font-semibold tracking-tight">RevSplitPay</span>
            </Link>
            <p className="text-sm text-white/45">
                &copy; {new Date().getFullYear()} RevSplitPay. Payments run on Stripe or Whop.
            </p>
            <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm text-white/45 transition-colors hover:text-white/80"
            >
                {CONTACT_EMAIL}
            </a>
        </Container>
    </footer>
);
