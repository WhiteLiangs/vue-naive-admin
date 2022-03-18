import vue from '@vitejs/plugin-vue'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite' // iconify图标
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

import { unocss } from './unocss'
import { configHtmlPlugin } from './html'
import { configMockPlugin } from './mock'

export function createVitePlugins(viteEnv, isBuild) {
  const plugins = [
    vue(),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
      resolvers: [NaiveUiResolver(), IconsResolver({ componentPrefix: 'icon' })],
    }),
    Components({
      resolvers: [NaiveUiResolver(), VueUseComponentsResolver(), IconsResolver({ componentPrefix: 'icon' })],
    }),
    // Icons({ scale: 1, defaultClass: 'inline-block' }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[dir]-[name]',
    }),
    VueSetupExtend(),
    unocss(),
    configHtmlPlugin(viteEnv, isBuild),
  ]

  viteEnv?.VITE_APP_USE_MOCK && plugins.push(configMockPlugin(isBuild))

  return plugins
}
