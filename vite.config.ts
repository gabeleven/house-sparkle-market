
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { PrerenderPlugin } from "vite-plugin-prerender";

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
    mode === 'production' && PrerenderPlugin({
      routes: [
        '/',
        '/browse-services',
        '/browse-cleaners',
        '/pricing',
        '/how-it-works',
        '/comment-ca-marche',
        '/support',
        '/auth',
        '/roadmap'
      ],
      rendererOptions: {
        renderAfterTime: 2000
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-accordion', '@radix-ui/react-dialog']
        }
      }
    }
  }
}));
