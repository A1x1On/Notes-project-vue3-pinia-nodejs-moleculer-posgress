module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],

  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },

  plugins: ['vue', '@typescript-eslint', 'optimize-regex'],

  rules: {
    /* Нельзя писать неиспользуемые переменные, только если они находятся в параметрах */
    '@typescript-eslint/no-unused-vars': ['error', { args: 'after-used' }],

    /* Отключаем превращения интерфейса в типы */
    '@typescript-eslint/no-empty-interface': 'off',

    /* Отключаем проверку на пустые функции, иногда нужно для заглушек */
    '@typescript-eslint/no-empty-function': 'off',

    /* v-html нужен */
    'vue/no-v-html': 'off',
    /* Нельзя использовать v-for без key */
    'vue/require-v-for-key': 'error',
    /* Нельзя использовать v-if на элементах с v-for */
    'vue/no-use-v-if-with-v-for': 'error',

    /* Ошибка везде где ++ или -- , кроме for */
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    /* Нельзя переопределять входные параметры */
    'no-param-reassign': 'error',
    /* Нельзя оставлять неиспользуемые выражения */
    'no-unused-expressions': 'error',
    /* Проверка на ненужные else-if */
    'no-dupe-else-if': 'error',
    /* Чтобы можно было работать с битовыми операциями (например преобразования HEX в RGB) */
    'no-bitwise': 'off',
    /* Сеттеры свойств не должны возвращать значения, для этого геттеры есть */
    'no-setter-return': 'error',
    /* отключено правило реджекта только для ошибок в промисах */
    'prefer-promise-reject-errors': 'off',
    /* Чтобы можно было ничего не возвращать в async функции */
    'consistent-return': 'off',
    /* Чтобы можно было писать анонимные функции, иногда нужно */
    'func-names': 'off',

    /* Оптимизация регулярных выражений. */
    'optimize-regex/optimize-regex': 'error',
  },
}
