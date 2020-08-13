// 引入 bcrypt 模块
const bcrypt = require('bcrypt');
// 注意：异步函数也就是加了 async 关键字的函数返回的是一个 Promise 对象。 
async function getEncrypt(password) {
    let salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports.getEncrypt = getEncrypt;