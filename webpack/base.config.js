const path = require('path');

module.exports = {
  
  entry: {
    main: path.resolve(__dirname, "../app/scripts/main.js"),
  },
  output: {
    path: path.resolve(__dirname, "../app/js/"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader?jQuery!expose-loader?$!expose-loader?window.jQuery'
      },
      {
        test: /\.(cur|ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
    ]
  }
}