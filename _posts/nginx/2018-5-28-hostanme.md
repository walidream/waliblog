---
layout: post
title: nginx配置站点   #标题
tagline: 
category: nginx      #分类
author: wali    #作者
tag: nginx     #标签
ghurl:        #github url
ghurl_zip:    #github zip下载

post_nav: false
---

# 1.远程登录阿里云

远程登录阿里云服务器，小菜这里用的是`putty`，大家看着用，反正只要登录上去就可以。 

![ssl](http://p4mxf46uj.bkt.clouddn.com/nginx/nginx_1.jpg)

# 2.创建配置文件

在/etc/nginx/conf文件下，创建一个`test.com.conf`文件,用域名来文件文件，这是个好习惯。如果没有conf文件夹，就创建一个。

打开创建`test.com.conf`文件	
```ruby
vim test.com.conf
```
输入`i`进入编辑

```ruby
server
{
    listen 80;
    server_name test.com;
    charset utf-8;
    index index.html index.htm index.php;
    root "/home/test";    #这里指的是你的站点路径
    error_page 404 = /404.html;

    location / {
        if (!-e $request_filename) {
            rewrite ^/(.*)$ /index.php?s=/$1  last;
        }
    }

    location ~ .*\.php {
        include pathinfo.conf;
        include fastcgi.conf;
        fastcgi_pass   php_processes;
        fastcgi_index index.php;
    }
}

```


# 3.设置代理文件配置

将7000端口转给3000，这个配置有https，如果不需要就删掉`ssl`相关的

```ruby
server {
	listen 7000 ssl;
	server_name bbbb.test.com;
	ssl_certificate       /etc/nginx/conf/ssl/server.crt;
	ssl_certificate_key  /etc/nginx/conf/ssl/server.key;							

	ssl_session_timeout  5m;
	ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
	ssl_ciphers  HIGH:!aNULL:!MD5;
	ssl_prefer_server_ciphers  on;

	location / {
		index  index.html index.htm;
		proxy_pass http://127.0.0.1:3000;
		proxy_set_header Host $host:7000;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		client_max_body_size    1000m;
		proxy_connect_timeout 6000; ##修改为10分钟
		proxy_send_timeout 6000;
		proxy_read_timeout 6000;
	}

}

```














