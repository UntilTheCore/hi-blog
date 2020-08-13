// 此路由实现文章新增时提交过来的新增文章 post 请求
const formidable = require('formidable')
const { Article } = require('../../model/article')
const path = require('path')
module.exports = (req, res) => {
	const form = new formidable.IncomingForm()
	form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')
	// 保留文件的扩展名
	form.keepExtensions = true

	form.parse(req, (err, fields, files) => {
		console.log(fields)
		let paths = files.cover.path.split('public')
		// console.log(paths[1]);
		Article.create({
			title: fields.title,
			author: fields.author,
			publicDate: fields.publicDate,
			cover: paths[1],
			content: fields.content,
		})
			.then((result) => {
				// 插入成功则重定向页面到文章列表页面
				res.redirect('/admin/article?message=文章发布成功!')
			})
			.catch((err) => {
				console.log(err)
				console.log('文章创建失败!')
			})
	})
	// res.send(req.body);
}
