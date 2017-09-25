$(function() {
    BUI.use('common/main',function(){
        var config = [
            {
                id:'sys',
                homePage:'user',
                menu:[
                {
                    text:'系统管理',
                    
                    items:[
                    {
                        id:'user',
                        text:'用户管理',
                        href:'user/userPage'
                    },
                    {
                        id:'key',
                        text:'密码管理',
                        href:'key/keyPage'
                    },
                    {
                        id:'book',
                        text:'书籍管理',
                        href:'book/keyPage'
                    }]
                }]
            }]
            // {
            //     id:'7',
            //     homePage : '9',
            //     menu:[
            //     {
            //         text:'业务管理',
            //         items:[
            //         {
            //             id:'9',
            //             text:'查询业务',
            //             href:'Node/index.html'
            //         }]
            //     }]
            // }];
        new PageUtil.MainPage({
            modulesConfig : config
        });
    });
})