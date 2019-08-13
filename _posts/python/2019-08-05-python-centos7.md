---
layout: post
title: centos7安装 python3.6 #标题
tagline: Python 教程
category: python      #分类
author: wali    #作者
tag: Python     #标签
ghurl:        #github url
ghurl_zip:   #github zip下载
comments: true

post_nav: ["1.安装相关的包","2.下载python3","3.安装","4.安装pip3"]
group_tag: python3.7 教程
---

CentOS 7.2 默认安装了python2.7.5 因为一些命令要用它比如yum 它使用的是python2.7.5。

- [参考博客](https://blog.csdn.net/geerniya/article/details/79263846 "https://blog.csdn.net/geerniya/article/details/79263846"){:target="_blank"}

#### 检查Python版本
```
python -V
```

# 1.安装相关的包

```
yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gcc make
```

# 2.下载python3

在[python](https://www.python.org/ "https://www.python.org/"){:target="_blank"}官网上找到`downloads`按钮，选择自己下载的版本

```
wget https://www.python.org/ftp/python/3.6.2/Python-3.6.2.tar.xz
```

# 3.安装

将刚才下载的python压缩包解压

```
tar -xvJf  Python-3.6.2.tar.xz
```

#### 进入目录

```
cd Python-3.6.2
```

#### 编译安装

```
./configure prefix=/usr/local/python3

make && make install
```

安装完毕，`/usr/local/`目录下就会有python3了


#### 添加软链接

```
ln -s /usr/local/python3/bin/python3 /usr/bin/python3
```

这样我们就安装成功python3.6了，执行命令：

```
python -V    #得到的是python 2.7版本

python3 -V   #得到的是python 3.6版本
```

# 4.安装pip3

将之前安装的python3 中的pip3添加上软链接即可

```
ln -s /usr/local/python3/bin/pip3 /usr/bin/pip3
```

我们可以通过pip install **安装python2的安装包 
也可以通过pip3 install **安装python3的安装包