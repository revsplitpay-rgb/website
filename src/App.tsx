import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import AppTree from "./app-tree";

// Visits to the blog admin and sign-in pages stay out of the visitor numbers.
const PRIVATE_PATHS = /^\/(dashboard|login)(\/|$)/;

const App = ({ queryClient }: { queryClient: QueryClient }) => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppTree />
      </BrowserRouter>
    </QueryClientProvider>
    {/* Vercel Web Analytics is cookieless, as the privacy and cookie policies say. */}
    <Analytics beforeSend={(event) => (PRIVATE_PATHS.test(new URL(event.url).pathname) ? null : event)} />
  </HelmetProvider>
);

export default App;
