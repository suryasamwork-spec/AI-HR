import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.MOV'],
  server: {
    port: 3000,
    host: true,
    allowedHosts: 'all',
    hmr: {
      overlay: false
    }
  }
})
