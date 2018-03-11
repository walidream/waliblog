---
layout: post
title: Go语言数据类型(二)   #标题
tagline: 介绍数组、Slice(切片)、Map、结构体、JSON
category: Go      #分类
author: wali    #作者
tag: Go     #标签
ghurl:        #github url
ghurl_zip:   #github zip下载

post_nav: false
---

复合数据类型小菜主要讨论，记录五种类型一一数组、slice、map、结构体、JSON。数组和结构体是聚合类型，他们的值由许多元素或成员字段的值组成。数组是由同构的元素组成-每个数组元素都是完全相同的类型。结构体则是由异构的元素组成的。数组和结构体都是有固定内存大小的数据结构。相比之下，slice和map则是动态的数据结构，它们将根据需要动态增长。

# 1.数组

> 数组拷贝是值拷贝，不是引用类型拷贝

数组是一个由固定长度的特定类型元素组成的序列，一个数组可以由零个或多个元素组成。因为`数组的长度是固定的`，因此在Go语言中很少直接使用数组。

数组的每个元素可以通过索引下标来访问，索引下标的范围是从0开始到数组长度减1的位置。内置的len函数将返回数组中元素的个数

### 01.数组声明

```javascript
//声明长度为3，数据类型为int，变量名arr1数组
var arr1 [3]int  

//声明长度为5，数据类型为int并初始化值，变量名为arr2数组
arr2 := [5]int{1,2,3,4,5}

//声明并赋值
var arr3 [4]int = [4]int{1,2,3,4}

//使用...来声明数组
arr4 := [...]int{1,3,5,7}

//初始化部分值
arr5 := [...]int{50:5,99:-1}

//声明二维数组
var arr6 = [4][5]int
```

### 02.数组遍历

```javascript
//第一种遍历
arr := [5]int{1,2,3,4,5}
for i := 0; i < len(arr); i++{
 fmt.Println(arr[i])
}
//第二种遍历
arr1 := [5]int{10,9,8,7,6}
for i,v := range arr1{
 fmt.Println(i,v)
}
```

# 2.Slice

> slice不是值拷贝

Slice（切片）代表`变长的序列`，序列中每个元素都有`相同的类型`。一个slice类型一般写作`[]T`，其中T代表slice中元素的类型；`slice的语法和数组很像，只是没有固定长度而已`。

一个slice由三个部分构成：`指针`、`长度`和`容量`。指针指向第一个slice元素对应的`底层数组元素的地址`，要注意的是slice的`第一个元素并不一定就是数组的第一个元素`。slice的切片操作s[i:j]，其中`0 ≤ i≤ j≤ cap(s)`

```javascript
arr := [...]int{0,1,2,3,4,5,6,7}
s := arr[2:6]  //遵循左闭右开原则，即 x<= val <y
fmt.Println(s)  //2,3,4,5 

fmt.Println(arr[:6])  //0,1,2,3,4,5
fmt.Println(arr[2:])  //2,3,4,5,6,7
fmt.Println(arr[:])   //0,1,2,3,4,5,6,7

```






























































