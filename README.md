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

#### 设计接口

```js
const {SuccessModel, ErrorModel} = require('../model/resModel')
const {getBlogList} = require('../controller/blog')

const handleBlogRouter = (req, res) => {
	const method = req.method
	const path = req.path

	//  获取博客列表
	if(method === 'GET' && path ==='/api/blog/list') {
		let {id, search} = req.query
		let data = getBlogList(id, search)
		return new SuccessModel(data)
	}

	//  获取博客详情
	if(method === 'GET' && path ==='/api/blog/detail') {
		return { msg: '这是获取博客详情的接口'}
	}

	//  上传博客
	if(method === 'POST' && path ==='/api/blog/add') {
		return { msg: '这是上传博客列表的接口'}
	}

	//  更新博客
	if(method === 'POST' && path ==='/api/blog/update') {
		return { msg: '这是更新博客列表的接口'}
	}

	//  删除博客
	if(method === 'POST' && path ==='/api/blog/del') {
		return { msg: '这是删除博客列表的接口'}
	}
 }

 module.exports = handleBlogRouter
```

#### 设计model

```js
class BaseModel {
	constructor(data, message) {
		// 出错时，只传第二个参数的情况
		if(typeof data === 'string') {
			this.message = data
			data = null
			message = null
		}
		if(data) {
			this.data = data
		}
		if(message) {
			this.data = message
		}
	} 
}

class SuccessModel extends BaseModel {
	constructor(data, message) {
		super(data, message)
		this.errno = 0
	}
}

class ErrorModel extends BaseModel {
	constructor(data, message) {
		super(data, message)
		this.errno = -1
	}
}

module.exports = {
	SuccessModel,
	ErrorModel
}
```

#### controller

```js
// 数据处理

// 获取博客列表
const getBlogList = (id, search) => {
    return [
        {
            id: '0',
            title: 'title标题0',
            content: 'content内容0',
            publishtime: '1565314163430'
        },
        {
            id: '1',
            title: '标题1',
            content: '内容1',
            publishtime: '1565314163431'
        }
    ]
}

module.exports = {
    getBlogList
}
```

#### 入口

```js
// 业务代码配置

const querystring = require('querystring')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req, res) => {
	// 获取path
	const url = req.url
	req.path = url.split('?')[0]

	// 解析 query
	req.query = querystring.parse(url.split('?')[1])

	// 设置返回格式
	res.setHeader('Content-type', 'application.json')

	let blogData = handleBlogRouter(req, res)
	let userData = handleUserRouter(req, res)

	if(blogData) {
		res.end(JSON.stringify(blogData))
		return
	}
	if(userData) {
		res.end(JSON.stringify(userData))
		return
	}

	// 找不到页面
	res.writeHead(404, {'Content-type': 'text/plain'})
	res.end('404 Not Found')
}

module.exports = serverHandle

// process.env.NODE_ENV
```

#### 路由开发

##### 路由和API

API：多端对接术语

路由：API的一部分，后端内部定义

