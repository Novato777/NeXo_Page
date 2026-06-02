import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 700, // three.js es grande a propósito (chunk aparte/diferido)
    rollupOptions: {
      output: {
        // Separa librerías pesadas en chunks propios (mejor caché y carga)
        manualChunks: {
          three: ["three", "postprocessing"],
          gsap: ["gsap"],
          vendor: ["react", "react-dom", "lenis"],
        },
      },
    },
  },
})
