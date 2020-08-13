const { Article } = require('../../model/article')
module.exports = async (req, res) => {
	let article = await Article.findOneAndDelete({ _id: req.body.id })
	res.redirect(`/admin/user?message=文章《${article.title}》已成功删除!`)
}
