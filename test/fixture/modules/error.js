module.exports = function () {
  this.extendBuild((config, options) => {
    const imageLoaderRule = config.module.rules.find(rule => rule.test && /svg/.test(rule.test.toString()))
    imageLoaderRule.test = /^$/
  })
}
