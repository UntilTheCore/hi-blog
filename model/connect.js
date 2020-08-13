// 连接数据库
// 引入 mongoose 模块
const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}/${config.get('db.collection')}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('blog数据库连接成功!');
    })
    .catch(err => {
        console.log(err, 'blog数据库连接失败!');
    });