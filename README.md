# periodictable
---
1. 需要安装nodejs最新版环境(**node自带npm**)
2. 安装mysql最新版
3. 进入数据库执行`source ./sql/periodic_2019-03-16.sql`导入数据表
4. 使用chrome或firefox,或者其对应内核的浏览器
5. 修改`config/default`，数据库和服务器的监听地址，端口，密码等配置
6. 执行命令`npm i `安装依赖
7. 执行`npm start`打包生产环境
8. 执行`npm i -g pm2`安装服务端监听工具
9. 执行`pm2 start index.js --watch`，开启服务器
10. 可以进入`pm2 monit`查看服务端运行监控
11. 可以输入`pm2 list`查看服务端开启的简单状态
12. 文件结构
```
.
├── README.md 文档
├── apps 数据库
│   └── mysql.js
├── config 配置文件
│   ├── default.js
│   └── response.js
├── index.js 入口文件
├── package-lock.json npm包版本锁定
├── package.json npm包配置文档
├── routers 路由
│   ├── prod.js
│   └── user.js
├── sql 数据表导入
│   └── periodic_2019-03-16.sql
├── static 静态文件
├── webpack.common.js webpack配置基础
├── webpack.dev.js webpack开发配置
└── webpack.prod.js webpack生产环境配置
```