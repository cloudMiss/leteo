$(function(){
    var currentPage = 1;
    var pageSize = 5;

    function render(){

        $.ajax({
            url:'/category/querySecondCategoryPaging',
            type:'get',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                console.log(data);
                $('tbody').html( template("secondTmp",data));
            }
        })
    }
    render();
})
