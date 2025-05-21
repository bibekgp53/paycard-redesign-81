
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import federation from "@originjs/vite-plugin-federation";

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
      name: 'paycard-app',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/remoteEntry.tsx',
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query']
    }),
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
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      output: {
        format: 'esm',
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
      },
      external: ['react', 'react-dom']
    }
  }
}));
