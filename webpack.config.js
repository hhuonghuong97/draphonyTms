const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

// const ts = require("typescript");
// const tsConfig = require("./tsconfig.json");
const TSLintPlugin = require("tslint-webpack-plugin");

const config = {
    entry: {
        "app": "./src/index.tsx"
    },
    node: {
        fs: "empty"
     },

    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".css", ".scss"],
    },

    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: __dirname + "/src/index.html"
        }),
        new HtmlWebpackPlugin({
            filename: "offline.html",
            template: __dirname + "/src/index.html"
        }),

        // new CopyWebpackPlugin([
        //     { from: "assets/**/*" },
        //     { from: "manifest.json" },
        //     {
        //         from: "src/service-worker.ts", to: "./service-worker.js",
        //         force: true,
        //         transform: (content, path) => {
        //             const source = content.toString();

        //             let result = ts.transpileModule(source, {
        //                 compilerOptions: tsConfig
        //             });

        //             return result.outputText;
        //         }
        //     }
        // ])
    ],

    module: {
        rules: [
            // Exclude .test.ts from being bundled
            {
                test: /^((?!\.test\.ts).)*\.tsx?$/, 
                loader: "awesome-typescript-loader"
            },

            // All output ".js' files will have any sourcemaps re-processed by 'source-map-loader".
            {
                enforce: "pre",
                //  - react-data-grid V6 does not have source map 
                // test: /(?!react-data-grid)\.js$/,
                test: /(?!react-data-grid)\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: "file-loader"
            }
        ]
    }
};

module.exports = (env, argv) => {
    let output = {};
    let plugins = config.plugins;
    let module = config.module;

    module = {
        rules: [
            ...module.rules,
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: argv.mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader, // inject CSS to page
                    },
                    "css-loader", // translates CSS into CommonJS modules
                    {
                        loader: "postcss-loader", // Run post css actions
                        options: {
                            // post css plugins, can be exported to postcss.config.js
                            plugins: function () {
                                return [
                                    require("precss"),
                                    require("autoprefixer")
                                ];
                            }
                        }
                    },
                    "sass-loader" // compiles Sass to CSS
                ]
            }
        ]
    };

    switch (argv.mode) {
        case "development":
            output = {
                filename: "[name].[hash].js",
                path: __dirname + "/dist"
            };

            plugins = [
                ...plugins,
                new webpack.HotModuleReplacementPlugin(),
                new webpack.DefinePlugin({
                    SERVER_API_URI: "\"http://localhost:3000/\"",
                    BUILD_DATETIMESTAMP: `"${new Date().toLocaleString()}"`,
                    BUILD_VERSION: `"1.0.0 Release Candidate"`
                }),
                new TSLintPlugin({
                    files: ["./src/**/*.ts"]
                })
            ];
            break;

        case "production":
        default:
            output = {
                filename: "[name].[contenthash].js",
                path: __dirname + "/dist"
            };

            plugins = [
                ...plugins,
                new webpack.DefinePlugin({
                    SERVER_API_URI: "\"https://sp2go.draphony.com/api/\"",
                    BUILD_DATETIMESTAMP: `"${new Date().toLocaleString()}"`,
                    BUILD_VERSION: `"0.6.2 UAR Version"`
                }),
                new MiniCssExtractPlugin({
                    filename: "[name].[hash].css",
                    chunkFilename: "[id].[hash].css",
                })

                // For production environment, tslint is an extra step in the build order.
            ];
            break;
    }

    if (argv.mode === "development")
        return {
            ...config,
            module,
            output,
            plugins,

            devtool: "source-map",
            devServer: {
                contentBase: "./dist",
                hot: true,
                compress: true,
                historyApiFallback: true
            }
        }

    return {
        ...config,
        module,
        output,
        plugins
    };
}
