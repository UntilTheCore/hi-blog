// 创建 admin 路由
// 引入 express 框架
const express = require('express')

const admin = express.Router()

// 创建二级路由
// 登录页面
admin.get('/login', require('./admin/loginPage'))

// 实现登录功能
admin.post('/login', require('./admin/login'))

// 实现退出登录功能
admin.get('/loginout', require('./admin/loginOut'))

// 创建 user 页面路由
admin.get('/user', require('./admin/userPage'))

// 创建 user-edit 页面访问路由
admin.get('/user-edit', require('./admin/user-edit'))
// 处理用户编辑修改路由
admin.post('/user-edit', require('./admin/user-edit-modify'))
// 创建 user-edit 表单处理路由 处理用户添加
admin.post('/user-add', require('./admin/user-edit-add'))
// 删除用户路由
admin.post('/user-delete', require('./admin/user-edit-delete'))

// 创建 article 文章管理页面访问路由
admin.get('/article', require('./admin/articlePage'))
// 创建 article-edit 文章编辑页面访问路由,此路由实现文章编辑页面的渲染以及数据的分类处理。
admin.get('/article-edit', require('./admin/article-edit'))
// 创建 article-edit 的文章添加路由 处理post新增文章请求
admin.post('/article-edit-add', require('./admin/article-edit-add'))
// article-edit-modify 文章修改路由
admin.post('/article-edit-modify', require('./admin/article-edit-modify'))
// 创建 article-delete 文章删除路由, 处理 POST 删除文章请求
admin.post('/article-delete', require('./admin/article-delete'))

// 创建 article 页面路由
admin.get('/article', (req, res) => {
	res.render('admin/article')
})

// 创建 article 页面路由
admin.get('/articleedit', (req, res) => {
	res.render('admin/article-edit')
})

module.exports = admin
