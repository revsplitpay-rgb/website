import { Component, type ErrorInfo, type ReactNode } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import ExternalRedirect from "@/components/external-redirect";
import { APP_SIGNUP_URL } from "@/lib/links";
import { buttonClass } from "./components/ui";
import V2Layout from "./layout";
import { v2Path } from "./lib/paths";
import About from "./pages/about";
import { BlogArticle, BlogIndex } from "./pages/blog";
import Contact from "./pages/contact";
import Feature from "./pages/feature";
import Home from "./pages/home";
import LegalPage from "./pages/legal";
import { IntegrationDetail, IntegrationsIndex } from "./pages/integrations";
import NotFound from "./pages/not-found";
import Pricing from "./pages/pricing";
import "./v2.css";

class V2ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[v2]", error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="flex min-h-screen flex-col items-start justify-center gap-6 bg-background px-4 sm:px-6 md:px-16">
        <p className="v2-h2 max-w-[24ch] text-foreground">Something went wrong on this page. Reload to try again.</p>
        <a href={v2Path("/")} className={buttonClass("secondary")}>
          Back to home
        </a>
      </div>
    );
  }
}

/** Old /integration URLs (before the clean-URL rename) keep working. */
const LegacyIntegrationRedirect = () => {
  const rest = useParams()["*"];
  return <Navigate to={v2Path(rest ? `/integrations/${rest}` : "/integrations")} replace />;
};

/** Links shared while the redesign was previewed at /v2 land on the real page. */
const PreviewRedirect = () => {
  const rest = useParams()["*"];
  return <Navigate to={rest ? `/${rest}` : "/"} replace />;
};

/**
 * The marketing site's routes (mounted at /* in src/app-tree.tsx). Old URLs
 * redirect here as well as in vercel.json, so client-side links also land.
 */
const V2App = () => (
  <V2ErrorBoundary>
    <Routes>
      <Route element={<V2Layout />}>
        <Route index element={<Home />} />
        <Route path="features" element={<Feature />} />
        <Route path="feature" element={<Navigate to={v2Path("/features")} replace />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="integrations" element={<IntegrationsIndex />} />
        <Route path="integrations/:slug" element={<IntegrationDetail />} />
        <Route path="integration/*" element={<LegacyIntegrationRedirect />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="blog" element={<BlogIndex />} />
        <Route path="blog/:slug" element={<BlogArticle />} />
        <Route path="legal/terms" element={<LegalPage slug="terms" />} />
        <Route path="legal/privacy" element={<LegalPage slug="privacy" />} />
        <Route path="legal/cookies" element={<LegalPage slug="cookies" />} />
        {/* Old URLs from the previous site */}
        <Route path="legal/terms-&-condition" element={<Navigate to={v2Path("/legal/terms")} replace />} />
        <Route path="legal/privacy-policy" element={<Navigate to={v2Path("/legal/privacy")} replace />} />
        <Route path="legal/cookie-policy" element={<Navigate to={v2Path("/legal/cookies")} replace />} />
        <Route path="pricing/starter" element={<Navigate to={v2Path("/pricing")} replace />} />
        <Route path="pricing/professional" element={<Navigate to={v2Path("/pricing")} replace />} />
        <Route path="early-access" element={<Navigate to={v2Path("/")} replace />} />
        <Route path="signup" element={<ExternalRedirect to={APP_SIGNUP_URL} />} />
        <Route path="v2/*" element={<PreviewRedirect />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </V2ErrorBoundary>
);

export default V2App;
