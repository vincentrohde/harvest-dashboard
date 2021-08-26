const webpack = require("webpack");
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        host: 'localhost',
        port: 3000,
        proxy: {
            '/api/**': {
                target: 'http://localhost:8080/',
                pathRewrite: { '^/api': '' },
                secure: false,
                changeOrigin: true,
            }
        }
    },
    devtool: 'cheap-module-source-map',

    entry: {
        main: './src/index.tsx',
        vendor: ['semantic-ui-react'],
    },

    output:{
        path: path.join(__dirname, './dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.scss'],
        alias: {
            "@services": path.resolve(__dirname, './src/lib/'),
            "@components": path.resolve(__dirname, './src/components/'),
            "@hooks": path.resolve(__dirname, './src/hooks/'),
            "@types": path.resolve(__dirname, './src/types/')
        },
    },

    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/i,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader", options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                    },
                },
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin('styles.css')
    ]
};
