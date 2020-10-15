---
layout: post
title: input 中checkbox样式   #标题
tagline: 纯css写checkbox样式样式
category: css      #分类
author: wali    #作者
tag:  css3     #标签
ghurl:        #github url
ghurl_zip:    #github zip下载
comments: true

post_nav: ["1.html结构","2.css样式"]
group_tag: css 相关
---

以前写checkbox的样式，用div,加上js才能达到切换效果，今天写个用css写个ckeckbox样式，喜欢的伙伴可以自己写写。用到css3属性，不是很清楚的伙伴就得多查查css文档了。

<script async src="//jsfiddle.net/waliblog/orxvab5c/embed/result,html,css/"></script>


# 1.html结构

```html
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>	
</head>
<body>

	<span class="tmall-tag">
		<input id="tmall" type="checkbox">
		<label for="tmall"></label>
	</span>

<label for="bbbb" class="label-text-warp">
		<input id="bbbb" type="checkbox"><i></i><span>仅显示收藏的客户</span>		
	</label>

</body>
</html>
```

# 2.css样式

```css
.tmall-tag{
		width:30px;
		position: relative;	
		cursor:pointer;
	}
	.tmall-tag label{
		position:absolute;
		top:0;
		left:0;
		width:14px;
		height:14px;
		border:1px solid #E9E9E9;
		background-color:#39B6E5;
		cursor:pointer;
	}
	.tmall-tag label:after{
		content: '';
		position: absolute;
		top: 3px;
		left: 2px;
		width: 7px;
		height: 3px;
		background: transparent;
		border: 2px solid #fff;
		border-top: none;
		border-right: none;
		transform: rotate(-45deg);		
	}
	
	.tmall-tag input[type=checkbox]:checked + label:after {
		opacity: 1;
	}
	
	.tmall-tag input[type=checkbox]:not(:checked) + label:after {
		opacity: 0;
	}
	.tmall-tag input[type=checkbox]:not(:checked) + label {
		background-color:#fff;
		
	}
  
  .label-text-warp{
		display:inline-block;
		position: relative;	
		cursor:pointer;
		
	}	
	.label-text-warp input{
		position:absolute;
		left:-9999px;
		top:-9999px;
		opacity:0;
	}
	.label-text-warp i{
		display:inline-block;
		vertical-align:middle;
		width:14px;
		height:14px;
		border:1px solid #E9E9E9;
		background-color:#fff;
	}
	.label-text-warp i:after{
		content: '';
		position: absolute;
		top: 9px;
		left: 3px;
		width: 7px;
		height: 3px;
		background: transparent;
		border: 2px solid #fff;
		border-top: none;
		border-right: none;
		transform: rotate(-45deg);
	}
	.label-text-warp span{
		position:relative;
		display:inline-block;
		vertical-align:middle;
	}
	.label-text-warp i{
	
	}
	.label-text-warp input[type=checkbox]:not(:checked) + i {
		background-color:#39B6E5;		
	}
```













