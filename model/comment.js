const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: [true, '请传入文章的id']
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请传入用户的id']
    },
    // 发布评论的时间
    time: {
        type: Date,
        default: Date.now
    },
    // 评论内容
    content: {
        type: String
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
    Comment
}