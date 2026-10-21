import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./app-shell";
import ExternalRedirect from "./components/external-redirect";
import { APP_SIGNUP_URL } from "./lib/links";
import About from "./pages/about";
import Blog from "./pages/blog";
import BlogPost from "./pages/blog/[slug]";
import Contact from "./pages/contact";
import BlogDashboard from "./pages/dashboard/blog";
import BlogEditor from "./pages/dashboard/blog/editor";
import ProfilePage from "./pages/dashboard/profile";
import Feature from "./pages/feature";
import Home from "./pages/home";
import Integration from "./pages/integration";
import IntegrationDetailsPage from "./pages/integration/[slug]";
import LegalPage from "./pages/legal/legal-page";
import LoginPage from "./pages/login";
import NotFound from "./pages/not-found";
import Pricing from "./pages/pricing";
import V2Boundary from "./v2/boundary";

/** Every route, inside the shared shell. The browser entry renders this. */
const AppTree = () => (
  <AppShell>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/feature" element={<Feature />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route
        path="/pricing/starter"
        element={<Navigate to="/pricing" replace />}
      />
      <Route
        path="/pricing/professional"
        element={<Navigate to="/pricing" replace />}
      />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/integration" element={<Integration />} />
      <Route path="/integration/:slug" element={<IntegrationDetailsPage />} />
      <Route path="/early-access" element={<Navigate to="/" replace />} />
      <Route path="/dashboard/profile" element={<ProfilePage />} />
      <Route path="/dashboard/blog" element={<BlogDashboard />} />
      <Route path="/dashboard/blog/new" element={<BlogEditor />} />
      <Route path="/dashboard/blog/edit/:id" element={<BlogEditor />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/signup"
        element={<ExternalRedirect to={APP_SIGNUP_URL} />}
      />
      <Route path="/legal/terms" element={<LegalPage slug="terms" />} />
      <Route path="/legal/privacy" element={<LegalPage slug="privacy" />} />
      <Route path="/legal/cookies" element={<LegalPage slug="cookies" />} />
      {/* Old legal URLs (Vercel also 301s these) */}
      <Route path="/legal/terms-&-condition" element={<Navigate to="/legal/terms" replace />} />
      <Route path="/legal/privacy-policy" element={<Navigate to="/legal/privacy" replace />} />
      <Route path="/legal/cookie-policy" element={<Navigate to="/legal/cookies" replace />} />
      <Route path="/v2/*" element={<V2Boundary />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AppShell>
);

export default AppTree;
