// 导入mysql模块
var mysql = require('mysql');
//导入mysql配置文件
var dbConfig = require('../db/DBConfig');

// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);

var Dao = function(sql,callback){
  pool.getConnection(function(err, connection) {
    connection.query(sql,function(err, result) {
        callback(err,result);
        // 以json形式，把操作结果返回给前台页面     
        
        // 释放连接  
        connection.release();  

    });
  });
}
module.exports = Dao;