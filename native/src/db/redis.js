const redis = require('redis')

const { REDIS_CONF } = require('../conf/db')

const client = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

client.on('err', (err) => {
	console.log(err)
})

const get = function (key) {
	// 异步封装
	return new Promise((resolve, reject) => {
		client.get(key, (err, val) => {
			if (err) {
				reject(err)
			}
			// 如果值为空返回空
			if (val === null) {
				resolve(null)
			}
			// 尝试将val转换为json，出错直接返回原值
			try {
				resolve(JSON.parse(val))
			} catch (ex) {
				resolve(val)
			}
		})
	})
}

const set = function (key, val) {
	// 转换为字符串
	if (typeof val === 'object') {
		val = JSON.stringify(val)
	}
	client.set(key, val, redis.print)
}

module.exports = {
	get,
	set
}