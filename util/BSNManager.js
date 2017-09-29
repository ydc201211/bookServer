var BSNManager = {
    createBSN:function () { 
        
        var date = new Date();
        var numArr = [0,1,2,3,4,5,6,7,8,9];
        var tempStr = 'BSN'+ date.getFullYear();
        for(var i =0; i< 7;i++){
            var index = Math.ceil(Math.random()*9);
            tempStr+=numArr[index];
        }
        return tempStr;
    }
}
module.exports = BSNManager;