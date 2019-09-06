const { SuccessModel, ErrorModel } = require('../model/resModel')
const { checkLogin } = require('../controller/user')

const handleUserRouter = (req, res) => {
	const method = req.method
	const path = req.path

	//  登录
	if (method === 'POST' && path === '/api/user/login') {
		const { username, password } = req.body
		console.log(req.body)
		let Presult = checkLogin(username, password)
		return Presult.then(data => {
			if (data.username) {
				return new SuccessModel()
			}
			return new ErrorModel('登录失败')
		})
	}
}

module.exports = handleUserRouter