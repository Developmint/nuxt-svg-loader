const { resolve } = require('path')

module.exports = {
  dev: false,
  rootDir: resolve(__dirname, '../../../'),
  srcDir: resolve(__dirname, '../'),
  render: {
    resourceHints: false
  },
  modules: ['@@', '@/modules/error'],
}
