import Container from "@/components/container";
import revSplitPayLogo from "../../../../LOGO BLUE.png";

// Home footer stays on the page: every link is a same-page jump, no routing.
const exploreLinks = [
    { id: "problem", label: "The problem" },
    { id: "how-it-works", label: "How it works" },
    { id: "for-teams", label: "For your team" },
    { id: "features", label: "Features" },
];

const detailLinks = [
    { id: "integrations", label: "Integrations" },
    { id: "pricing", label: "Pricing" },
    { id: "proof", label: "The proof" },
    { id: "faq", label: "FAQ" },
];

const jumpTo = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
};

const toTop = (event: React.MouseEvent) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", window.location.pathname);
};

const LinkColumn = ({ title, links }: { title: string; links: { id: string; label: string }[] }) => (
    <div>
        <h4 className="mb-5 text-sm font-semibold text-white">{title}</h4>
        <ul className="space-y-3">
            {links.map((link) => (
                <li key={link.id}>
                    <a
                        href={`#${link.id}`}
                        onClick={(e) => jumpTo(e, link.id)}
                        className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                        {link.label}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);

const HomeFooter = () => {
    return (
        <footer className="border-t border-white/[0.07] bg-[#07090d] pt-16 pb-10 text-white">
            <Container>
                <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr]">
                    {/* Brand */}
                    <div>
                        <a href="#" onClick={toTop} className="inline-flex items-center space-x-2">
                            <img src={revSplitPayLogo} alt="RevSplitPay" className="h-9 w-9 rounded-xl object-cover" />
                            <span className="text-xl font-semibold tracking-tight">RevSplitPay</span>
                        </a>
                        <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-white/60">
                            Automatic commission splits and direct Stripe payouts for sales teams, with a ledger that owners and reps both read.
                        </p>
                        <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium tracking-wide text-[#8FD3FF]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#3FC1FF] shadow-[0_0_10px_rgba(63,193,255,0.9)]" />
                            Verified by real payment data
                        </span>
                    </div>

                    <LinkColumn title="Explore" links={exploreLinks} />
                    <LinkColumn title="Details" links={detailLinks} />

                    {/* Closing jump */}
                    <div>
                        <h4 className="mb-5 text-sm font-semibold text-white">Ready when you are</h4>
                        <p className="mb-5 text-sm leading-relaxed text-white/60">
                            Connect Stripe or Whop, set your splits, and let the next sale pay everyone by itself.
                        </p>
                        <a
                            href="#get-started"
                            onClick={(e) => jumpTo(e, "get-started")}
                            className="inline-flex items-center gap-2 rounded-full border border-[#3FC1FF]/30 bg-[#3FC1FF]/[0.09] px-4 py-2 text-sm font-medium text-[#9BDAFF] transition-colors hover:bg-[#3FC1FF]/[0.16] hover:text-white"
                        >
                            Get started
                            <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>

                <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-8 md:flex-row">
                    <p className="text-sm text-white/45">
                        &copy; {new Date().getFullYear()} RevSplitPay. Payments run on Stripe or Whop.
                    </p>
                    <a
                        href="#"
                        onClick={toTop}
                        className="text-sm text-white/45 transition-colors hover:text-white/80"
                    >
                        Back to top &uarr;
                    </a>
                </div>
            </Container>
        </footer>
    );
};

export default HomeFooter;
