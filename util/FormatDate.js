  //格式化日期
var FormatDate = function(strTime) {
    var date = new Date(strTime);
    return date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate();
}

module.exports = FormatDate;