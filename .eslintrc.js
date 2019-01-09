module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: [
    '@nuxtjs'
  ],
  rules: {
    'vue/attribute-hyphenation': ['error', 'always', {
      ignore: ['viewBox']
    }]
  }
}
