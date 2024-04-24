const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
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
                    filename: '[name].[hash].[ext]'
                }
            }
            ,
            {
                test: /\.html$/,
                use: ['html-loader']
            },
        ]
    }
}
