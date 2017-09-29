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
            rowStyle: function (row, index) {
                
                var strclass = "";
                if (row.kEnable == 0) {
                    strclass = 'danger';//还有一个active
                }
                return { 
                    classes: strclass
                }
            },
            columns : [
                {
                    checkbox : true,
                    align : 'center'
                },
                {
                    field:'kid',
                    title:'秘钥ID',
                    align:'center',
                    sortable:true
                },
                {
                    field:'kCode',
                    title:'秘钥',
                    align:'center',
                    sortable : true
                },
                {
                    field:'kCreateTime',
                    title:'秘钥创建时间',
                    align:'center',
                    sortable: true
                },
                {
                    field:'kEnable',
                    title:'启用状态',
                    align:'center',
                    formatter : function(value, row) {
                        if(value == 1){
                            return '未启用';
                        }else{
                            return '已启用';
                        }
                        
                    }
                }   
            ]
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
        this.DeleteModal = {
            count:ko.observable()
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
                    operate.deleteWaitingModal();
                    operate.DeleteModal.count(arrselectedData.length);
                    ko.applyBindings(operate.DeleteModal, document.getElementById("delete-pop"));
                    $('.del-btn').on("click", function(e) {
                        $.ajax({
                            url: "/key/delete",
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
    //数据校验
    operateCheck:function(arr){
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