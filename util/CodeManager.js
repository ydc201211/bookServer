  //密码管理
var CodeManager = {
    createKeyList:function(keyCount) {
        var keyList = [];
        for(var i= 0;i < keyCount;i++){
            var tempStr = this.createCode();
            var date = new Date();
            
            var dateTime = date.getFullYear()+
                "-" + (date.getMonth()+1)+"-"+date.getDate()+
                " " + date.getHours()+":"+date.getMinutes()+
                ":" + date.getSeconds();
            var key = {
                'code': tempStr,
                'createTime': dateTime,
                'enable': 1
            }
            keyList.push(key);
        }
    },
    createCode:function () {
        var keyStr = '';
        var charArr = [
            '1','2','3','4','5',
            '6','7','8','9','0',
            'A','B','C','D','E',
            'F','G','H','I','J',
            'K','L','M','N','O',
            'P','Q','R','S','T',
            'U','V','W','X','Y',
            'Z','a','b','c','d',
            'e','f','g','h','i',
            'j','k','l','m','n',
            'o','p','q','r','s',
            't','u','v','w','x',
            'y','z'
        ];

        for(var j = 0; j < 6;j++){
            var index = Math.ceil(Math.random()*61);
            keyStr+=charArr[index];
        }
        return keyStr;
    }
}

module.exports = CodeManager;