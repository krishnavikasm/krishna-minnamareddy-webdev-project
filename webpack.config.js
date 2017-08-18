var path = require("path");

var config = {
  entry: [path.join(__dirname,"src/index.js")],
  output: {
    path: path.join(__dirname,"public/build"),
    publicPath: "/build/",
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".js",".jsx"],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  devServer: {
    inline: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        include: /src/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015","stage-2","react"]
          }
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash].[ext]',
        },
      },
    ]
  }
}

module.exports = config;
