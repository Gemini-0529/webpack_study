const path = require('path')
module.exports = {
  entry: "./index.js",
  output: {
    // 开发模式不需要输出到dist，利用服务器做自动打包
    path: undefined,// path.resolve(__dirname, "../dist"),
    filename: "main.js",
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
        use: {
          loader: "babel-loader",
          options: {
            // 可以写在babel配置文件中，统一管理
            // presets: ["@babel/preset-env"]
            cacheDirectory: true, // 开启babel缓存
            cacheCompression: false,// 不压缩
            plugins: ["@babel/plugin-transform-runtime"],// 减少代码体积
          }
        }
      }
    ]
  },
  plugins: [
    new ESlintPlugin({
      // 检测哪些文件
      context: path.resolve(__dirname, "../src")
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html")
    })

  ],
  devServer: {
    host: "localhost",
    port: "3000",
    open: true,// 是否自动打开浏览器
  },
  mode: "development"
}