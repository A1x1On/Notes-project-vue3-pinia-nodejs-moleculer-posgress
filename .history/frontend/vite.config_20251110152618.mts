// Plugins
import Vue from '@vitejs/plugin-vue'

// Utilities
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    configureWebpack: {
    },

    plugins: [
      Vue({
        template: { transformAssetUrls },
      }),
    ],

    define: { 'process.env': {} },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },

    devServer: {
      hot: true,
    },
    server: {
      port: Number(env.VITE_BACKEND_PORT),
      proxy: {
        [env.VITE_BACKEND_ENDPOINT]: {
          target: env.VITE_BACKEND,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(new RegExp(`^\\${env.VITE_BACKEND_ENDPOINT}`), ''),
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 1600,
    },
    css: {
      preprocessorOptions: {
        sass: {
          api: 'modern-compiler',
        },
      },
    },
  }
})
