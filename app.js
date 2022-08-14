const express = require('express')
//导入用于生成JWT 字符串的包
const jwt = require('jsonwebtoken')
//导入用于将客户端发送过来的JWT字符串,解析还原成JSON 对象的包
const expressJWT = require('express-jwt')
const { use } = require('express/lib/application')
const app = express()
//secret 密钥的本质 就是一个字符串
const secretKey = 'kevin No1 '

// 注册将 JWT 字符串 解析还原成JSON 对象的中间件
// 使用app.use() 来注册中间间
// 调用expressJWT() 这个中间件函数,给他一个配置对象{},固定属性secret
// unless指定哪些接口不需要访问权限

// app.use(expressJWT({ secret:secretKey}).unless({path:[/^\/api\//]}))
// app.use(expressJWT({ secret:secretKey}))

//解析JSON数据
app.use(express.json())

//数据库用户
const database = { username: 'kevin', password: 'myx199717' }

//登录生成JWT
app.post('/login', function (req, res) {
   res.send({
      status: 200,
      message: '登陆成功',
      //调用 jwt.sign 生成JWT字符串,三个参数分别是:
      //用户对象信息,加密密钥,配置对象
      token: jwt.sign({ username: database.username }, secretKey, { expiresIn: '30s' })
   })
})


//登录生成JWT
// app.post('./login', (req, res) => {
//    const { username, password } = req.body
//    if (username === database.username && password === database.password) {
//       res.json({ username, password, message: '登陆成功' })

//       //实际开发中不要把密码送回用户,这里为了演示
//       //而且实际开发中还需要具体验证用户名密码
//       //可以使用express-validator ,joi这些依赖来验证用户名密码
//       //使用REST Client插件 来模拟前端发送请求
//    }
// })
//绑定并侦听端口

app.listen(3000, () => console.log('端口3000已被征用'))
