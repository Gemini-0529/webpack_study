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