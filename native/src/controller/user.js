// 数据处理

const { execSql } = require('../db/mysql')

// 登录 
const login = (username, password) => {
	// 字符串注意加上引号
	const sql = `SELECT username, realname FROM user WHERE username='${username}' and password='${password}'`
	console.log(sql)
	return execSql(sql).then(rows => {
		return rows[0] || {}
	})
}

module.exports = {
	login
}