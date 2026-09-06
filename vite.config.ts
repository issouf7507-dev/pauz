import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Le site appelle l'API en même origine pendant le dev : pas de CORS à
    // régler, et `/api` suit la même URL qu'en production derrière le proxy.
    proxy: {
      '/api': { target: 'http://localhost:4000', changeOrigin: true },
    },
  },
})
