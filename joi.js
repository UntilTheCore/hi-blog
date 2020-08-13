// 引入joi模块
// 使用 joi 的练习代码
const Joi = require('@hapi/joi');

const schema = Joi.object({
    username: Joi.string().min(2).max(16).required().error(new Error('用户名验证失败!'))
});

/* try {
    schema.validateAsync({});
} catch (err) {
    console.log(err.message);
} */

const { error, value } = schema.validate({ username: 'ab' });
if (error) {
    console.log(error.message);
} else {
    console.log(value);
}
