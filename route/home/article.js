const { Article } = require('../../model/article')
const { Comment } = require('../../model/comment')
module.exports = async (req, res) => {
	global.redisClient.get(`sess:${req.sessionID}`, async function (err, value) {
		const u = JSON.parse(value)
		u && (req.app.locals.userInfo = u.user)
		if (req.query.id) {
			const article = await Article.findOne({ _id: req.query.id }).populate(
				'author'
			)
			// return res.send(article);
			let comments = await Comment.find({ aid: req.query.id })
				.lean()
				.populate('uid')

			// comments.toObject();
			// comments[0].time = [1, 2, 3, 5];
			// console.log(comments[0].time);
			comments.forEach((value, index) => {
				// value.time = new Date(value.time).toLocaleString();
				// console.log(new Date(value.time).toLocaleString());
				comments[index].time = new Date(value.time).toLocaleString()
			})

			// return res.send(comments);

			return res.render('home/article', {
				article,
				comments,
			})
		} else {
			return res.redirect('/home')
		}
	})
}
