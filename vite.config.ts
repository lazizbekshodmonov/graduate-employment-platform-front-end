import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://207.180.252.154:8080',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '/api/'),
      },
    },
  },
});
