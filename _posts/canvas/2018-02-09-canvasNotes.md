---
layout: post
title: canvas笔记   #标题
tagline: 记录个人在使用canvas时，常用到的知识
category: canvas      #分类
author: wali    #作者
tag: canvas     #标签
ghurl:        #github url
ghurl_zip:   #github zip下载
comments: true

post_nav: ['1.获取绘图环境','2.绘线条','3.绘制矩形','4.图形变换','5.变换矩阵','6.fillStyle填充样式','7.文本渲染','8.阴影','9.透明度','10.常用']
---

这篇canvas笔记整理，主要是近期写的很多东西都与canvas有关，个人简单搜了搜canvas基本知识以及自己用到的知识点，在此记录整理。在此之前，小菜写了一个图像裁剪，拖拽，缩放的demo，没有放在canvas分类中，放在`javascript/图像、文件上传`中。模仿微博的头像裁剪，如果大家感兴趣，可以去看看。

# 1.基本操作

### 1.获取绘图环境

```javascript
let canvas = document.getElementById('canvas');
let ctx = canvas.getctx('2d');
if(!ctx) alert('您的浏览器不支持canvas，请升级');
```

### 2.绘线条

```javascript
ctx.moveTo(100,100);    //移动点
ctx.lineTo(700,700);    //线条长度
ctx.lineWidth = 10;     //粗细
ctx.strokeStyle = '#058'; //颜色
ctx.stroke();    //绘制
```
#### 01.线条属性
> ctx.lineCap：属性设置或返回线条末端线帽的样式

> ctx.lineCap = "butt\|round\|square";

参数|类型|必填|说明
-|-|-|-
butt|String|-|(默认)向线条的每个末端添加平直的边缘|
round|String|-|向线条的每个末端添加圆形线帽|
square|String|-|向线条的每个末端添加正方形线帽|

> ctx.lineJoin：属性设置或返回所创建边角的类型，当两条线交汇时。

> ctx.lineJoin = "bevel\|round\|miter";

参数|类型|必填|说明
-|-|-|-
bevel|String|-|创建斜角|
round|String|-|创建圆角|
miter|String|-|(默认)创建尖角|

### 3.绘制矩形

```javascript
ctx.rect( x , y , width , height );   //绘一个矩形
ctx.fillRect( x , y , width , height); //填充一个矩形
ctx.strokeRect( x , y , width , height ); //矩形描边

ctx.lineWidth      //线条宽度
ctx.strokeStyle    //线条颜色
ctx.fillStyle      //填充颜色
ctx.stroke()       //绘轮廓
ctx.fill()         //填充色
```

### 4.图形变换

```javascript
ctx.translate( x , y )  //位移
ctx.rotate( deg )       //旋转
ctx.scale( sx , sy )    //缩放
```

### 5.变换矩阵

```javascript
[                         
 a c e            //a 水平缩放 ( 1 )
 b d f            //b 水平倾斜 ( 0 )
 0 0 1            //c 垂直倾斜 ( 0 )
]                 //d 垂直缩放 ( 1 )
                  //e 水平位移 ( 0 )
                  //f  垂直位移 ( 0 ) 
				 
```

#### 01.设置变换矩阵

```javascript
ctx.transform( a , b , c , d , e , f )

ctx.setTransform( a , b , c , d , e , f ) 
```

### 6.fillStyle填充样式

```javascript
fillStyle = color|gradient|image|canvas|video;

//线性渐变
let grd = ctx.createLinearGradient(xstart,ystart,xend,yend);
grd.addColorStop( stop , color );		

//径性渐变
let grd = ctx.createRadialGradient( x0 , y0, r0 , x1 , y1 , r1 );
grd.addColorStop( stop , color );

//重复图像
ctx.createPattern( img , repeat-style) 方法在指定的方向内重复指定的元素
repeat-style:no-repeat|repeat-x|repeat-y|repeat 

//重复画布
ctx.createPattern( canvas , repeat-style );

//重复视频
ctx.createPattern( video , repeat-style )
```

### 7.文本渲染

```javascript
ctx.font = "bold 40px Arial"  //设置字体

ctx.fillText( string , x , y , [maxlen] );
ctx.strokeText( string , x , y  , [maxlen] );
```

