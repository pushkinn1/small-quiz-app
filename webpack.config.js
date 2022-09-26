const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
const isDevelopment = !env.mode == 'production'
return ({
    entry: "./src/index.tsx",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                type: 'asset/resource',
            }
        ]
    },
    mode: isDevelopment ? 'development' : 'production',
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9002
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            publicPath: '/',
            inject: 'body'
        }),
    ]
})
}
