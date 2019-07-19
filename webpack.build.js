const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // entry: './main.js',
  // entry: ['./main.js', './index.js'],
  entry: {
    main: './main.js',
    index: './index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: '测试',
      template: 'index.html',
      filename: 'index.html',
      chunks: ['main', 'index'],
      inject: 'body'
    })
  ]
}
