// 业务代码配置

const querystring = require('querystring')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 全局的session数据
// const SESSION_DATA = {}

// 生成cookie过期时间
const getExpires = function () {
	let expires = new Date()
	expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000))
	// 转换成expires格式的时间
	return expires.toGMTString()
}

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

const serverHandle = (req, res) => {
	// 获取path
	const url = req.url
	req.path = url.split('?')[0]

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

	// 解析session
	let needSetCookie = false
	let userId = req.cookie.userid
	// if (userId) {
	// 	// 有userId没有session信息：初始化session
	// 	if (!SESSION_DATA[userId]) {
	// 		SESSION_DATA[userId] = {}
	// 	}
	// } else {
	// 	// 没有userId：设置userId，初始化session
	// 	needSetCookie = true
	// 	// 生成userId
	// 	userId = `${Date.now()}_${Math.random()}`
	// 	SESSION_DATA[userId] = {}
	// }
	// req.session = SESSION_DATA[userId]
	if (userId) {
		req.sessionId = userId
	} else {
		needSetCookie = true
		// 生成userId
		userId = `${Date.now()}_${Math.random()}`
	}

	// 解析 query
	req.query = querystring.parse(url.split('?')[1])

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
				if (needSetCookie) {
					// 返回时设置userId
					res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getExpires()}`)
				}
				res.end(JSON.stringify(blogData))
			})
			return
		}

		// user
		let PuserData = handleUserRouter(req, res)
		if (PuserData) {
			PuserData.then(userData => {
				if (needSetCookie) {
					// 返回时设置userId
					res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getExpires()}`)
				}
				res.end(JSON.stringify(userData))
			})
			return
		}

		// 找不到页面
		res.writeHead(404, { 'Content-type': 'text/plain' })
		res.end('404 Not Found')
	})
}

module.exports = serverHandle

// process.env.NODE_ENV