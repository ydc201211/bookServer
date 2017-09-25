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
router.get('/',function(req, res){

    res.render('login', 
        { 
            title: '后台管理系统',
            err:''
        });
});
  
router.post('/signin',function(req,res,next){     // 从此路径检测到post方式则进行post数据的处理操作
    //获取post上来的 data数据中 uname的值                   
    var username = req.body.username;
    var password = req.body.password;
    if(username != '' && username != undefined){
        userService.getUserByAccount(username,function(ret,err){
            if(err){
                res.send(500);
                console.log(err);
            }else if(!ret){
                req.session.error = '用户名不存在';
                res.send(404);
            }else{ 
                if(password != ret.obj.password){     //查询到匹配用户名的信息，但相应的password属性不匹配
                    req.session.error = "密码错误";
                    res.send(404);
                    // res.redirect("/login");
                }else{                                     //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                    req.session.user = ret.obj;
                    res.send(200);
                }
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

module.exports = router;