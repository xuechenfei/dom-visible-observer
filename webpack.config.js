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
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
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
