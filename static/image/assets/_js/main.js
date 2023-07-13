/**
 * Created by Administrator on 2017/11/26.
 */


import {getHomeComment,navFade,backTop} from './_commethod';
import $ from '../../_wp/node_modules/jquery/dist/jquery.js';

$(function(){
	
	//首页评论
    getHomeComment();
	//返回顶部
	navFade();
	//返回顶部
    backTop();
});