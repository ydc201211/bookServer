var express = require('express');
var router = express.Router();
var dao = require('../db/Dao');
var setHead = require('../config/HeadConfig');
var bookService = require('../service/BookService');
var bookService = require('../service/BookService');
var BSNManager = require('../util/BSNManager');
var FileUtil = require('../util/FileUtil');

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
router.get('/getChapterOfPage', function(req, res, next){
       
    // 获取前台页面传过来的参数
    var bid = req.query.parentId;
    var offset = req.query.offset;
    var limit = req.query.limit;
    bookService.getChaptersOfPage(bid,offset,limit,function (ret){
        responseJSON(res,ret);
    });
    
});
router.post('/add', function(req, res, next){
    var book = req.body;
    var r_data = {};
    
    if(book != null){
        var date = new Date();
        var dateStr = date.getFullYear() +"-"+ 
            (date.getMonth()+1)+ "-"+ date.getDate() + " " +
            date.getHours()+":"+date.getMinutes()+":"+
            date.getSeconds();
        book.bookCreateTime = dateStr;
        book.bid= BSNManager.createBSN();
        book.bookChapter = 0;
        bookService.addBook(book,function (ret,err) {
            if(err){
                var r_data = {
                    msg: '添加书籍失败',
                    code: '1000'
                }
            }else{
                var r_data = {
                    msg: '添加书籍成功',
                    code: '1001'
                }
            }
            responseJSON(res,r_data);
        });
        
    }else{
        var r_data = {
            msg: '添加书籍失败',
            code: '1000'
        }
        responseJSON(res,r_data);
    }
})

// 删除密码
router.post('/delete', function(req, res, next){
    var bookList = req.body;
    var errInfo = '';
    if(bookList != null){
        for(var i in bookList){
            console.log(bookList[i].bid);
            bookService.delBook(bookList[i].bid,function (ret,err) {
                errInfo = err
            });
            if(errInfo){
                break;
            }
        }
        var r_data = {
            msg: '删除书籍成功',
            code: '1001'
        }
        responseJSON(res,r_data);
    }else{
        return;
    }
});
//更新书籍
router.post('/update', function(req, res, next){
    var book = req.body;
    
    if(book != null){
        bookService.updateBook(book,function (ret,err) {
            responseJSON(res,ret);
        })
    }
});

//跳转到书籍详细页
router.get('/detailPage',function (req,res,next) {
    var bid = req.query.bid;
    bookService.getBookByBSN(bid,function (ret,err) {
        res.render('book/chapterPage',ret.obj);    
    });
    
})

// 删除章节
router.post('/chapter/delete', function(req, res, next){
    var chapterList = req.body;
    var errInfo = '';
    if(chapterList != null){
        for(var i in chapterList){
            console.log(chapterList[i].cid);
            bookService.delChapter(chapterList[i].cid,function (ret,err) {
                errInfo = err
            });
            if(errInfo){
                break;
            }
        }
        var r_data = {
            msg: '删除章节成功',
            code: '1001'
        }
        responseJSON(res,r_data);
    }else{
        return;
    }
});

// 添加章节
router.post('/chapter/add', function(req, res, next){
    //移动文件
    var chapter = req.body;
    var r_data = {};
    var srcPath = '/public/tempFiles/'+ chapter.downloadUrl;
    var desPath = '/public/files/'+ chapter.downloadUrl;
    
    var date = new Date();
    var dateStr = date.getFullYear() +"-"+ 
        (date.getMonth()+1)+ "-"+ date.getDate() + " " +
        date.getHours()+":"+date.getMinutes()+":"+
        date.getSeconds();
    chapter.chapterEditTime = dateStr;
    chapter.downloadUrl = desPath;
    
    if(FileUtil.fileTransfer(srcPath,desPath)){
        if(chapter != null){
            bookService.addChapter(chapter,function (ret,err){
                responseJSON(res,ret);
            });
        }else{
            
            r_data = {
                msg: '保存章节失败',
                code: '1000'
            }
        }
    }else{
        r_data = {
            msg: '保存章节失败',
            code: '1000'
        }
        responseJSON(res,r_data);
    }
});

// 编辑章节
router.post('/chapter/update', function(req, res, next){
    //移动文件
    var chapter = req.body;
    var r_data = {};
    var srcPath = '/public/tempFiles/'+ chapter.downloadUrl;
    var desPath = '/public/files/'+ chapter.downloadUrl;
    
    var date = new Date();
    var dateStr = date.getFullYear() +"-"+ 
        (date.getMonth()+1)+ "-"+ date.getDate() + " " +
        date.getHours()+":"+date.getMinutes()+":"+
        date.getSeconds();
    chapter.chapterEditTime = dateStr;
    chapter.downloadUrl = desPath;
    
    if(FileUtil.fileTransfer(srcPath,desPath)){
        if(chapter != null){
            bookService.updateChapter(chapter,function (ret,err){
                responseJSON(res,ret);
            });
        }else{
            
            r_data = {
                msg: '保存章节失败',
                code: '1000'
            }
        }
    }else{
        r_data = {
            msg: '保存章节失败',
            code: '1000'
        }
        responseJSON(res,r_data);
    }
});

module.exports = router;