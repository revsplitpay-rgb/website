import Layout from "@/components/layout";
import PricingBanner from "@/components/sections/pricing/pricing-banner";
import PricingComparison from "@/components/sections/pricing/pricing-comparison";
import FAQ from "@/components/sections/shared/faq";

const Pricing = () => {
    return (
        <Layout>
            <PricingBanner />
            <PricingComparison />
            <FAQ />
        </Layout>
    );
};

export default Pricing;