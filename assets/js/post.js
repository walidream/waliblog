/**
 * Created by Administrator on 2017/11/26.
 */

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
			client_id: '201885b48f0735b368b5',
			client_secret: '756567e6bec515440c3c3488352f13dd844f50b6',
			},
	});
	gitment.render('gitmentContainer');
});