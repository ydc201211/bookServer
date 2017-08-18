var express = require('express');
var router = express.Router();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var bookSQL = require('../db/bookDB');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);
// 响应一个JSON数据
var responseJSON = function (res, ret) {
  if(typeof ret === 'undefined') { 
      res.json({  
          code:'-200',
          msg: '操作失败'   
      }); 
  } else {
      
      res.json(ret);
}};

// 获取书籍
router.post('/getBook', function(req, res, next){
    // 从连接池获取连接 
    // res.writeHead(200, {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin":"*",
    //     "Access-Control-Allow-Headers":"X-Requested-With",
    //     "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS",
    //     "X-Powered-By":" 3.2.1",
    //     "Content-Type":"application/x-www-form-urlencoded;charset=utf-8"
    // });  
       pool.getConnection(function(err, connection) { 
           // 获取前台页面传过来的参数  
           console.log(req.body);
           var param = req.query || req.params || req.body;
           
           // 建立连接 增加一个用户信息
           var start = param.pageNumber - 1;
           var offset = param.pageSize;
           
           connection.query('SELECT * FROM books where 1=1 limit '+start+','+offset+'',function(err, result) {
            
               if(result) {      
                   var s_data = {
                       total:result.length,
                       rows:result,
                       msg:'获取书籍数据成功',
                       code:'1001'
                   }
                   responseJSON(res, s_data);   
               }else{
                    var f_data = {
                        total:result.length,
                        rows:result,
                        msg:'获取书籍数据失败',
                        code:'1000'
                    }
                   console.log(err);
               }     
               // 以json形式，把操作结果返回给前台页面     
               
               // 释放连接  
               connection.release();  
   
           });
       });
   });

module.exports = router;