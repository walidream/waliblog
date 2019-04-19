---
layout: post
title:  centos7 安装PostgreSQL  #标题
tagline: centos7 安装PostgreSQL
category: SQL      #分类
author: wali    #作者
tag: PostgreSQL     #标签
ghurl:        #github url
ghurl_zip:    #github zip下载
comments: true

post_nav: ["1.安装PostgreSQL","2.远程连接测试"]
---

小菜记录在centos7服务上安装PostgreSQL。


● [简书原贴博客](https://www.jianshu.com/p/342f887838c8 "https://www.jianshu.com/p/342f887838c8"){:target="_blank"}


# 1.安装PostgreSQL

在官网地址[传送门](https://www.postgresql.org/download/linux/redhat/ "https://www.postgresql.org/download/linux/redhat/"){:target="_blank"}
选择好选项后会自己生成配置。

![ssl](http://walidream.com:9999/blogImage/sql/sql_1.png)

### 安装RPM

```
yum install https://download.postgresql.org/pub/repos/yum/9.6/redhat/rhel-7-x86_64/pgdg-centos96-9.6-3.noarch.rpm
```

### 安装客户端包

```
yum install postgresql96
```

### 安装PostgreSQL 9.6

* postgresql96-server  数据库核心服务端
* postgresql96-contrib  附加第三方扩展
* postgresql96-devel  C语言开发Header头文件和库

```
yum install postgresql96-server postgresql96-contrib postgresql96-devel
```

### 验证是否安装成功

```
rpm -aq| grep postgres
```

默认Postgresql数据库路径是 `/var/lib/pgsql/9.6/data` ，可以新建一个目录，假如是/mnt/vdb1

```
cd /mnt
sudo mkdir vdb1
sudo chown -R postgres:postgres vdb1
sudo chmod 700 vdb1
vi /usr/lib/systemd/system/postgresql-9.6.service
Environment=PGDATA=/mnt/vdb1/  修改为自己的新的数据路径
```

### 初始化数据库

```
/usr/pgsql-9.6/bin/postgresql96-setup initdb
```

### 开启服务

```
systemctl enable postgresql-9.6  #关闭服务
systemctl start postgresql-9.6   #启动服务
```

### 开机启动

```
sudo chkconfig postgresql-9.6 on  
systemctl enable postgresql-9.6.service
```

### 修改密码

```
su postgres

psql

ALTER USER postgres WITH PASSWORD '密码';   --必须以分号结束，成功执行后会出现ALTER ROLE

\q

su root
```

### 开启远程访问

```
vi /var/lib/pgsql/9.6/data/postgresql.conf  
或者
vi /mnt/vdb1/postgresql.conf
```

修改#listen_addresses = 'localhost'  为  listen_addresses='*'

当然，此`*`也可以改为任何你想开放的服务器IP

![ssl](http://walidream.com:9999/blogImage/sql/sql_2.png)

### 信任远程连接

```
vi /var/lib/pgsql/9.6/data/pg_hba.conf  或者  vi /mnt/vdb1/pg_hba.conf
```

修改如下内容，信任指定服务器连接

# IPv4 local connections:

host    all            all      127.0.0.1/32      md5

host    all             all             0.0.0.0/32            trust
host    all             all             0.0.0.0/24            trust
host    all             all             0.0.0.0/0             trust


![ssl](http://walidream.com:9999/blogImage/sql/sql_3.png)

### 重启服务

```
service postgresql-9.6 restart 或者 systemctl restart postgresql-9.6.service
```

### 打开防火墙

CentOS 防火墙中内置了PostgreSQL服务，配置文件位置在`/usr/lib/firewalld/services/postgresql.xml`，我们只需以服务方式将PostgreSQL服务开放即可。

```
systemctl enable firewalld #开机启用防火墙

systemctl start firewalld #开启防火墙

firewall-cmd --add-service=postgresql --permanent   #开放postgresql服务

firewall-cmd --zone=public --add-port=5432/tcp --permanent #或者可以直接添加端口

firewall-cmd --reload  #重载防火墙

firewall-cmd --list-ports # 查看占用端口
```

### 简单使用

```
psql -U postgres postgres  连接数据库

说明：-h表示主机（Host），-p表示端口（Port），-U表示用户（User）

显示所有数据库： \l
```

###  卸载PostgreSQL

```
yum erase postgresql96
```

# 2.远程连接测试

如果还没安装navicat软件，参考我之前的帖子[传送门](/sql/2019/04/03/sql-1.html "/sql/2019/04/03/sql-1.html"){:target="_blank"}

### 开放服务器端口访问

这里需要注意的是当前面的工作做完之后，一定要检查阿里云实例的数据库端口是否开放，如果没有开放，那么要允许外网访问数据库不然是连接不成功的。

![ssl](http://walidream.com:9999/blogImage/sql/sql_6.png)

打开Navicat软件,新建连接，选择自己要连接的数据库类型

![ssl](http://walidream.com:9999/blogImage/sql/sql_7.png)













