// Plugins
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
// import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import tailwindcss from '@tailwindcss/vite'

// Utilities
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    configureWebpack: {
      externals: {
        ace: 'ace',
      },
    },

    plugins: [
      Vue(),
      tailwindcss(),
      VueRouter({
        dts: 'src/typed-router.d.ts',
      }),
      // vueDevTools(),
      AutoImport({
        imports: [
          'vue',
          {
            'vue-router/auto': ['useRoute', 'useRouter'],
          },
        ],
        dts: 'src/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
        },
        vueTemplate: true,
      }),

      Components({
        dts: 'src/components.d.ts',
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

      // Отключаем некоторые оптимизации которые требуют Rollup
      minify: 'esbuild',
      rollupOptions: {
        // Упрощенные настройки
      },
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
