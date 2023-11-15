import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     '/front': {
  //       // http://39.97.218.60/front/ad/getAdList
  //       target: loadEnv('', process.cwd()).VITE_API_URL,
  //       changeOrigin: true
  //     },
  //     '/boss': {
  //       // http://39.97.218.60/boss/ad/getAdList
  //       target: loadEnv('', process.cwd()).VITE_API_URL,
  //       changeOrigin: true
  //     }
  //   }
  // },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
      resolvers: [ElementPlusResolver(), IconResolver()],
      eslintrc: { enabled: true }
    }),
    Components({
      resolvers: [IconResolver({ enabledCollections: ['ep'] }), ElementPlusResolver()]
    }),
    Icons({ autoInstall: true })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
