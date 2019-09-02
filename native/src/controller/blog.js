// 数据处理

const { execSql } = require('../db/mysql')

// 获取博客列表
const getBlogList = (author, search) => {
	let sql = `SELECT * FROM blogs WHERE 1=1 `
	// author && sql += `and author=${author} `
	// search && sql += `and title like %${search}% `
	if (author) {
		sql += `and author=${author} `
	}
	if (search) {
		sql += `and title like %${search}% `
	}
	sql += `order by createtime desc`
	// 返回Promise
	return execSql(sql)
}

// 获取博客详情
const getBlogDetail = (id) => {
	let sql = `SELECT * FROM blogs WHERE id=${id}`
	// 返回Promise
	return execSql(sql)
}

// 上传博客
const addBlog = (data = {}) => {
	let { title, content, author } = data
	let createtime = Date.now()
	let sql = `INSERT INTO blogs (title, content, createtime, author) VALUES ('${title}', '${content}', ${createtime}, '${author}')`
	console.log(sql)
	return execSql(sql).then(insertData => {
		console.log(insertData)
		return {
			id: insertData.insertId
		}
	})
}

// 更新博客
const updateBlog = (id, data = {}) => {
	let { title, content } = data
	let sql = `UPDATE blogs SET title='${title}, content='${content} WHERE id=${id}`
	return execSql(sql).then(updateData => {
		if (updateData.affectedRows > 0) {
			return true
		}
		return false
	})
}

// 删除博客
const delBlog = (id) => {
	let sql = `DELETE FROM blogs WHERE id=${id}`
	return execSql(sql).then(delData => {
		if (delData.affectedRows > 0) {
			return true
		}
		return false
	})
}

module.exports = {
	getBlogList,
	getBlogDetail,
	addBlog,
	updateBlog,
	delBlog
}