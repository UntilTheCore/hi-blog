const { Comment } = require('../../model/comment');

module.exports = async (req, res) => {
    // res.send(req.body);
    let { aid, uid, content } = req.body;
    // res.send(req.body);
    // const comment = await Comment.create(req.body);
    // if (comment) {
    //     return res.redirect(`/home/article?id=${{ aid }}`);
    // }
    // console.log(new Date());

    const comment = await Comment.create({ aid: aid, uid: uid, time: new Date(), content: content });
    // .then(result => {
    //     // console.log(result);
    //     return res.redirect(`/home/article?id=${{ aid }}`);
    // }).catch(err => {
    //     console.log(err, 'comment-add:添加评论失败!');
    // })
    if (comment) {
        return res.redirect(`/home/article?id=${aid}`);
    }
};