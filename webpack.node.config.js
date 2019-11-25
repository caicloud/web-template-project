const path = require('path');
const {
  webpack: { publicPath },
} = require('./package.json');

module.exports = {
  target: 'node',
  node: {
    __dirname: false
  },
  mode: process.env.NODE_ENV,
  devtool: 'sourcemap',
  entry: {
    app: path.join(__dirname, './server/app.ts'),
  },
  output: {
    publicPath,
    filename: 'server.js',
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
              '@babel/preset-env',
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
