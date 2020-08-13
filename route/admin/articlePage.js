// 此模块用来渲染文章列表，需要向数据库中查询文章的数据
const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    req.app.locals.currentLink = 'article';
    let page = req.query.page;
    // 查询一共有多少个文章数据
    // let counts = await Article.countDocuments();
    // console.log(counts);

    // 查询出所有文章的数据出来
    // page 指定当前页
    // size 指定每页显示的数据条数
    // display 指定客户端要显示的页码数量
    let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();
    // res.send(articles);
    res.render('admin/article', {
        articles
    });
};