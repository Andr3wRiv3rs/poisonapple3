const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.pug'
    }),

    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          to: '', 
        },
      ],
    }),
  ],

  module: {
    rules: [
      { 
        test: /\.pug$/i,
        use: ['pug-loader']
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [
          // 'raw-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|webp|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: 'raw-loader',
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'config': path.resolve(__dirname, 'config.js'),
      'scss': path.resolve(__dirname, 'src', 'sass'),
      'assets': path.resolve(__dirname, 'src', 'assets'),
      'icons': path.resolve(__dirname, 'src', 'assets', 'icons'),
      '~': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js'],
  },
  
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].bundle.js",
    chunkFilename: '[name].bundle.js',
  },

  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : 'none',

  devServer: {
    port: 3000,
    host: '0.0.0.0',
  }
})
