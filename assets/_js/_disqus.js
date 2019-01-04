//disqus Api

import $ from '../../_wp/node_modules/jquery/dist/jquery.js';

let protocol = 'https://';
let hostName = 'disqus.com/api/3.0';

export const http = {
	forums:{
		listPosts:`${protocol}${hostName}/forums/listPosts.json`
	}	
	
}

export class Disqus{
	
	forumsListPosts(){
		return new Promise((resolve,reject)=>{
			$.ajax(http.forums.listPosts,{
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
				
			})
		})
	}
	
}