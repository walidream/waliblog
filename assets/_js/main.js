/**
 * Created by Administrator on 2017/11/26.
 */


import {navFade,backTop,getLastComment} from './_commethod';
import $ from '../../_wp/node_modules/jquery/dist/jquery.js';

$(function(){
	//获取最新评论
	getLastComment();
	//导航
	navFade();
	//返回顶部
    backTop();
	//获取最新评论	
});