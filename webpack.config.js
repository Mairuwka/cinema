const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const PugPlugin = require('pug-plugin');

module.exports = {
    watch: true,
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
            template: './frontend/index.pug'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: PugPlugin.loader
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            }
        ]
    },
    devServer: {
        port: 8000,
        open: true,
        hot: true,
    },
}