/**
 * Created by Administrator on 2017/11/26.
 */
 
import Gitment from '../../_wp/node_modules/gitment/dist/gitment.js'
import {navFade,backTop} from './_commethod';
import $ from '../../_wp/node_modules/jquery/dist/jquery.js';

$(function(){
	//post导航淡入淡出
	navFade();
	//返回顶部
    backTop();
	
	var gitment = new Gitment({
		id:'24291821',
		owner: 'walidream',
		repo: 'waliblog',
		oauth: {
			client_id: '3ddf84b1252297e2ffa4',
			client_secret: '669522d8f53e46903520f12134b3bc938e550db3',
			},
	});
	gitment.render('gitmentContainer');
});