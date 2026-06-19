import { defineConfig } from 'vite'

export default defineConfig({
  root: 'source',
  publicDir: 'assets/images',
  build: {
    outDir: '../build',
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      styl: {
        compress: false,
      },
    },
  },
})
