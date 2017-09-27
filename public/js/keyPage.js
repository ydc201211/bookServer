$(function () {
    //1、初始化表格
    tableInit.Init();

    //2、注册增删改事件
    operate.operateInit();
});
//初始化表格
var tableInit = {
    Init: function () {
        //绑定table的viewmodel
        this.myViewModel = new ko.bootstrapTableViewModel({
            url: '/key/getKeyList',         //请求后台的URL（*）
            method: 'GET',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            queryParams: function (param) {
                return {
                    start: param.offset,
                    offset: param.limit 
                };
            },//传递参数（*）
            pagination: true,                   //是否显示分页（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                      //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        });
        ko.applyBindings(this.myViewModel, document.getElementById("tb_dept"));
    }
};
//初始化toolbar
var operate = {
    //初始化按钮事件
    operateInit: function () {
        this.operateDelete();
        this.DepartmentModel = {
            uid: ko.observable(),
            username: ko.observable(),
            password: ko.observable(),
            role: ko.observable(),
        };
    },
   
    //删除
    operateDelete: function () {
        $('#btn_delete').on("click", function () {
            var arrselectedData = tableInit.myViewModel.getSelections();
            if(!operate.operateCheck(arrselectedData)){
                return;
            }else{
                if(operate.deleteCheck(arrselectedData)){
                    $.ajax({
                        url: "/key/delete",
                        type: "POST",
                        contentType: 'application/json',
                        data: JSON.stringify(arrselectedData),
                        success: function (data, status) {
                            tableInit.myViewModel.refresh();
                        }
                    });    
                }else{
                    return;
                }   
            }
        });
    },
    //数据校验
    operateCheck:function(arr){
        if (arr.length <= 0) {
            alert("请至少选择一行数据");
            return false;
        }
        return true;
    },
    
    deleteCheck:function(arr){
        var myViewModel = 
        {
            count: ko.observable(arr.length)
        };
        ko.applyBindings(myViewModel);
        $('.del-btn').on("click", function(e) {
            return true;
        });
        return false;
    }
}