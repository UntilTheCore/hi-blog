// 引入 user 模块
const { User } = require('../../model/user');

module.exports = async (req, res) => {

    // users.forEach(item => {
    //     console.log(item.username);

    // })
    req.app.locals.currentLink = 'user';
    // 设定一页显示的数量
    const pageSize = 10;
    // 获取数据库中有多少条用户数据
    let counts = await User.countDocuments();
    // 通过获取的总条数设置要显示的分页数量
    let pageCount = Math.ceil((counts / pageSize));
    // 设置当前页
    // 阻止用户通过地址栏发送恶意不存在的 page 数据
    if (req.query.page && req.query.page <= 0) {
        req.query.page = 1;
    } else if (req.query.page && req.query.page > pageCount) {
        req.query.page = pageCount;
    }
    let currentPage = req.query.page || 1;
    // console.log(pageCount);
    // 设置显示条数，跳过的条数：翻页时以 (下一页页码 - 1) * pageSize
    let sikp = (req.query.page - 1) * pageSize;
    let users = await User.find({}).limit(pageSize).skip(req.query.page ? sikp : 0);

    res.render('admin/user', {
        users,
        pageCount,
        currentPage,
        counts
    });
    // res.send(users);
}