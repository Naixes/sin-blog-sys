// 数据库配置
const env = process.env.NODE_ENV

let MYSQL_CONF, REDIS_CONF

if (env === 'production') {
	MYSQL_CONF = {
		host: 'localhost',
		user: 'admin',
		password: 'root',
		port: 3306,
		database: 'sin-blog'
	}
	REDIS_CONF = {
		host: '127.0.0.1',
		port: 'admin'
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
	REDIS_CONF = {
		host: '127.0.0.1',
		port: 'admin'
	}
}

module.exports = {
	MYSQL_CONF,
	REDIS_CONF
}
