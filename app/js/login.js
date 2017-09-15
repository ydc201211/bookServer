function checkForm() {
   
    if(checkQcr){
        validateUser()
    }else{
        return false;
    }
}
function checkQCR(){
    var res = verifyCode.validate(document.getElementById("code_input").value);
    if(res){
        return true;  
    }else{
        
        $(".error").html("<p style='color:red;font-size:12px;'>验证码错误.</p>");
        return false;
    }
}
function validateUser(){

}