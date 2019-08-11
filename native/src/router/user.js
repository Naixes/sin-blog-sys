const {SuccessModel, ErrorModel} = require('../model/resModel')
const {checkLogin} = require('../controller/user')

const handleUserRouter = (req, res) => {
	const method = req.method
	const url = req.url
	const path = url.split('?')[0]

	//  登录
	if(method === 'GET' && path ==='/api/user/login') {
		const {username, password} = req.body
		let result = checkLogin(username, password)
		if(result) {
			return new SuccessModel()
		}else {
			return new ErrorModel('登录失败')
		}
	}
}

module.exports = handleUserRouter