class BaseModel {
	constructor(data, message) {
		// 出错时，只传第二个参数的情况
		if(typeof data === 'string') {
			this.message = data
			data = null
			message = null
		}
		if(data) {
			this.data = data
		}
		if(message) {
			this.data = message
		}
	} 
}

class SuccessModel extends BaseModel {
	constructor(data, message) {
		super(data, message)
		this.errno = 0
	}
}

class ErrorModel extends BaseModel {
	constructor(data, message) {
		super(data, message)
		this.errno = -1
	}
}

module.exports = {
	SuccessModel,
	ErrorModel
}