var dao = require('../db/Dao');

class UserService {
    constructor() {
    }
    static getAllUsersOfPage(start, offset) {
        //执行获取user方法
        var sql = 'SELECT * FROM users where 1=1 limit ' + start + ',' + offset + '';
        var r_data = {};
        dao(sql, function(err, result) {
            if (result.length > 0) {
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
            if (result.length > 0) {
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

    static getUserByAccount(username,callback) {
       
        //执行获取user方法
        var sql = 'SELECT * FROM users WHERE 1=1 AND username="'+ username +'"';
        var r_data = {};
        dao(sql, function(err, result) {
            if (result.length > 0) {
                r_data = {
                    obj: result[0],
                    msg: '获取用户成功',
                    code: '1001'
                };
                callback(r_data);
            }
            else {
                r_data = {
                    msg: '用户不存在',
                    code: '1000'
                };
                callback(r_data);
            }
        });
    } 

    static 	validateUser(username,password,callback) {
        
        //执行获取user方法
        var sql = 'SELECT uid,username FROM users WHERE 1=1 AND username="'+ username +'" AND password="'+password+'"';
        var r_data = {};
        
        dao(sql, function(err, result) {
           
            if (result.length > 0) {
                r_data = {
                    obj: result[0],
                    msg: '验证用户成功',
                    code: '1001'
                };
                callback(r_data);
            }
            else {
                r_data = {
                    msg: '用户密码错误',
                    code: '1000'
                };
                callback(r_data);
            }
        });
    } 
}

module.exports = UserService;