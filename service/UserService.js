var dao = require('../db/Dao');

class UserService {
    constructor() {
    }
    static getAllUsersOfPage(start,offset,callback) {
        //执行获取user方法
        var _this = this;
        var sql = 'SELECT * FROM users where 1=1 ORDER BY uid DESC limit ' + start + ',' + offset + '';
        var r_data = {};
        
        dao(sql, function(err, result) {
            if(err){
                callback(r_data,err);
            }else{
                if (result.length > 0) {
                    var r_data = {
                        total: result.length,
                        rows: result,
                        msg: '获取用户数据成功',
                        code: '1001'
                    };
                    _this.getAllUsers(function(ret){
                        r_data.total = ret.total;
                        callback(r_data);
                    })
                   
                }
                else {
                    var r_data = {
                        msg: '获取用户数据失败',
                        code: '1000'
                    };
                    callback(r_data);
                }
            }   
        });
        return r_data;
    }
    static getAllUsers(callback) {
       
        //执行获取user方法
        var sql = 'SELECT * FROM users where 1=1';
        var r_data = {};
        dao(sql, function(err, result) {
            if(err){
                callback(r_data,err);
            }else{
                if (result.length > 0) {
                    r_data = {
                        total: result.length,
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
            }
           
        });
    }

    static getUserByAccount(username,callback) {
       
        //执行获取user方法
        var sql = 'SELECT * FROM users WHERE 1=1 AND username="'+ username +'"';
        var r_data = {};
        dao(sql, function(err, result) {
            if(err){
                callback(r_data,err);
            }else{
                if (result.length > 0) {
                    r_data = {
                        obj: result[0],
                        msg: '获取用户成功',
                        code: '1001'
                    };
                    callback(r_data,err);
                }else {
                    callback(r_data,err);
                }
            }
           
        });
    } 

    //验证用户
    static 	validateUser(username,password,callback) {
        
        //执行获取user方法
        var sql = 'SELECT uid,username FROM users WHERE 1=1 AND username="'+ username +'" AND password="'+password+'"';
        var r_data = {};
        
        dao(sql, function(err, result) {
            if(err){
                callback(r_data,err);
            }else{
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
            }
           
        });
    } 

    //更新用户
    static updateUser(user,callback) {
        var r_data = {};
        var sql= 'UPDATE users SET '+ 
                'username ="'+ user.username +'",'+ 
                'password ="'+ user.password +'",'+
                'role ="'+ user.role +'"'+
                'WHERE uid = '+ user.uid +'';

         dao(sql, function(err, result) {
             if(err){
                console.log(err);
                r_data = {
                    msg: '更新用户失败',
                    code: '1000'
                }
                 callback(r_data,err);
             }else{
                r_data = {
                    obj: '',
                    msg: '更新用户成功',
                    code: '1001'
                }
                callback(r_data,err);   
             }
         });
    }
    
    //添加用户
    static addUser(user,callback) {
        
        var sql= 'INSERT INTO users (username,'+
                        'password,'+
                        'role)'+ 
                        'VALUES'+
                        '("'+ user.username +',"'+
                        '"'+ user.password +',"'+
                        '"'+ user.role +'")';

         dao(sql, function(err, result) {
             if(err){
                r_data = {
                    obj: '',
                    msg: '添加用户失败',
                    code: '1000'
                }
                 callback(r_data,err);
             }else{
                r_data = {
                    obj: '',
                    msg: '添加用户成功',
                    code: '1001'
                }
                callback(r_data,err);   
             }
         });
     } 
}

module.exports = UserService;