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