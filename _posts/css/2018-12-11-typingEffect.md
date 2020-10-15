---
layout: post
title:  css3 打字渐变效果 #标题
tagline: css3打字效果，字体颜色渐变
category: css      #分类
author: wali    #作者
tag: css3     #标签
ghurl:        #github url
ghurl_zip:    #github zip下载
comments: true

post_nav: ["1.html结构","2.css样式"]
group_tag: css 相关
---

小菜今天看到网上有个css3的打字动画，觉得不错就给收藏下来了。下面是demo


<script async src="//jsrun.net/gDhKp/embed/all/light/"></script>


# 1.html结构

```html
<h1>瓦力的博客 http://waliblog.com</h1>
```

# 2.css样式

```css
@keyframes typing {
	from {
	  width:0;
  }
}
@keyframes blink-caret {
	50% {
	border-color:transparent;
  }
}

h1 {
  /* # of 字体颜色渐变 # of chars */
  color: #f35626;
	background-image: -webkit-linear-gradient(92deg,#f35626,#feab3a);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
  
	font:bold 200% Consolas,Monaco,monospace;
	border-right:.1em solid;
	width:16.5em;
	/* fallback */
	width:30ch;
	/* # of chars */
	margin:2em 1em;
	white-space:nowrap;
	overflow:hidden;
	animation:typing 3s steps(30,end),/* # of steps = # of chars */
		 blink-caret .5s step-end infinite alternate,
     hue 60s infinite linear;
}

@-webkit-keyframes hue {
  from {
    -webkit-filter: hue-rotate(0deg);
  }

  to {
			-webkit-filter: hue-rotate(-360deg);
		  }
}

```





































