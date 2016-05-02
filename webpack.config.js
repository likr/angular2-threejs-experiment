/* eslint-env node */

var path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'src'),
        loader: 'ts-loader',
      },
    ],
  },
  entry: {
    bundle: './src/main.ts',
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['', '.ts'],
  },
}
