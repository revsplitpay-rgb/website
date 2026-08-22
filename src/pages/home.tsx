import Layout from "@/components/layout";
import FeatureHero from "@/components/sections/feature/hero";
import { lazy, Suspense } from "react";

const Features = lazy(() => import("@/components/sections/home/features"));
const FutureReadyFinance = lazy(() => import("@/components/sections/feature/future-ready"));
const Confidence = lazy(() => import("@/components/sections/home/confidence"));
const Content = lazy(() => import("@/components/sections/home/content"));
const Capabilities = lazy(() => import("@/components/sections/home/capabilities"));
const Integrations = lazy(() => import("@/components/sections/home/integrations"));
const Pricing = lazy(() => import("@/components/sections/home/pricing"));
const Trust = lazy(() => import("@/components/sections/home/trust"));
const FAQ = lazy(() => import("@/components/sections/shared/faq"));

const Home = () => {

  return (
    <Layout variant="home">
      <FeatureHero />
      <Suspense fallback={null}>
        <FutureReadyFinance />
      </Suspense>
      <Suspense fallback={null}>
        <Confidence />
      </Suspense>
      <Suspense fallback={null}>
        <Features />
      </Suspense>
      <Suspense fallback={null}>
        <Capabilities />
      </Suspense>
      <Suspense fallback={null}>
        <Content />
      </Suspense>
      <Suspense fallback={null}>
        <Integrations />
      </Suspense>
      <Suspense fallback={null}>
        <Pricing />
      </Suspense>
      <Suspense fallback={null}>
        <Trust />
      </Suspense>
      <Suspense fallback={null}>
        <FAQ />
      </Suspense>
    </Layout>
  );
};

export default Home;
