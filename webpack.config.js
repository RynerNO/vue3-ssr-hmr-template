// webpack config
const WebpackBar = require('webpackbar');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { VueLoaderPlugin } = require('vue-loader');
const { merge } = require('webpack-merge');
const dotenv = require('dotenv')
dotenv.config()


let config = {
  mode: (process.env.PRODUCTION) ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: { babelrc: true }
          },
          {
            loader: "ts-loader",
            options: { appendTsSuffixTo: [/\.vue$/] }
          }
        ]
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          }
        ]
      },
      {
        test: /\.sass$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1} },
          { loader: 'postcss-loader'}
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|jpg|png|svg)([\?]?.*)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[hash].[ext]',
          }
      },
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue': '@vue/runtime-dom'
    }
  },
  plugins: [
  
    new WebpackBar(),
    new VueLoaderPlugin()
  ]
};


if(!process.env.PRODUCTION) {
  config = merge(config, {
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
      })
    ]
  })
} else {
  config = merge(config, {
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].[fullhash:8].css",
      })
    ]
  })
}
module.exports = config;  