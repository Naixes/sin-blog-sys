const handleUserRouter = (req, res) => {
	const method = req.method
	const url = req.url
	const path = url.split('?')[0]

	//  获取博客列表
	if(method === 'GET' && path ==='/api/user/login') {
		return { msg: '这是登录接口'}
	}
}

module.exports = handleUserRouter