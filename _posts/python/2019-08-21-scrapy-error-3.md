---
layout: post
title: Scrapy  chromedriver被识别 #标题
tagline: Scrapy chromedriver被识别怎么办
category: python      #分类
author: wali    #作者
tag: Error     #标签
ghurl:        #github url
ghurl_zip:   #github zip下载
comments: true

post_nav: ["1.cdc_lasutopfhvcZLmcfl解决方案","2.webdriver解决放啊"]
group_tag: Scrapy Error 
---

虽然`chromedriver`已经可以可以使用浏览器登录了，但是由于浏览器还是被`chromedriver`控制的，chromedriver有一些特性可以被js感知到，所以很多网站可以在网站中加入js逻辑来判断当前的浏览器是否是由driver控制，比如检测是否存在特有标识`$cdc_lasutopfhvcZLmcfl`、`window.navigator.webdriver`：

# 1.cdc_lasutopfhvcZLmcfl解决方案

 解决上面的问题`$cdc_lasutopfhvcZLmcfl` 需要去修改driver文件，具体修改方法[解决方案](https://stackoverflow.com/questions/33225947/can-a-website-detect-when-you-are-using-selenium-with-chromedriver "https://stackoverflow.com/questions/33225947/can-a-website-detect-when-you-are-using-selenium-with-chromedriver")

  
 
windows和linux下修改过的文件可以到[这里下载](https://git.imooc.com/coding-92/coding-92/src/master/chrome_nocdc "https://git.imooc.com/coding-92/coding-92/src/master/chrome_nocdc"), chrome使用73版本。[百度网盘 备份下载](https://pan.baidu.com/s/1HPA3lCPk1KK4z528KmdHdQ "https://pan.baidu.com/s/1HPA3lCPk1KK4z528KmdHdQ") 提取码`fyom`

# 2.webdriver解决方案

解决window.navigator.webdriver的方法可以通过：

```python
option = webdriver.ChromeOptions()
option.add_experimental_option('excludeSwitches', ['enable-automation']) #这里去掉window.navigator.webdriver的特性
    
```

下面给出简单的模拟淘宝登录的代码：

```python
from selenium import webdriver

option = webdriver.ChromeOptions()
option.add_experimental_option('excludeSwitches', ['enable-automation']) #这里去掉window.navigator.webdriver的特性

domain = "https://www.taobao.com/"

#下面的chromedriver.exe使用特殊的可执行文件，去掉了$cdc_lasutopfhvcZLmcfl等特性
browser = webdriver.Chrome(executable_path="C:/360安全浏览器下载/chromedriver_win32/test/chromedriver.exe", options=option)
import time
browser.get(domain)
browser.find_element_by_xpath('//*[@id="J_SiteNavLogin"]/div[1]/div[1]/a[1]').click()
time.sleep(5)
browser.find_element_by_xpath('//*[@id="J_Quick2Static"]').click()
time.sleep(5)
username_el = browser.find_element_by_id("TPL_username_1")
#淘宝会检测输入的速度，所以控制一下输入速度
username = "xxx"
for character in username:
    username_el.send_keys(character)
    time.sleep(0.3) # pause for 0.3 seconds

pwd_el = browser.find_element_by_id("TPL_password_1")
password = "xxx"
for character in password:
    pwd_el.send_keys(character)
    time.sleep(0.3) # pause for 0.3 seconds

time.sleep(2)
browser.find_element_by_id("J_SubmitStatic").click()
time.sleep(5)
time.sleep(20)
```

















