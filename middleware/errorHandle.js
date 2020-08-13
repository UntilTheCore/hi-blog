module.exports = (err, req, res, next) => {
	// 当程序发生了不可预料的错误，也会传入错误对象，这个时候需要区分处理。
	// 使用异常处理解决解析非自定义对象时的问题。
	try {
		console.log(err)
		let errObj = JSON.parse(err)
		let params = []
		for (var attr in errObj) {
			if (attr != 'path') {
				// params[attr] = errObj[attr];
				params.push(attr + '=' + errObj[attr])
			}
		}
		// console.log('errorHandle,params);

		res.redirect(`${errObj.path}?${params.join('&')}`)
	} catch (ex) {
		console.log(ex, '程序发生了未知错误!')
		res.send('程序发生了未知错误!')
	}
}
