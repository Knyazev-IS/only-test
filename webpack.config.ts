import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
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
            }),
            new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
            new ForkTsCheckerWebpackPlugin(),
            isDev && new ReactRefreshWebpackPlugin(),
        ],
        module: {
            rules: [
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
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    namedExport: false,
                                    localIdentName: '[name]__[local]--[hash:base64:8]',
                                },
                            },
                        },
                        'sass-loader',
                    ],
                },
            ],
        },
        devServer,
    };
    return config;
};
