import vue from '@vitejs/plugin-vue'

/** @type {import('vite').UserConfig} */
export default {
  plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },
}
