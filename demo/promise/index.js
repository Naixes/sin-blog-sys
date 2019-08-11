const fs = require('fs')
const path = require('path')

// 回调函数
// function getFileContent(fileName, callback) {
// 	const fullPathName = path.resolve(__dirname, 'files', fileName)

// 	fs.readFile(fullPathName, (err, data) => {
// 		if(err) {
// 			console.log(err)
// 			return 
// 		}
// 		callback(JSON.parse(data.toString()))
// 	})
// }

// getFileContent('a.json', (data) => {
// 	console.log(data)
// 	getFileContent(data.next, data => {
// 		console.log(data)
// 		getFileContent(data.next, data => {
// 			console.log(data)
// 		})
// 	})
// })

// promise
function getFileContent(fileName) {
	return new Promise((resolve, reject) => {
		const fullPathName = path.resolve(__dirname, 'files', fileName)
	
		fs.readFile(fullPathName, (err, data) => {
			if(err) {
				reject(err)
				return 
			}
			resolve(JSON.parse(data.toString()))
		})
	})
}

getFileContent('a.json').then(data => {
	console.log(data)
	return getFileContent(data.next)
}).then(data => {
	console.log(data)
	return getFileContent(data.next)
}).then(data => {
	console.log(data)
})


