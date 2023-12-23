const rules = require('./webpack.rules');
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")


rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  }
  // plugins: [
  //   new NodePolyfillPlugin()
  // ]
  // resolve: {
  //   fallback: {
  //     "fs": false,
  //     "tls": false,
  //     "net": false,
  //     "path": false
  //   }

  // }
}
