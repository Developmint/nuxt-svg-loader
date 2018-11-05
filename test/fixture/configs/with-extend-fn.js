const { resolve } = require('path')
const consola = require('consola')

module.exports = {
  rootDir: resolve(__dirname, '../../../'),
  srcDir: resolve(__dirname, '../'),
  render: {
    resourceHints: false
  },
  modules: ['@@'],
  build: {
    filenames: {
      app: '[name].js',
      chunk: '[name].js'
    },
    extend() {
      consola.fatal('Build fn')
    }
  }
}
