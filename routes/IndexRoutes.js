var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/home",function(req,res){ 
	if(!req.session.user){ 					//到达/home路径首先判断是否已经登录
		
    res.redirect("/");				//未登录则重定向到 /login 路径
    req.session.error = "请先登录"
  }
	res.render("index",{
    title:'后台管理系统',
    user:req.session.user
  });         //已登录则渲染home页面
});

router.get('/logout',function(req,res,next){
  req.session.user = null;
  req.session.error = null;
  res.redirect("/");
});

module.exports = router;
