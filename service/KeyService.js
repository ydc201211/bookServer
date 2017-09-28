var dao = require('../db/Dao');

class KeyService {
    constructor() {
    }
    static getAllKeysOfPage(offset,limit,callback) {
        //执行获取user方法
        var _this = this;
        var sql = 'SELECT * FROM book_keys WHERE 1=1 ORDER BY kid DESC LIMIT '+ offset +','+ limit +'';
        var r_data = {};
        console.log(offset + "aksdalksd" + limit);   
        dao(sql, function(err, result) {
            if(err){
                var r_data = {
                    msg: '获取密码数据失败',
                    code: '1000'
                };
                callback(r_data,err);
            }else{
                if (result.length > 0) {
                    var r_data = {
                        total: result.length,
                        rows: result,
                        msg: '获取密码数据成功',
                        code: '1001'
                    };
                    _this.getAllKeys(function (ret) {
                        r_data.total = ret.total;
                        callback(r_data);
                    })
                }
                else {
                    var r_data = {
                        msg: '获取密码数据失败',
                        code: '1000'
                    };
                    callback(r_data);
                }
            }   
        });
    }
    static getAllKeys(callback) {
       
        var sql = 'SELECT * FROM book_keys where 1=1';
        var r_data = {};
        dao(sql, function(err, result) {
            if(err){
                callback(r_data,err);
            }else{
                if (result.length > 0) {
                    r_data = {
                        total: result.length,
                        msg: '获取所有密码数据成功',
                        code: '1001'
                    };
                    callback(r_data);
                }
                else {
                    r_data = {
                        msg: '获取所有密码数据失败',
                        code: '1000'
                    };
                    callback(r_data);
                }
            }
           
        });
    }
 
    //添加密码
    static addKey(key,callback) {
        var r_data = {};
        var sql= 'INSERT IGNORE INTO book_keys (kCode,'+
                        'kCreateTime,'+
                        'kEnable)'+ 
                        'VALUES'+
                        '("'+ key.kCode +'",'+
                        '"'+ key.kCreateTime +'",'+
                        '"'+ key.kEnable +'")';

         dao(sql, function(err, result) {
             if(err){
                console.log(err);
                r_data = {
                    obj: '',
                    msg: '添加密码失败',
                    code: '1000'
                }
                 callback(r_data,err);
             }else{
                console.log('aaaa');
                r_data = {
                    obj: '',
                    msg: '添加密码成功',
                    code: '1001'
                }
                callback(r_data,err);   
             }
         });
    }
    
    //删除密码
    static delKey(kid,callback) {
        var sql= 'DELETE FROM book_keys WHERE uid = "'+kid+'"';
        var r_data = {};
         dao(sql, function(err, result) {
             if(err){
                r_data = {
                    msg: '删除密码失败',
                    code: '1000'
                }
                callback(r_data,err);
             }else{
                r_data = {
                    msg: '删除密码成功',
                    code: '1001'
                }
                callback(r_data,err);   
             }
         });
    } 
}

module.exports = KeyService;