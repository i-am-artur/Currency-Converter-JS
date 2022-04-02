const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = () => {
  return {
    mode: 'none',
    target: ['web', 'es5'],
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: {
        "@scss": path.resolve(__dirname, "src/assets/scss/"), // alias for less helpers
        "@assets": path.resolve(__dirname, "src/assets"), // alias for assets (use for images & fonts)
      },
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|webp|gif|svg|)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: './images',
                name: '[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(scss|css)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   use: {
        //     loader: 'babel-loader',
        //     options: {
        //       presets: ['@babel/preset-env'],
        //     },
        //   },
        // },
      ],
    },
    plugins: [
      new ESLintPlugin(),
      new MiniCssExtractPlugin({
        filename: "styles.css",
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
      }),
    ],
    optimization: {
      minimize: true,
    },
    devServer: {
      port: 3000,
      // open: true,
      historyApiFallback: true,
    },
  }
};