> ctx.font = "font-style font-variant font-weight font-size font-family";

> font-style = "normal\|italic\|oblique"

参数|类型|必填|说明
-|-|-|-
normal|String|-|(默认)|
italic|String|-|斜体字|
oblique|String|-|倾斜字体|

> font-variant = "normal\|small-caps";

参数|类型|必填|说明
-|-|-|-
normal|String|-|(默认)|
small-caps|String|-| |

> font-weight = "lighter\|normal\|bold\|\bolder";

参数|类型|必填|说明
-|-|-|-
lighter|String|-|细|
normal|String|-|(默认)100,200,300,400|
bold|String|-|(粗) 500,600,700|
bolder|String|-| |

> font-size = "20px\|2em\|150%";

参数|类型|必填|说明
-|-|-|-
20px|String|-|(默认)单位px|
2em|String|-|单位em|
150%|String|-|单位%|

> font-family = "支持@font-face\|Web安全字体";  设置多种字体备选

> ctx.textAlign = "left\|center\|right";  水平对齐方式

参数|类型|必填|说明
-|-|-|-
left|String|-|左对齐|
center|String|-|居中对齐|
right|String|-|右对齐|

> ctx.textBaseline = "top\|middle\|bottom\|alphabetic\|ideographic\|hanging";  基线对齐

参数|类型|必填|说明
-|-|-|-
top|String|-|把当前盒的top与行盒的top对齐(借用css概念)|
middle|String|-|把当前盒的垂直中心和父级盒的基线加上父级的半x-height对齐(借用css概念)|
bottom|String|-|把当前盒的bottom与行盒的bottom对齐(借用css概念)|
alphabetic|String|-|(默认)|
ideographic|String|-| |
hanging|String|-| |

> ctx.measureText( string ).width  计算字符串在canvas的宽度

### 8.阴影

```javascript
ctx.shadowColor
ctx.shadowOffsetX
ctx.shadowOffsetY
ctx.shadowBlur
```

### 9.透明度

```javascript
ctx.globalAlpha
ctx.globleCompositeOperation
```

> ctx.globleCompositeOperation = "source-over\|source-atop\|source-in\|source-out\|destination-over\|destination-atop\|destination-in\|destination-out\|lighter\|copy\|xor";

参数|类型|必填|说明
-|-|-|-
source-over|String|-|这是默认值，他表示绘制的图形将画在现有画布之上|
source-atop|String|-|这个操作会将源绘制在目标之上，但是在重叠区域上两者都是不透明的。绘制在其他位置的目标是不透明的，但源是透明的|
source-in|String|-|在源于目标重叠的区域只绘制源，而不重叠的部分编程透明的|
source-out|String|-|在与目标不重叠的区域上绘制源，其他部分都变成透明的|
destination-over|String|-|这个操作的值与source-over值相反，所以现在目标绘制在源之上|
destination-atop|String|-|这个操作与source-atop相反，目标绘制在源之上|
destination-in|String|-|这个操作与source-in相反，在源于目标重叠的区域保留目标。而不重叠的部分都变成透明的|
destination-out|String|-|在与源不重叠的区域上保留目标。其他部分都变成透明的|
lighter|String|-|这个值与顺序无关，如果源与目标重叠，就将两者的颜色值叠加。得到的颜色值的最大取值为255，结果就为白色|
copy|String|-|这个值与顺序无关，只绘制源，覆盖掉目标|
xor|String|-|这个值与顺序无关，只绘制出不重叠的源与目标区域。所有重叠的部分都变成透明的|


### 10.常用

```javascript
//1.canvas状态保存与恢复
ctx.save()    //保存
ctx.restore() //恢复

//2.路径
ctx.beginPath()    //方法开始一条路径，或重置当前的路径
ctx.closePath()    //方法创建从当前点到开始点的路径	

//3.剪辑取区域,一般先保存，然后剪辑路径，最后恢复
ctx.save()      //保存 
ctx.clip()      //剪辑
ctx.restore()   //恢复

//4.清除画布
ctx.clearRect( x , y , width , height )

//5.判断鼠标是否在该路径,只能判断最后一个剪辑路径
ctx.isPointInPath( x , y )
```







