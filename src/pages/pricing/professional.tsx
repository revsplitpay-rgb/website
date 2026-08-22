// NOTE: This file was overwritten in error and the original was not backed up.
// The content below is a RECONSTRUCTION from the sibling starter.tsx and the
// template data in pricing-banner.tsx. It is not guaranteed to match the
// Professional pricing page.
// history if you need it exactly.
import Layout from "@/components/layout";
import PricingDetailsHero from "@/components/sections/pricing/pricing-details-hero";
import FAQ from "@/components/sections/shared/faq";

const ProfessionalPricing = () => {
    return (
        <Layout>
            <PricingDetailsHero
                heading="Professional Plans"
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
                planName="Professional"
                price="$5"
                cardDescription="Customize your business journey effortlessly with Paymaker dashboard."
                backgroundImage="/images/pricing/pricing-bg.webp"
            />
            <FAQ />
        </Layout>
    );
};

export default ProfessionalPricing;
