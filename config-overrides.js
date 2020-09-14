const { override, addWebpackAlias, useBabelRc } = require('customize-cra')
const path = require('path')

const resolve = dir => path.join(__dirname, '.', dir)

module.exports = override(
  useBabelRc(),
  addWebpackAlias({
    '@': resolve('src'),
    config: resolve('config')
  })
)
