import Layout from '@/components/layout'
import FutureReadyFinance from '@/components/sections/feature/future-ready'
import FeatureHero from '@/components/sections/feature/hero'

// Template sections (feature grid, finance insights, integrations, growth) were
// removed in the live hotfix; the full feature page ships with the v2 site.
const Feature = () => {
    return (
        <Layout>
            <FeatureHero />
            <FutureReadyFinance />
        </Layout>
    )
}

export default Feature
