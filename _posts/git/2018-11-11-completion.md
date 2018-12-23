---
layout: post
title: centos 7.4 git命令自动补全   #标题
tagline: 按Tab键git命令自动补全
category: git      #分类
author: wali    #作者
tag: git     #标签
ghurl:        #github url
ghurl_zip:    #github zip下载
comments: true

post_nav: false
---

系统自带安装的 git 无法使用 tab 来补全命令。可以由以下方法，解决此问题。

# 1.下载源码 

在github的git上找到`git-completion.bash`文件，[传送门](https://github.com/git/git/blob/master/contrib/completion/git-completion.bash "https://github.com/git/git/blob/master/contrib/completion/git-completion.bash"){:target="_blank"}，也可在自己在github中git中查找`git -> contrib -> completion -> git-completion.bash`按目录查找下载下来，放在服务器上。

# 2.复制git-completion.bash文件

	cp ~/git-completion.bash /etc/bash_completion.d/
	
小菜这里将`git-completion.bash`文件上传在`~`

# 3.加载 bash 脚本

	. /etc/bash_completion.d/git-completion.bash
	
# 4.自动加载脚本

编辑`/etc/profile` 和 `~/.bashrc`文件中加入下面代码

	if [ -f /etc/bash_completion.d/git-completion.bash ]; then
	. /etc/bash_completion.d/git-completion.bash
	fi

在执行下

	. ~/.bashrc


























