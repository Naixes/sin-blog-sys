// 业务代码配置

const handleBlogRouter = require('./src/router/blog')
const handleBlogRouter = require('./src/router/user')

const serverHandle = (req, res) => {
	// 获取path
	const url = req.url
	req.path = url.split('?')[0]

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