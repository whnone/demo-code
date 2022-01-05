const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
//process.env.NODE_ENV == 'production' ? 'production' : 'development';
module.exports = {
  mode: process.env.NODE_ENV == "production" ? "production" : "development", //默认是开发模块
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js",
  },
  devtool: "source-map",
  devServer: {
    hot: true, //热更新插件
    contentBase: path.join(__dirname, "static"),
    historyApiFallback: {
      //browserHistory的时候，刷新会报404. 自动重定向到index.html
      index: "./index.html",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "node_modules"),
    },
    //当你加载一个文件的时候,没有指定扩展名的时候，会自动寻找哪些扩展名
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: "babel-loader",
        options: {
          presets:[
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript'
          ],
          plugins: [//默认引less,我们引css
            ['import', { libraryName: 'antd', style: 'css' }]
          ]
        },
        include:path.resolve('src'),
        exclude:/node_modules/
      },
      {//引入antdesign中用的css
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 0 },
          }
        ]
      },
      {//我们自己的代码都是less
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { importLoaders: 3 },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "autoprefixer"
                ],
              }
            },
          },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 75,
              remPrecesion: 8,
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.(jpg|png|gif|svg|jpeg)$/,
        type:'asset'
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
            patterns: [
              { from: path.resolve(__dirname,'static'), to: path.resolve(__dirname,'dist') }
            ]
    })
  ],
};
