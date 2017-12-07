const webpack = require("webpack");
const path = require('path');
const config = {
  entry: path.join(__dirname, 'src/main/frontend/application.ts'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'src/main/resources/static/dist'),
    publicPath: '/dist',
  },
  module: {
    rules: [{
        test: /\.(woff2?|woff|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(?:ttf|eot|svg|woff|woff2)(?:\?v=[0-9]+\.[0-9]+\.[0-9]+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'components': path.join(__dirname, 'src/main/frontend/components'),
      'http': path.join(__dirname, 'src/main/frontend/http'),
      'enums': path.join(__dirname, 'src/main/frontend/enums'),
      'store': path.join(__dirname, 'src/main/frontend/store')
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src/main/resources/static'),
    port: 3000
  },
};


module.exports = config;

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
} else if (process.env.NODE_ENV === 'api-mock') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"api-mock"'
      }
    }),
  ]
  module.exports.devtool = '#source-map'
} else {
  module.exports.devtool = '#source-map'
}