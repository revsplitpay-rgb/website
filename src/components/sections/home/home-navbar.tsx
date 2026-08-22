import { Button } from "@/components/ui/button";
import UserMenu from "@/components/sections/shared/user-menu";
import { useAuth } from "@/hooks/use-auth";
import Container from "@/components/container";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import revSplitPayLogo from "../../../../LOGO BLUE.png";

// Home-only nav: these jump to sections on this page instead of routing away.
// Ids are set on the matching sections; targets carry scroll-mt for the
// fixed bar's height.
export const homeSections = [
    { id: "how-it-works", label: "How it works" },
    { id: "features", label: "Features" },
    { id: "integrations", label: "Integrations" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" },
];

const HomeNavbar = () => {
    const { user, loading } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState<string>("");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Highlight whichever section currently owns the upper third of the screen.
    useEffect(() => {
        const targets = homeSections
            .map((s) => document.getElementById(s.id))
            .filter((el): el is HTMLElement => Boolean(el));
        if (!targets.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
                if (visible) setActive(visible.target.id);
            },
            { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
        );
        targets.forEach((t) => observer.observe(t));
        return () => observer.disconnect();
    }, []);

    const jumpTo = (event: React.MouseEvent, id: string) => {
        event.preventDefault();
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#${id}`);
    };

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
                scrolled
                    ? "border-b border-white/[0.07] bg-[#080a0f]/85 backdrop-blur-xl"
                    : "border-b border-transparent bg-transparent"
            )}
        >
            <Container className="flex h-[72px] items-center justify-between gap-4">
                <Link to="/" className="flex shrink-0 items-center space-x-2">
                    <img src={revSplitPayLogo} alt="RevSplitPay" className="h-9 w-9 rounded-xl object-cover" />
                    <span className="text-xl font-semibold tracking-tight text-white">RevSplitPay</span>
                </Link>

                <nav className="hidden lg:block">
                    <ul className="flex items-center gap-1">
                        {homeSections.map((section) => (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    onClick={(e) => jumpTo(e, section.id)}
                                    className={cn(
                                        "rounded-full px-4 py-2 text-sm transition-colors",
                                        active === section.id
                                            ? "text-white"
                                            : "text-white/65 hover:text-white"
                                    )}
                                >
                                    {section.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex shrink-0 items-center gap-2">
                    {!loading &&
                        (user ? (
                            <UserMenu />
                        ) : (
                            <Button asChild size="sm">
                                <a href="https://app.revsplitpay.com/" target="_blank" rel="noopener noreferrer">Open Account</a>
                            </Button>
                        ))}
                </div>
            </Container>

            {/* Mobile: the same jumps as a scrollable pill row. */}
            <div className="lg:hidden">
                <div className="flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {homeSections.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            onClick={(e) => jumpTo(e, section.id)}
                            className={cn(
                                "whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition-colors",
                                active === section.id
                                    ? "border-[#3FC1FF]/30 bg-[#3FC1FF]/[0.1] text-[#9BDAFF]"
                                    : "border-white/10 bg-white/[0.03] text-white/65"
                            )}
                        >
                            {section.label}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default HomeNavbar;
