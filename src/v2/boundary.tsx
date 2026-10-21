import { lazy, Suspense, useEffect, useLayoutEffect } from "react";

// Eager, tiny entry for the marketing site. It marks <html> as the light theme
// before the lazy chunk paints, and removes the mark when the visitor moves to
// the blog admin tools (login, dashboard), which keep their own dark style.
// index.html does the same on a hard load.
const V2App = lazy(() => import("./app"));

export function setV2Theme(on: boolean) {
  const root = document.documentElement;
  if (on) root.setAttribute("data-v2-theme", "light");
  else root.removeAttribute("data-v2-theme");
}

// Layout effect in the browser (before paint); plain effect during prerender.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const V2Boundary = () => {
  useIsomorphicLayoutEffect(() => {
    setV2Theme(true);
    return () => setV2Theme(false);
  }, []);

  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <V2App />
    </Suspense>
  );
};

export default V2Boundary;
