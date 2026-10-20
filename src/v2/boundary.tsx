import { lazy, Suspense, useLayoutEffect } from "react";

// Eager, tiny entry for /v2/*. It marks <html> as the v2 light theme before the
// lazy v2 chunk paints, and removes the mark when the visitor leaves /v2 so the
// live dark site is untouched. index.html does the same on a hard load.
const V2App = lazy(() => import("./app"));

export function setV2Theme(on: boolean) {
  const root = document.documentElement;
  if (on) root.setAttribute("data-v2-theme", "light");
  else root.removeAttribute("data-v2-theme");
}

const V2Boundary = () => {
  useLayoutEffect(() => {
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
