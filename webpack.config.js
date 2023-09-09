/* eslint-disable */
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCss = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    devServer: {
        historyApiFallback: true,
        // connecting to backend
        proxy: {
            "/api/*": {
                target: "http://localhost:80",
            }
        }
    },
    output: {
        path: path.join(__dirname, "dist")
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: [".tsx", ".ts", ".js", ".jsx"]
                },
                use: "ts-loader"
            },
            {
                test: /\.css$/,
                use: [MiniCss.loader, "css-loader"]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    }
                }
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new ESLintPlugin({
            extensions: ["tsx", "ts"],
        }),
        new HtmlPlugin({
            template: path.join(__dirname, "public", "index.html")
        }),
        new MiniCss()
    ]
}