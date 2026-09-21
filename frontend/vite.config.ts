import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const codespaces = Boolean(process.env.CODESPACES || process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN);

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: true,
    // GitHub Codespaces terminates TLS on 443; HMR must speak wss there.
    hmr: codespaces ? { clientPort: 443, protocol: "wss" } : true,
    proxy: {
      "/api": { target: "http://127.0.0.1:8765", changeOrigin: true },
      "/ws": { target: "ws://127.0.0.1:8765", ws: true },
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: true,
  },
});
