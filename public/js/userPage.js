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
            url: '/user/getUserList',         //请求后台的URL（*）
            method: 'GET',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            queryParams: function (param) {
                return { 
                    start: param.offset,
                    offset: param.limit 
                };
            },//传递参数（*）
            striped: true,
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
        this.operateAdd();
        this.operateUpdate();
        this.operateDelete();
        this.DepartmentModel = {
            uid: ko.observable(),
            username: ko.observable(),
            password: ko.observable(),
            role: ko.observable(),
        };
        this.DeleteModal = {
            count:ko.observable()
        };
    },
    //新增
    operateAdd: function(){
        $('#btn_add').on("click", function () {
            $("#myModal").modal().on("shown.bs.modal", function () {
                var oEmptyModel = {
                    username: ko.observable(),
                    password: ko.observable(),
                    role: ko.observable()
                };
                $('#txt_username').attr('enable','true');
                ko.utils.extend(operate.DepartmentModel, oEmptyModel);
                ko.applyBindings(operate.DepartmentModel, document.getElementById("myModal"));
                operate.operateSave();
            }).on('hidden.bs.modal', function () {
                ko.cleanNode(document.getElementById("myModal"));
            });
        });
    },
    //编辑
    operateUpdate: function () {
        $('#btn_edit').on("click", function () {
            var arrselectedData = tableInit.myViewModel.getSelections();
            if(!operate.operateCheck(arrselectedData)){
                return;
            }else{
                $("#myModal").modal().on("shown.bs.modal", function () {
                    var arrselectedData = tableInit.myViewModel.getSelections();
                    
                    //将选中该行数据有数据Model通过Mapping组件转换为viewmodel
                    var viewModel = ko.mapping.fromJS(arrselectedData[0]);
                    $('#txt_username').attr('readonly','true');
                    ko.utils.extend(operate.DepartmentModel,viewModel);
                    ko.applyBindings(operate.DepartmentModel, document.getElementById("myModal"));
                    operate.operateSave();
                }).on('hidden.bs.modal', function () {
                    //关闭弹出框的时候清除绑定(这个清空包括清空绑定和清空注册事件)
                    ko.cleanNode(document.getElementById("myModal"));
                });
            }
        });
    },
    //删除
    operateDelete: function () {
        $('#btn_delete').on("click", function () {
            var arrselectedData = tableInit.myViewModel.getSelections();
            if(!operate.deleteCheck(arrselectedData)){
                return;
            }else{
                $("#delete-pop").modal().on("shown.bs.modal", function () {
                    operate.deleteWaitingModal();
                    operate.DeleteModal.count(arrselectedData.length);
                    ko.applyBindings(operate.DeleteModal, document.getElementById("delete-pop"));
                    $('.del-btn').on("click", function(e) {
                        $.ajax({
                            url: "/user/delete",
                            method: "POST",
                            contentType: 'application/json',
                            data: JSON.stringify(arrselectedData),
                            success: function (data, status) {
                                tableInit.myViewModel.refresh();
                                operate.deleteCompleteModal();
                            }
                        });    
                    });
                }).on('hidden.bs.modal', function () {
                    ko.cleanNode(document.getElementById("delete-pop"));
                });  
            }
        });
    },
    //保存数据
    operateSave: function () {
        $('#btn_submit').on("click", function () {
            //取到当前的viewmodel
            var oViewModel = operate.DepartmentModel;
            //将Viewmodel转换为数据model
            var oDataModel = ko.toJS(oViewModel);
            var funcName = oDataModel.uid?"update":"add";
            $.ajax({
                url: "/user/"+funcName,
                type: "POST",
                data: oDataModel,
                success: function (data, status) {
                    
                    if(status === "success"){
                        alert(data.msg);
                    }else{
                        alert(data.msg);
                    }
                    tableInit.myViewModel.refresh();
                }
            });
        });
    },
    //数据校验
    operateCheck:function(arr){
        if (arr.length <= 0) {
            alert("请至少选择一行数据");
            return false;
        }
        if (arr.length > 1) {
            alert("只能编辑一行数据");
            return false;
        }
        return true;
    },
    deleteCheck:function(arr){
        if (arr.length <= 0) {
            alert("请至少选择一行数据");
            return false;
        }
        return true;
    },
    deleteWaitingModal:function () {
        $('.delete-modal-header').html(' <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">警告</h4>')
        $('.delete-modal-body').html('<p>是否删除所选的<span id="delete-count" data-bind="value:count"></span>条数据</p>');
        $('.delete-modal-footer').html('<a href="#" class="btn btn-danger del-btn">确认</a><a href="#" class="btn btn-default" data-dismiss="modal">关闭</a>');
    },
    deleteCompleteModal:function() {
        $('.delete-modal-body').text('操作成功');
        $('.delete-modal-footer').html('<button type="button" class="btn btn-default" data-dismiss="modal">返回</button>');
    }
}