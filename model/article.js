// 此 js 文件提供 article 文章相关集合的访问接口
const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: [true, '请传入文章标题!']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请传入文章作者!']
    },
    // 发布日期
    publicDate: {
        type: Date,
        default: Date.now,
        required: [true, '请传入文章创建日期!']
    },
    // 文章封面
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = {
    Article
}