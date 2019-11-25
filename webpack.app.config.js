const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [{
  devServer: {
    contentBase: false,
    hot: true,
    host: 'localhost',
    historyApiFallback: true,
  },
  devtool: 'sourcemap',
  entry: {
    main: path.join(__dirname, './client/app.jsx'),
  },
  output: {
    filename: `[name].js`,
    chunkFilename: `[id]~[chunkhash].js`,
  },
  module: {
    rules: [
      {
        test: /\.js|jsx|ts|tsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/typescript',
              '@babel/preset-react',
              '@babel/preset-env',
            ],
          },
        },
      },
      {
        test: /\.m\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin(path.join(__dirname, 'dist')),
  ],
}, ...(process.env.NODE_ENV === 'production' ? [require('./webpack.node.config')] : [])];
