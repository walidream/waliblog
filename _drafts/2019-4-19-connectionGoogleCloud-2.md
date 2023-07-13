---
layout: post
title: 用ssh工具xShell连接google云服务器(2)   #标题
tagline: 用ssh工具xShell连接google云服务器
category: server      #分类
author: wali    #作者
tag: googleCloud     #标签
ghurl:        #github url
ghurl_zip:    #github zip下载
comments: true

post_nav: ["1.登录google服务器","2.xshell工具用户密码登录","3.xshell工具ssh登录"]
group_tag: google云服务器
---

记录用ssh工具XShell连接谷歌云服务器。

● [datadev_sh博客原贴](https://blog.csdn.net/datadev_sh/article/details/79593360 "https://blog.csdn.net/datadev_sh/article/details/79593360"){:target="_blank"}

# 1.登录google服务器

![ssl](https://raw.githubusercontent.com/walidream/waliblog/gh-pages/static/image/server/server_1.png)

### 切换到root角色

```
sudo -i
```

### 修改SSH配置文件/etc/ssh/sshd_config

```
vi /etc/ssh/sshd_config
```

修改PermitRootLogin和PasswordAuthentication为yes

```
# Authentication:
PermitRootLogin yes //默认为no，需要开启root用户访问改为yes

# Change to no to disable tunnelled clear text passwords
PasswordAuthentication yes //默认为no，改为yes开启密码登陆
```

### 给root用户设置密码

```
passwd root  #设置root密码后直接可以用root账户登录
```

### 重启SSH服务使修改生效

```
/etc/init.d/ssh restart
```

# 2.xshell工具用户密码登录

![ssl](https://raw.githubusercontent.com/walidream/waliblog/gh-pages/static/image/server/server_32.png)

# 3.xshell工具ssh登录

### 生成ssh

![ssl](https://raw.githubusercontent.com/walidream/waliblog/gh-pages/static/image/server/server_2.png)


### 添加密钥到google云上

> 菜单 — 计算引擎 — 元数据 — SSH秘钥 — 修改 — 添加一项

![ssl](https://raw.githubusercontent.com/walidream/waliblog/gh-pages/static/image/server/server_3.png)


> 粘贴刚才从xshell复制的秘钥。在末尾添加 [空格][用户名] 这里就是“ google”，保存即可。


![ssl](https://raw.githubusercontent.com/walidream/waliblog/gh-pages/static/image/server/server_4.png)


### 用xshell连接

![ssl](https://raw.githubusercontent.com/walidream/waliblog/gh-pages/static/image/server/server_5.png)

连上之后，输入命令 sudo -i切换到root用户.














