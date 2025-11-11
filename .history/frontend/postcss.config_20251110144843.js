// postcss.config.js
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import tailwindcssPostCSS from '@tailwindcss/postcss'

export default {
  plugins: [tailwindcssPostCSS(), autoprefixer()],
}
