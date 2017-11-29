/**
 * Created by Administrator on 2017/11/26.
 */


//获取评论
function getConfig(){
    $.get('https://api.github.com/repos/walidream/waliblog/issues',function(data){
        if(data.length>0){
            window.GLVARIABLE.gh_comment = data;
        }
    });
}
//获取首页评论
function getHomeComment(){
    if(window.GLVARIABLE.gh_comment.length > 0){
        var ci = '';
        window.GLVARIABLE.gh_comment.forEach(function(val,ind){
            if( ind <10 ){
               var commentItem = '<li class="comment-item"><span class="comment-user">'+val.user.login+'：</span><a href="javascript:void(0)" class="comment-link">'+val.body+'</a></li>';
               ci += commentItem;
            }
        });
        $('#home-comment').empty().append(ci);
    }else {
        $.get('https://api.github.com/repos/walidream/waliblog/issues',function(data){
            if(data.length>0){
                window.GLVARIABLE.gh_comment = data;
                var ci = '';
                data.forEach(function(val,ind){
                    if(ind < 10){
                        var commentItem = '<li class="comment-item"><span class="comment-user">'+val.user.login+'：</span><a href="javascript:void(0)" class="comment-link">'+val.body+'</a></li>';
                        ci += commentItem;
                    }
                });
                $('#home-comment').empty().append(ci);
            }
        });
    }
}

//获取评论数
function getCommentNum(){
    if(window.GLVARIABLE.gh_comment.length >0 ){

    }else {

    }
}

//post导航淡入淡出
function navFade(){
    $(window).scroll( function(){
        var iTop = $(window).scrollTop(); //鼠标滚动的距离
        if(iTop>300){
            if(document.body.clientWidth > 1200){
                $('.article-nav-list').fadeIn("slow");
            }else {
                $('.article-nav-list').fadeOut("slow");
            }
            //返回顶部按钮显示
            $('#back-top').fadeIn("slow");
        }else {
            $('.article-nav-list').fadeOut("slow");
            $('#back-top').fadeOut("slow");;
        }
    });
    $(window).resize(function () {          //当浏览器大小变化时
        if(document.body.clientWidth > 1200){
            $('.article-nav-list').fadeIn("slow");
        }else {
            $('.article-nav-list').fadeOut("slow");
        }
    });
}
//返回顶部
function backTop(){
    $('#back-top').on('click',function(){
        $('html').animate({"scrollTop":0},500);
    });
}









