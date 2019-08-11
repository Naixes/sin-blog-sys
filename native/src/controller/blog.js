// 数据处理

// 获取博客列表
const getBlogList = (id, search) => {
    return [
        {
            id: '0',
            title: 'title标题0',
            content: 'content内容0',
            publishtime: '1565314163430'
        },
        {
            id: '1',
            title: '标题1',
            content: '内容1',
            publishtime: '1565314163431'
        }
    ]
}

// 获取博客详情
const getBlogDetail = (id) => {
    return [
        {
            id: '0',
            title: 'title标题0',
            content: 'content内容0',
            publishtime: '1565314163430'
        }
    ]
}

// 上传博客
const addBlog = (data = {}) => {
    return [
        {
            id: '3'
        }
    ]
}

// 更新博客
const updateBlog = (id, data = {}) => {
    return true
}

// 删除博客
const delBlog = (id) => {
    return true
}

module.exports = {
		getBlogList,
		getBlogDetail,
		addBlog,
		updateBlog,
		delBlog
}