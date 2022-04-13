const path = require('path')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'LazyImgEntry',
      type: 'umd'
    },
    globalObject: 'globalThis',
    clean: true
  },
  mode: 'production',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}