module.exports = function () {
  const oldExtendFunction = this.options.build.extend

  this.options.build.extend = (config, options) => {
    const imageLoaderRule = config.module.rules.find(rule => rule.test && /svg/.test(rule.test.toString()))
    imageLoaderRule.test = /^$/
    if (oldExtendFunction) {
      oldExtendFunction(config, options)
    }
  }
}
