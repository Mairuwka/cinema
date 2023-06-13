const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const PugPlugin = require('pug-plugin');
const webpack = require('webpack')

module.exports = {
    watch: true,
    context: path.resolve(__dirname, 'src'),
    target: 'web',
    mode: 'development',
    entry: {
        main: './frontend/js/app.js',
        "order-ticket": './frontend/modules/order-ticket/index.js',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './frontend/index.pug'
        }),
        new HTMLWebpackPlugin({
            template: './frontend/modules/order-ticket/ui/order-ticket.pug',
            filename: "order-ticket.html"
        }),
        new CleanWebpackPlugin(),
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
        port: 9000,
        hot: true,
        open: true,
        static: {
            directory: path.join(__dirname, './'),
        },
    },
}