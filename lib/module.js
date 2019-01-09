const logger = require('consola').withScope('nuxt-svg-loader')

export default function nuxtSvgLoader() {
  const { svgLoader: options } = this.options
  this.extendBuild(setupVueSvgLoader(options))
}

const setupVueSvgLoader = options => (config) => {
  // https://github.com/egoist/svg-to-vue-component#nuxtjs-2
  const svgRulePredicate = rule => rule.test && rule.test.test('.svg')
  const imageLoaderRule = config.module.rules.find(svgRulePredicate)

  if (!imageLoaderRule) {
    logger.error('Could not modify image loader rule!')
    return
  }

  // Don't process .svg files in default image rule
  // from https://github.com/nuxt/nuxt.js/blob/76b10d2d3f4e5352f1c9d14c52008f234e66d7d5/lib/builder/webpack/base.js#L203
  imageLoaderRule.test = /\.(png|jpe?g|gif|webp)$/

  // Override svg-to-vue-component default options for prefixing ids
  const svgoConfig = Object.assign({}, {
    plugins: [{ prefixIds: false }]
  }, options && options.svgo)

  // Add a new rule for .svg file
  config.module.rules.push({
    test: /\.svg$/,
    use: [
      'vue-loader',
      {
        loader: 'svg-to-vue-component/loader',
        options: { svgoConfig }
      }
    ]
  })
}

module.exports.meta = require('../package.json')
