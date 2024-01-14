const rules = require("./webpack.rules");
const path = require("path");
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      constants: path.resolve(__dirname, "src/shared/constants.js"),
      hooks: path.resolve(__dirname, "src/hooks/"),
      gameUtils: path.resolve(__dirname, "src/utils/game.js"),
      arrayUtils: path.resolve(__dirname, "src/utils/array.js"),
    },
  },
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
};
