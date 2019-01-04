//disqus Api

import $ from '../../_wp/node_modules/jquery/dist/jquery.js';

let protocol = 'https://';
let hostName = 'disqus.com/api/3.0';

export const http = {
	forums:{
		listPosts:`${protocol}${hostName}/listPosts.json`
	}	
	
}

export class Disqus{
	
	forumsListPosts(){
		return new Promise((resolve,reject)=>{
			/*$.ajax(http.forums.listPosts,{
				type:'GET',
				data:{
					'forum':'waliblog-com',
					'api_key':'zcVibGfa97M62yEpiflGjzeKYNnaJyBo92prqU87zQ3rRzRanwGEehchMr7DIHiK'
				},
				dataType: 'json',
				crossDomain:true,
				success:function(data){
					if(0 == data.code){
						resolve(data.response);
					}else{
						reject(data);
					}
				}
				
			})*/
			console.log('请求url',`${http.forums.listPosts}?forum=waliblog-com&api_key=zcVibGfa97M62yEpiflGjzeKYNnaJyBo92prqU87zQ3rRzRanwGEehchMr7DIHiK`);
			$.ajax({
				type: "GET",
				url: `${http.forums.listPosts}?forum=waliblog-com&api_key=zcVibGfa97M62yEpiflGjzeKYNnaJyBo92prqU87zQ3rRzRanwGEehchMr7DIHiK`,
				dataType: "jsonp",
				jsonpCallback: "callback123",
				success: function(data) {
					console.log(data);
				},
				error: function(jqXHR){
					console.log("发生错误：" + jqXHR.status);
				}
			});			
		})
	}
	
}