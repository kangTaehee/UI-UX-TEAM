/*
 * TouchEn mVaccine WEBJS
 * Copyright(C)2015 RaonSecure Co., Ltd.
 * Version 2.1.2
 * 2015-04-13
 * 2019-01-30 this.mVaccine_lic -> mVaccine_lic // location -> top.location chjeon
 */

String.prototype.contains = function(str){
	return this.toLocaleLowerCase().indexOf(str) !== -1;
};

var version		="version=2.1"; 
var siteId		="chinaebank-web";

var timeOutBlur 	= 10;
var timeOutSession 	= 600;
var app 			= "com.android.browser|org.mozilla.firefox|com.opera.browser|com.opera.browser.mini.classic|com.opera.browser.mini.android|com.android.chrome|com.sec.android.app.sbrowser|net.daum.android.daum|com.nhn.android.search|mobi.mgeek.tunnybrowser|com.ucmobile.intl";

var ff 		= window.navigator.userAgent.contains('firefox'); 
var old 	= window.navigator.userAgent.contains('android 2.');
var safari= window.navigator.userAgent.contains('safari');
var chrome	= false;
if(window.navigator.userAgent.contains('chrome')){
	chorme = true;
	safari = false;
}
var ucbrowser = window.navigator.userAgent.contains('ucbrowser');
var opera	= window.navigator.userAgent.contains('opr')||window.navigator.userAgent.contains('opera');
var mVaccineLayer = "mVaccineLayer";

function TouchEn_mVaccine() {
	this.mVaccine_lic = null;

	try{
		if(mVaccine_lic!=null)
			this.mVaccine_lic = mVaccine_lic;
	}catch(e){
		
	}
	this.callback_token = null;
	
	try{
		if(callback_token!=null)
			this.callback_token = callback_token;
	}catch(e){
		
	}
	
	this.callback_url = null;
	
	try{
		if(callback_url!=null)
			this.callback_url = callback_url;
	}catch(e){
		
	}
	
	this.useCallback = true;
	this.mode = "mini";
	this.isReady = false;
	this.isStart = false;
	this.full = function() {
		if(this.mVaccine_lic==null){
			alert("TouchEn mVaccine : 라이선스를 등록하세요.");
			return;
		}

		var i = "";
		i = "?siteid=" + siteId;
		i += "&licensekey=" + this.mVaccine_lic;
		i += "&" + version;
		i += '&show_update='		+ false;
		i += '&update_pattern='		+ true;
		i += '&update_engine='     	+ true;
		i += '&scan_rooting='      	+ true;
		i += '&scan_package='      	+ true;
		i += '&scan_heuristic='    	+ false;
		i += '&target_type='       	+ false;
		i += '&show_license='      	+ false;
		i += '&show_rooting='      	+ false;
		i += '&isFgOrBg='		    + true;
		i += '&useBlackAppCheck='  	+ true;
		i += '&rootingexitapp='     + true;
		i += '&rootingyesorno='    	+ false;
		i += '&rootingyes='        	+ false;
		i += '&showAbout='			+false;
		i += '&callback_url='		+ this.callback_url;
		i += '&callback_token='		+ this.callback_token;
		i += '&showAbout='			+false;
		i += '&showAbout='			+false;
		

		if (old) {
			top.location.replace('smartvaccinestart://'+i);
			return;
		}
		
		if(safari){
			var iframe = document.createElement("iframe");
			iframe.setAttribute("id", "touchen_mvaccine");
			iframe.setAttribute("src", 'mvaccinestartbg://mvaccine'+i);
			iframe.setAttribute("style", 'witdh:0px;height:0px;border:0px;visibility: hidden;');
			document.body.appendChild(iframe);
			setTimeout(function(){
				document.body.removeChild(document.getElementById("touchen_mvaccine"));
			}, 1000);
			
			return;
		}

		if (ff) {
			top.location.href='mvaccinestart://mvaccine'+i; 
		} else {
			top.location.href="intent://mvaccine"+i+"#Intent;scheme=mvaccinestart;package=com.TouchEn.mVaccine.webs;end";
		}
	};
	this.mini = function() {
		if(this.mVaccine_lic==null){
			alert("TouchEn mVaccine : 라이선스를 등록하세요.");
			return;
		}

		var i = "";
		i = "?siteid=" + siteId;
		i += "&licensekey=" + this.mVaccine_lic;
		i += "&" + version;
		i += '&show_update='		+ false;
		i += '&update_pattern='   	+ true;
		i += '&update_engine='		+ true;
		i += '&scan_rooting='		+ true;
		i += '&scan_package='		+ true;
		i += '&scan_heuristic='		+ false;
		i += '&target_type='		+ false;
		i += '&show_license='		+ false;
		i += '&show_rooting='		+ false;
		i += '&isFgOrBg='			+ false;
		i += '&useBlackAppCheck='	+ true;
		i += '&rootingexitapp='		+ true;
		i += '&rootingyesorno='		+ false;
		i += '&timeOutBlur='		+ timeOutBlur;
		i += '&timeOutSession='		+ timeOutSession;
		i += '&showExit='			+ false;
		i += '&showAbout='			+ false;	
		i += '&show_notify='		+ true;		
		i += '&app='				+ app;
		i += '&debug='				+ true;
		i += '&callback_cycle='		+ 60;
		i += '&callback_url='		+ this.callback_url;
		i += '&callback_token='		+ this.callback_token;

		if (old) {
			top.location.replace('smartbgvaccinestart://'+i);
			return;
		}
		
		if(safari){
			var iframe = document.createElement("iframe");
			iframe.setAttribute("id", "touchen_mvaccine");
			iframe.setAttribute("src", 'mvaccinestartbg://mvaccine'+i);
			iframe.setAttribute("style", 'witdh:0px;height:0px;border:0px;visibility: hidden;');
			document.body.appendChild(iframe);
			setTimeout(function(){
				document.body.removeChild(document.getElementById("touchen_mvaccine"));
			}, 1000);
			
			return;
		}
		 
		if (ff) {
			top.location.href='mvaccinestartbg://mvaccine'+i;
		} else {

			top.location.href="intent://mvaccine"+i+"#Intent;scheme=mvaccinestartbg;package=com.TouchEn.mVaccine.webs;end";
		}
	};
	this.exit = function() {
		if (ff) {
			top.location.href='mvaccineexit://mvaccine'; 
		}else if(safari){
			var iframe = document.createElement("iframe");
			iframe.setAttribute("id", "touchen_mvaccine");
			iframe.setAttribute("src", 'mvaccineexit://mvaccine');
			iframe.setAttribute("style", 'witdh:0px;height:0px;border:0px;visibility: hidden;');
			document.body.appendChild(iframe);
			setTimeout(function(){
				document.body.removeChild(document.getElementById("touchen_mvaccine"));
			}, 1000);
			
			return;
		} else if (old) {
			top.location.replace("smartvaccineexit://");
			return;
		} else {
			top.location.href="intent://mvaccine#Intent;scheme=mvaccineexit;package=com.TouchEn.mVaccine.webs;end";
		}
	};
	this.market = function() {

		top.location.href="market://details?id=com.TouchEn.mVaccine.webs";

	};
	
	this.start = function(){

		if(this.mode=="mini"){
			this.mini();
		}else{
			this.full();
		}

	};
	
}


