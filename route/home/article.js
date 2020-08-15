const { Article } = require('../../model/article')
const { Comment } = require('../../model/comment')
module.exports = async (req, res) => {
	// 文章访问也要通过 cookie 来确定访问者的身份。
	global.redisClient.get(`sess:${req.sessionID}`, async function (err, value) {
		const u = JSON.parse(value)
		req.app.locals.userInfo = u ? u.user : ''
		if (req.query.id) {
			const article = await Article.findOne({ _id: req.query.id }).populate(
				'author'
			)
			let comments = await Comment.find({ aid: req.query.id })
				.lean()
				.populate('uid')

			comments.forEach((value, index) => {
				comments[index].time = new Date(value.time).toLocaleString()
			})

			return res.render('home/article', {
				article,
				comments,
			})
		} else {
			return res.redirect('/home')
		}
	})
}
