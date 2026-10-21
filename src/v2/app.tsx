import { Component, type ErrorInfo, type ReactNode } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { buttonClass } from "./components/ui";
import V2Layout from "./layout";
import { v2Path } from "./lib/paths";
import About from "./pages/about";
import { BlogArticle, BlogIndex } from "./pages/blog";
import Contact from "./pages/contact";
import Feature from "./pages/feature";
import Home from "./pages/home";
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

/** Routes are relative to /v2 (mounted at /v2/* in src/App.tsx). */
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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </V2ErrorBoundary>
);

export default V2App;
