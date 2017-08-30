var express = require('express');
var router = express.Router();
var dao = require('../db/Dao');
var setHead = require('../config/HeadConfig');
var userService = require('../service/UserService');

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
router.get('/getUser', function(req, res, next){
    
    //获取前台参数
    var param = req.query || req.params;   
    userService.getAllUsers(function(ret){
        responseJSON(res,ret);
    }); 
    
});


module.exports = router;
