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

router.get('/bookPage',function (req,res,next) {
    res.render('book/bookPage');
})
// 获取书籍
router.get('/getBookList',function(req, res, next){
    
    // 设置跨域请求
    res = setHead('CrossDomain',res);
    
    var offset = req.query.offset;
    var limit = req.query.limit;
    
    bookService.getAllBooksOfPage(offset,limit,function(ret) {
        responseJSON(res,ret);
    }); 
    
});

// 获取书籍章节
router.get('/getChapter', function(req, res, next){
    // 设置跨域请求
    res = setHead('CrossDomain',res);
     
    // 获取前台页面传过来的参数
    var bid = req.query.parentId;
    bookService.getChapters(bid,function (ret){
        responseJSON(res,ret);
    });
    
});

module.exports = router;