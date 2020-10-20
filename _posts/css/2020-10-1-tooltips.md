---
layout: post
title: css 纯css tooltips   #标题
tagline: 纯css打造的工具提示
category: css      #分类
author: wali    #作者
tag:  css3     #标签
ghurl:        #github url
ghurl_zip:    #github zip下载
comments: true

post_nav: ["1.html结构","2.css样式"]
group_tag: css 相关
---

[纯css打造的工具提示](http://xurui3762791.github.io/tooltips/ "http://xurui3762791.github.io/tooltips/")



```less
@import (reference) '~assets/less/color';

[data-tooltips] {
	position: relative;
  display: inline-block;
  &::before,&::after{
    position: absolute;
    border-radius: 4px;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    z-index: 1000000;
    transition: .3s ease;
    transform: translate3d(0,0,0);
    transition-delay: 0ms;
  }
  &::before{
    content: '';
    position: absolute;
    background: transparent;
    border: 6px solid transparent;
    z-index: 1000001
  }
  &::after{
    content: attr(data-tooltips);
    padding: 8px 10px;
    line-height: 1.5;
    font-size: 12px;
    color: @color-black-normal;
    background: @color-white-normal;
    box-shadow: 0 2px 20px 0 rgba(0,0,0,.2);
    border-radius: 4px;
    white-space: pre;
    // word-wrap:break-word; 
    // word-break:break-all;
  }
  &:hover{
    &::before,&::after{
      visibility: visible;
      opacity: 1;
      transition-delay: 100ms;
    }
  }
}
[data-tooltips='']{
  &::before,&::after{
    display: none !important;
  }
}

.tooltips-top{
  &::before{
    border-top-color: @color-white-normal;
  }
  &-left,&-right{
    &::before{
      border-top-color: @color-white-normal;
    }
  }
}

.tooltips-bottom{
  &::before{
    border-bottom-color: @color-white-normal;
  }
  &-left,&-right{
    &::before{
      border-bottom-color: @color-white-normal;
    }
  }
}

.tooltips-left{
  &::before{
    border-left-color: @color-white-normal;
  }
}

.tooltips-right{
  &::before{
    border-right-color: @color-white-normal;
  }
}

.tooltips-top{
  &::after{
    transform: translateX(-50%);
  }
  &::before,&::after{
    bottom: 100%;
	  left: 50%;
  }
  &::before{
    left: calc(50% - 6px);
    margin-bottom: -11px;
  }
  &:hover,&:focus{
    &::before{
      transform: translateY(-8px);
    }
    &::after{
      transform: translateX(-50%) translateY(-8px);
    }
  }
}


.tooltips-bottom{
  &::before,&::after{
    top: 100%;
    left: 50%
  }
  &::before{
    left: calc(50% - 6px);
    margin-top: -11px;
  }
  &::after{
    transform: translateX(-50%);
  }

  &:hover,&:focus{
    &::before{
      transform: translateY(8px);
    }
    &::after{
      transform: translateX(-50%) translateY(8px);
    }
  }
}

.tooltips-right{
  &::before,&::after{
    left: 100%;
	  bottom: 50%
  }
  &::before{
    margin-left: -11px;
  	margin-bottom: -6px
  }
  &::after{
    margin-bottom: -14px
  }
  &:hover,&:focus{
    &::before{
      transform: translateX(8px);
    }
    &::after{
      transform: translateX(8px);
    }
  }
}


.tooltips-left{
  &::before,&::after{
    right: 100%;
	  bottom: 50%
  }
  &::before{
    margin-right: -11px;
	  margin-bottom: -6px;
  }
  &::after{
    margin-bottom: -14px;
  }
  &:hover,&:focus{
    &::before{
      transform: translateX(-8px);
    }
    &::after{
      transform: translateX(-8px);
    }
  }
}

.tooltips-top-left{
  &::before,&::after{
    bottom: 100%;
	left: 50%
  }
  &::before{
    left: calc(50% - 6px);
    margin-bottom: -11px;
  }
  &::after{
    margin-left: 12px;
    transform: translateX(-100%);
  }
  &:hover,&:focus{
    &::before{
      transform: translateY(-8px);
    }
    &::after{
      transform: translateX(-100%) translateY(-8px);
    }
  }
}


.tooltips-top-right{
  
  &::before,&::after{
    bottom: 100%;
	  left: 50%
  }
  &::before{
    left: calc(50% - 6px);
    margin-bottom: -11px;
  }
  &::after{
    margin-left: -12px;
    transform: translateX(0);
  }
  &:hover,&:focus{
    &::before{
      transform: translateY(-8px);
    }
    &::after{
      transform: translateY(-8px);
    }
  }
}

.tooltips-bottom-left{
  &::before,&::after{
    bottom: 100%;
	  left: 50%;
  }
  &::before{
    left: calc(50% - 6px);
    margin-top: -11px;
  }
  &::after{
    margin-left: 12px;
    transform: translateX(-100%);
  }
  &:hover,&:focus{
    &::before{
      transform: translateY(8px);
    }
    &::after{
      transform: translateX(-100%) translateY(8px);
    }
  }
}

.tooltips-bottom-right{
  &::before{
    left: calc(50% - 6px);
    margin-top: -11px;
  }
  &::before,&::after{
    bottom: 100%;
	  left: 50%;
  }
  &::after{
    margin-left: -12px;
    transform: translateX(0);
  }
  &:hover,&:focus{
    &::before{
      transform: translateY(8px);
    }
    &::after{
      transform: translateY(8px);
    }
  }
}

.tooltips-small,.tooltips-medium,.tooltips-large{
  &::after{
    white-space: normal;
    line-height: 1.4em
  }
}
.tooltips-small {
  &::after{
    width: 200px
  }
}

.tooltips-medium {
  &:after{
    width: 380px
  }
	
}
.tooltips-large{
  &::after{
    width: 450px
  }
}

.tooltips-always{
  &::after,&::before{
    opacity: 1;
	  visibility: visible;
  }
  &.tooltips-top{
    &::before{
      transform: translateY(-8px);
    }
    &::after{
      transform: translateX(-50%) translateY(-8px);
    }
  }
  &.tooltips-top-left{
    &::before{
      transform: translateY(-8px);
    }
    &::after{
      transform: translateX(-100%) translateY(-8px);
    }
  }
  &.tooltips-top-right{
    &::before{
      transform: translateY(-8px);
    }
    &::after{
      transform: translateY(-8px);
    }
  }
  &.tooltips-bottom{
    &::before{
      transform: translateY(8px);
    }
    &::after{
      transform: translateX(-50%) translateY(8px);
    }
  }
  &.tooltips-bottom-left{
    &::before{
      transform: translateY(8px);
    }
    &::after{
      transform: translateX(-100%) translateY(8px);
    }
  }
  &.tooltips-bottom-right{
    &::before{
      transform: translateY(8px);
    }
    &::after{
      transform: translateY(8px);
    }
  }
  &.tooltips-left{
    &::before{
      transform: translateX(-8px);
    }
    &::after{
      transform: translateX(-8px);
    }
  }
  &.tooltips-right{
    &::before{
      transform: translateX(8px);
    }
    &::after{
      transform: translateX(8px);
    }
  }
}



```






