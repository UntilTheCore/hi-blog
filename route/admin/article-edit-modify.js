const formidable = require('formidable')
const { Article } = require('../../model/article')
const path = require('path')

// 此路由用来处理提交的 post 修改文章请求。
module.exports = async (req, res) => {
	let id = req.query.id
	let article = await Article.findOne({ _id: id })
	console.log(req.app.locals.userInfo._id)
	console.log(article.author._id)
	if (
		req.app.locals.userInfo._id.toString() !== article.author._id.toString()
	) {
		res.redirect('/admin/article?message=修改失败！不能修改不是自己的文章!')
		return false
	}
	const form = new formidable.IncomingForm()
	form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')
	// 保留文件的扩展名
	form.keepExtensions = true

	form.parse(req, async (err, fields, files) => {
		let paths = files.cover.path.split('public')
		await Article.updateOne(
			{ _id: id },
			{
				title: fields.title,
				cover: paths[1],
				content: fields.content,
			}
		)
			.then((result) => {
				res.redirect('/admin/article?message=文章修改成功!')
			})
			.catch((err) => {
				console.log(err)
				res.redirect('/admin/article?message=文章修改失败!')
			})
	})
}
