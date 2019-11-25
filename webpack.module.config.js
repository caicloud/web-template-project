const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {
  ModulePlugin,
  ExternalsPlugin,
} = require('@caicloud/modularize/webpack');
const {
  m12n: { moduleName, port },
  webpack: { publicPath },
} = require('./package.json');

module.exports = [{
  devServer: {
    contentBase: false,
    hot: true,
    port,
    host: 'localhost',
    public: `localhost:${port}`,
    historyApiFallback: {
      // 在 webpack dev server 下模拟 module-manifest.html 接口
      rewrites: [
        {
          from: /module-manifest\.html/,
          to: path.join(publicPath, 'module-manifest.html'),
        },
      ],
    },
  },
  devtool: 'sourcemap',
  entry: {
    [moduleName]: path.join(__dirname, './client/index.js'),
  },
  output: {
    publicPath,
    filename: `${moduleName}~[name].js`,
    chunkFilename: `${moduleName}~[id]~[chunkhash].js`,
    jsonpFunction: `webpackJsonp_${moduleName}`,
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
    new CleanWebpackPlugin(path.join(__dirname, 'dist')),
    new ModulePlugin({ moduleName, register: false }),
    new ExternalsPlugin(),
  ],
}, ...(process.env.NODE_ENV === 'production' ? [require('./webpack.node.config')] : [])];
