// 创建 home 页面路由
// 引入 express 框架
const express = require('express');

const home = express.Router();

home.get('/', require('./home/index'));

home.get('/article', require('./home/article'));

home.post('/comment-add', require('./home/comment-add'));

module.exports = home;