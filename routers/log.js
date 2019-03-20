const router = require('koa-router')();
const fs = require('fs');
const path = require('path');

const getUserIp = (req) => {
    return req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
};

router.all('*', (ctx, next) => {
    let msg = `${getUserIp(ctx.req)}, ${ctx.path}, ${new Date()}, ${JSON.stringify(ctx.headers)}\n`;
    let logPath = path.join(__dirname , '../config/log');

    fs.appendFile(logPath, msg,function(err){
        if(err) {console.log(err);return ;}
        fs.readFile(logPath, 'utf8',function(error,data){
            if(error){console.log(error); return;}
            let _data = data.split('\n');
            if(_data.length > 10) {
                fs.writeFile(logPath, _data.slice(parseInt(_data.length / 2)).join('\n'), (err) => {
                    if(err) {console.log(err); return ;}
                });
            }
        });
    });
    return next();
});


module.exports = router;
