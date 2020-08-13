// 引入 bcrypt 模块 
const bcrypt = require('bcrypt');
const { User } = require('../../model/user');
module.exports = async (req, res) => {
    // 接受请求参数
    let { email, password } = req.body;
    if (email.trim().length == 0 || password.trim().length == 0) {
        // 客户端请求错误状态码返回 400
        // res.status(400).send('<h4>邮件地址或者密码错误</h4>');
        loginFaild(res);
        return;
    }

    let user = await User.findOne({ email });
    // 首先判断根据邮箱地址是否查询到用户
    if (user) {
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            req.session.username = user.username;
            // 保存用户的角色信息，用以登录判断
            req.session.role = user.role;
            // 将 user 对象开放到全局
            // app 对象通过 req 即可获取到
            req.app.locals.userInfo = user;
            // 重定向到 user 页面 admin 前面添加了 / 成为绝对路径才能正确访问。
            // 或者不写 / 服务器将以浏览器地址作为相对路径进行访问。使用绝对路径为佳
            res.redirect('/admin/user');
        } else {
            loginFaild(res);
        }
    } else {
        loginFaild(res);
    }
}

function loginFaild(res) {
    res.status(400).render('admin/error', {
        msg: '邮件地址或者密码错误,将在 3 秒后自动跳转...'
    });
}