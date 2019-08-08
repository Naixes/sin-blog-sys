## 数据存储

博客

用户

输入网址后回车会发生什么：

- DNS解析，建立TCP连接，发送http请求
- 服务端处理请求并返回
- 客户端收到数据，处理数据

## 开发日志

### 搭建开发环境

nodemon 监测文件变化，重启node

#### cross-env

运行跨平台设置和使用环境变量的脚本

解决问题：**windows不支持NODE_ENV=development的设置方式**

安装：`npm i cross-env --save-dev`

使用：cross-env 设置环境变量，兼容mac、linux 和 windows

```json
"scripts": {
		"dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js",
		"prd": "cross-env NODE_ENV=production nodemon ./bin/www.js"
  }
```

