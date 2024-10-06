import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000', // Using IPv4 to avoid the "::1" (IPv6) issue
        changeOrigin: true,  // This helps in some cases where the backend server requires it
        secure: false,       // In case you're working with HTTPS locally (not needed for HTTP)
      },
    },
  },
})
