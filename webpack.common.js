const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry : {
        app : './static/js/src/index.js',
    },
    output : {
        filename : '[name].js',
        path : path.resolve(__dirname, './static/js/dist')
    },
    module : {
        rules : [
            {
                test : /\.vue$/,
                loader : 'vue-loader'
            },
            {
                test: /\.(ttf|woff|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }

        ]
    },
    plugins : [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': path.resolve(__dirname, './static/js/src'),
        }
    }
};