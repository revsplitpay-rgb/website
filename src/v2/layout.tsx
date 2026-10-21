import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

/** Shared v2 frame: skip link, landmarks. Robots rules live in PageMeta. */
const V2Layout = () => {
  const { pathname } = useLocation();

  // Scroll to top on page changes only, never on search-param changes.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Helmet>
        <link rel="preload" href="/fonts/geist/Geist-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Helmet>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default V2Layout;
