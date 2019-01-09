module.exports = function () {
  const svgRulePredicate = rule => rule.test && rule.test.test('.svg')
  this.extendBuild((config) => {
    const imageLoaderRule = config.module.rules.find(svgRulePredicate)
    imageLoaderRule.test = /^$/
  })
}
