$(function () {
    //1、初始化表格
    tableInit.Init();

    //2、注册增删改事件
    operate.operateInit();

    $('#addKeys').on('click',function (e) {
       var count =  $('.count-select').val();
        
        if(count != ''){
            $.ajax({
                url: "/key/add",
                method: "POST",
                contentType: 'application/x-www-form-urlencoded',
                dataType:'json',
                data: {
                    keyCount:count
                },
                success: function (data, status) {
                    tableInit.myViewModel.refresh();
                }
            });
        }else{
            return;
        }
    })
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
                    offset: param.offset,
                    limit: param.limit 
                };
            },
            striped: true,
            pagination: true,                //是否显示分页（*）
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
                $("#delete-pop").modal().on("shown.bs.modal", function () {
                    var myViewModel = 
                    {
                        count: ko.observable(arrselectedData.length)
                    };
                    ko.applyBindings(myViewModel,
                         document.getElementById("delete-pop"));
                    $('.del-btn').on("click", function(e) {
                        $.ajax({
                            url: "/key/delete",
                            method: "POST",
                            contentType: 'application/json',
                            data: JSON.stringify(arrselectedData),
                            success: function (data, status) {
                                tableInit.myViewModel.refresh();
                            }
                        });    
                    });
                }).on('hidden.bs.modal', function () {
                    ko.cleanNode(document.getElementById("delete-pop"));
                });  
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
    
}