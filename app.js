// 引入系统模块
const path = require('path')

// 引入第三方模块
// 引入 express 框架
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const template = require('art-template')
const dateFormat = require('dateformat')
const morgan = require('morgan')
const config = require('config')
const redis = require('redis')
const RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()
global.redisClient = redisClient
redisClient.on('error', (err) => {
	console.log('redis error', err)
})
// 引入自定义模块
// 引入数据库连接模块
require('./model/connect')

// 引入路由模块
const home = require('./route/home')
const admin = require('./route/admin')

// 创建网站服务器
const app = express()

console.log(config.get('title'))
console.log(process.env.NODE_ENV)

// 通过读取系统环境变量来判断是否输出客户端请求信息
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	// morgam 中传入的 'dev' 是固定值，表示开发环境
	// console.log(process.env);
	console.log('当前是开发环境!')

	app.use(morgan('dev'))
} else if (process.env.NODE_ENV === 'production') {
	// 生产环境
	console.log('当前是生产环境!')
}

// 处理请求的 post 参数
app.use(bodyParser.urlencoded({ extended: false }))
// 为服务器对客户端请求创建session
// resave 和 saveUninitialized 需要配置，否则会出现弃用提示，但是不影响代码执行。
// saveUninitialized 是让客户端保存未初始化的 cookie ，我们不需要所以false
app.use(
	session({
		name: 'blog_cookie',
		secret: 'secret key',
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
		},
		store: new RedisStore({ client: redisClient }),
	})
)
// 配置静态资源访问目录 要在请求的最上面开启
app.use(express.static(path.join(__dirname, 'public')))
// 为模板配置日期处理函数 ,因为express-art-template框架使用的就是art-template框架，在下载时就是一起下载的，所以配置art-template就可以
template.defaults.imports.dateFormat = dateFormat
// 配置 express 模块框架文件目录所在位置
app.set('views', path.join(__dirname, 'views'))
// 配置 express 框架模板的默认后缀
app.set('view engine', 'art')
// 配置 express 框架在渲染后缀为 art 的模板时，使用的模板引擎是什么
app.engine('art', require('express-art-template'))

// 拦截请求 判断用户登录状态
// 使用中间件去处理登录拦截，并通过模块返回的函数实现拦截功能。等同于直接写 (req,res,next) => {}
// 这样保证了 app.js 中没有具体的逻辑代码。
app.use('/admin', require('./middleware/loginGuard'))

// 创建一级路由
app.use('/', home)
app.use('/home', home)
app.use('/admin', admin)

// 使用 express 框架的错误处理请求拦截错误消息
// 由于 err 是一个只能接受一个且是字符串的参数，所以我们在使用next()传入错误信息时要对一些是对象的或者不是对象的
// 数据转为对象后使用JSON.stringify() 将对象转为字符串，然后再通过JSON.parse() 方法将字符串转换为对象形式。
app.use(require('./middleware/errorHandle'))

// 设置 404 响应
app.use((req, res) => {
	res.status(404).send('访问的页面不存在！')
})

// 监听端口
app.listen(80)
console.log('网站服务器启动成功!')
