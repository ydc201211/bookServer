var express = require('express');
var router = express.Router();
var dao = require('../db/Dao');
var setHead = require('../config/HeadConfig');

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

// 获取用户
router.get('/login', function(req, res, next){
    
    //获取前台参数
    var param = req.query || req.params;   
    
    //执行获取user方法
    dao('SELECT * FROM users where 1=1',function(err, result){
            
        if(result) {      
            var s_data = {
                total:result.length,
                rows:result,
                msg:'获取用户数据成功',
                code:'1001'
            }
            responseJSON(res, s_data);   
        }else{
            var f_data = {
                total:result.length,
                rows:result,
                msg:'获取用户数据失败',
                code:'1000'
            }
            console.log(err);
        }     
    });
});

module.exports = router;