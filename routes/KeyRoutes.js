var express = require('express');
var router = express.Router();
var dao = require('../db/Dao');
var setHead = require('../config/HeadConfig');
var keyService = require('../service/KeyService');
var codeManager = require('../util/CodeManager');

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
    
  // 跳转到书籍密码列表页
router.get('/keyPage', function(req, res, next){
    res.render('key/keyPage');
});
  
//分页获取密码列表
router.get('/getKeyList', function(req, res, next){
    // 获取前台页面传过来的参数
    var offset = req.query.offset;
    var limit = req.query.limit;
    // 获取所有秘钥的数量
    keyService.getAllKeysOfPage(offset,limit,function (ret,err) {
        responseJSON(res,ret);
    })
});

// 添加密码
router.post('/add', function(req, res, next){
    var keyCount = req.body.keyCount;
    var keyList = codeManager.createKeyList(keyCount);
    console.log(keyList);
    var errInfo = '';
    if(keyList != null){
        for(var i in keyList){
            keyService.addKey(keyList[i],function (ret,err) {
                errInfo = err
            });
            if(errInfo){
                break;
            }
        }
        var r_data = {
            msg: '添加密码成功',
            code: '1001'
        }
        responseJSON(res,r_data);
    }else{
        var r_data = {
            msg: '添加密码失败',
            code: '1001'
        }
        responseJSON(res,r_data);
    }
})

  // 删除密码
router.post('/delete', function(req, res, next){
    var keyList = req.body;
    var errInfo = '';
    if(keyList != null){
        for(var i in keyList){
            keyService.deleteKey(keyList[i].kid,function (ret,err) {
                errInfo = err
            });
            if(errInfo){
                break;
            }
        }
        var r_data = {
            msg: '删除密码成功',
            code: '1001'
        }
        responseJSON(res,r_data);
    }else{
        return;
    }
    
});
  
module.exports = router;
  