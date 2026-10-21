import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import type { ReactNode } from "react";

/**
 * Providers and toasters around the routes. The browser (app-tree) and the
 * build-time prerender (entry-server) both use it, so a prerendered page and
 * the app that hydrates it render the same tree.
 */
const AppShell = ({ children }: { children: ReactNode }) => (
  <TooltipProvider>
    <AuthProvider>
      <Toaster />
      <Sonner />
      {children}
    </AuthProvider>
  </TooltipProvider>
);

export default AppShell;
