import request from 'superagent';

let saveProject=function (cerebral,ref){
	
	return new Promise(function(resolve,reject){
		console.log('save project');
		
		window.setTimeout(function(){
			console.log('save done');
			resolve({});
			
		},1000);
		
	})
	
	
}
export default saveProject;