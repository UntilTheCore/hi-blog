const { User } = require('../../model/user');
module.exports = async (req, res) => {
    req.app.locals.currentLink = 'user';
    let id = req.query.id;
    let { errMessage } = req.query;

    if (id) {
        let user = await User.findOne({ _id: req.query.id });
        // console.log(user);
        res.render('admin/user-edit', {
            errorMessage: errMessage,
            userid: id,
            link: '/admin/user-edit?id=' + id,
            button: '修改',
            user
        });
    } else {
        res.render('admin/user-edit', {
            errorMessage: errMessage,
            link: '/admin/user-add',
            button: '添加'
        });
    }
}