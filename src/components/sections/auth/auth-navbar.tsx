import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import revSplitPayLogo from "../../../../LOGO BLUE.png";
import { APP_URL } from "@/lib/links";

const AuthNavbar = () => {
    return (
        <header className="w-full md:top-10 top-6 mx-auto absolute z-40">
            <Container className="flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 xl:w-[25%] md:w-[30%] w-fit text-foreground">
                    <img src={revSplitPayLogo} alt="RevSplitPay" className="h-9 w-9 rounded-xl object-cover" />
                    <span className="font-semibold text-xl tracking-tight text-white">RevSplitPay</span>
                </Link>

                <nav className="hidden lg:flex items-center gap-8 text-white/70">
                    <Link to="/about" className="hover:text-white transition-colors">About</Link>
                    <Link to="/features" className="hover:text-white transition-colors">Features</Link>
                    <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                    <Link to="/blog" className="hover:text-white transition-colors">Blogs</Link>
                </nav>

                <div className="flex gap-6 items-center lg:w-[25%] justify-end">
                    <Link to="/login" className="text-white hover:text-white/80 transition-colors hidden sm:block">
                        Login
                    </Link>
                    <Button asChild>
                        <a href={APP_URL}>Open Account</a>
                    </Button>
                </div>
            </Container>
        </header>
    );
};

export default AuthNavbar;
