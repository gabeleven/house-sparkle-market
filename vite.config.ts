
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import ssr from "vite-plugin-ssr/plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    ssr({
      prerender: true, // Re-enabled after fixing localStorage SSR issues
      includeAssetsImportedByServer: true
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      // Remove manual chunks for SSR compatibility
      output: mode === 'production' ? {
        manualChunks: undefined
      } : undefined
    }
  },
  // Remove SSR externalization that conflicts with vite-plugin-ssr
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  // Ensure proper resolution for SSR
  ssr: {
    noExternal: ['@radix-ui/*']
  }
}));
