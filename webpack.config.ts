import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import { Env } from './src/common/types/Env';

export default (env: Env) => {
    const isDev = env.mode === 'development';

    const devServer: DevServerConfiguration = isDev
        ? {
              port: env.port ?? 3000,
              open: true,
              hot: true,
              historyApiFallback: true,
          }
        : undefined;

    const config: Configuration = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'main.tsx'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true,
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src', 'index.html'),
                minify: !isDev,
            }),
            new MiniCssExtractPlugin({
                filename: isDev ? '[name].css' : '[name].[contenthash].css',
                chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
            }),
            new ForkTsCheckerWebpackPlugin(),
            isDev && new ReactRefreshWebpackPlugin(),
            isDev &&
                new BundleAnalyzerPlugin({
                    analyzerMode: env.analyze ? 'server' : 'disabled',
                    openAnalyzer: env.analyze,
                }),
            !isDev &&
                new CompressionPlugin({
                    algorithm: 'gzip',
                    test: /\.(js|css|html|svg)$/,
                    threshold: 10240,
                    minRatio: 0.8,
                }),
        ].filter(Boolean),
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|svg|webp)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name][ext]',
                    },
                },
                {
                    test: /\.(ts|tsx)$/i,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name][ext]',
                    },
                },
                {
                    test: /\.css$/i,
                    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    namedExport: false,
                                    localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64]',
                                },
                            },
                        },
                        'sass-loader',
                    ],
                },
            ],
        },
        optimization: {
            minimize: !isDev,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        format: {
                            comments: false,
                        },
                    },
                    extractComments: false,
                }),
                new CssMinimizerPlugin(),
            ],
            splitChunks: {
                chunks: 'all',
            },
        },
        devtool: isDev ? 'eval-source-map' : 'source-map',
        devServer,
    };
    return config;
};
