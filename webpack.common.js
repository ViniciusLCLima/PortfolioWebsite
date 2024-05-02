const HtmlWebpackPlugin = require('html-webpack-plugin')
const cssFolderPath = './src/assets/css/'
const miniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: [`${cssFolderPath}main.css`,"./src/index.js"],
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
