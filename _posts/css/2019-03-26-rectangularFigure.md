---
layout: post
title:  css3 模拟正负条形图 #标题
tagline: css3 模拟正负条形图
category: css      #分类
author: wali    #作者
tag: input     #标签
ghurl:        #github url
ghurl_zip:    #github zip下载
comments: true

post_nav: ["1.html结构","2.css样式","3.script脚本"]
group_tag: css
---

今天用css模拟了一个简单的正负条形图，下面是demo

<script async src="//jsrun.net/cQXKp/embed/all/light/"></script>


> 备用演示地址 [http://walidream.com/example/css/rectangularFigure/](http://walidream.com/example/css/rectangularFigure/ "http://walidream.com/example/css/rectangularFigure/"){:target="_blank"}


# 1.html结构

```html
<div id="app">
	<div class="box" v-for="item in list">
		<div class="left" :style="{width:item.leftLen + '%'}">
			<div class="title">{{item.ad.title}}</div>
			<div class="leftjin" :style="{width:item.adPercentage + '%'}"></div>				
		</div>
		<div class="right" :style="{width:item.rightLen + '%'}">
			<div class="rightjin" :style="{width:item.dePercentage + '%'}"></div>
			<div class="title">{{item.de.title}}</div>
		</div>
	</div>
</div>
```
# 2.css样式

```css
*{
	margin:0;
	padding:0;
}
#app{
	width:100%;
	height:100%;
	background:#1A3866;
}
.box{
	display: flex;
	margin:10px 0;
	width:300px;
	height:20px;
	
}
.left{			
	height:20px;
	display:flex;
	justify-content:flex-end;
}
.right{
	height:20px;
	display:flex;
	justify-content:flex-start;
}
.leftjin{
	height:20px;
	background:#6FCF97;
	border-top-left-radius:20px;
	border-bottom-left-radius:20px;
}
.rightjin{
	height:20px;
	border-top-right-radius:20px;
	border-bottom-right-radius:20px;
	background:#930CEA;
}
.title{
	color:#fff;
	font-size:12px;
}

```

# 3.script脚本

```javascript
var app = new Vue({
	el:"#app",
	data:function(){
		return {
			list:[]
		}
	},
	methods:{
		getList(){				
			let self = this;				
			let [adMax,deMax,leftLen,rightLen,sum] = [0,0,0,0,0,0];
			
			let list = [
				{ad:{title:"家居建",value:100},de:{title:"人流指数",value:50}},
				{ad:{title:"外国餐厅",value:150},de:{title:"专科医院",value:70}},
				{ad:{title:"中餐厅",value:80},de:{title:"停车场",value:20}},
				{ad:{title:"中餐厅",value:20},de:{title:"停车场",value:90}},
				{ad:{title:"中餐厅",value:300},de:{title:"停车场",value:20}},
				{ad:{title:"中餐厅",value:250},de:{title:"停车场",value:130}},
				{ad:{title:"中餐厅",value:90},de:{title:"停车场",value:90}},
				{ad:{title:"中餐厅",value:0},de:{title:"停车场",value:200}},
			]
			
			list.forEach(val=>{
				if(val.ad.value > adMax) adMax = val.ad.value;
				if(val.de.value > deMax) deMax = val.de.value;
			})
			
			sum = adMax + deMax;
			
			leftLen = (adMax / sum) * 100;
			rightLen = (deMax / sum) * 100;
			
			let arr = [];
			
			self.list = list.map(val=>{
				val['leftLen'] = leftLen;
				val['rightLen'] = rightLen;
				val['adPercentage'] = (val.ad.value / adMax) * 100;
				val['dePercentage'] = (val.de.value / deMax) * 100;
				return val;
			})

		}
	},
	mounted(){
		let self = this;
		setTimeout(()=>{
			self.getList();
		},1000)
	}
})

```



































