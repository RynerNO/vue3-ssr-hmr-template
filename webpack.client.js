const { merge } = require('webpack-merge');
const common = require('./webpack.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')
dotenv.config()

const path = require('path')
let config = {
    entry: {
        app: './src/client-entry.ts'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/client.[fullhash:8].js",
        publicPath: "/",
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/static/index.html',
          filename: "static/index.html",
          inject: 'body'
        }),
        new FaviconsWebpackPlugin('./src/static/favicon.ico')
    ]
}

if(!process.env.PRODUCTION) {
    config = merge(config, {
        output: {
            filename: "js/client.bundle.js",
        },
        plugins: [  
            new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['!ssr-manifest.json', '!assets', '!assets/*', '!index.html', '!js', '!js/*', '*.js'],
            cleanOnceBeforeBuildPatterns: ['**/*', '*', '!ssr-manifest.json', '!index.html', '!js', '!js/*'],
        }),
        new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            writeToDisk: true,
            contentBase: path.resolve(__dirname, 'dist'),
            publicPath: 'http://localhost:9999/dist/',
            hot: true,
            inline: true,
            historyApiFallback: true,
            port: 9999,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          },
    })
}

module.exports = () => {
    return merge([
        common,
        config
    ])
}