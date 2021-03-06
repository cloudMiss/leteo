$(function(){

    var currentPage = 1;
    var pageSize = 5;
 
    function render(){
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            type:'get',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                // console.log(data)
                $('tbody').html( template("firstTmp",data));
                
                //渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(data.total / pageSize),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }
    render();

    $('.btn_add').on('click',function(){
        $('#addModal').modal('show')
    })

    var $form = $('form');
    // console.log($form);
    $form.bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },

        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"请输入一级分类"
                    }
                }
            }
        }
    })

    $form.on('success.form.bv',function(e){
        e.preventDefault();
        console.log(666)
        console.log($form.serialize());
        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data:$form.serialize(),
            success:function(data){
                console.log(data);
                if(data.success){
                    currentPage = 1;
                    render();
                    // $form.data('bootstrapValidator').resetForm();
                    $form.data("bootstrapValidator").resetForm();
                    $form[0].reset();
                    $('#addModal').modal('hide');
                }
            }
        })
       
    })

})
