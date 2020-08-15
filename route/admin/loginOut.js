module.exports = (req, res) => {
	console.log(req.session)
	// 删除 session
	req.session.destroy(function () {
		// 删除 cookie
		res.clearCookie('blog_cookie')
		// 重定向到用户登录页面
		res.redirect('/admin/login')
		// 清除用户在模板中的全局信息
		req.app.locals.userInfo = null
	})
	console.log(req.session)
}
