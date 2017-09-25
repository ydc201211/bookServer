// 初始化主表

$(function(){
    var userList = [];
    initTable();
})
function initTable(){
    
    var url = "/user/getUserList";
    
    $('#demo-table').bootstrapTable({
        method:'POST',
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        cache: false,
        striped: true,                      //是否显示行间隔色
        sidePagination: 'server',         //分页方式：client客户端分页，server服务端分页（*）
        url:url,
        width:$(window).width(),
        height:$(window).width(),
        showColumns:true,
        pagination:true,
        queryParams:queryParams,
        queryParamsType:'',
        minimumCountColumns:2,
        pageNumber:1,                       //初始化加载第一页，默认第一页
        pageSize: 1,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
                      
        exportDataType: 'all',
        responseHandler:responseHandler,
        columns: [
        // {
        //     field: '',
        //     title: '',
        //     formatter: function (value, row, index) {
        //         return index+1;
        //     }
        // },
        {
            field : 'uid',
            title : '用户编号',
            align : 'center',
            valign : 'middle'
        },
        {
            field : 'username',
            title : '用户名',
            align : 'center',
            valign : 'middle'
        },
        {
            field : 'role',
            title : '用户角色',
            align : 'center',
            valign : 'middle'
        },
        {
            field: '',
            title: '操作',
            align: 'center',
            valign:'middle',
            formatter: function(value) {
                return '<a class="download-btn" href='+ value +'>下载</a>'
            },
        }
        ]
    });
}