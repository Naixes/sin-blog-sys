const { SuccessModel, ErrorModel } = require('../model/resModel')
const { login } = require('../controller/user')

// 生成cookie过期时间
const getExpires = function () {
	let expires = new Date()
	expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000))
	// 转换成expires格式的时间
	return expires.toGMTString()
}

const handleUserRouter = (req, res) => {
	const method = req.method
	const path = req.path

	//  登录
	// if (method === 'POST' && path === '/api/user/login') {
	// 	const { username, password } = req.body
	// 	let Presult = login(username, password)
	// 	return Presult.then(data => {
	// 		if (data.username) {
	// 			return new SuccessModel()
	// 		}
	// 		return new ErrorModel('登录失败')
	// 	})
	// }
	if (method === 'GET' && path === '/api/user/login') {
		const { username, password } = req.query
		let Presult = login(username, password)
		return Presult.then(data => {
			if (data.username) {

				// 设置cookie
				// 限制前端修改：httpOnly
				// res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getExpires()}`)
				// 设置session
				req.session.username = data.username
				req.session.realname = data.realname

				return new SuccessModel()
			}
			return new ErrorModel('登录失败')
		})
	}

	// 登录校验测试
	if (method === 'GET' && path === '/api/user/login-test') {
		// if (req.cookie.username) {
		if (req.session.username) {
			// 需要返回Promise
			return Promise.resolve(new SuccessModel({
				session: req.session
			}))
		}
		return Promise.resolve(new ErrorModel('测试登陆失败'))
	}
}

module.exports = handleUserRouter