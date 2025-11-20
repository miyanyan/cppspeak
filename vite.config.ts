import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 设置为相对路径，适配 GitHub Pages 的子目录结构
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'esnext'
  }
})