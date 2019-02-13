---
layout: post
title: canvas头像裁剪   #标题
tagline: canvas头像裁剪，拖拽，缩放，上传
category: canvas      #分类
author: wali    #作者
tag: canvas     #标签
ghurl: https://github.com/walidream/canvasPortraitTailor.git      #github url
ghurl_zip: https://github.com/walidream/canvasPortraitTailor.git  #github zip下载
comments: true

post_nav: ['1.判断本地图片宽度和高度','2.绘制头像','3.绘制矩形','4.预览','5.获取圆上任意地点坐标','6.两点间的距离','7.将以base64的图片url数据转换为file']
---

> 裁剪完后请参考`javascrip/图片上传` 传送门["http://waliblog.com/javascript/2018/01/29/upload.html"](http://waliblog.com/javascript/2018/01/29/upload.html "http://waliblog.com/javascript/2018/01/29/upload.html")

这篇canvas头像裁剪，没有用jq去写demo主要是因为操作dom太麻烦，这个demo最初是用angular写的(工作需要)，个人觉得用vue更方便！大家可以根据自己的需求把触发的事件换一下就可以了。

原本写这个demo想未大家封装成一个jq插件，但后来由于时间问题就没有做了，感兴趣的小伙伴可以自己玩玩。小菜把demo放在个人github上，想下载的点击页面上按钮。别忘了在github上给个星哦！

> 备用演示地址 [http://walidream.com/example/portraitNailor/](http://walidream.com/example/portraitNailor/ "http://walidream.com/example/portraitNailor/"){:target="_blank"}

<script async src="//jsrun.net/X2gKp/embed/all/light/"></script>


# 1.判断本地图片宽度和高度

> 方法：`isUpImgWH(width,height,box)`

> 参数：`width` `height` `box` 

> 说明：1.让本地图片不失真展示在canvas中，2.让canvas在黑色盒子水平或垂直居中

参数|类型|必填|说明
-|-|-|-
width|Number|是|本地图片的宽度|
height|Number|是|本地图片的高度|
box|Object|是|黑色背景盒子的宽度和高度|

> 参数: `box`

参数|类型|必填|说明
-|-|-|-
width|Number|是|黑色背景盒子的宽度|
height|Number|是|黑色背景盒子的高度|

```javascript
function isUpImgWH(width,height,box){
    let canW = null;
    let canH = null;
    let offsetTop = 0;  //画布偏移top
    let offsetLeft = 0; //画布偏移left
    //本地图片宽度大于高度
    if(width > height){
        canW = box.width;
        canH = Math.floor((canW * height)/ width);
        
        if(canH > box.width) canH = box.width;
        if(canH == box.width) {
            offsetTop = 0;
            offsetLeft = 0;
        }
        if(canH < box.width){
            offsetTop = Math.floor((box.width - canH)/2);
            offsetLeft = 0;
        }
    //本地图片高度大于等于宽度
	}else{
        canH = box.height;
        canW = Math.floor((width * canH)/height);
        
        if(canW > box.height) canW = box.height;
        if(canW == box.height){
            offsetTop = 0;
            offsetLeft = 0;
        }
        if(canW < box.height){
            offsetLeft = Math.floor((box.height - canW)/2);
            offsetTop = 0;
        }
	}
	
    return {
        width:canW,
        height:canH,
        top:offsetTop + 'px',
        left:offsetLeft + 'px'
    }
}
```

# 2.绘制头像

```javascript
//绘制头像
function clipProtrait(data){  
  let canWidth = data.drawCanvas.width;
  let canHeight = data.drawCanvas.height;
  let point = data.circle;
  let ctx = data.drawCanvas.ctx;
  let radius = data.circle.r;
  let handle = data.handle;
  let handleImg = data.handleImg;

  //碰壁检测
  if(data.circle.x < radius) data.circle.x = radius;
  if(data.circle.x > canWidth - radius) data.circle.x = canWidth - radius;
  if(data.circle.y < radius) data.circle.y = radius;
  if(data.circle.y > canHeight - radius) data.circle.y = canHeight - radius;
  
  ctx.clearRect(0,0,canWidth,canHeight);
  drawRect(ctx,0,0,canWidth,canHeight,0,0,'rgba(0,0,0,0.6)');
    
  //绘制头像
  ctx.save();
  ctx.beginPath();
  ctx.arc(point.x,point.y,radius,0,Math.PI * 2);
  ctx.clip();
  ctx.drawImage(data.negativeImg,0,0,canWidth,canHeight);
  ctx.restore();
  //绘制手柄
  ctx.save();
  ctx.beginPath();
  let tmpPonit = getCircle({x:point.x,y:point.y,r:radius},45);
  ctx.arc(tmpPonit.x,tmpPonit.y,handle.r,0,Math.PI * 2);
  data.handle.x = tmpPonit.x;
  data.handle.y = tmpPonit.y;
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.clip();
  ctx.restore();
  ctx.drawImage(handleImg,tmpPonit.x - handle.r - 3,tmpPonit.y - handle.r - 3,26,26);
  data.drawCanvas.ctx = ctx;

  return data;
}
```

# 3.绘制矩形

> 方法：`drawRect(cxt,x,y,width,height,BW,BC,fillColor)`

> 参数：`ctx` `x` `y` `width` `height` `BW` `BC` `fillColor`

> 说明：将canvas的底色填充灰色

参数|类型|必填|说明
-|-|-|-
cxt|Object|是|canvas 2d绘图环境|
x|Number|是|矩形初始x坐标|
y|Number|是|矩形初始y坐标|
width|Number|是|矩形宽度
height|Number|是|矩形高度
BW|String|是|矩形边框宽度
BC|String|是|线条颜色
fillColor|String|是|矩形填充色

```javascript
function drawRect(cxt,x,y,width,height,BW,BC,fillColor){
   cxt.beginPath();
   cxt.moveTo(x,y);
   cxt.lineTo(x+width,y);
   cxt.lineTo(x+width,y+height);
   cxt.lineTo(x,y+height);
   cxt.closePath();
   
   cxt.lineWidth = BW;
   cxt.fillStyle = fillColor;
   cxt.strokeStyle = BC;
   
   cxt.fill();
   cxt.stroke();
}
```

# 4.预览

> 方法：`previewProtrait(data)`

> 参数：`data`

> 说明：将选中区域的图片等比裁剪，并返回base64

参数|类型|必填|说明
-|-|-|-
data|Object|是|需要用到的参数|

```javascript
function previewProtrait(data){
  let imgW = data.negativeImg.width;
  let imgH = data.negativeImg.height;
  let point = data.circle;
  let k = imgW / data.drawCanvas.width;
  let sx = Math.floor((point.x - data.circle.r) * (imgW / data.drawCanvas.width)) ;
  let sy = Math.floor((point.y - data.circle.r) * (imgH / data.drawCanvas.height));
  let sW = Math.floor(2 * point.r * k);
  let sH = Math.floor(2 * point.r * k);

  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = 290;   //设置裁剪完成后图片的大小
  canvas.height = 290;
  drawRect(ctx,0,0,canvas.width,canvas.height,0,0,'#000');
  ctx.drawImage(data.negativeImg,sx,sy,sW,sH,0,0,canvas.width,canvas.height);
  let imgData = canvas.toDataURL("image/jpeg", 1);

  return imgData;
}
```


# 5.获取圆上任意地点坐标

> 方法：`getCircle(circle,angle)`

> 参数：`circle` `angle`

> 说明：将选中区域的图片等比裁剪，并返回base64

参数|类型|必填|说明
-|-|-|-
circle|Object|是|圆的坐标x,y,r|
angle|Number|是|圆上角度|

> 参数：`circle`

参数|类型|必填|说明
-|-|-|-
x|Number|是|圆x坐标|
y|Number|是|圆y坐标|
r|Number|是|圆的半径|

```javascript
function getCircle(circle,angle){
  let obj = {};
  obj.x = circle.x + circle.r * Math.cos(angle * Math.PI / 180);
  obj.y = circle.y + circle.r * Math.sin(angle * Math.PI / 180);
  return obj;
}
```

# 6.两点间的距离

> 方法：`getPointDistance(point1,point2)`

> 参数：`point1` `point2`

> 说明：计算两个点之间的距离，这里主要计算鼠标是在头像上还是在手柄上

参数|类型|必填|说明
-|-|-|-
point1|Object|是|坐标点x,y|
point2|Object|是|坐标点x,y|

```javascript
function getPointDistance(point1,point2){
  let count = (point1.x * point1.x) -(2 * point1.x * point2.x) + (point2.x * point2.x) + (point1.y * point1.y) -(2 * point1.y * point2.y) + (point2.y * point2.y);
  let tmpd1 = Math.sqrt( count);
  if(point1.r > tmpd1){
    return true;
  }
  return false;
}
```

# 7.将以base64的图片url数据转换为file

> 方法：`convertBase64UrlToBlob(urlData)`

> 参数：`urlData`

> 说明：将base64转换成file

参数|类型|必填|说明
-|-|-|-
urlData|String|是|图像Base64数据|

```javascript
function convertBase64UrlToBlob(urlData){
  var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
  //处理异常,将ascii码小于0的转换为大于0
  var ab = new ArrayBuffer(bytes.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }

  return new Blob( [ab] , {type : 'image/png'});
}
```
























