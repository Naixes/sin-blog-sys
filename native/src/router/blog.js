const handleBlogRouter = (req, res) => {
	const method = req.method
	const path = req.path

	//  获取博客列表
	if(method === 'GET' && path ==='/api/blog/list') {
		return { msg: '这是获取博客列表的接口'}
	}

	//  获取博客详情
	if(method === 'GET' && path ==='/api/blog/detail') {
		return { msg: '这是获取博客详情的接口'}
	}

	//  上传博客
	if(method === 'POST' && path ==='/api/blog/add') {
		return { msg: '这是上传博客列表的接口'}
	}

	//  更新博客
	if(method === 'POST' && path ==='/api/blog/update') {
		return { msg: '这是更新博客列表的接口'}
	}

	//  删除博客
	if(method === 'POST' && path ==='/api/blog/del') {
		return { msg: '这是删除博客列表的接口'}
	}
 }

 module.exports = handleBlogRouter