const { override, addWebpackAlias, useBabelRc, useEslintRc } = require('customize-cra')
const path = require('path')

const resolve = dir => path.join(__dirname, '.', dir)

module.exports = override(
  useBabelRc(),
  useEslintRc(),
  addWebpackAlias({
    '@': resolve('src'),
    config: resolve('config')
  })
)
