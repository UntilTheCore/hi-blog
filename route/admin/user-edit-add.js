// 引入加密模块,获得加密函数
const { getEncrypt } = require('../../middleware/hash');
// 引入 User 模块实现用户添加功能
const { User, userValidate } = require('../../model/user');


module.exports = async (req, res, next) => {
    const { error, value } = userValidate(req.body);
    if (error) {
        // console.log(error.message, '验证失败!');
        // 重定向到用户编辑页面并携带参数。
        // return 是为了阻止代码继续运行。
        return next(JSON.stringify({ path: '/admin/user-edit', errMessage: error.message }));
        // return res.redirect(`/admin/user-edit?message=${error.message}`);
    } else {
        // console.log(value, '验证通过!');
        // 由于 email 是唯一的所以要通过 User 去查找在数据库中是否有相同邮箱的用户
        let user = await User.findOne({ email: value.email });
        if (user) {
            // 通过邮箱查到有此人则重定向回页面
            // console.log(user);
            // return res.redirect(`/admin/user-edit?message=${'此邮箱已经注册，请使用其他邮箱注册!'}`);
            return next(JSON.stringify({ path: '/admin/user-edit', errMessage: '此邮箱已经注册，请使用其他邮箱注册!' }));
        } else {
            // console.log('这个邮箱未被使用!');
            // 通过 User 模块向数据库中添加用户
            // 先将用户的密码加密
            let encryptPassword = await getEncrypt(value.password);
            // console.log(encryptPassword);
            req.body.password = encryptPassword;
            // res.send(req.body);
            let registUser = await User.create(req.body);
            if (registUser) {
                console.log(registUser, '新用户注册成功!');
                // return res.redirect(`/admin/user-edit?message=${'新用户注册成功!'}`);
                return next(JSON.stringify({ path: '/admin/user-edit', errMessage: '新用户注册成功!' }));
            }
        }
    }
}