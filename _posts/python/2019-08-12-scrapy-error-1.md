---
layout: post
title: 'scrapy Fatal error in launcher'  #标题
tagline:  'Fatal error in launcher: Unable to create process using'
category: python      #分类
author: wali    #作者
tag: Error     #标签
ghurl:        #github url
ghurl_zip:   #github zip下载
comments: true

post_nav: false
group_tag: Scrapy Error 
---


在配置scrapy时，出现`Fatal error in launcher: Unable to create process using '"c:\bld\scrapy_1564674375870\_h_env\python.exe" "D:\anaconda\envs\PY37\Scripts\scrapy.exe" '`

#### 基本情况解析：

1.scrapy是在自己创建的Python3虚拟环境PY37下安装的

2.安装scrapy选择的命令是：
```
conda install -c conda-forge scrapy
```

3.在启动项目时，已经确保进入了项目文件夹，且已经切换成PY37环境中

```txt
(PY37) F:\python\Scrapy\testScrapy>
```

#### 出现问题

```txt
scrapy startproject tutorial
```

![ssl]({{ site.url }}/assets/image/python/python_20.png)

#### 解决方案

启动代码改为

```
python -m scrapy startproject tutorial
```
问题就解决了。

![ssl]({{ site.url }}/assets/image/python/python_21.png)

个人推测，出现这个问题是因为有些小伙伴在安装anaconda之前，在python官网下载安装python。导致anaconda中的python环境与python官网python环境冲突
```txt
Fatal error in launcher: Unable to create process using '"c:\bld\scrapy_1564674375870\_h_env\python.exe" "D:\anaconda\envs\PY37\Scripts\scrapy.exe" '
```



