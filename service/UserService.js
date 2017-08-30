var dao = require('../db/Dao');

class UserService {
    constructor() {
    }
    static getAllUsersOfPage(start, offset) {
        //执行获取user方法
        var sql = 'SELECT * FROM users where 1=1 limit ' + start + ',' + offset + '';
        var r_data = {};
        dao(sql, function(err, result) {
            if (result) {
                var r_data = {
                    total: result.length,
                    rows: result,
                    msg: '获取用户数据成功',
                    code: '1001'
                };
                
            }
            else {
                var r_data = {
                    msg: '获取用户数据失败',
                    code: '1000'
                };
               
            }
        });
        return r_data;
    }
    static getAllUsers(callback) {
       
        //执行获取user方法
        var sql = 'SELECT * FROM users where 1=1';
        var r_data = {};
        dao(sql, function(err, result) {
            if (result) {
                r_data = {
                    total: result.length,
                    rows: result,
                    msg: '获取用户数据成功',
                    code: '1001'
                };
                callback(r_data);
            }
            else {
                r_data = {
                    msg: '获取用户数据失败',
                    code: '1000'
                };
                callback(r_data);
            }
        });
    }
}

module.exports = UserService;