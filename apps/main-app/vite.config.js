import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.MOV'],
  server: {
    port: 3000,
    host: true,
    allowedHosts: 'all',
    proxy: {
      '/rims': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        ws: true
      }
    },
    hmr: {
      host: 'localhost',
      overlay: false
    }
  }
})
