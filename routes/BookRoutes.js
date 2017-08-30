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

// 获取书籍
router.post('/getBook', function(req, res, next){
    
    // 设置跨域请求
    res = setHead(true,res);
    
     // 获取前台页面传过来的参数  
    var params = req.body;
    
    var start = params.pageNumber - 1;
    var offset = params.pageSize;
  
        //执行获取book方法
        dao('SELECT * FROM books where 1=1 limit '+ start +','+ offset +'',function(err, result){
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
        });
    
});

// 获取书籍
router.post('/getChapter', function(req, res, next){
     // 设置跨域请求
     res = setHead(true,res);
     
      // 获取前台页面传过来的参数
    var params = req.body;
    var bid = params.parentId;
    console.log(bid);
  
        //执行获取书本章节
        dao('SELECT * FROM chapters where 1=1 and bid="'+ bid +'"',function(err, result){
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
        });
    
});

module.exports = router;