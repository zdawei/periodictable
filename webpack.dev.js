const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode : 'development',
    devServer : {
        hot : true,
        host : '127.0.0.1',
        publicPath : '/js/dist',
        port : 80,
        proxy: {
            "/assets": "http://127.0.0.1:3000",
        },
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    },
    devtool : 'inline-source-map',
    module : {
        rules: [
            {
              test: /\.css$/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
              ],
            }
        ]
    },
    plugins : [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
});