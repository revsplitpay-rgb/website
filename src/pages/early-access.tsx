import Container from "@/components/container";
import EarlyAccessContent from "@/components/sections/early-access/early-access-content";
import { Link } from "react-router-dom";
import revSplitPayLogo from "../../LOGO BLUE.png";

const EarlyAccess = () => {
    return (
        <main className='bg-black'>
            <header className="w-full md:top-10 top-6 mx-auto absolute z-40">
                <Container className="flex justify-center items-center">
                    <Link to="/" className="flex items-center">
                        <img src={revSplitPayLogo} alt="RevSplitPay" className="h-10 w-10 rounded-xl object-cover" />
                        <span className="ml-2 text-xl font-semibold tracking-tight text-white">RevSplitPay</span>
                    </Link>
                </Container>
            </header>
            <EarlyAccessContent />
        </main>
    );
};

export default EarlyAccess;
