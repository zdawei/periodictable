const router = require('koa-router')();
const db = require('../apps/mysql');
const response = require('../config/response');

router.post('/aj/login', async (ctx) => {
    // curl 'http://127.0.0.1:3000/aj/login' -X POST -H "Content-Type:application/json" -d '{"account":"test1","password":"123"}'
    ctx.response.type = 'json';
    let query = ctx.request.body;
    if(!(query.account && query.password)) {
        return ctx.body = {code : response.INFO_ERR, res:{}, msg: response[response.INFO_ERR]};
    }
    query.account = encodeURIComponent(query.account || '');
    let res = await db.findUserData(query.account);
    if(res && res.length && res[0].account == query.account && res[0].password == query.password) {
        ctx.cookies.set('APU', `${res[0].account}|${res[0].password}|${res[0].uid}`,{signed:false,maxAge:60 * 60 * 24 * 365,httpOnly:false});
        return ctx.body = ctx.body = {code : response.OK, res:res[0], msg: response[response.OK]};
    } else {
        return ctx.body = {code : response.LOGIN_ERR, res:{}, msg: response[response.LOGIN_ERR]};
    }
});

router.post('/aj/reg', async (ctx) => {
    // curl 'http://127.0.0.1:3000/aj/reg' -X POST -H "Content-Type:application/json" -d '{"account":"test1","password":"123"}'
    ctx.response.type = 'json';
    let query = ctx.request.body;
    if(!(query.account && query.password)) {
        return ctx.body = {code : response.INFO_ERR, res:{}, msg: response[response.INFO_ERR]};
    }
    query.account = encodeURIComponent(query.account || '');
    let res = await db.findUserData(query.account);
    if(res && res.length) {
      return ctx.body = {code : response.HAS_REG, res:{}, msg: response[response.HAS_REG]};
    } 
    res = await db.insertData([query.account, query.password]);
    ctx.body = {code : response.OK, res:{}, msg: response[response.OK]};
});

router.get('/aj/logout', async (ctx) => {
    // curl 'http://127.0.0.1:3000/aj/logout'
    ctx.response.type = 'json';
    ctx.cookies.set('APU', ``,{signed:false,maxAge:0,httpOnly:false});
    return ctx.body = ctx.body = {code : response.OK, res:{}, msg: response[response.OK]};
});

module.exports = router;
