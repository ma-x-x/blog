module.exports = {
  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
  ],

  rules: {
    // override/add rules settings here, such as:
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/singleline-html-element-content-newline': 'off',
  },
};
