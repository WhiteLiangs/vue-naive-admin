import { defineConfig, loadEnv } from 'vite'
import path from 'path'

import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'
import { createProxy } from './build/vite/proxy'
import { OUTPUT_DIR } from './build/constant'

export default defineConfig(({ command, mode }) => {
  const root = process.cwd()
  const isBuild = command === 'build'

  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv

  return {
    root,
    base: VITE_PUBLIC_PATH || '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    css: {
      preprocessorOptions: {
        //define global scss variable
        scss: {
          additionalData: `@import '@/styles/variables.scss';`,
        },
      },
    },
    server: {
      host: true, // host设置为true才可以使用network的形式，以ip访问项目
      open: true, // 自动打开浏览器
      cors: true, // 跨域设置允许
      strictPort: true, // 如果端口已占用直接退出
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    build: {
      target: 'es2015',
      outDir: OUTPUT_DIR,
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
  }
})
