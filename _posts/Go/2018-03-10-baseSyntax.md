---
layout: post
title: Go语言数据类型(一)   #标题
tagline: 介绍整型、浮点型、复数、布尔型、字符串
category: Go      #分类
author: wali    #作者
tag: Go     #标签
ghurl:        #github url
ghurl_zip:   #github zip下载
comments: true

post_nav: ['1.整型','2.浮点数','3.复数','4.布尔型','5.字符串']
---

Go语言的数据类型分为基础数据类型和复合数据类型。

> 基础数据类型：`整型、浮点型、复数、布尔型、字符串`

> 复合数据类型：`数组、Slice(切片)、Map、结构体、JSON`

Go语言中关于算术运算、逻辑运算和比较运算的二元运算符，它们按照优先级递减的顺序排列

-|-|-|-|-|-|-|
\*|/|%|<<|>>|&|&^|
\+|-|\||^||||
==|!=|<|<=|>|>=||
&&|||||||
|\|\||||||||

二元运算符有五种优先级。在同一个优先级，使用左优先结合规则，但是使用括号可以明确优先顺序

# 1.整型

Go语言同时提供了`有符号`(int)和`无符号`(uint)类型的整数运算。

> int：int8、int16、int32、int64 

> uint：uint8、uint16、uint32、uint64

一个n-bit的有符号数的值域是从`$-2^{n-1}$`到`$2^{n-1}-1$`。如`int8`范围-127-127，`uint`范围0-255

Unicode字符rune类型是和int32等价的类型，通常用于表示一个Unicode码点。

byte也是uint8类型的等价类型，byte类型一般用于强调数值是一个原始的数据而不是一个小的整数


```javascript
var a uint8 = 255
fmt.Println(a,a+1,a*a)  //"255,0,1"

var b int8 = 127
fmt.Println(b,b+1,b*b)  //"127,-128,1"

```
一个算术运算的结果，不管是有符号或者是无符号的，如果需要更多的bit位才能正确表示的话，就说明计算结果溢出了。上面的例子就属于计算结果溢出，在声明变量是需要考虑计算结果是否会溢出，否则最后的结果可能和预期会有偏差。

# 2.浮点数

Go语言提供了两种精度的浮点数，float32和float64。浮点数的范围极限值可以在`math`包找到。常量math.MaxFloat32表示float32能表示最大数值，大约`3.4e38`;对应的math.MaxFloat64常量大约是`1.8e308`。


# 3.复数

Go语言提供了两种精度的复数类型：complex64和complex128，分别对应float32和float64两种浮点数精度，内置的complex函数用于构建复数，内建的real和imag函数分别返回复数的实部和虚部

```javascript
var x complex128 = complex(1, 2) // 1+2i
var y complex128 = complex(3, 4) // 3+4i
fmt.Println(x*y)                 // "(-5+10i)"
fmt.Println(real(x*y))           // "-5"
fmt.Println(imag(x*y))           // "10"
```

# 4.布尔型

布尔类型的值只有两种：true和false，if和for语句的条件部分都是布尔类型的值，并且==和<等比较操作也会产生布尔值。

# 5.字符串

一个字符串是一个不可改变的字节序列。字符串可以包含任意的数据，包括byte值0，但是通常是用来包含人类可读的文本。文本字符串通常被解释为采用UTF8编码的Unicode码点（rune）序列

内置的len函数可以返回一个字符串中的字节数目（不是rune字符数目），索引操作s[i]返回第i个字节的字节值，i必须满足0 ≤ i< len(s)条件约束

```javascript
s := "hello,world"
fmt.Println(len(s))     // 12
fmt.Println(s[0],s[7])  // "104 119" ('h' and 'w')

c := s[len(s)]  //报错，访问超出字符串索引范围的字节将会导致panic异常

```

字符串的值是不可变的：一个字符串包含的字节序列永远不会被改变，当然我们也可以给一个字符串变量分配一个新字符串值

```javascript
s := "left foot"
t := s
s += ", right foot"

fmt.Println(s) // "left foot, right foot"
fmt.Println(t) // "left foot"

//因为字符串是不可修改的，因此尝试修改字符串内部数据的操作也是被禁止的
s[0] = 'L' // compile error: cannot assign to s[0]
```

一个原生的字符串面值形式是`...`，使用反引号代替双引号。可以用于HTML模板、JSON面值、命令行提示等。

```javascript
var str string = ` a
b
`
fmt.Println(str)
// a 
//b
```

### 01.unicode

Unicode码点的数据类型是int32，也就是Go语言中rune对应的类型。最大65536

### 02.UTF8

UTF8是一个将Unicode码点编码为字节序列的变长编码。UTF8编码使用1到4个字节来表示每个Unicode码点，ASCII部分字符只使用1个字节，常用字符部分使用2或3个字节表示.每个符号编码后第一个字节的高端bit位用于表示总共有多少编码个字节。如果第一个字节的高端bit为0，则表示对应7bit的ASCII字符，ASCII字符每个字符依然是一个字节，和传统的ASCII编码兼容。如果第一个字节的高端bit是110，则说明需要2个字节；后续的每个高端bit都以10开头。

```javascript
0xxxxxxx                             //runes 0-127    (ASCII)
110xxxxx 10xxxxxx                    //128-2047       (values <128 unused)
1110xxxx 10xxxxxx 10xxxxxx           //2048-65535     (values <2048 unused)
11110xxx 10xxxxxx 10xxxxxx 10xxxxxx  //65536-0x10ffff (other values unused)
```








































