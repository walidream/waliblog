---
layout: post
title:  PC端适配屏幕尺寸 #标题
tagline: 适配1920、1366分辨率
category: css      #分类
author: wali    #作者
tag: input     #标签
ghurl:        #github url
ghurl_zip:    #github zip下载

post_nav: false
---

小菜今天聊聊PC端适配，之前写了很多项目都是移动端的，移动端适配用`flexible.js`挺简单的，别人帮我们做好了。如果不懂请戳 [使用Flexible实现手淘H5页面的终端适配](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html "https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html"){:target="_blank"}。这里讲讲PC端如何实现适配。PC没有`dpr`只有`像素`这个概念，实现起来就比移动端轻松了许多。

PC实现适配也是用了`rem`这个css3属性，`rem`相对于根元素(即html元素)`font-size`计算值的倍数。这里以PC常见的分辨率1920px和1366px(14寸笔记本)为例说明。为了更好的说明，假设设计师给的设计稿是1920px，我们既要做1920px屏幕，也要给1366px的屏幕做适配。

现在小菜随便取1920px设计稿一块区域，假设宽度`273px`，高度随意。那么在1366px屏幕上宽度应该显示多少呢？

我们将屏幕宽度等比分成100份

```javascript
//1920分辨率屏幕
avg = 1920 / 100 = 19.20 px

//1366分辨率屏幕
avg = 1366 / 100 = 13.66 px
```

在1366分辨率屏幕应该显示宽度 = `(1366 * 273) / 1920`  最后是`194.228125`px

```javascript
//1920分辨率屏幕定义根
font-size = 19.20px //即 1rem = 19.20px

//1366分辨率屏幕
font-size = 13.66px  //即 1rem = 13.66px
```

适配代码
```css
html{
   font-size:19.20px;  /*默认以设计稿为基准*/
}

@media only screen and (max-width: 1366px) {
   html{
      font-size:13.66px;
   }
}

#test{
   width:14.21875rem;
}
```
id为`test`的盒子在1920屏幕宽度= `14.21875 * 19.20` 最后是273

id为`test`的盒子在1366屏幕宽度= `14.21875 * 13.66` 最后是194.228125

这样一来我们就适配了1920px和1366px屏幕。PC一般也就是这两个分辨率占多数，兼容了这两个分辨率屏幕基本就可以了。在说下国内基本没有在兼容IE8的浏览器了。基本都是IE9+，css3属性在IE9+上还是可以使用的。不过建议小伙伴们使用前还是确定下，[浏览器兼容](https://caniuse.com/ "https://caniuse.com/"){:target="_blank"}

最后在对上面补充点，有的小伙伴可能觉得每次设置宽高前都要手动的转换，实在是太麻烦，不要着急小菜为大家找了个sass方法。

```scss
// PX 转 rem
@function px2Rem($px, $base-font-size: 19.2px) {
  @if (unitless($px)) { //有无单位
    @return ($px / 19.2) * 1rem;
  } @else if (unit($px) == em) {
    @return $px;
  }
  @return ($px / $base-font-size) * 1rem;
}
```

测试下上面的方法

```scss
#test{
   width:px2Rem(273px) 
}
//输出
#test{
   width:14.21875rem;
}
```

小伙伴们如果有更好的PC适配方案也可给小菜讲讲，欢迎在下方留言。



















































