const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.sass$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|gif)$/i,
                use: 'file-loader'
            },
            {
                test: /\.otf$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Weather',
            template: 'index.html'
        })
    ]
}