var dao = require('../db/Dao');

class BookService {
    
    constructor() {
    }
    static getAllBooksOfPage(offset,limit,callback) {
        //分页获取书籍
        var _this = this;
        var sql = 'SELECT * FROM  books where 1=1 ORDER BY bid DESC LIMIT ' + offset + ',' + limit + '';
        var r_data = {};
        dao(sql, function(err, result) {
            if (result.length > 0) {
                var r_data = {
                    total: result.length,
                    rows: result,
                    msg: '获取书籍数据成功',
                    code: '1001'
                };
                _this.getAllBooks(function(ret) {
                    r_data.total = ret.total;
                    callback(r_data);
                });
            }else {
                var r_data = {
                    msg: '获取书籍数据失败',
                    code: '1000'
                };
                callback(r_data);
            }
        });
        
    }
    static getAllBooks(callback) {
       
        //获取所有书籍
        var sql = 'SELECT * FROM books where 1=1';
        var r_data = {};
        dao(sql, function(err, result) {
            if (result.length > 0) {
                r_data = {
                    total: result.length,
                    msg: '获取书籍数据成功',
                    code: '1001'
                };
                callback(r_data);
            }else {
                r_data = {
                    msg: '获取书籍数据失败',
                    code: '1000'
                };
                callback(r_data);
            }
        });
    }

    static getBookByBSN(bid,callback) {
        
         //通过书籍号获取书籍信息
        var sql = 'SELECT * FROM books where 1=1 AND bid="'+ bid +'"';
        var r_data = {};
        dao(sql, function(err, result) {
            if (result.length > 0) {
                r_data = {
                    obj:result[0],
                    msg: '获取书籍数据成功',
                    code: '1001'
                };
                callback(r_data);
            }else {
                r_data = {
                    msg: '获取书籍数据失败',
                    code: '1000'
                };
                callback(r_data);
            }
        });
    }

    static getChapters(bid,callback) {
        
         //根据书籍号获得章节
        var sql = 'SELECT * FROM chapters where 1=1 and bid="'+ bid +'"';
        var r_data = {};
        dao(sql, function(err, result) {
            if (result) {
                r_data = {
                    total: result.length,
                    rows: result,
                    msg: '获取书籍数据成功',
                    code: '1001'
                };
                callback(r_data);
            }else {
                r_data = {
                    msg: '获取书籍数据失败',
                    code: '1000'
                };
                callback(r_data);
            }
        });
    }

    static getChaptersOfPage(bid,offset,limit,callback) {
        
         //分页获取章节
        var sql = 'SELECT * FROM chapters where 1=1 and bid="'+ bid +
            '" ORDER BY chapterNO ASC LIMIT ' + offset + ',' + limit + '';
        var r_data = {};
        dao(sql, function(err, result) {
            if (result) {
                console.log(err);
                r_data = {
                    total: result.length,
                    rows: result,
                    msg: '获取书籍数据成功',
                    code: '1001'
                };
                callback(r_data);
            }else {
                r_data = {
                    msg: '获取书籍数据失败',
                    code: '1000'
                };
                callback(r_data);
            }
        });
    }

    /**
     * 添加书籍
     * @param {*} book 
     * @param {*} callback 
     */
    static addBook(book,callback){
        var r_data = {};
        var sql= 'INSERT IGNORE INTO books (bid,'+
                        'bookName,'+
                        'bookCreateTime,'+
                        'bookChapter,'+ 
                        'bookAuthor)'+
                        'VALUES'+
                        '("'+ book.bid +'",'+
                        '"'+ book.bookName +'",'+
                        '"'+ book.bookCreateTime +'",'+
                        '"'+ book.bookChapter +'",'+
                        '"'+ book.bookAuthor +'")'
        dao(sql, function(err, result) {
            if(err){
                r_data = {
                    msg: '添加书籍失败',
                    code: '1000'
                }
                callback(r_data,err);
            }else{
                r_data = {
                    msg: '添加书籍成功',
                    code: '1001'
                }
                callback(r_data,err);   
            }
        });
    }

    //更新书籍
    static updateBook(book,callback) {
        var r_data = {};
        console.log(book);
        var sql= 'UPDATE books SET '+ 
                'bookName ="'+ book.bookName +'",'+ 
                'bookCreateTime ="'+ book.bookCreateTime +'",'+
                'bookChapter ='+ book.bookChapter +','+
                'bookAuthor = "'+ book.bookAuthor+'"'+
                'WHERE bid = "'+ book.bid +'"';
        
         dao(sql, function(err, result) {
             if(err){
                console.log(err);
                r_data = {
                    msg: '更新书籍失败',
                    code: '1000'
                }
                 callback(r_data,err);
             }else{
                r_data = {
                    obj: '',
                    msg: '更新书籍成功',
                    code: '1001'
                }
                callback(r_data,err);   
             }
         });
    }

    //删除书籍
    static delBook(bid,callback) {
        var sql= 'DELETE FROM books WHERE bid = "'+bid+'"';
        var r_data = {};
        dao(sql, function(err, result) {
            if(err){
            r_data = {
                msg: '删除书籍失败',
                code: '1000'
            }
            callback(r_data,err);
            }else{
            r_data = {
                msg: '删除书籍成功',
                code: '1001'
            }
            callback(r_data,err);   
            }
        });
    }
    
    //添加章节
    static addChapter(chapter,callback) {
        var sql= 'INSERT IGNORE INTO chapters (chapterName,'+
                    'chapterNO,'+
                    'chapterSize,'+
                    'chapterEditTime,'+ 
                    'downloadUrl,'+ 
                    'bid)'+
                    'VALUES'+
                    '("'+ chapter.chapterName +'",'+
                    ''+ chapter.chapterNO +','+
                    ''+ chapter.chapterSize +','+
                    '"'+ chapter.chapterEditTime +'",'+
                    '"'+ chapter.downloadUrl +'",'+
                    '"'+ chapter.bid +'")'
        var r_data = {};
        dao(sql, function(err, result) {
            if(err){
                r_data = {
                    msg: '保存章节失败',
                    code: '1000'
                }
                callback(r_data,err);
            }else{
                r_data = {
                    msg: '保存章节成功',
                    code: '1001'
                }
                callback(r_data,err);   
            }
        });
    }


     //更新章节
     static updateChapter(chapter,callback) {
        var r_data = {};
        
        var sql= 'UPDATE chapters SET '+ 
                'chapterName ="'+ chapter.chapterName +'",'+ 
                'chapterNO ='+ chapter.chapterNO +','+
                'chapterSize ='+ chapter.chapterSize +','+
                'chapterEditTime = "'+ chapter.chapterEditTime+'",'+
                'downloadUrl = "'+ chapter.downloadUrl+'"'+
                'WHERE cid = '+ chapter.cid +'';
        
         dao(sql, function(err, result) {
             if(err){
                console.log(err);
                r_data = {
                    msg: '更新书籍失败',
                    code: '1000'
                }
                 callback(r_data,err);
             }else{
                r_data = {
                    obj: '',
                    msg: '更新书籍成功',
                    code: '1001'
                }
                callback(r_data,err);   
             }
         });
    }

     //删除章节
     static delChapter(cid,callback) {
        var sql= 'DELETE FROM chapters WHERE cid = '+cid+'';
        var r_data = {};
        dao(sql, function(err, result) {
            if(err){
                r_data = {
                    msg: '删除章节失败',
                    code: '1000'
                }
                callback(r_data,err);
            }else{
                r_data = {
                    msg: '删除章节成功',
                    code: '1001'
                }
                callback(r_data,err);   
            }
        });
    }
}

module.exports = BookService;