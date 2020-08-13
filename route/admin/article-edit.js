const { Article } = require('../../model/article')

// 此路由处理文章编辑页面的 get 请求，主要用来渲染 article-edit 页面。
module.exports = async (req, res) => {
	req.app.locals.currentLink = 'article'
	let id = req.query.id
	if (id) {
		let article = await Article.findOne({ _id: id })
		res.render('admin/article-edit', {
			link: '/admin/article-edit-modify?id=' + id,
			button: '修改',
			article,
		})
	} else {
		res.render('admin/article-edit', {
			link: '/admin/article-edit-add',
			button: '添加',
		})
	}
}
