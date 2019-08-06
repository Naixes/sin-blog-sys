// 业务代码配置
const serverHandle = (req, res) => {
	// 设置返回格式
	res.setHeader('Content-type', 'application.json')

	res.end(JSON.stringify(resData))
}

module.exports = serverHandle

// process.env.NODE_ENV