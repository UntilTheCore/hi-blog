const { Article } = require('../../model/article')
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
	// 主页访问也要通过 cookie 来确定访问者的身份。
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
