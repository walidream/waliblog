---
layout: post
title: Scrapy spider未进入parse  #标题
tagline: Scrapy spider未进入parse
category: python      #分类
author: wali    #作者
tag: Error     #标签
ghurl:        #github url
ghurl_zip:   #github zip下载
comments: true

post_nav: ["1.403问题","2.总结"]
group_tag: Scrapy Error 
---

在初学scrapy时，按照官方的文档写了一个爬虫片段，发现怎么都会不会进入`parse()`方法。下面是spider代码

```python
import scrapy

class XcfSpider(scrapy.Spider):
    name = 'xcf'
    allowed_domains = ['xiachufang.com']
    start_urls = ['https://www.xiachufang.com/category/731/']

    def parse(self, response):
        pass
```

# 1.403问题

在`parse()`方法内部打一个断点，重新运行爬虫。

![ssl](http://walidream.com:9999/blogImage/python/python_36.png)

看到输出信息中有一个403的状态码，正常的请求中`response`状态码是200。在生成项目时，有一个设置项目`settings.py`文件。能够找到这段代码

```python
# Crawl responsibly by identifying yourself (and your website) on the user-agent
# USER_AGENT = 'xiachufang (+http://www.yourdomain.com)
```

在默认情况下，用户代理`USER_AGENT`被设置成这样。


#### 解决方案

打开`settings.py`文件，将`USER_AGENG`修改为

```python
USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
```

然后重启项目

![ssl](http://walidream.com:9999/blogImage/python/python_37.png)


发现进入`parse()`方法，代码在断点处停下来


# 2.总结

对于有些网站，可能会检查`USER_AGENt`，恰好小菜就碰到了。将上面的url修改`https://baidu.com`就可以进入断点。推测百度可能没有做限制。

总结：
- 在调试时，要多看控制台的信息输出
- spider只有在`response`响应状态为`200`时才会进入`parse()`方法





































