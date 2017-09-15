function checkForm(){
    console.log("1111");
    if(checkQCR()){
        // if(validateUser()){
        //     return true;
        // }else{
        //     return false;
        // }
        return true;
    }else{
        return false;
    }
}

var checkQCR = function(){
    var res = verifyCode.validate(document.getElementById("code_input").value);
    console.log(res);
    if(res){
        return true;  
    }else{
        
        $(".error").html("<p style='color:red;font-size:12px;'>验证码错误.</p>");
        return false;
    }
}

var validateUser = function(){
    var username = $('#username').val();
    var password = $('#password').val();
    
    if(username != '' && password != ''){
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/background/signin',
            data: {
                username: username,
                password:password
            },
            xhrFields: {
                withCredentials:true  //支持附带详细信息
            },
            dataType: 'json',
            timeout:3000, //超时时间
            success: function(result) {
                console.log(result);
                if(result.code === '1001'){
                console.log("登录成功");
                return true;
                }else{
                    $(".error").html("<p style='color:red;font-size:12px;'>"+result.msg+"</p>");
                    return false;
                }
            },
            fail:function (err) {
                console.log(err);
            }
        });
    }else{
        $(".error").html("<p style='color:red;font-size:12px;'>"+result.msg+"</p>");
    }
}


