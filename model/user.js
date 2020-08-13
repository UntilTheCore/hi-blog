// 创建用户规则
const mongoose = require('mongoose');
// 引入字段验证模块
const Joi = require('@hapi/joi');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 保证邮箱地址咋插入时是唯一的，保证数据不重复
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        default: 0
    },
});

const User = mongoose.model('User', userSchema);

// User.create({
//     username: '张三',
//     email: 'zhangsan@qq.com',
//     password: pass,
//     role: 'admin'
// }).then(result => {
//     console.log(result, '数据创建并插入成功!');
// })

// 获取加密密码

// hash.getEncrypt('888888').then(result => {
//     User.create({
//         username: '王五',
//         email: 'wangwu@qq.com',
//         password: result,
//         role: 'admin'
//     }).then(result => {
//         console.log(result, '创建用户并插入数据成功!');
//     }).catch(err => {
//         console.log(err, '创建用户失败!');
//     });
// });

// 用户信息验证
function userValidate(userObject) {
    // 创建验证规则
    const schema = Joi.object({
        username: Joi.string().min(2).max(20).required().error(new Error('用户名不符合要求!')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求!')),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().error(new Error('密码格式不符合要求!')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色格式不符合要求!')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法!'))
    });

    return schema.validate(userObject);
}

module.exports = {
    User,
    userValidate
};