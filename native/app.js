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

	// 获取postData
	function getPostData(req) {
		return new Promise((res, rej) => {
			if (req.method !== 'POST') {
				res({})
				return
			}
			if (req.headers['content-type'] !== 'application/json') {
				res({})
				return
			}
			let postData = ''
			req.on('data', chunck => {
				postData += chunck.toString()
			})
			req.on('end', () => {
				if (!postData) {
					res({})
					return
				}
				res(JSON.parse(postData))
			})
		})
	}

	// 设置返回格式
	res.setHeader('Content-type', 'application.json')

	// 处理postData
	getPostData(req).then(postData => {
		if (postData) {
			req.body = postData
		}

		// bolg
		// let blogData = handleBlogRouter(req, res)
		// if (blogData) {
		// 	res.end(JSON.stringify(blogData))
		// 	return
		// }
		let PblogData = handleBlogRouter(req, res)
		if (PblogData) {
			PblogData.then(blogData => {
				res.end(JSON.stringify(blogData))
			})
			return
		}

		// user
		let userData = handleUserRouter(req, res)
		if (userData) {
			res.end(JSON.stringify(userData))
			return
		}

		// 找不到页面
		res.writeHead(404, { 'Content-type': 'text/plain' })
		res.end('404 Not Found')
	})
}

module.exports = serverHandle

// process.env.NODE_ENV