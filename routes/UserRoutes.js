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
    userService.getAllUsers(function(ret,err){
        responseJSON(res,ret);
    }); 
    
});

// 跳转到用户列表页
router.get('/userPage', function(req, res, next){
    res.render('user/userPage');
});

//分页获取用户列表
router.get('/getUserList', function(req, res, next){
     
    // 获取前台页面传过来的参数
    var start = req.query.start;
    var offset = req.query.offset;
    userService.getAllUsersOfPage(start, offset,function (ret,err) {
        responseJSON(res,ret);
    })
});

//更新用户
router.post('/update', function(req, res, next){
    var user = req.body;
    if(req.body != null){
        userService.updateUser(user,function (ret,err) {
            responseJSON(res,ret);
        })
    }
});

//更新用户
router.post('/add', function(req, res, next){
    
    var user = req.body;
    if(req.body != null){
        userService.addUser(user,function (ret,err) {
            responseJSON(res,ret);
        })
    }
   
});


module.exports = router;
