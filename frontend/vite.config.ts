import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const proxied = Boolean(
  process.env.CODESPACES ||
    process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN ||
    process.env.E2B_SANDBOX_ID ||
    (process.env.HOSTNAME || "").includes("e2b")
);

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    // TLS reverse proxies (Codespaces, Arena/e2b) terminate on 443.
    // Keep HMR off the /ws path so the lab socket can be proxied.
    hmr: proxied
      ? { protocol: "wss", clientPort: 443, path: "/__vite_hmr" }
      : { path: "/__vite_hmr" },
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8765",
        changeOrigin: true,
      },
      "/ws": {
        target: "http://127.0.0.1:8765",
        ws: true,
        changeOrigin: true,
      },
    },
    watch: {
      usePolling: Boolean(process.env.CODESPACES),
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: true,
  },
});
