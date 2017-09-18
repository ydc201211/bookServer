var express = require('express');
var router = express.Router();
var setHead = require('../config/HeadConfig');
var cookieUtil = require('../util/CookieUtil');
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
        
    }
};

//用户登录
router.post('/login',function(req, res, next){
    var cookieValue = cookieUtil.getCookie('book.download.com',req.headers.cookie);
    var username = '';
    if(cookieValue != '' && cookieValue != undefined){
       
        username = cookieUtil.readLoginCookie(cookieValue);
        if(username != ''){
            userService.getUserByAccount(username,function(ret){
                res = setHead('CrossDomain',res,ret);
                res = setHead('login_success',res,ret);
                responseJSON(res,ret);
            });
        }else{
            res = setHead('CrossDomain',res,ret);
            res = setHead('login_fail',res,ret);
            responseJSON(res,{
                msg: '登录失败',
                code: '999'
            });
        }
    }else {
        var username = req.body.username;
        var password = req.body.password;
        if(username != '' && username != undefined){
            userService.getUserByAccount(username,function(ret){
                if(ret.code === '1001'){
                    userService.validateUser(username,password,function(ret){
                        if(ret.code === '1001'){
                            res = setHead('CrossDomain',res,ret);
                            res = setHead('login_success',res,ret);
                            // console.log(req.session);
                            // res.send(req.session.user = ret.obj);
                            // res.end();
                            responseJSON(res,ret);
                        }else{
                            res = setHead('CrossDomain',res,ret);
                            res = setHead('login_fail',res,ret);
                            responseJSON(res,ret);
                        }
                    });
                }else{
                    res = setHead('CrossDomain',res,ret);
                    res = setHead('login_fail',res,ret);
                    responseJSON(res,ret);
                }
            });
        }else{
            res = setHead('CrossDomain',res,ret);
            res = setHead('login_fail',res);
            responseJSON(res,{
                code:'1000',
                msg:'用户名不能为空'
            });
        }
    }
});

//跳转到后台登录页面
router.get('/background/login', function(req, res, next) {
    res.render('login', { title: '后台管理系统' });
});

//管理员登录
router.post('/background/siginin',function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;
    if(username != '' && username != undefined){
        userService.getUserByAccount(username,function(ret){
            if(ret.code === '1001'){
                userService.validateUser(username,password,function(ret){
                   
                    if(ret.code === '1001'){
                        res = setHead('login_success',res,ret);
                        // console.log(req.session);
                        // res.send(req.session.user = ret.obj);
                        // res.end();
                        
                        res.render('index1', { 
                            title: '首页', 
                            user: ret.obj
                        });
                        
                    }else{
                        res = setHead('login_fail',res,ret);
                        responseJSON(res,ret);
                    }
                });
            }else{
                res = setHead('login_fail',res,ret);
                responseJSON(res,ret);
            }
        });
    }else{
        
        res = setHead('login_fail',res);
        responseJSON(res,{
            code:'1000',
            msg:'用户名不能为空'
        });
    }
    
});

router.post('/index',function(req, res, next){
    res.render('index', { 
        title: '首页', 
        user: ret.obj
    });
});

module.exports = router;