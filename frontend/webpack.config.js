const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js', // string
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 8080,
    open: true,
  },
  resolve: {
    alias: {
      '@contracts': path.resolve(__dirname, '../../build/contracts/DeedMultipayout.json')
    }
  }
};
