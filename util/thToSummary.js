javascript:(function(){
	varsummarytxt='';
	varel=document.querySelectorAll('table');
	el.forEach(element=>{
		element.querySelectorAll('th').forEach(th=>{
			summarytxt+=th.innerText+', '
		});
		console.log(summarytxt.slice(0,-2)+'정보를 포함하는 표');
		summarytxt=''
	});
}())
javascript:(function(){varsummarytxt='';varel=document.querySelectorAll('table');el.forEach(element=>{element.querySelectorAll('th').forEach(th=>{summarytxt+=th.innerText+', '});console.log(summarytxt.slice(0,-2)+'정보를 포함하는 표');summarytxt=''});}())