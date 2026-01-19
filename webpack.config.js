const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin').default;

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
	  mode: argv.mode || 'development',
    performance: {
      hints: false,
    },
    stats: {
      preset: 'errors-only',
    },
    entry: {
      main: './src/scripts/main.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      assetModuleFilename: 'assets/[name].[contenthash][ext]',
      clean: true,
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      static: path.resolve(__dirname, 'dist'),
      port: 8080,
      hot: true,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          options: {
            root: path.resolve(__dirname, 'src')
          }
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.scss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.svg$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[name].[ext][query]'
          }
        }
      ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@blocks': path.resolve(__dirname, 'src/blocks/'),
        },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/pages/index.pug',
        filename: 'index.html',
      }),
      ...(isProduction ? [new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      })] : []),
      new SVGSpritemapPlugin('src/assets/svg/**/*.svg', {
      output: { 
        filename: 'sprite.svg',
        svg: { 
          dimensions: false,
        }
      },
        sprite: {
          prefix: ''
      }
    })
    ],
  };
};