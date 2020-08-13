// 引入 user 模块
const { User } = require('../../model/user')
const bcrypt = require('bcrypt')
module.exports = async (req, res, next) => {
	let id = req.query.id
	let user = await User.findOne({ _id: id })
	let { username, email, password, role, state } = req.body
	// console.log('user-edit-modify', user);
	let isValid = await bcrypt.compare(password, user.password)
	if (isValid) {
		// res.send('密码验证成功!');
		// 向数据库中更新数据
		// 更新除了密码的其他表单数据
		let isOk = await User.updateOne(
			{ _id: id },
			{
				username,
				email,
				role,
				state,
			}
		)
		if (isOk) {
			// 更新完成，判断更新的信息是不是自己，是自己要更新管理页面的session信息
			if (req.app.locals.userInfo._id.toString() === id) {
				let user = await User.findOne({ _id: id })
				req.session.username = user.username
				req.session.role = user.role
				req.app.locals.userInfo = user
			}
			// 更新成功,重定向到用户列表页面
			// 通过地址栏反馈更新成功信息!
			res.redirect('/admin/user?message=修改成功!')
		}
	} else {
		// res.send('密码比对失败!');
		// 使用next传递错误消息并让错误处理路由处理
		// 因为重定向后依然要通过这个路由去继续处理用户修改请求，所以id参数要继续传递。
		let errObj = {
			path: '/admin/user-edit',
			errMessage: '密码错误!修改数据失败!',
			id,
		}
		return next(JSON.stringify(errObj))
	}
	// res.send(req.query);
}
