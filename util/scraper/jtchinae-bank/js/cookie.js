$(document).ready(function() {
	if (!readCookie('today')) {
		$('.notice-banner-inner').show();
	}

	$('.today-close').click(function(event) {
		if ($('#todayHide').is(':checked') == true) {
			createCookie_Today('today', 1)
		};
		TweenLite.to($('.notice-banner-inner'), 0.5, {height:0,opacity:0, ease:Sine.easeInOut});
		return false;
	});
	
}); 
//24시간 
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
//00시 기준
function createCookie_Today( name, value, expiredays ) {   
	var todayDate = new Date();   
	todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);  
	if ( todayDate > new Date() ) {  
		expiredays = expiredays - 1;  
	}
	todayDate.setDate( todayDate.getDate() + expiredays );   
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function readCookie(name) {
	var nameOfCookie = name + "=";  
	var x = 0;  
	while ( x <= document.cookie.length ) {
		 var y = (x+nameOfCookie.length);
		 if ( document.cookie.substring( x, y ) == nameOfCookie ) {  
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )  
				endOfCookie = document.cookie.length;  
			return unescape( document.cookie.substring( y, endOfCookie ) );  
		 }
		 x = document.cookie.indexOf( " ", x ) + 1;  
		 if ( x == 0 )  
			break;  
	}  
	return ""; 
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}