function mVaccine_check() {
	if(_mVaccine.isReady)
		return false;
	
	mVaccineCheckStatus(function(result){
		if(!result)
			mVaccineOpenLayerDialog();
	});
	
	
	return false;
}


function mVaccine_onload() {
	_mVaccine.mode = "mini";
	
	mVaccine_check();

}
function mVaccine_reload() {
	
	mVaccineSessionRemove(function(){
		if (!mVaccine_check())
			return;
		


		_mVaccine.start();
	});
	

}
var _mVaccine = new TouchEn_mVaccine();

function mVaccineCheck(){
	
	if(ff||opera){
		_mVaccine.market();
	}else if(safari){
		if(ucbrowser){
			_mVaccine.market();
		}else{
			window.open("https://play.google.com/store/apps/details?id=com.TouchEn.mVaccine.webs");
		}
	}else{
		_mVaccine.market();
	}
}

function mVaccineStart(){
	_mVaccine.start();
	setTimeout("mVaccineScanCheck(false)", 2000);
}

function mVaccineScanCheck(repeat){	
	if(!_mVaccine.useCallback){
		//common.js 백신성공함수호출
		commonVaccineCB(result);
		mVaccineLayerClose();
		return;
	}
	
	mVaccineCheckStatus(mVaccineScanCheckCallback);

	if(repeat)
		setTimeout("mVaccineScanCheck(true)", 2000);

}

