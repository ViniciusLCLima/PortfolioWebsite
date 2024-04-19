const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require("path")

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    devtool: false,
    output:{
        filename: "main.[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader, css-loader']
            }
        ]
    },

    plugins: [new HtmlWebpackPlugin({
        template: "./src/template.html"
    })]
}
