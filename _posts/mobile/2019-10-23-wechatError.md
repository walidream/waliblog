---
layout: post
title: android 微信登录报错 #标题
tagline: 记录android调用微信SDK的错误
category: mobile      #分类
author: wali    #作者
tag: cordova     #标签
ghurl:        #github url
ghurl_zip:   #github zip下载
comments: true

post_nav: ["1.签名错误"]
group_tag: cordova 教程
---

本贴记录android调用微信的错误，并记录解决方案。

# 1.签名错误

在调用微信登录授权时，弹出签名不对，请检查签名是否与开发平台签名一致。

先去[微信开放平台](https://open.weixin.qq.com/ "https://open.weixin.qq.com/")查看自己申请的应用

![ssl](http://walidream.com:9999/blogImage/mobile/mobile_2.png)

找到`应用签名`和`包名`。微信官方提供的[签名生成工具](https://res.wx.qq.com/open/zh_CN/htmledition/res/dev/download/sdk/Gen_Signature_Android2.apk "https://res.wx.qq.com/open/zh_CN/htmledition/res/dev/download/sdk/Gen_Signature_Android2.apk")如果不相信呢，小菜这里放个[微信资源下载链接](https://developers.weixin.qq.com/doc/oplatform/Downloads/Android_Resource.html "https://developers.weixin.qq.com/doc/oplatform/Downloads/Android_Resource.html")

下载完签名工具后，输入开放平台的应用包名，然后看生成的应用签名和开放平台上的应用签名是否一致。如果不一致，请将开放平台的应用签名修改为`最新生成的应用签名`

![ssl](http://walidream.com:9999/blogImage/mobile/mobile_3.png)











































