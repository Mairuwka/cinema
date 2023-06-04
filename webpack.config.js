const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './frontend/js/app.js',
        "order-ticket": './frontend/modules/order-ticket/index.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './frontend/index.html',
            filename: "index.html",
            inject: true,
            templateParameters: {
                testContent: "<h1>Hello!</h1>"
            }
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            }
        ]
    }
}