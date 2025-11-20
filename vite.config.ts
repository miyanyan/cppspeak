import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 设置为相对路径，适配 GitHub Pages 的子目录结构
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'esnext',
    emptyOutDir: true,
    rollupOptions: {
      // 显式指定入口文件，确保 Vite 正确解析 index.html
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  }
})