$(function(){

    //获取表单元素
    var $form = $('form');
    // console.log($form)

    //调用bootstrapValidator 校验表单
    $form.bootstrapValidator({

        // validator.methodName(params);

        //设置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //设置校验规则
        fields:{

            username:{
                validators:{
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    callback:{
                        message:"用户名错误"
                    }
                }
            },

            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码长度是6-12位"
                    },
                    callback:{
                        message:"密码错误"
                    }
                }
            }

        }

    });

    $form.on("success.form.bv",function(e){

        //阻止默认行为
        e.preventDefault();

        $.ajax({
            url:"/employee/employeeLogin",
            type:"POST",
            data:$form.serialize(),
            success:function(data){
                console.log(data)

                if(data.success){
                    location.href = 'index.html';
                }

                if(data.error == 1000){
                    $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }

                if(data.error == 1001){
                    $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
                }
            }

        })
    })

    $("[type='reset']").on('click',function(){
        $form.data("bootstrapValidator").resetForm();
    })


})