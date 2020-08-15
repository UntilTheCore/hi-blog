const { Article } = require('../../model/article')
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
	// res.send('欢迎来到博客主页!');
	global.redisClient.get(`sess:${req.sessionID}`, async function (err, value) {
		const u = JSON.parse(value)
		u && (req.app.locals.userInfo = u.user)
		let page = req.query.page
		let articles = await pagination(Article)
			.page(page)
			.size(4)
			.display(5)
			.populate('author')
			.exec()
		// res.send(articles);
		res.render('home/default', {
			articles,
		})
	})
}
