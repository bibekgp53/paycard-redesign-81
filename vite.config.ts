
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
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
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared-ui": path.resolve(__dirname, "./src/libs/shared-ui"),
      "@shared-components": path.resolve(__dirname, "./src/libs/shared-ui/components/shared"),
    },
  },
  optimizeDeps: {
    include: ['graphql']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      // Make sure graphql is properly bundled
      external: ['react', 'react-dom']
    }
  }
}));
