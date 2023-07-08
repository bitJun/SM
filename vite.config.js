import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import path from "path";
import pxtovw from 'postcss-px-to-viewport';
const loder_pxtovw = pxtovw({
  viewportWidth: 750,
  viewportUnit: 'vw'
})

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [loder_pxtovw]
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8888,
    proxy: {
      "/api": {
        target: "https://apipro.youzhi.club/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
