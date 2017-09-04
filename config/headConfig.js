var cookieUtil = require('../util/CookieUtil');

var setHead = function(type,res,data){
    if(type === 'CrossDomain'){
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
    }else if(type === 'login_success'){
        var today = new Date()
        var expireTime = today.getTime() + 30*24*60*60*1000 + 8*60*60*1000;//设置过期时间为一个月(获取的为UTC时间，所以要加上8小时时差)
        var expireDate = new Date(expireTime);//过期日期
        var timeObj = expireDate.toGMTString();
        
        res.header(
            'Set-Cookie',['myCookie="'+ cookieUtil.createCookie(data.obj.username) +'";path="/";Expires='+timeObj+';httpOnly=true',
                            'logged_in="yes";path="/";Expires=;httpOnly=true']
        );
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
    }else if(type === 'login_fail'){
        res.header(
            'Set-Cookie','logged_in="no";path="/";Expires="";httpOnly=true'
        );
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1');
        res.header("Content-Type", "application/json;charset=utf-8");
    }
  
    return res;
}


module.exports = setHead;