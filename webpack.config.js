const path = require('path')

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
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
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000
    },
    mode: 'development',
}