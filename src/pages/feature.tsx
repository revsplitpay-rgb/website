import Layout from '@/components/layout'
import FeatureGrid from '@/components/sections/feature/feature-grid'
import Features from '@/components/sections/feature/features'
import FutureReadyFinance from '@/components/sections/feature/future-ready'
import FeatureGrowth from '@/components/sections/feature/growth'
import FeatureHero from '@/components/sections/feature/hero'
import FeatureIntegration from '@/components/sections/feature/integration'

const Feature = () => {
    return (
        <Layout>
            <FeatureHero />
            <FeatureGrid />
            <Features />
            <FeatureIntegration />
            <FutureReadyFinance />
            <FeatureGrowth />
        </Layout>
    )
}

export default Feature