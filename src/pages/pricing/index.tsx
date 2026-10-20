import Layout from "@/components/layout";
import PricingBanner from "@/components/sections/pricing/pricing-banner";
import FAQ from "@/components/sections/shared/faq";

const Pricing = () => {
    return (
        <Layout>
            <PricingBanner />
            <FAQ />
        </Layout>
    );
};

export default Pricing;
