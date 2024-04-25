// import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      //'@': fileURLToPath(new URL('./packages', import.meta.url))
      '@': path.resolve(__dirname, 'packages')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 2008
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@use "@/installer/styles/element/index.scss" as *;`,
  //     },
  //   },
  // },
  build: {
    outDir: 'dist',
    sourcemap: false,
    lib: {
      entry: './packages/index.ts',
      name: 'mttk-lowcode-engine',
      fileName: 'mttk-lowcode-engine'
    },
    rollupOptions: {
      external: [
        '@mdi/js',
        '@vueuse/core',
        'animate.css',
        'axios',
        //'bin-editor-next', can not be external
        'element-plus',
        'jsplumb',
        'mitt',
        'mttk-vue-wrap',
        'nprogress',
        'sortablejs',
        'source-map-explorer',
        'splitpanes',
        'vue',
        'vue-draggable-plus',
        'vue-i18n',
        'vue-router'
      ],
      output: {
        globals: {
          'vue-router': 'vue-router',
          axios: 'axios',
          nprogress: 'nprogress',
          'element-plus': 'element-plus',
          vue: 'vue',
          '@vueuse/core': '@vueuse/core',
          mitt: 'mitt',
          'mttk-vue-wrap': 'mttk-vue-wrap',
          'vue-draggable-plus': 'vue-draggable-plus',
          '@mdi/js': '@mdi/js',
          sortablejs: 'sortablejs',
          'vue-i18n': 'vue-i18n'
        },
        assetFileNames: 'index.css'
      }
    }
  }
})
