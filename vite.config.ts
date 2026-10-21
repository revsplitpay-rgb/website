import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  // The manifest lets scripts/prerender.mjs link the v2 chunk's CSS into prerendered pages.
  build: { manifest: true },
  // CommonJS packages that Node cannot import by name are bundled into the SSR build.
  ssr: { noExternal: ["react-helmet-async"] },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
