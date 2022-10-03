module.exports = {
  // 解析选项
  parserOptions: {
    ecmaVersion: 6, // es6
    sourceType: "module" // es module
  },
  // 具体检查规则
  rules: {
    "no-var": 2, // 不能使用 var 定义变量
  },
  // 继承 eslint 规则
  extend: ["eslint:recommended"],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  }
}