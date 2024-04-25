const HtmlWebpackPlugin = require('html-webpack-plugin')
const cssFolderPath = './src/assets/css/'

module.exports = {
    entry: ["./src/index.js",`${cssFolderPath}fontawesome-all.min.css`,`${cssFolderPath}noscript.css`],
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: "src/template.html",
            }
            )
        ],
    module:{
        rules:[
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
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
