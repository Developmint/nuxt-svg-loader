const { resolve } = require('path')
const consola = require('consola')

module.exports = {
  dev: false,
  rootDir: resolve(__dirname, '../../../'),
  srcDir: resolve(__dirname, '../'),
  render: {
    resourceHints: false
  },
  modules: ['@@'],
  build: {
    extend() {
      consola.fatal('Build fn')
    }
  }
}
