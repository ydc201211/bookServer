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

// 跳转到用户列表页
router.get('/userPage', function(req, res, next){
    res.render('user/index');
});

//分页获取用户列表
router.get('/getUserList', function(req, res, next){
     
      // 获取前台页面传过来的参数  
     var params = req.body;
     
     var start = params.pageNumber - 1;
     var offset = params.pageSize;
    userService.getAllUsersOfPage(start, offset,function (ret) {
        responseJSON(res,ret);
    })
});


module.exports = router;
