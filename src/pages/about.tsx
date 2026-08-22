import Layout from "@/components/layout";
import AboutHero from "@/components/sections/about/about-hero";
import AboutTestimonials from "@/components/sections/about/about-testimonials";
import ConfidenceSection from "@/components/sections/about/confidence-section";
import InnovationSection from "@/components/sections/about/innovation-section";
import JourneySection from "@/components/sections/about/journey-section";
import LogoTicker from "@/components/sections/shared/logo-ticker";
import TeamGrid from "@/components/sections/about/team-grid";
import WorldwideStats from "@/components/sections/about/worldwide-stats";

const About = () => {
    return (
        <Layout>
            <AboutHero />
            <LogoTicker />
            <ConfidenceSection />
            <InnovationSection />
            <JourneySection />
            <AboutTestimonials />
            <TeamGrid />
            <WorldwideStats />
        </Layout>
    );
};

export default About;