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
			client_id: 'e7f2a78d2b02ec3e6137',
			client_secret: '78539519f80b1a2ec10deb56876bde7fd175d1f3',
			},
	});
	gitment.render('gitmentContainer');
});