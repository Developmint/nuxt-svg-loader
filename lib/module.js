const logger = require('consola').withScope('nuxt-svg-loader')

export default function nuxtSvgLoader() {
  const { svgLoader: options } = this.options

  if (options && options.svgo && !options.svgoConfig) {
    options.svgoConfig = options.svgo
  }

  const fileName = this.nuxt.options.build.filenames.img(this.nuxt.options.dev)

  this.extendBuild(setupVueSvgLoader(options, fileName))
}

const svgRulePredicate = rule => rule.test && rule.test.test('.svg')

const setupVueSvgLoader = (options, fileName) => (config) => {
  // https://github.com/egoist/svg-to-vue-component#nuxtjs-2
  const imageLoaderRule = config.module.rules.find(svgRulePredicate)

  if (!imageLoaderRule) {
    logger.error('Could not modify image loader rule!')
    return
  }

  // Don't process .svg files in default image rule
  // from https://github.com/nuxt/nuxt.js/blob/76b10d2d3f4e5352f1c9d14c52008f234e66d7d5/lib/builder/webpack/base.js#L203
  imageLoaderRule.test = /\.(png|jpe?g|gif|webp)$/

  // Add a new rule for .svg file
  config.module.rules.push({
    test: /\.svg$/,
    oneOf: [
      {
        resourceQuery: /inline/,
        loader: 'file-loader',
        query: {
          name: fileName
        }
      },
      {
        use: [
          'vue-loader',
          {
            loader: 'svg-to-vue-component/loader',
            options
          }
        ]
      }
    ]
  })
}

module.exports.meta = require('../package.json')
