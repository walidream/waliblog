---
layout: post
title: vscode pycharm 选择anaconda虚拟环境  #标题
tagline: vscode pycharm 选择anaconda虚拟环境 
category: python      #分类
author: wali    #作者
tag: python     #标签
ghurl:        #github url
ghurl_zip:   #github zip下载
comments: true

post_nav: ["1.vscode切换虚拟环境","2.pycharm切换虚拟环境"] 
group_tag: python 杂记 
---

之前介绍过用[anaconda](/python/2019/05/13/anaconda.html "/python/2019/05/13/anaconda.html")创建python的虚拟环境，本贴记录如何在`vscode`和`pycharm`编辑器中切换`anaconda`创建的虚拟环境


# 1.vscode切换虚拟环境

打开`vscode`编辑器，按下`ctrl + shift + p`，在命令面板输入

```txt
python: select interpreter
```

输入完成后，会出现已有的虚拟环境，选择想要切换的环境

![ssl](https://raw.githubusercontent.com/walidream/blogimage/master/waliblogImage/python/python_32.png)


# 2.pycharm切换虚拟环境

打开`pycharm`编辑器，选择`file` - >`settings`

![ssl](https://raw.githubusercontent.com/walidream/blogimage/master/waliblogImage/python/python_33.png)

![ssl](https://raw.githubusercontent.com/walidream/blogimage/master/waliblogImage/python/python_34.png)

![ssl](https://raw.githubusercontent.com/walidream/blogimage/master/waliblogImage/python/python_52.png)

选择`Existing environment` -> `interpreter`，添加自己想要的虚拟环境。






