const Koa = require('koa');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const config = require('./config/default');
const path = require('path');
const app = new Koa();

// 记录日志
app.use(require('./routers/log').routes());

// 静态文件
app.use(static(path.join(__dirname, './static')));

// 解析post数据
app.use(bodyParser());

// 路由
app.use(require('./routers/user').routes());
app.use(require('./routers/prod').routes());

// 监听
app.listen(config.port, config.host);
console.log(`listened on ${config.host}:${config.port}`);