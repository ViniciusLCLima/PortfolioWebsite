const {merge} = require('webpack-merge')
const path = require("path")
const commonConfig = require('./webpack.common.js')

module.exports = merge(commonConfig, {
    mode: "production",
    output:{
        filename: "main.[contenthash].js",
        path: path.resolve(__dirname, "build")
    },
})
