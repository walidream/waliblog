/**
 * Created by Administrator on 2017/11/26.
 */
 
import $ from "../../_wp/node_modules/jquery/dist/jquery.js";
import {Disqus} from './_disqus';
import {TimeUtil} from './_time';

//获取最新评论
export function getLastComment(){
	new Disqus().forumsListPosts().then(data=>{
		let li = '';
		data.forEach((val,ind)=>{
			if(ind < 20){
				let time = new TimeUtil(new Date(val.createdAt)).timeYMDHMS1();
				let commentItem = `<div class="comment-item"><div class="spacing-bottom-narrow"><a class="message" href="javascript:void(0);">${val.message}</a></div><div class="user"><em class="name"> ${val.author.name} </em><span class="time">${time}</span></div></div>`;
				li += commentItem;
			}			
		})
		$('#nocommnet').hide();
		$('#home-comment').empty().append(li);		
		
	},err=>{
		console.log('err',err)
	})
	
}

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