function mVaccineScanCheckCallback(result){
	if(result){		
		commonVaccineCB(result);
		mVaccineLayerClose();
	}else{
		alert("백신을 설치/실행시켜주세요.");
	}
}
//백신성공함수. 최상위 프레임 전역변수에 값을 변경시킨다.
//현재 백신내부에 health-check할 수 있는 함수가 없으므로(버전 업데이트가 요구됨-라온)
//해당 전역변수를 이용해 connect-close시까지 백신활동을 보장한다(라온측 추천방안)
//전역변수 제거요구시 해당값을 세션에 저장하는 방식으로 대체 or 버전 업데이트필요.
function commonVaccineCB(result){
	if(result){
		window.top.vaccineCall=true;
	}
}
function mVaccineCheckStatus(callbackFunction){

	var request = new XMLHttpRequest();
	request.open("POST", callback_url, false);
//	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
//	request.setRequestHeader("Cache-Control","no-cache, must-revalidate");
//	request.setRequestHeader("Pragma", "no-cache");
	request.onreadystatechange = function(){
		if (request.readyState == 4 && request.status == 200) {
			var returnValue = request.responseText.replace(/^\s+|\s+$/g,"");
			var returnValueArray = returnValue.split(",");
			returnValue = returnValueArray[0];

			if(returnValue=='null')
				callbackFunction(false);
			else
				callbackFunction(true);
		}else{
			callbackFunction(false);
		}
	};
	request.send();

	return false;
}

function mVaccineSessionRemove(callbackFunction){
	var request = new XMLHttpRequest();
	request.open("GET", callback_url+"?mVaccine_op=setCheck&mVaccine_check=false", false);
//	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
//	request.setRequestHeader("Cache-Control","no-cache, must-revalidate");
//	request.setRequestHeader("Pragma", "no-cache");
	request.onreadystatechange = callbackFunction;
	request.send();
}


function mVaccineOpenLayerDialog() {

    var div1 = document.createElement("DIV");
    div1.id = mVaccineLayer;
    div1.style.position = "fixed";
    div1.style.height = "100%";
    div1.style.width = "100%";
    div1.style.top = "0";
    div1.style.left = "0";
    div1.style.background = "#000000";
    div1.style.opacity = "0.4";
    div1.style.filter = "alpha(opacity=40)";
    div1.style.zIndex = 9999;
    
    var div2 = document.createElement("DIV");
    div2.style.cssText="width: 250px;z-index: 1001;border: 3px solid #ed5f00; border-radius: 11px;background: #fff;padding:10px;";
    div2.innerHTML="<span style='color:#ed5f00 ;font-size:1.3em;line-height:1.8;'>TouchEn mVaccine</span><br><span id='mVaccineLayerText1'>백신을 설치 / 실행해주시기바랍니다. 이미  설치되어있는 분은 바로 실행해주시기바랍니다.</span><span id='mVaccineLayerText2' style='display:none;'>백신을 실행합니다.</span>"
    	+"<div><span id='mVaccineCheck'><button style='margin: 10px;width: 70px;' onclick='mVaccineCheck();'>설치</button></span>"
    	+"<span id='mVaccineStart''><button style='margin: 10px;width: 70px;' onclick='mVaccineStart();'>실행</button></span><span id='mVaccineLoading' style='display:none;'>실행중...</span></div>"+
    	"<div>백신실행확인</div><span id='mVaccineScanCheck'>";
    
    var div3 = document.createElement("DIV");
    div3.id = mVaccineLayer + "_popup";
    div3.style.cssText="position: fixed;  top:50%; left:50%; margin:-4px 0 0 -20px; text-align: center; vertical-align: middle; color: white;z-index: 99999;";
    div3.appendChild(div2);
    
    
    document.body.appendChild(div1);
    /*document.body.appendChild(div3);*/
    document.body.prepend(div3);
    
    mVaccineLayerResize();

    window.onresize = function(event) {mVaccineLayerResize();};
    
	_mVaccine.isReady=true;
}

function mVaccineLayerResize() {
	var div1 = document.getElementById(mVaccineLayer);
    var div2 = document.getElementById(mVaccineLayer + "_popup");
    if (div2) {
    	div2.style.top = (div1.clientHeight/2)-100+"px";
    	div2.style.left = (div1.clientWidth/2)-100+"px";
    }
}

function mVaccineLayerClose(){
	
	var close = true;
    if (close) {
    	_mVaccine.isReady=false;
        var div1 = document.getElementById(mVaccineLayer);
        var div2 = document.getElementById(mVaccineLayer + "_popup");
        
        if (div1) {
            document.body.removeChild(div1);
        }
        if (div2) {
            document.body.removeChild(div2);
        }
        
        window.onresize = null;
    }
}