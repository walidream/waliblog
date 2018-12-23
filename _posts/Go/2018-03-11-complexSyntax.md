---
layout: post
title: Go语言数据类型(二)   #标题
tagline: 介绍数组、Slice(切片)、Map、结构体、JSON
category: Go      #分类
author: wali    #作者
tag: Go     #标签
ghurl:        #github url
ghurl_zip:   #github zip下载
comments: true

post_nav: ["1.数组", "2.Slice", "3.Map", "4.struct"]
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

### 01.slice扩展

```javascript
arr := [...]int{0,1,2,3,4,5,6,7}

s1 := arr[2:6]  //[2,3,4,5](6,7) len长度4,cap容量6
                // 0,1,2,3, 4,5
s2 := s1[3:5]   //[5,6] len长度2,cap容量3

fmt.Println(s1[4]) //报错，取不到下标为4，切片是对数组view，数组能取到的值就是小于len下标

```
slice可以向后扩展，但不能向前扩展。扩展条件 `len < cap`。

s[i]不可以超越len(s),向后扩展不可以超越底层数组cap(s)


### 02.make函数

内置的make函数创建一个指定元素类型、长度和容量的slice。容量部分可以省略，在这种情况下，容量将等于长度。

> 语法：make([]T,len,cap)

```javascript
sli := make([]int, 3,10)

fmt.Printf("sli=%v,len = %d,cap=%d",sli,len(sli),cap(sli))  //sli=[0,0,0], len = 3,cap = 10
```

### 03.slice比较

slice唯一合法的比较操作是和`nil`比较

```javascript
if summer == nil { /* ... */}
```

一个零值的slice等于nil。一个nil值的slice并没有底层数组。一个nil值的slice的长度和容量都是0，但是也有非nil值的slice的长度和容量也是0的，例如[]int{}或make([]int, 3)[3:]。与任意类型的nil值一样，我们可以用[]int(nil)类型转换表达式来生成一个对应类型slice的nil值

```javascript
var s []int    // len(s) == 0, s == nil
s = nil        // len(s) == 0, s == nil
s = []int(nil) // len(s) == 0, s == nil
s = []int{}    // len(s) == 0, s != nil
```

如果你需要测试一个slice是否是空的，使用len(s) == 0来判断，而不应该用s == nil来判断。除了和nil相等比较外，一个nil值的slice的行为和其它任意0长度的slice一样；例如reverse(nil)也是安全的。除了文档已经明确说明的地方，所有的Go语言函数应该以相同的方式对待nil值的slice和0长度的slice。

### 04.append函数向slice追加元素

```javascript
var sli []int

fmt.Printf("sli = %v, len = %d, cap = %d",sli,len(sli),cap(sli))  //[], len = 0,cap = 0
sli = append(sli,1,2,3,4)
fmt.Printf("sli = %v, len = %d, cap = %d",sli,len(sli),cap(sli))  //[1,2,3,4], len = 4,cap = 4

//append追加多个值，甚至可以是slice
sli = append(sli,9,8,7,6)

```

### 05.append追加原理

```javascript
func appendInt(x []int, y int) [] int{
    var z []int
	zlen := len(x) + 1
	if zlen <= cap(x){ 
	   z = x[:zlen]
	}else{
	   zcap := zlen
	   if zcap < 2*len(x){
	     zcap = 2 * len(x)
	   }
	   z = make([]int, zlen, zcap)	   
	   copy(z,x)
	}
	z[len(x)] = y
	
	return z
}

func main(){
   var x,y []int
   for i := 0; i < 10; i++{
     y = appendInt(x,i)
	 fmt.Printf("%d cap=%d\t%v\n",i,cap(y),y)
	 x = y
   }
}
//输出：
//0  cap=1    [0]
//1  cap=2    [0 1]
//2  cap=4    [0 1 2]
//3  cap=4    [0 1 2 3]
//4  cap=8    [0 1 2 3 4]
//5  cap=8    [0 1 2 3 4 5]
//6  cap=8    [0 1 2 3 4 5 6]
//7  cap=8    [0 1 2 3 4 5 6 7]
//8  cap=16   [0 1 2 3 4 5 6 7 8]
//9  cap=16   [0 1 2 3 4 5 6 7 8 9]
```

优化后，向appendInt中传入可变参数

```javascript
func appendInt(x []int, y ...int) [] int{
    var z []int
    zlen := len(x) + len(y)
    if zlen <= cap(x){ 
       z = x[:zlen]
    }else{
       zcap := zlen
       if zcap < 2*len(x){
    	 zcap = 2 * len(x)
       }
       z = make([]int, zlen, zcap)	   
       copy(z,x)
    }
    copy(z[len(x):], y)
    
    return z
}

func main() {
   var y []int

   y = appendInt(y,1,2,3,4,5,6,7)	
   fmt.Printf("cap=%d\t%v\n",cap(y),y)
}
//输出：cap=7   [1 2 3 4 5 6 7]
```

