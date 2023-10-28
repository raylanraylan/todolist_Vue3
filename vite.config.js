import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  base: "/todolist_Vue3/", 
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:`
        @import "@/assets/style/base/_color.scss";
        @import "@/assets/style/base/_font.scss";
        @import "@/assets/style/utils/_breakpoint.scss";
        @import "@/assets/style/utils/_fonts.scss";
        `
      }
    }
  }
})
