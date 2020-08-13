const { User } = require('../../model/user');
module.exports = async (req, res) => {
    let user = await User.findOneAndDelete({ _id: req.body.id });
    res.redirect(`/admin/user?message=用户${user.username}已成功删除!`);
};