const HtmlWebpackPlugin = require('html-webpack-plugin')
const cssFolderPath = './src/assets/css/'
const jsFolderPath = './src/assets/js/'
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
    entry: [
        `${cssFolderPath}main.css`,
        'jquery',
        `${jsFolderPath}main.js`,
        "./src/index.js"
    ],

    plugins: [
        new HtmlWebpackPlugin(
            {
                template: "src/template.html",
                inject: "body",
                scriptLoading: "blocking"
            }
            )
        , new miniCssExtractPlugin()],
    module:{
        rules:[
            {
                test: require.resolve('jquery'),
                loader: "expose-loader",
                options: {
                    exposes: ["$", "jQuery"]
                }
                
            },
            {
                test: /\.css$/,
                use: [miniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpg)$/,
                type: "asset/resource",
                generator: {
                    filename: 'imgs/[name].[hash][ext]'
                }
            },
            ,
            {
                test: /\.html$/,
                use: ['html-loader']
            },
        ]
    }
}