### 06.slice对数组

```javascript
arr := [6]int{0,1,2,3,4,5}

s := arr[2:]
s1 := append(s,6)
s2 := append(s1,7)
s3 := append(s2,8)
s4 := append(s3,9)

fmt.Println(s)   //[2,3,4,5]
fmt.Println(s1)  //[2,3,4,5,6]
fmt.Println(s2)  //[2,3,4,5,6,7]
fmt.Println(s3)  //[2,3,4,5,6,7,8]
fmt.Println(s4)  //[2,3,4,5,6,7,8,9]
fmt.Println(arr) //[0,1,2,3,4,5]
```

slice虽然是对数组操作，但是当超出数组边界时，此刻s1,s2,s3,s4都不在对`arr`进行view，而是重新在底层`new Array`，这步是GO操作的。添加元素时，如果超越cap，系统会重新分配更大的底层数组。现在只有s是对arr的一种view

由于值传递的关系，必须接收append的返回值。

### 07.slice push,pop,copy

```javascript
//向切片push一个值
stack = append(stack,v)  //push v

//弹出栈顶元素
top := stack[len(stack) - 1]

//返回弹出后元素slice
stack = stack[:len(stack) - 1]

//将s2拷贝到s1
copy(s1,s2)
```

### 08.slice移除

```javascript
func remove(slice []int, i int) []int {
   copy(slice[i:], slice[i+1:])
   return slice[:len(slice)-1]
}

func main() {
   s := []int{5, 6, 7, 8, 9}
   fmt.Println(remove(s, 2)) // "[5 6 8 9]"
}
```

# 3.Map

> Map中的key值是无序的。map[K]V，复合结构map[k1]map[k2]v

哈希表是一种巧妙并且实用的数据结构。它是一个`无序`的key/value对的集合，其中所有的key都是不同的，然后通过给定的key可以在常数时间复杂度内检索、更新或删除对应的value。

在Go语言中，一个map就是一个`哈希表`的引用，map类型可以写为`map[K]V`，其中`K`和`V`分别对应`key`和`value`。map中所有的key都有相同的类型，所有的value也有着相同的类型，但是key和value之间可以是不同的数据类型。

### 01.创建map

```javascript
//第一种
var ages map[string]int

//第二种
ages := make(map[string]int)
ages["alice"] = 31
ages["charlie"] = 34

//第三种
ages := map[string]int{
    "alice":   31,
    "charlie": 34,
}

fmt.Println(ages)  //map[alice:31 charlie:34]
```

### 02.删除map

```javascript
delete(ages, "alice")

fmt.Println(ages) //map[charlie:34]
```

对map操作中，即使某个元素不存在也没有关系;如果一个查找失败将返回value类型对应的`零值`

```javascript
ages["kkk"] = ages["kkk"] + 1
fmt.Println(ages) //map[charlie:34 kkk:1]

delete(ages, "test")
fmt.Println(ages) //map[charlie:34 kkk:1]
```

当map不存在时，会返回value类型对应的`零值`，如果value的类型为`int`，对应的零值`0`，就和真正的零值分不开。可以这样操作

```javascript
ages,ok := ages["kkk"]
if !ok {
//...
}
```

### 03.简短赋值

```javascript
ages["kkk"] += 1
//或
ages["kkk"]++

//但是绝对不能这样
ages["test"] = ages["kkk"]++   //写法错误，go中赋值右侧是表达式，自增是语句不是表达式

ages["kkk"]++
ages["test"] = ages["kkk"]     //写法正确
```

> map中的元素并不是一个变量，不能对map的元素进行取地址操作： _ = &ages["kkk"]

### 04.map遍历

```javascript
name := map[int]string{
    3: "张三",
	1: "李四",
	5: "王五",
	8: "李二麻子",
}

for k,v := range name{
  fmt.Printf("%d\t%s\n",k,v)
}
//输出：
//3       张三
//1       李四
//5       王五
//8       李二麻子
```

由于map的`key`是无序的，所以想要map输出有顺序，就必须手动排序

```javascript
import (
   "fmt"
   "sort"
)

name := map[int]string{
    3: "张三",
    1: "李四",
    5: "王五",
    8: "李二麻子",
}

var names = make([]int,0, len(name))
for k := range name{
   names = append(names,k)
}
sort.Ints(names)
fmt.Println(names)

for k,v := range name{
  fmt.Printf("%d\t%s\n",k,v)
}
//输出：
//[1 3 6 9]
//3       张三
//1       李四
//6       王五
//9       李二麻子
```

# 4.struct

### 01.定义

```javascript

type TreeNode Struct{
	left, Right *TreeNode
	Value int
}

```
























