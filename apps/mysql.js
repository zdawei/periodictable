const mysql = require('mysql');
const config = require('../config/default');

const pool  = mysql.createPool({
    host            : config.database.HOST,
    user            : config.database.USERNAME,
    password        : config.database.PASSWORD,
    database        : config.database.DATABASE,
    port            : config.database.PORT,
});

let query = ( sql, values ) => {
    return new Promise(( resolve, reject ) => {
        pool.getConnection( (err, connection) => {
            if (err) {
                reject( err );
            } else {
                connection.query(sql, values, ( err, rows) => {
                    if ( err ) {
                        reject( err );
                    } else {
                        resolve( rows );
                    }
                    connection.release();
                })
            }
        })
    });
};

// 注册用户
exports.insertData = ( value ) => {
    let _sql = "insert into users set account=?,password=?;"
    return query( _sql, value );
};

// 查找用户
exports.findUserData = ( account ) => {
    let _sql = `select * from users where account="${account}";`
    return query( _sql );
};

// 更新用户
exports.updateUserData = ( value ) => {
    let _sql = `update users set password=? where uid=?`
    return query( _sql , value);
};

// 删除用户
exports.deleteUserData = ( account ) => {
    let _sql = `delete from users where account="${account}";`
    return query( _sql );
};

// 增加元素
exports.insertEl = ( value ) => {
    let _sql = "insert into elements set uid=?,element=?,stuff=?,nature=?;"
    return query( _sql , value);
};

// 查找元素
exports.findEl = ( element ) => {
    let _sql = element ? `select * from elements where element="${element}";` : `select * from elements;`;
    return query( _sql );
};

// 更新元素
exports.updateEl = ( value ) => {
    let _sql = `update elements set uid=?, stuff=?, nature=? where element=?`;
    return query( _sql , value);
};
