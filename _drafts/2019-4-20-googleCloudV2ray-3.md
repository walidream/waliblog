---
layout: post
title:  谷歌云用v2ray搭建梯子(3)  #标题
tagline: 用google云服务器搭建梯子 科学上网
category: server      #分类
author: wali    #作者
tag: googleCloud     #标签
ghurl:        #github url
ghurl_zip:    #github zip下载
comments: true

post_nav: ["1.google服务器搭建","2.win10客户端配置","3.chrom配置代理"]
group_tag: google云服务器
---

经过前面2小节，相信大家现在都能够用xshell连接上谷歌云服务。如果还有小伙伴不懂，可以在评论区留言。接下来将介绍如果在谷歌云上用`v2ray`搭建梯子，之前小菜试了很多软件，折腾了好久但就是不能访问google，最终失败了。这次看视频教程也折腾了一天，不过好在还是成功了。记录一下

小菜参考的教程：
- [v2ray 官方教程](https://www.v2ray.com/chapter_00/install.html "https://www.v2ray.com/chapter_00/install.html"){:target="_blank"}
- [游由心 博客](https://blog.dqxhxj.com/?p=246 "https://blog.dqxhxj.com/?p=246"){:target="_blank"}
- [Chrome浏览器SOCKS代理服务器设置教程](https://www.cccitu.com/2655.html "https://www.cccitu.com/2655.html"){:target="_blank"}

# 1.google服务器搭建

#### 连接服务器

在开始之前，先建议大家好好浏览一下[v2ray官网](https://www.v2ray.com/chapter_00/install.html "https://www.v2ray.com/chapter_00/install.html"){:target="_blank"}，默认大家都浏览过了，下面我们就要开车了

![ssl]({{ site.url }}/assets/image/server/server_51.png)

先登录到google云服务上，小菜这里使用的`xshell`没有安装过的小伙伴请看上一小节。

![ssl]({{ site.url }}/assets/image/server/server_52.png)

成功连接`google云服务器`

#### 设置服务时间

由于v2ray安全性对时间的要求很高，本地时间和服务的时间误差不能超过2分钟。所以我们先设置服务上的时间。

```txt
#查看系统服务时间
date -R

#将系统服务时间设置成本地时间(小菜这里是上海时区)
cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 

#检查服务器系统时间是否和本地时间一样
date -R
```

#### 使用脚本安装

V2Ray 提供了一个在 Linux 中的自动化安装脚本。这个脚本会自动检测有没有安装过 V2Ray，如果没有，则进行完整的安装和配置；如果之前安装过 V2Ray，则只更新 V2Ray 二进制程序而不更新配置。

```
sudo su

bash <(curl -L -s https://install.direct/go.sh)
```

此脚本会自动安装以下文件：
- `/usr/bin/v2ray/v2ray`：V2Ray 程序；
- `/usr/bin/v2ray/v2ctl`：V2Ray 工具；
- `/etc/v2ray/config.json`：配置文件；
- `/usr/bin/v2ray/geoip.dat`：IP 数据文件
- `/usr/bin/v2ray/geosite.dat`：域名数据文件

#### 设置v2ray配置

[v2ray文件格式详情](https://www.v2ray.com/chapter_02/01_overview.html "https://www.v2ray.com/chapter_02/01_overview.html"){:target="_blank"}鉴于配置太长，小菜在这里放一个[v2ray 配置列表](https://www.v2ray.com/awesome/tools.html "https://www.v2ray.com/awesome/tools.html"){:target="_blank"},在线的配置工具在最下面。

[v2ray在线配置生成器](https://intmainreturn0.com/v2ray-config-gen/# "https://intmainreturn0.com/v2ray-config-gen/#"){:target="_blank"}点击打开

![ssl]({{ site.url }}/assets/image/server/server_53.png)

```
vim /etc/v2ray/config.json
```

#### /etc/v2ray/config.json

将刚才复制服务配置粘贴进去,保存退出

```json
{
    "log": {
        "access": "/var/log/v2ray/access.log",
        "error": "/var/log/v2ray/error.log",
        "loglevel": "warning"
    },
    "inbound": {
        "port": 10089,
        "protocol": "vmess",
        "settings": {
            "clients": [
                {
                    "id": "e4ba6afc-18af-7bd9-ae6b-ae236d133396",
                    "level": 1,
                    "alterId": 99
                }
            ]
        },
        "streamSettings": {
            "network": "kcp"
        },
        "detour": {
            "to": "vmess-detour-899174"
        }
    },
    "outbound": {
        "protocol": "freedom",
        "settings": {}
    },
    "inboundDetour": [
        {
            "protocol": "vmess",
            "port": "10000-10010",
            "tag": "vmess-detour-899174",
            "settings": {},
            "allocate": {
                "strategy": "random",
                "concurrency": 5,
                "refresh": 5
            },
            "streamSettings": {
                "network": "kcp"
            }
        }
    ],
    "outboundDetour": [
        {
            "protocol": "blackhole",
            "settings": {},
            "tag": "blocked"
        }
    ],
    "routing": {
        "strategy": "rules",
        "settings": {
            "rules": [
                {
                    "type": "field",
                    "ip": [
                        "0.0.0.0/8",
                        "10.0.0.0/8",
                        "100.64.0.0/10",
                        "127.0.0.0/8",
                        "169.254.0.0/16",
                        "172.16.0.0/12",
                        "192.0.0.0/24",
                        "192.0.2.0/24",
                        "192.168.0.0/16",
                        "198.18.0.0/15",
                        "198.51.100.0/24",
                        "203.0.113.0/24",
                        "::1/128",
                        "fc00::/7",
                        "fe80::/10"
                    ],
                    "outboundTag": "blocked"
                }
            ]
        }
    }
}
```

#### 重启v2ray

```
systemctl restart v2ray
```

查看`v2ray状态`

```
service v2ray status
```

可以使用 service v2ray `start`\|`stop`\|`status`\|`reload`\|`restart`\|`force-reload` 控制 V2Ray 的运行。


#### 开启防火墙端口

在上面配置中，我们设置的服务器端口是`10089`

```
#允许tcp
firewall-cmd --permanent --add-port=10089/tcp
#允许udp
firewall-cmd --permanent --add-port=10089/udp
#重新载入防火墙以使配置生效
firewall-cmd --reload
```

到这里服务端配置就结束了

# 2.win10客户端配置

下面就是`v2ray客户端`大家选择其中一个
![ssl]({{ site.url }}/assets/image/server/server_55.png)

[v2ray客户端下载地址 https://github.com/v2ray/v2ray-core/releases](https://github.com/v2ray/v2ray-core/releases "https://github.com/v2ray/v2ray-core/releases"){:target="_blank"}小菜下载的是这个

下载完成后，在windowns系统下解压下载zip文件

![ssl]({{ site.url }}/assets/image/server/server_56.png)

#### 配置客户端配置

![ssl]({{ site.url }}/assets/image/server/server_57.png)

客户端配置好了之后，打开客户端的`config.json`文件，清空`config.json`文件里的内容，将上面客户端的配置粘贴进去，保存退出

![ssl]({{ site.url }}/assets/image/server/server_58.png)

首先windows客户端软件它不是一个图形界面，就是一个命令窗口，打开就可以了

![ssl]({{ site.url }}/assets/image/server/server_59.png)

![ssl]({{ site.url }}/assets/image/server/server_54.png)

`注意：打开v2ray.exe之后请不要关闭窗口`

# 3.chrom配置代理

打开[chrome 网上应用店](https://chrome.google.com/webstore/category/extensions?hl=zh-CN "https://chrome.google.com/webstore/category/extensions?hl=zh-CN"){:target="_blank"}，在`chrom商店`中搜索代理

![ssl]({{ site.url }}/assets/image/server/server_60.png)

将代理工具`添加到chrome`

#### 代理设置过程

右键点击浏览器右上角 Proxy SwitchyOmega 蓝色圆圈图标，选择“选项”，在配置页面，点击“代理”，选择你使用的代理协议，填写相关选项，保存。

![ssl]({{ site.url }}/assets/image/server/server_61.png)

![ssl]({{ site.url }}/assets/image/server/server_62.png)

左键点击Proxy SwitchyOmega图标，可以看到直接连接、系统代理和proxy选项，选择Proxy

![ssl]({{ site.url }}/assets/image/server/server_63.png)

#### 测试

打开`chrome`浏览器，输入`youtube`，可以看到成功打开`youtube`

![ssl]({{ site.url }}/assets/image/server/server_64.png)

最后晒一张谷歌云服务器的网速

![ssl]({{ site.url }}/assets/image/server/server_65.png)

