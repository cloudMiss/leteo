

$(document).ajaxStart(function(){
    NProgress.start();
})

$(document).ajaxStop(function(){
    setTimeout(function() {
        NProgress.done();
    }, 500);
})


//非登录页发送ajax验证是否登录
if(location.href.indexOf("login.html") == -1){
    $.ajax({
        url:'/employee/checkRootLogin',
        type:'get',
        success:function(data){
            if(data.error == 400){
                location.href = 'login.html';
            }
        }
    })
}

//二级菜单显示隐藏
$('.child').prev().on('click',function(){
    $(this).next().slideToggle();
})

//侧边栏显示隐藏
$('.btn_menu').on('click',function(){
    $('.lt_aside').toggleClass('now');
    $('.lt_main').toggleClass('now');
    $('.topbar').toggleClass('now');
})

$('.btn_logout').on('click',function(){
    $('#logoutModal').modal('show');

    $('.btn_confirm').off().on('click',function(){
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            success:function(data){

                if(data.success){
                    location.href = "login.html";
                }
            }
        });
    });
})