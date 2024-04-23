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
                test: /\.(jpg|gif|png|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'imgs/[name].[hash].[ext]'
                }
            },
            {
                test: /\.html$/,
                type: 'asset/resource',
                generator: {
                    filename: '[name].[hash].[ext]'
                }
            },
            {
                test: /\.js$/,
                type: 'asset/resource',
                generator: {
                    filename: 'js/[name].[hash].[ext]'
                }
            }
        ]
    }
}
