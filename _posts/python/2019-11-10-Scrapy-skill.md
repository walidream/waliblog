---
layout: post
title: Scrapy 常用技巧总结 #标题
tagline: Scrapy 常用技巧总结
category: python      #分类
author: wali    #作者
tag: Scrapy     #标签
ghurl:        #github url
ghurl_zip:   #github zip下载
comments: true

post_nav: ["1.API数据解析","2.chromeDirver查找元素","3.scrapy状态错误码","4.item一次返回多条数据","5.scrapy Get传参"] 
group_tag: Scrapy 1.7
---

本帖主要记录小菜在爬虫学习过程中常用的技巧。

# 1.API数据解析
scrapy爬虫一般爬取的是网页，返回的是`html`。但有时候需要调`API`,API接口返回的是`json`。需要对返回来的数据解析

```python
res = json.loads(response.body_as_unicode())
```

# 2.chromeDirver查找元素

当我们爬取的页面时动态页面时，需要运行`js`。一般我们使用`selenium`来控制`chromeDirver`。在获取页面元素时比较麻烦，不如`scrapy`中的`选择器`那么方便。

- [selenium 查找元素](https://selenium-python-zh.readthedocs.io/en/latest/locating-elements.html "https://selenium-python-zh.readthedocs.io/en/latest/locating-elements.html")
- [selenium —— 父子、兄弟、相邻节点定位方式详解](https://huilansame.github.io/huilansame.github.io/archivers/father-brother-locate "https://huilansame.github.io/huilansame.github.io/archivers/father-brother-locate")

```python
urls = self.browser.find_elements_by_css_selector('.shop_list.shop_list_4 dd h4 a')
for url in urls:
    href = url.get_attribute('href')
    unitprice = url.find_element_by_xpath('../../../dd[2]/span[2]').text
    address = url.find_element_by_xpath('../../p[@class="add_shop"]/a').get_attribute('title')
```

# 3.scrapy状态错误码
scrapy 默认只有`200`状态码才会进入`parse`方法解析，想要指定错误码也进入`parse`方法，在`spider`中设置

```python
handle_httpstatus_list = [404, 500]
```

# 4.item一次返回多条数据

有时一个页面有我们要的所有数据，结构需要我们整理, 数据整理后，每个`it`在流到`pipeline`中处理。

```python
def parse(self, response):

    city = response.css("#logo-input a.city.J-city span:nth-child(2)::text").get()
    quxians = response.xpath('//div[@class="content_b"]/div[@class="box shopallCate"][2]/dl[@class="list"]')

    for item in quxians:
        quxian = item.css("dt .Bravia::text").get()
        subtanames = item.css("dd li a::text").getall()

        for sub in subtanames:
            l = WzItemLoader(item = WzSubtanameItem(), response=response)
            l.add_value('city', city)
            l.add_value('quxian', quxian)
            l.add_value('subtaname', sub)
            it = l.load_item()
            yield it
```

# 5.scrapy Get传参

```python
params = dict(
    city = '温州',
    citylimit = True,
    keywords = brand,
    key = self.settings["GD_KEY"],
    page = 1,
    offset = self.offset
)
encodedParams = urllib.parse.urlencode(params)
yield scrapy.Request(url=self.start_urls[0] + '?' + encodedParams, meta= params, callback= self.parse_detail)
```




