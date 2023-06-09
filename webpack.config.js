const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const PugPlugin = require('pug-plugin');

module.exports = {
    watch: true,
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './frontend/js/app.js',
        "order-ticket": './frontend/modules/order-ticket/index.js',
        index: './frontend/index.pug'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new PugPlugin({
            pretty: true, // enable formatting of HTML
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