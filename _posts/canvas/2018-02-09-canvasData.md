---
layout: post
title:  canvas数据转化 #标题
tagline: canvas,file,base64,blos互转
category: canvas      #分类
author: wali    #作者
tag: canvas     #标签
ghurl:        #github url
ghurl_zip:   #github zip下载
comments: true

post_nav: ['1.canvas转化Base64','2.file对象获取url','3.base64转化Blob','4.获取本地图片base64','5.canvas传递到后台']
---

### 1.canvas转化Base64

```javascript
let imgBase64 = canvas.toDataURL('image/jpeg', 0.8);
```

### 2.file对象获取url

```javascript
let windowURL = window.URL || window.webkitURL;
let imgsrc = windowURL.createObjectURL(e.target.files[0]);
```

### 3.base64转化Blob

```javascript
function convertBase64UrlToBlob(base64){
  let bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte; base64编解码(btoa编码,atob解码)
  //处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob( [ab] , {type : 'image/png'});
}
```

### 4.获取本地图片base64

```javascript
let imgInfo = event.target.files[0];  //参考javascript/图片上传
let reader = new FileReader();

reader.onload=function(){
   let imgBase64 = this.result;
   console.log(imgBase64);				
}
reader.readAsDataURL(imgInfo);
```


### 5.canvas传递到后台

```javascript
let canvas = document.createElement('canvas');
canvas.width = 100;
canvas.heigth = 100;
// ...绘图
//1.将canvas转换成base64
let imgBase64 = canvas.toDataURL('image/jpeg', 0.8);

//2.将imgBase64转换Blob
let fileData = convertBase64UrlToBlob(imgBase64);

//3.传到后台
let formData = new FormData();
formData.append('file', fileData);
$.post(url,formData,function(data){
  //上传成功后做某些事
});
	
function convertBase64UrlToBlob(base64){
  let bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte; base64编解码(btoa编码,atob解码)
  //处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob( [ab] , {type : 'image/png'});
}
```











