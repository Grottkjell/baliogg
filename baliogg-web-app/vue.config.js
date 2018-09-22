const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    filenameHashing: false,
    outputDir: __dirname + '/build',
    configureWebpack: {
        devServer: {
            contentBase: path.join(__dirname, "build"),
            compress: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                url: "./build/assets/",
                title: "Baliogg",
                template: "index.html"
            })
        ]
    }
}