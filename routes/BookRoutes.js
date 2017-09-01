var express = require('express');
var router = express.Router();
var dao = require('../db/Dao');
var setHead = require('../config/HeadConfig');
var bookService = require('../service/BookService');

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
    
    // 设置跨域请求
    res = setHead(true,res);
    
     // 获取前台页面传过来的参数  
    var params = req.body;
    
    var start = params.pageNumber - 1;
    var offset = params.pageSize;
    bookService.getAllBooksOfPage(start,offset,function(ret) {
        responseJSON(res,ret);
    }); 
    
});

// 获取书籍章节
router.post('/getChapter', function(req, res, next){
     // 设置跨域请求
     res = setHead('CrossDomain',res);
     
      // 获取前台页面传过来的参数
    var params = req.body;
    var bid = params.parentId;
    bookService.getChapters(bid,function (ret){
        responseJSON(res,ret);
    });
    
});

module.exports = router;