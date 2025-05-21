import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation"
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    federation({
      name: "lovable",
      filename: "remoteEntry.js",
      exposes: {
        "./PayCard": "./src/App.tsx"
      },
      shared: ["react", "react-dom", "@apollo/client", "@auth0/auth0-react"]
    }),
  ].filter(Boolean),
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
