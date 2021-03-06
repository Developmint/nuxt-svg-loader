const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../../../'),
  srcDir: resolve(__dirname, '../'),
  render: {
    resourceHints: false
  },
  modules: ['@@', '@/modules/error'],
  build: {
    quiet: false,
    filenames: {
      app: '[name].js',
      chunk: '[name].js'
    }
  }
}
