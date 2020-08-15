const guard = (req, res, next) => {
	// 判断用户访问的是不是登录页面
	// 判断用户的登录状态
	// 如果用户是登录的 将请求放行
	// 如果用户不是登录的 将请求重定向到登录页面
	// 将 req.url 的判断写在前面 则只要不是通过 login 开始访问的请求全部都拦截，
	// 写在后面则可以使用户在有登录信息的情况下直接可以访问 user 页面。
	global.redisClient.get(`sess:${req.sessionID}`, function (err, value) {
		const u = JSON.parse(value)
		if (!u && req.url != '/login') {
			res.redirect('/admin/login')
			return
		} else if (req.session.role == 'normal' && req.url == '/loginOut') {
			// 普通用户要退出则放行
			next()
		} else {
			req.app.locals.userInfo = u ? u.user : ''
			// 用户已登录时，进行角色判断
			if (req.session.role == 'normal') {
				// 普通用户则跳转到博客主页
				return res.redirect('/home')
			}
			next()
		}
	})
}

module.exports = guard
