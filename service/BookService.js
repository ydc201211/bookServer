var dao = require('../db/Dao');

class BookService {
    

    constructor() {
        
    }
    static getAllBooksOfPage(start, offset,callback) {
        //执行获取user方法
        var _this = this;
        var sql = 'SELECT * FROM  books where 1=1 limit ' + start + ',' + offset + '';
        var r_data = {};
        dao(sql, function(err, result) {
            if (result.length > 0) {
                var r_data = {
                    total: result.length,
                    rows: result,
                    msg: '获取用户数据成功',
                    code: '1001'
                };
                _this.getAllBooks(function(ret) {
                    r_data.total = ret.total;
                    callback(r_data);
                });
            }else {
                var r_data = {
                    msg: '获取用户数据失败',
                    code: '1000'
                };
                callback(r_data);
            }
        });
        
    }
    static getAllBooks(callback) {
       
        //执行获取user方法
        var sql = 'SELECT * FROM books where 1=1';
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
            }else {
                r_data = {
                    msg: '获取用户数据失败',
                    code: '1000'
                };
                callback(r_data);
            }
        });
    }

    static getChapters(bid,callback) {
        
         //执行获取user方法
         var sql = 'SELECT * FROM chapters where 1=1 and bid="'+ bid +'"';
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
             }else {
                 r_data = {
                     msg: '获取用户数据失败',
                     code: '1000'
                 };
                 callback(r_data);
             }
         });
     }
}

module.exports = BookService;