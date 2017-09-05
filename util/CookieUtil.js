var crypto = require('crypto');
var formatDate = require('../util/FormatDate');

class CookieUtil {
    
    constructor() {
        
    }
    static readCookie(cookieStr) {
       
        var username = "";  
        var mystatickey = "HZKJ";
        var md5 = crypto.createHash('md5');
        var sarr = cookieStr.split(":"); 
       
        username = sarr[0];  
        var todaydate = formatDate(new Date());
        var cookiedate = sarr[2];    
        var valuetime = sarr[1];  
        
        if( (parseInt(todaydate) - parseInt(cookiedate)) < parseInt(valuetime)) {
            
            var md5str = sarr[0] + sarr[1] + sarr[2] + mystatickey;
            console.log(md5str);
            md5str = md5.update(md5str).digest('hex'); //MD5加密  
            console.log(md5str);
            console.log(sarr[3]);
            if (md5str === sarr[3]){
                return sarr[0];
            }else{
                return '';
            }
            
        }else{
            return '';
        }
    }
   

    static createCookie(username) {
        var mystatickey = "HZKJ";
        var md5 = crypto.createHash('md5');
        var valuetime = 30;//暂时指定有效期为30天
        var todaystr = formatDate(new Date());
        var md5str = username + valuetime + todaystr + mystatickey;
        md5str = md5.update(md5str).digest('hex'); //MD5加密
        var cookieStr = username + ":" + valuetime + ":" + todaystr + ":" + md5str;
        return cookieStr;
    }
    
    static getCookie(key,cookie) {
        var cookies ={};
        var cookieValue = '';
        if (cookie != null) {
            cookie.split(';').forEach(l => {
                var parts = l.split('=');
                cookies[parts[0].trim()] = (parts[1] || '').trim();
            });
        }
       
        return cookies[key];
    }
 
}
module.exports = CookieUtil;