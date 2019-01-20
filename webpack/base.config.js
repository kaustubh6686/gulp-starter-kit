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
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('cssnano')(),
                require('autoprefixer'),
              ]
            }
          },
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        loaders: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('cssnano')(),
              ]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(cur|ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'vendor/[name].[ext]'
          }
        }
      },
    ]
  }
}