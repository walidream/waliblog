/**
 * Created by Administrator on 2017/11/26.
 */
 
import $ from "../../_wp/node_modules/jquery/dist/jquery.js";

//post导航淡入淡出
export function navFade(){
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
export function backTop(){
    $('#back-top').on('click',function(){
        $('html').animate({"scrollTop":0},500);
    });
}







