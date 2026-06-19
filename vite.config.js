import { defineConfig } from 'vite'

export default defineConfig({
  root: 'source',
  publicDir: 'assets/images',
  build: {
    outDir: '../build',
    emptyOutDir: true,
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
  css: {
    preprocessorOptions: {
      styl: {
        compress: false,
      },
    },
  },
})
