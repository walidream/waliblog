---
layout: post
title: webstrom配置vue环境
tagline: webstrom下面识别VUE文件
category: vue      #分类
author: wali    #作者
tag: vue     #标签
ghurl:        #github url
ghurl_zip:   #github zip下载

post_nav: ["1.安装webstrom","2.破解webstrom","3.webstrom支持VUE文件","4.webstrom添加vue模板","5.不识别index"]
---

小菜一直用webstrom编辑器开发前端，今天遇到了问题，就是在创建文件时，只要创建名为`index.vue`文件就会识别成`txt`文件。一开始以为编辑器有问题，卸了安装最新的`webstrom`发现问题还是一样，而且界面不好看。于是把旧的webstrom安装上了。折腾了几个小时。终于搞清楚问题，在此记录。

# 1.安装webstrom

百度云上小菜放了一个自己现在用的版本[https://pan.baidu.com/s/1-r7hrclNoB6oiwCXMtpT5Q]( https://pan.baidu.com/s/1-r7hrclNoB6oiwCXMtpT5Q " https://pan.baidu.com/s/1-r7hrclNoB6oiwCXMtpT5Q"){:target="_blank"} 密码：`yedy`


# 2.破解webstrom

破解有两种方法：

#### 1.IntelliJ IDEA 注册码 [http://idea.lanyus.com/](http://idea.lanyus.com/ "http://idea.lanyus.com/"){:target="_blank"} 

#### 2.idea系列授权服务器：[https://www.chutianzhinu.com/post-43.html](https://www.chutianzhinu.com/post-43.html "https://www.chutianzhinu.com/post-43.html"){:target="_blank"} 这个小菜试过，可以破解。但是不知道你们用的时候会不会封掉，这个服务可以破解所有的IDE[https://plugins.jetbrains.com/](https://plugins.jetbrains.com/ "https://plugins.jetbrains.com/"){:target="_blank"} 这里面的软件都可以用。感谢`楚天之怒`博主提供的服务。如果有经济基础的朋友还是请到官方购买正版，谢谢。


# 3.webstrom支持VUE文件

打开webstrom编辑器，在`file -> settings -> plugins ` 选择 `Browse repositories...` 搜索 `vue` 选中安装。这里小菜安装过了

![ssl](http://pif1uj55s.bkt.clouddn.com/vue/vue_01.jpg)

![ssl](http://pif1uj55s.bkt.clouddn.com/vue/vue_02.jpg)

设置好了，在`file -> settings -> Editor -> file Types` 找到 `Vue.js Template`模板 选中后在下面添加`+` `*.vue`文件

![ssl](http://pif1uj55s.bkt.clouddn.com/vue/vue_03.jpg)

# 4.webstrom添加vue模板

在`file -> settings -> Editor -> File and Code Templates` 点击`+` 添加vue模板,保存

```javascipt
<template>
    
</template>
<script type="text/ecmascript-6">
    export default{
        name:'',
        data:function(){
            return {}
        }
    }
</scripte>
```

![ssl](http://pif1uj55s.bkt.clouddn.com/vue/vue_04.jpg)

最后重新启动webstrom就好了。在这里可以大喊一声`我胡汉三又回来了`可以愉快的搬砖了。

# 5.不识别index

回到上面提到那个问题，就是在创建`index.vue`文件时，总是显示`txt`，也没有了高亮，语法提示很是不爽。百度一下，问题出在`file type`上

![ssl](http://pif1uj55s.bkt.clouddn.com/vue/vue_05.jpg)

解决方案是找到`index.vue`当前的图标，在`file -> settings -> Editor -> file Types`，然后在下面找到`index.vue`删除这个文件类型，保存就可以了。

![ssl](http://pif1uj55s.bkt.clouddn.com/vue/vue_06.jpg)
![ssl](http://pif1uj55s.bkt.clouddn.com/vue/vue_07.jpg)

其实只是因为在txt文件类型中添加了`index.vue`，是自己误添加的，删除就没事了。像`*.js`文件等等出现的问题都是这个原因。














