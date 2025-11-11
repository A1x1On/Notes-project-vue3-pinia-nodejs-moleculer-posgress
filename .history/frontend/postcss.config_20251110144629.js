// postcss.config.js (с использованием import/export, если у вас поддержка ESM)
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [tailwindcss(), autoprefixer()],
}
