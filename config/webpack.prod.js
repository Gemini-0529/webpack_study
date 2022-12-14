const path = require('path')
const os = require('os')
const threads = os.cpus().length// cpu核数
const TerserWebpackPlugin = require('terser-webpack-plugin')
module.exports = {
  entry: "./index.js",
  output: {
    // 开发模式不需要输出到dist，利用服务器做自动打包
    path: path.resolve(__dirname, "../dist"),
    filename: "main.js",
    /**
     * 自动清空上次打包的内容（打包前，删除dist文件夹）
     */
    clean: true,
  },
  module: {
    rules: [
      // 处理图片资源
      {
        test: /\.(png|jpe?g|gif|webp|svg)/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            /**
             * 小于10kb会转成base64字符
             * 优点：减少请求数量；缺点：体积会变大
             */
            maxSize: 10 * 1024
          }
        },
        // 指定图片资源输出路径 文件夹/hash值 后缀名
        generator: {
          filename: 'static/[hash][ext]'
        }
      },
      // 处理字体、视频资源
      {
        test: /\.(woff|ttf|mp3|mp4|avi)/,
        type: "asset/resource",
        generator: {
          filename: 'static/media/[hash][ext]'
        }
      },
      // babel
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules
        use: [
          {
            loader: "thread-loader",// 开启多进程
            options: {
              works: threads,// 进程数量
            }
          },
          {
            loader: "babel-loader",
          }
        ]
      }
    ]
  },
  plugins: [
    new ESlintPlugin({
      // 检测哪些文件
      context: path.resolve(__dirname, "../src"),
      threads,// 开启多进程
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html")
    })

  ],
  optimization: {
    minimizer: [
      // 压缩js
      new TerserWebpackPlugin({
        parallel: threads
      })
    ]
  },
  mode: "production"
}