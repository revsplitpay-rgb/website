import { QueryClient, hydrate, type DehydratedState } from "@tanstack/react-query";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

declare global {
  interface Window {
    __RQ_STATE__?: DehydratedState;
  }
}

const queryClient = new QueryClient();
// Prerendered pages ship the data they were rendered with (e.g. blog posts).
if (window.__RQ_STATE__) hydrate(queryClient, window.__RQ_STATE__);

const root = document.getElementById("root")!;
// Pages prerendered at build time already contain their HTML: attach to it
// instead of rebuilding, so there is no flash and crawlers see full content.
if (root.hasChildNodes()) {
  hydrateRoot(root, <App queryClient={queryClient} />);
} else {
  createRoot(root).render(<App queryClient={queryClient} />);
}
