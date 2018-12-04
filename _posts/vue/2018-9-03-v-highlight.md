---
layout: post
title: vue指令-匹配内容高亮
tagline: 用vue指令写一个匹配搜索内容高亮
category: vue      #分类
author: wali    #作者
tag: vue     #标签
ghurl:        #github url
ghurl_zip:   #github zip下载

post_nav: false
---

按照惯例，小菜先将写好的demo放上去。这里将内容写在一个文件，方便展示，如果小伙伴们写项目还是需要模块化好点。

<script async src="//jsrun.net/exhKp/embed/all/light/"></script>

在directive文件夹下创建一个`highilight.js`文件，将下面代码复制进去

```javascript

export default{
    bind:function(el,binding){
        if(binding.value == '') return ;
        let word = el.innerText;
        let light = '<code style ="color:#318af3;">'+ binding.value +'</code>'
        let reg = new RegExp(binding.value, 'g');
        el.innerHTML = word.replace(reg,light)
    },
    update:function(el,binding){
        if(binding.value == '') return ;
        let word = el.innerText;
        let light = '<code style ="color:#318af3;">'+ binding.value +'</code>'
        let reg = new RegExp(binding.value, 'g');
        el.innerHTML = word.replace(reg,light)
    }
}

```

在需要vue文件中指令引入

```javascript

directives:{
    highlight,
}
	
```
然后在dom

```javascript

<span v-highlight:key = "匹配的关键字">11111111111111111</span>

```





