---
layout: post
title: fmt.Printf方法详解   #标题
tagline: 
category: Go      #分类
author: wali    #作者
tag: Go     #标签
ghurl:        #github url
ghurl_zip:   #github zip下载
comments: true

post_nav: ['1.General(常规)','2.Integer(整型)','3.Integer width(整型宽度)','4.Float(浮点型)','5.String(字符型)','6.String Width(字符型宽度)','7.Struct(结构体)','8.Boolean(布尔型)','9.Pointer(指针)']
---

Go的标准库提供了100多个包，以支持常见功能，如输入、输出、排序以及文本处理。比如fmt包，就含有格式化输出、接收输入的函数。

> Println是其中一个基础函数，可以打印以空格间隔的一个或多个值，并在最后添加一个换行符，从而输出一整行。

> fmt.Printf("%s",'string'),错误写法。fmt.Printf("%s","string")字符串要用`""`引起来

# 1.General(常规)

格式符|说明|例|输出
-|-|-|-|
%v|打印变量的值(默认)|fmt.Printf("%v\r\n",123)|`123`
%T|打印变量的类型|fmt.Printf("%v 类型为 %T\r\n",123)|`123 类型为 int`

# 2.Integer(整型)

格式符|说明|例|输出
-|-|-|-|
%+d|带符号的整型|fmt.Printf("%+d", 123)|`+123`
%o|不带零的八进制|fmt.Printf("%o",7)|`7`
%#o|带零的八进制|fmt.Printf("%#o",7)|`07`
%x|小写的十六进制|fmt.Printf("%x",10)|`a`
%X|大写的十六进制|fmt.Printf("%X",10)|`A`
%#x|小写带0x的十六进制|fmt.Printf("%#x",10)|`0xa`
%#X|大写带0x的十六进制|fmt.Printf("%#X",10)|`0xA`
%c|相应Unicode码点所表示的字符|fmt.Printf("%c",0x4E2D)|`中`
%U|打印Unicode字符|fmt.Printf("%U",0x4E2D)|`U+4E2D`
%#U|打印带字符的Unicode|fmt.Printf("%#U",0x4E2D)|`U+4E2D '中'`
%b|打印整型的二进制|fmt.Printf("%b",5)|`101`

# 3.Integer width(整型宽度)

格式符|说明|例|输出
-|-|-|-|
%5d|表示该整型最大长度是5|fmt.Printf("\|%5d\|", 1)|`| 　 1|`
%-5d|则相反，打印结果会自动左对齐|fmt.Printf("\|%5d\|", 1234567)|`|1234567|`
%05d|会在数字前面补零|fmt.Printf("%05d\n",1)|`00001`

# 4.Float(浮点型)

格式符|说明|例|输出
-|-|-|-|
%f| (=%.6f) 6位小数点|fmt.Printf("%f\n",0.1)|`0.100000`
%e|(=%.6e) 6位小数点（科学计数法）|fmt.Printf("%e\n",10.2)|`1.020000e+01`
%g|用最少的数字来表示|fmt.Printf("%g\n",0.0100)|`0.01`
%.3g|最多3位数字来表示|fmt.Printf("%.3g\n",0.0100)|`0.01`
%.3f|最多3位小数来表示|fmt.Printf("%.3f\n",0.0111)|`0.011`

# 5.String(字符型)

格式符|说明|例|输出
-|-|-|-|
%s|正常输出字符串|fmt.Printf("%s","string")|`string`
%q|字符串带双引号，字符串中的引号带转义符|fmt.Printf("%q",string)|`"string"`
%#q|字符串带反引号，如果字符串内有反引号，就用双引号代替|fmt.Printf("%#q,%#q\n","string","str\`i\`ing")|\`string\`,"str\`i\`ing"
%x|将字符串转换为小写的16进制格式|fmt.Printf("%x\n","string")|`737472696e67`
%X|将字符串转换为大写的16进制格式|fmt.Printf("%X\n","string")|`737472696E67`
% x|带空格的16进制格式|fmt.Printf("% x\n","string")|`73 74 72 69 6E 67`

# 6.String Width(字符型宽度)

格式符|说明|例|输出
-|-|-|-|
%5s|最小宽度为5|fmt.Printf("%5s,%5s\n","abc","abcdef")|`　abc,abcdef`
%-5s|最小宽度为5（左对齐）|fmt.Printf("%-5s,%-5s\n","abc","abcdef")|`abc　,abcdef`
%.5s|最大宽度为5|fmt.Printf("%.5s,%.5s\n","abc","abcefgh")|`abc,abcef`
%5.7s|最小宽度为5，最大宽度为7|fmt.Printf("%5.7s,%5.7s\n","abc","abcdefgh")|`　abc,abcdefg`
%-5.7s|最小宽度为5，最大宽度为7（左对齐）|fmt.Printf("%-5.7s%-5.7ss\n","abc","abcdefgh")|`abc　abcdefgs`
%5.3s|如果宽度大于3，则截断|fmt.Printf("%5.3s\n","abcdefgh")|`　abc`
%05s|如果宽度小于5，就会在字符串前面补零|fmt.Printf("%05s,%05s\n","abc","abcdefgh")|`00abc,abcdefgh`

# 7.Struct(结构体)

格式符|说明|例|输出
-|-|-|-|
%v|正常打印|fmt.Printf("%v","{sam {12345 67890}}")|`{sam {12345 67890}}`
%+v|带字段名称|fmt.Printf("%+v\n","{name:sam phone:{mobile:12345 office:67890}")|`{name:sam phone:{mobile:12345 office:67890}`
%#v|用Go的语法打印|fmt.Printf("%#v\n","main.People{name:”sam”, phone:main.Phone{mobile:”12345”, office:”67890”}}")|`{sam {12345 67890}}`

# 8.Boolean(布尔型)

格式符|说明|例|输出
-|-|-|-|
%t|打印true或false|fmt.Printf("%t",true)|`true`

# 9.Pointer(指针)

格式符|说明|例|输出
-|-|-|-|
%p|带0x的指针|a :=1;fmt.Printf("%p\n",&a)|`0xc042056088`
%#p|不带0x的指针|a :=1;fmt.Printf("%p\n",&a)|`c042056088`















