const { Article } = require('../../model/article')
const { User } = require('../../model/user')
// 此路由处理文章编辑页面的 get 请求，主要用来渲染 article-edit 页面。
module.exports = async (req, res) => {
	req.app.locals.currentLink = 'article'
	let { id, authorid } = req.query
	let user = await User.findOne({ _id: authorid })
	let today = new Date(Date.parse(new Date()) + 28800000)
		.toISOString()
		.split('T')[0]
	if (id) {
		let article = await Article.findOne({ _id: id })
		res.render('admin/article-edit', {
			link: '/admin/article-edit-modify?id=' + id,
			button: '修改',
			article,
			author: user.username,
		})
	} else {
		res.render('admin/article-edit', {
			link: '/admin/article-edit-add',
			button: '添加',
			today,
		})
	}
}
