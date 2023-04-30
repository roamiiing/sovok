import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    tsconfigPaths({
      root: resolve(__dirname, './'),
      projects: [resolve(__dirname, './tsconfig.json')],
      loose: true,
    }),
  ],
})
