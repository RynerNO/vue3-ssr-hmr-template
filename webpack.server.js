
const { merge } = require('webpack-merge');
const common = require('./webpack.config')
const WebpackNodeExternals = require('webpack-node-externals')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const dotenv = require('dotenv')
dotenv.config()
const path = require('path')
const config = {
    target: 'es2017',
    entry: {
        app: './src/server-entry.ts'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/server.bundle.js",
        publicPath: "/",
        libraryTarget: "commonjs2"
    },
    externals: WebpackNodeExternals({
        allowlist: /\.(css|vue)([\?]?.*)$/
    }),
    optimization: {
        splitChunks: false,
        minimize: false
    },
    plugins: [
        new WebpackManifestPlugin({
            fileName: "ssr-manifest.json"
        }),
        
    ]
}

module.exports = () => {
    return merge([
        common,
        config
    ])
}
