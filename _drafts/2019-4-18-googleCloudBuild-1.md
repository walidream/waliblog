---
layout: post
title: Google Cloud Platform免费申请与搭建服务器(1)   #标题
tagline:  Google Cloud Platform免费申请与搭建服务器
category: server      #分类
author: wali    #作者
tag: googleCloud     #标签
ghurl:        #github url
ghurl_zip:    #github zip下载
comments: true

post_nav: ["1.准备工作","2.申请", "3.创建VM实例","4.防火墙规则","5.VPC网络","6.负载平衡","7.登陆服务器"]
group_tag: google云服务器
---

Google Cloud Platform (以下简称GCP)是Google提供的云平台, 可以用来搭建加速服务, 网站和存储数据等等, 本文将介绍如何申请GCP一年的免费试用、Linux服务器环境搭建。

* [Google Cloud Platform免费申请&一键搭建SSR & BBR加速教程](https://www.wmsoho.com/google-cloud-platform-ssr-bbr-tutorial/ "https://www.wmsoho.com/google-cloud-platform-ssr-bbr-tutorial/"){:target="_blank"}
* [10分钟教你用 Google Cloud Platform 搭建自己的VPN](https://elephantnose.github.io/2018/09/24/10%E5%88%86%E9%92%9F%E6%95%99%E4%BD%A0%E7%94%A8%20Google%20Cloud%20Platform%20%E6%90%AD%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84VPN/ "https://elephantnose.github.io/2018/09/24/10%E5%88%86%E9%92%9F%E6%95%99%E4%BD%A0%E7%94%A8%20Google%20Cloud%20Platform%20%E6%90%AD%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84VPN/"){:target="_blank"}

# 1.准备工作

* 能访问google
* Gmail账号
* 双币信用卡 (淘宝购买的虚拟卡无法使用, 不要浪费钱)
* Xshell:SSH客户端(也可用Google自带的在线SSH,以后比较方便)链接：`https://pan.baidu.com/s/1ia-Q5xKObLig37-MVUgovQ` 提取码：`brav` 

# 2.申请

登陆 [Google Cloud Platform](https://console.cloud.google.com/getting-started?hl=zh-CN&pli=1 "https://console.cloud.google.com/getting-started?hl=zh-CN&pli=1"){:target="_blank"} 并填写相关信息。
如果想免费获取$300美金，需要添加一个支付账户。小菜在网页上没有添加成功过，尽管账号和信息填写正确。最后是用手机下载google pay在手机端完成的。希望
对大家有帮助。




# 3.创建VM实例

### 创建VM实例

![ssl]({{ site.url }}/assets/image/server/server_6.png)

`导航菜单` → `Compute Engine` → `VM实例`

![ssl]({{ site.url }}/assets/image/server/server_7.png)

点击 `创建`（项目名称选填）

### 试用 Cloud Platform

![ssl]({{ site.url }}/assets/image/server/server_8.png)

点击 `同意并继续`

![ssl]({{ site.url }}/assets/image/server/server_9.png)

按空填写信息，完成后点击 `开始免费试用`, 信用卡用于人机校验，注册时会暂扣$1，会自动退回至账户

### 创建虚拟机实例

![ssl]({{ site.url }}/assets/image/server/server_10.png)

点击 `创建`

### 自定义实例配置

![ssl]({{ site.url }}/assets/image/server/server_11.png)

填写实例 `名称`

选择 `区域` 及 `地区`（日本站点距离近，响应速度快）

内核 及 内存 选择最低配置（如还需其他服务可自行定义参数）

![ssl]({{ site.url }}/assets/image/server/server_12.png)

更改 启动磁盘 系统为 centos7

勾选 `允许 HTTP` 流量 允许 `HTTPS` 流量

点击 `创建`

![ssl]({{ site.url }}/assets/image/server/server_13.png)


# 4.防火墙规则

### 新建防火墙规则

![ssl]({{ site.url }}/assets/image/server/server_14.png)

`导航菜单` → `VPC 网络` → `防火墙规则`

![ssl]({{ site.url }}/assets/image/server/server_15.png)

点击 `创建防火墙规则`

### 自定义规则配置

![ssl]({{ site.url }}/assets/image/server/server_16.png)

`名称` `按规则自定义``

`目标` `网络中的所有实例`

![ssl]({{ site.url }}/assets/image/server/server_17.png)

来源ip地址范围 `0.0.0.0/0`

协议和端口 勾选 UDP 填写 `500,4500`，勾选 其他协议 填写 `esp`

点击 `创建`

![ssl]({{ site.url }}/assets/image/server/server_18.png)

刚刚定义好的防火墙规则

# 5.VPC网络

### 配置VPC网络

![ssl]({{ site.url }}/assets/image/server/server_19.png)

`导航菜单` → `VPC 网络` → `VPC 网络` → `default`

![ssl]({{ site.url }}/assets/image/server/server_20.png)

点击 `修改`

![ssl]({{ site.url }}/assets/image/server/server_21.png)

勾选 `自动` 及 全局 `复选框`

点击 `保存`


# 6.负载平衡

### 负载平衡

![ssl]({{ site.url }}/assets/image/server/server_22.png)

`导航菜单` → `网络服务` → `负载均衡`

### 创建负载平衡器

![ssl]({{ site.url }}/assets/image/server/server_23.png)

### UDP负载平衡

![ssl]({{ site.url }}/assets/image/server/server_24.png)

点击 开始配置

![ssl]({{ site.url }}/assets/image/server/server_25.png)

勾选 `从互联网到我的VM`（默认）

点击 `继续`

### 后端配置

![ssl]({{ site.url }}/assets/image/server/server_26.png)

`名称` 按规则自定义填写

选择 `区域` 

`选择现有实例`

### 前端配置

![ssl]({{ site.url }}/assets/image/server/server_27.png)

`名称` 按规则自定义填写

端口 `填写500-4500`

点击 `完成`

点击 `创建`

![ssl]({{ site.url }}/assets/image/server/server_28.png)

# 7.登陆服务器

如果需要用第三方工具登录google服务器，请查看小菜的这篇博客[用ssh工具xShell连接google云服务器](/server/2019/04/18/connectionGoogleCloud.html "server/2019/04/18/connectionGoogleCloud.html"){:target="_blank"}

![ssl]({{ site.url }}/assets/image/server/server_29.png)

`导航菜单` → `Compute Engine` → `VM实例`

![ssl]({{ site.url }}/assets/image/server/server_30.png)

点击 `SSH`

![ssl]({{ site.url }}/assets/image/server/server_31.png)






























