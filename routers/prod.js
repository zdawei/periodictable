const router = require('koa-router')();
const db = require('../apps/mysql');
const response = require('../config/response');

router.get('/aj/elsubmit', async (ctx) => {
    // curl 'http://127.0.0.1:3000/aj/elsubmit?element=o2&uid=00000000001&stuff=teststuff111&nature=testnature' -H 'Cookie: APU=test1|123|00000000001' 
    let query = ctx.query;
    let apu = ctx.cookies.get('APU').split('|');
    if(!(apu[2] && query.stuff && query.nature && query.element)) {
        return ctx.body = {code : response.INFO_ERR, res:{}, msg: response[response.INFO_ERR]};
    }
    let res = await db.findEl(query.element);
    if(res.length) {
        await db.updateEl([apu[2], query.stuff, query.nature, query.element]).catch(e => {});
    } else {
        await db.insertEl([apu[2], query.element, query.stuff, query.nature]).catch(e=> {});
    }
    let send = await db.findEl();
    ctx.body = {code : response.OK, res:send, msg: response[response.OK]};
});

router.get('/aj/getel', async (ctx) => {
    // curl 'http://127.0.0.1:3000/aj/getel'
    let res = await db.findEl();
    ctx.body = {code : response.OK, res:res, msg: response[response.OK]};
});

module.exports = router;
