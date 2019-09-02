const mysql = require('mysql')

const { MYSQL_CONF } = require('../conf/db')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)
// 开始连接
con.connect()

// 统一执行sql的语句
function execSql(sql) {
	return new Promise((resolve, reject) => {
		con.query(sql, (err, result) => {
			if (err) {
				reject(err)
				return
			}
			resolve(result)
		})
	})
}

// 关闭连接
// con.end()

module.exports = {
	execSql
}
