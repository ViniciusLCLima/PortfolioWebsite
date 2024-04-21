const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const path = require("path")

module.exports = merge(commonConfig, {
    mode: "development",
    output:{
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
})
