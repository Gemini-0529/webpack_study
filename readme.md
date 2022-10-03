#### 启动默认webpack配置
```js
npx webpack ./index.js --mode=development
npx webpack ./index.js --mode=production
```
#### 启动自定义配置webpack
> 运行配置文件 npx webpack
```js
const path = require('path')

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  module: {
    rules: [

    ]
  },
  plugins: [

  ],
  mode: "development"
}
```
#### 自动清空之前的打包文件
```js
output: {
  clean: true
}
```
#### 配置eslint
> 下载包 npm install eslint-webpack-plugin eslint --save-dev
```js
// webpack.config.js
const ESlintPlugin = require('eslint-webpack-plugin')
plugin: [
  new ESlintPlugin({
    // 检测哪些文件
    context: path.resolve(__dirname, 'src')
  })
]
```
新增 eslint 配置文件：
可选文件名：
1. .eslintrc
2. .eslintrc.js ✅
3. .eslintrc.json
或在package.json中配置：
```js
eslintConfig: {

}
```
有可能检测dist文件夹下的文件格式，需要再新增一个 .eslintignore文件
写入dist 忽略检测 dist 文件夹
#### babel 将es6代码转译成es5
> 安装包 npm install -D babel-loader @babel/core @babel/preset-env
#### html
> 安装包 npm install --save-dev html-webpack-plugin
```js
// 以自定义的html文件创建新的html文件
// 保留原有结构、自动引入打包的js资源
new HtmlWebpackPlugin({
  template: path.resolve(__dirname, "index.html")
})
```
#### 开发服务器
> npm i webpack-dev-server -D

> 启动命令：npx webpack serve
```js
devServer: {
  host: "localhost",
  port: "3000",
  open: true,// 是否自动打开浏览器
}
```
开发服务器不会输出资源，在内存中打包 dist为空
#### 生产环境配置
> 生产环境不需要 devserver，mode为development   开发环境不需要输出资源到dist，mode为production
添加运行指令
```js
"scripts": {
  "dev": "webpack serve --config ./config/webpack.dev.js",
  "build": "webpack --config ./config/webpack.prod.js"
},
```