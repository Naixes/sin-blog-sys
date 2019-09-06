// 路由处理
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getBlogList, getBlogDetail, addBlog, updateBlog, delBlog } = require('../controller/blog')

const handleBlogRouter = (req, res) => {
	const method = req.method
	const path = req.path
	let { id } = req.query

	//  获取博客列表
	if (method === 'GET' && path === '/api/blog/list') {
		let { author, search } = req.query
		// let data = getBlogList(author, search)
		// return new SuccessModel(data)
		// P开头表示promise
		let Pdata = getBlogList(author, search)
		return Pdata.then(data => {
			return new SuccessModel(data)
		})
	}

	//  获取博客详情
	if (method === 'GET' && path === '/api/blog/detail') {
		let Pdata = getBlogDetail(id)
		return Pdata.then(data => {
			return new SuccessModel(data[0])
		})
	}

	//  上传博客
	if (method === 'POST' && path === '/api/blog/add') {
		req.body.author = 'zhangsan'
		console.log(req.body)
		let Pdata = addBlog(req.body)
		return Pdata.then(data => {
			return new SuccessModel(data)
		})
	}

	//  更新博客
	if (method === 'POST' && path === '/api/blog/update') {
		let blogData = req.body
		let Presult = updateBlog(id, blogData)
		Presult.then(result => {
			if (result) {
				return new SuccessModel()
			} else {
				return new ErrorModel('更新博客失败')
			}
		})
	}

	//  删除博客
	if (method === 'POST' && path === '/api/blog/del') {
		let Presult = delBlog(id)
		Presult.then(result => {
			if (result) {
				return new SuccessModel()
			} else {
				return new ErrorModel('删除博客失败')
			}
		})
	}
}

module.exports = handleBlogRouter