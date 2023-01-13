/**************************************
	우측 마우스 막기
**************************************/

var isNS = (navigator.appName == "Netscape") ? 1 : 0;
var EnableRightClick = 1;  // 0 이면 막기 1이면 풀기
if(isNS) 
//document.captureEvents(Event.MOUSEDOWN||Event.MOUSEUP);

function mischandler(){
  if(EnableRightClick==1){ return true; }
  else {return false; }
}

function mousehandler(e){
  if(EnableRightClick==1){ return true; } 
  var myevent = (isNS) ? e : event;
  var eventbutton = (isNS) ? myevent.which : myevent.button;
  if((eventbutton==2)||(eventbutton==3)) return false;
}

function keyhandler(e) {
	if (!e) e = window.event;
	var key_code = (window.netscape) ? e.which : e.keyCode;
	if ( key_code == 96)
		EnableRightClick = 1;
	return;
}

document.oncontextmenu = mischandler;
document.onkeypress = keyhandler;
document.onmousedown = mousehandler;
document.onmouseup = mousehandler;
