import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';



// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  build: {
    rollupOptions: {
      input: {
        dashboard: resolve(__dirname, 'dashboard.html')
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', 
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
})