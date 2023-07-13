---
layout: post
title: centos7 pip3安装psycopg2出错 #标题
tagline: 'centos7 pip3安装psycopg2出错 Error: pg_config executable not found'
category: python      #分类
author: wali    #作者
tag: Error     #标签
ghurl:        #github url
ghurl_zip:   #github zip下载
comments: true

post_nav: false
group_tag: python Error 
---

最近想在服务器上运行下自己写的代码，代码中用到了`postgresql`,但是在安装psycopg2的时候发现报错了，错误如下

- [博主 df0128](https://blog.csdn.net/df0128/article/details/89565651 "https://blog.csdn.net/df0128/article/details/89565651")

![ssl](https://raw.githubusercontent.com/walidream/waliblog/gh-pages/static/image/python/python_60.png)

多方查找后发现原因在于没有安装postgresql插件，故，先使用如下命令安装插件:

```txt
yum install postgresql-devel*
```

而后再使用如下命令安装即可成功:

```txt
pip3 install psycopg2 -i http://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
```

















