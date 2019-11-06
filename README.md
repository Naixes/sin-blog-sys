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

#### 数据库

`SET SQL_SAFE_UPDATES = 0` 取消安全模式

软删除

`select version()` 查看版本，大于 5 时 varchar 不区分汉字

API对接

#### 登录

##### 登录校验

###### cookie

5kb，跨域不共享，字符串（k1=v1;k2=v2），每次请求都会发送，服务端可操作，浏览器也可以js修改（有限制）

**客户端js操作cookie**

查看cookie：

1. `requestHeaders：cookie`（将当前域的cookie发送给服务端）；`responseHeaders：Set-Cookie`（服务端修改后返回）
2. `Application`中
3. `document.cookie`查看（有限制）

修改cookie：

`document.cookie = 'k1=v1' // 会追加到后面`

**服务端node操作cookie**

查看解析：

```js
// 解析cookie
req.cookie = {}
const cookieStr = req.headers.cookie || '' // k1=v1;k2=v2
cookieStr.split(';').forEach(item => {
    if (!item) return

    let arr = item.split('=')
    // cookie拼接时会添加空格
    let key = arr[0].trim()
    let value = arr[1].trim()
    req.cookie[key] = value
});
```

修改：

```js
// 生成cookie过期时间
const getExpires = function () {
	let expires = new Date()
	expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000))
	// 转换成expires格式的时间
	return expires.toGMTString()
}

// 操作cookie
// 限制前端修改：httpOnly
res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getExpires()}`)
```

登录验证：

```js
// 登录校验测试
if (method === 'GET' && path === '/api/user/login-test') {
    if (req.cookie.username) {
        // 需要返回Promise
        return Promise.resolve(new SuccessModel)
    }
    return Promise.resolve(new ErrorModel('测试登陆失败'))
}
```

###### session

cookie缺点暴露个人信息

解决：cookie存储用户id，session（服务端）中存储用户信息

##### redis

将session放在变量中：内存有限；多进程，进程之间内存无法共享

redis：web server最常用的缓存数据库，数据存放在内存中，速度快，内存小 

为什么不用mysql：session访问频繁，对性能要求高，数据量小，不考虑断电丢失问题（重新登录），也可以不丢失需要配置

###### 安装

https://github.com/ServiceStack/redis-windows

启动

```js
// 服务器
redis-server.exe redis.windows.conf
// 客户端
redis-cli
```

配置

```js
redis-cli -h xxx -p xxxx
config get xxx
```

###### 基本使用

```js
set name xxx
get name
del name
```

###### noed使用

安装redis

```js
const redis = require('redis')

const client = redis.createClient(6379, '127.0.0.1')

client.on('err', (err) => {
	console.log(err)
})

client.set('name', 'sin', redis.print)
client.set('name', 'sin', (err, res) => {
	console.log(res)
})
client.get('name', (err, res) => {
	console.log(res)
    client.quit()
})

```

封装redis

```js
const { REDIS_CONF } = require('../conf/db')

const redis = require('redis')
const client = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

client.on('err', (err) => {
	console.log(err)
})

const get = function (key) {
	// 异步封装
	return new Promise((resolve, reject) => {
		client.get(key, (err, val) => {
			if (err) {
				reject(err)
			}
			// 如果值为空返回空
			if (val === null) {
				resolve(null)
			}
			// 尝试将val转换为json，出错直接返回原值
			try {
				resolve(JSON.parse(val))
			} catch (ex) {
				resolve(val)
			}
		})
	})
}

const set = function (key, val) {
	// 转换为字符串
	if (typeof val === 'object') {
		val = JSON.stringify(val)
	}
	client.set(key, val, redis.print)
}

module.exports = {
	get,
	set
}
```

##### 联调

- 登陆依赖cookie
- cookie跨域不共享，nignx代理让前后端同域

http-server开启前端服务

###### nginx

- 高性能web服务器，开源免费
- 一般用于静态服务，负载均衡（将流量分配到不同的机器）
- 反向代理（客户端不可见，反之是正向代理）

​                          ----/...----html(8001)

浏览器----nginx

​						  ----/api/...----node(8000)

下载：官网：<http://nginx.org/en/download.html>

配置：c:\nginx\conf\nginx.conf(windows)

```cmd

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
}
```

修改后

```cmd

#user  nobody;
worker_processes  2;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    
    keepalive_timeout  65;

    server {
        listen       8080;
        server_name  localhost;

        # location / {
        #     root   html;
        #     index  index.html index.htm;
        # }

        location / {
            # 代理地址
            proxy_pass: http://localhost:8001;
        }

        location /api/ {
            proxy_pass: http://localhost:8000;
            proxy_set_header: Host $host;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```



命令：

```cmd
# 检测格式 
nginx -t
# 启动 
nginx
# 重启 
nginx -s reload
# 停止：
nginx -s stop
```

































