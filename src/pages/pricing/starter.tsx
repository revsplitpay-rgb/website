import Layout from "@/components/layout";
import PricingDetailsHero from "@/components/sections/pricing/pricing-details-hero";
import FAQ from "@/components/sections/shared/faq";

const StarterPricing = () => {
    return (
        <Layout>
            <PricingDetailsHero
                heading="Starter Plans"
                subheadline="Access robust banking services for free, with advanced financial workflows starting at just $35/month."
                aboutText="We've got you covered with everything from smart consulting to cutting-edge digital solutions, all about quality. Dive into digital transformation and get ready for the future! FinanceSync makes life easier. The dashboard shows me my financial health in a snap, and the automation features take the hassle out of budgeting."
                features={[
                    "4% Cash Back Rewards",
                    "Hundreds of millions protected by FDIC insurance",
                    "Same-day ACH transfers for only $0,5",
                    "Domestic wire transfers for a fee of $3",
                    "Unlimited access to virtual cards",
                    "International wire transfers for $20"
                ]}
                planName="Starter"
                price="$5"
                cardDescription="Customize your business journey effortlessly with Paymaker dashboard."
            />
            <FAQ />
        </Layout>
    );
};

export default StarterPricing;
