/* global __dirname */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function getPlugins (nodeEnv, isProduction) {
  const plugins = [
    new webpack.EnvironmentPlugin({
      NODE_ENV: nodeEnv
    }),
    new webpack.NamedModulesPlugin()
  ]

  if (isProduction) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        output: {
          comments: false
        }
      }),
      new HtmlWebpackPlugin({
        filename: './public/index.html',
        template: './src/index.html',
        inject: 'body'
      })
    )
  } else {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        filename: './build/index.html',
        template: './src/index.html',
        inject: 'body'
      })
    )
  }

  return plugins
}

module.exports = (env) => {
  const nodeEnv = env && env.prod ? 'production' : 'development'
  const isProduction = nodeEnv === 'production'

  return {
    entry: [
      'babel-polyfill',
      './src/index.jsx'
    ],

    output: {
      path: __dirname,
      filename: isProduction
        ? 'public/js/bundle.js'
        : 'build/js/bundle.js'
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ]
        }
      ]
    },

    resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'src')
      ],
      extensions: ['.js', '.jsx']
    },

    plugins: getPlugins(nodeEnv, isProduction),

    devServer: {
      contentBase: './build',
      historyApiFallback: true,
      port: 3000,
      compress: isProduction,
      inline: !isProduction,
      hot: !isProduction,
      stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: false,
        timings: true,
        version: false,
        warnings: true,
        colors: {
          green: '\u001b[32m'
        }
      }
    }
  }
}
