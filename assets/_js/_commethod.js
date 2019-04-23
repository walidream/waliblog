/**
 * Created by Administrator on 2017/11/26.
 */
 
import $ from "../../_wp/node_modules/jquery/dist/jquery.js";

import Clipboard from "../../_wp/node_modules/copy-to-clipboard/index.js"
import {Disqus} from './_disqus';
import {TimeUtil} from './_time';
const fileNameJson = require('../json/fileName.json');
require("../../_wp/node_modules/layui-layer/dist/layer.js");


//获取最新评论
export function getLastComment(){
	new Disqus().forumsListPosts().then(data=>{
		let li = '';
		data.forEach((val,ind)=>{
			if(ind < 20){
				let time = new TimeUtil(new Date(val.createdAt)).daysAgo();
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

//添加复制 保存按钮
export function addBtn(){
	let doms = $('div.highlight');
	
	let btn = `<div class="copy-save"><span class="copy-code"><span class="iconfont wali-icon-fuzhi"></span>复制代码</span><span class="save-code"><span class="iconfont wali-icon-baocun"></span>保存文件</span></div>`;
	
	for(let i=0;i<doms.length;i++){
		$('div.highlight').eq(i).append(btn);
	}
	
	$(document).on('click', '.copy-code', function(e){
	  copyCode(e);
	});
	
	$(document).on('click', '.save-code', function(e){
	  saveCode(e);
	});
}

//复制代码
export function copyCode(e){
	let dom = $(e.target).parent().prev().find('code')[0];
	let txt = dom.innerText;
	
	let flag = Clipboard(txt,{
		debug: true,
		message: 'Press  to copy',
	});
	
	if(flag){
		layer.msg("复制代码成功！")
	}else{
		layer.msg("复制代码失败！")
	}
}

//保存代码
export function saveCode(e){
	let dom = $(e.target).parent().prev().find('code')[0];
	
	let cla = $(e.target).parents('.highlighter-rouge').attr('class');
	let str = /language-([a-z]+)/.exec(cla)[1];	
	let houzui = fileNameJson[str]?fileNameJson[str]:'txt';
	let fileName = `save.${houzui}`;
	let txt = dom.innerText;
	createAndDownloadFile(fileName,txt);
}

function createAndDownloadFile(fileName, content) {
    var aTag = document.createElement('a');
    var blob = new Blob([content]);
    aTag.download = fileName;
    aTag.href = URL.createObjectURL(blob);
    aTag.click();
    URL.revokeObjectURL(blob);
}




