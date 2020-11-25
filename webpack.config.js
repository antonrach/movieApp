const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimize = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        }
    }

    if(isProd) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
        ]
    }
    return config
}
if (module.hot) {
    module.hot.accept();
}

const cssLoader = () => {
    if(isProd) {
        return MiniCssExtractPlugin.loader
    }
    else {
        return 'style-loader'
    }
}

const serverLoad = () => {
    if(isProd) {
        return ['@babel/polyfill', './index.js']
    } else {
        return ["webpack/hot/dev-server",'webpack-dev-server/client?http://localhost:4200/', '@babel/polyfill', './index.js']
    }
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    devtool: 'inline-source-map',
    mode: 'development',
    entry: {
        main: serverLoad(),
    },
    output: {
        filename: './scripts/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: optimize(),
    devServer: {
        open: true,
        port: 4200, 
        disableHostCheck: true,
        publicPath: 'http://localhost:4200/',
        hot: true
    },
    plugins: [
        new HTMLWebpackPlugin({template: 'index.html', filename: 'index.html'}),
        new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist/*')], cleanStaleWebpackAssets: false}),
        /*new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/img'),
                    to: path.resolve(__dirname, 'dist/img'),
                }
            ]
        }),*/
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: [cssLoader(), {loader: 'css-loader', options: {sourceMap: true,}}, 'postcss-loader'],
            }, {
                test: /\.scss$/,
                use: [cssLoader(), {loader: 'css-loader', options: {sourceMap: true,}}, 'postcss-loader', 'sass-loader'],
            }, {
                test: /\.(png|jpg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './img/',
                        publicPath: './img/',
                    },
                }
            }, {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            }, {
                test: /\.ttf$/,
                loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './fonts/',
                        publicPath: './fonts/',
                    },
            },
        ],
    }
}