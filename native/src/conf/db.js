// 数据库配置
const env = process.env.NODE_ENV

let MYSQL_CONF

if (env === 'production') {
	MYSQL_CONF = {
		host: 'localhost',
		user: 'admin',
		password: 'root',
		port: 3306,
		database: 'sin-blog'
	}
}

if (env === 'dev') {
	MYSQL_CONF = {
		host: 'localhost',
		user: 'admin',
		password: 'root',
		port: 3306,
		database: 'sin-blog'
	}
}

module.exports = {
	MYSQL_CONF
}
