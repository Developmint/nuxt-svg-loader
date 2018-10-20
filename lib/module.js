const logger = require('consola').withScope('nuxt-svg-loader')

export default function nuxtSvgLoader() {
  this.extendBuild(setupVueSvgLoader)
}

const setupVueSvgLoader = (config) => {
  const imageLoaderRule = config.module.rules.find(rule => rule.test && /svg/.test(rule.test.toString()))

  if (!imageLoaderRule) {
    logger.error('Could not modify image loader rule!')
    return
  }
  // from https://github.com/nuxt/nuxt.js/blob/76b10d2d3f4e5352f1c9d14c52008f234e66d7d5/lib/builder/webpack/base.js#L203
  imageLoaderRule.test = /\.(png|jpe?g|gif|webp)$/

  config.module.rules.push({
    test: /\.svg$/,
    loader: 'vue-svg-loader'
  })
}

module.exports.meta = require('../package.json')
