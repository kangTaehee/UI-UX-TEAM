/*
 * mTranskey
 * (C) 2013. RAONSECURE,Inc. All rights reserved.
 * Version 4.6.13.2
 * 2020-02-19
 */


//config
var transkey_url = '/raon/transkey_mobile';
var transkey_surl ='/servlet/transkeyServlet';
var mtk_useButton = false;
var mtk_useTranskey = true;
var useFakeKey = true;
var mtk_useTalkBack = true;
var useCheckTranskey = true;
var tk_comments = "";
var transkey_encDelimiter = ",";
var transkey_delimiter = '$';
var transkey_divType = 1;//0fixed //1flexible
var useCORS = false;
var useNoDummy = false; //default : false
var clickDummy = true; //default : true
var tk_origin = "";
var keyboardLayouts = ["qwertyMobile", "numberMobile"];
var onKeyboard_allocate = false; //default : false
var widthRatio = 1; //default : 1 | range : 0.2 ~ 1
var max_width = 0; //unit : px | not use : 0 | range : 300 ~
var use_form_id = false;
//show license config
var showLicense = true; //ture : show | false : not show
var licenseType = "";
var licExpiredDate = "";
//config



/*document.write('<script type="text/javascript" src="'+transkey_url+'/Random.js"></script>');
document.write('<script type="text/javascript" src="'+transkey_url+'/BigInt.js"></script>');
document.write('<script type="text/javascript" src="'+transkey_url+'/Barrett.js"></script>');
document.write('<script type="text/javascript" src="'+transkey_url+'/genkey.js"></script>');
document.write('<script type="text/javascript" src="'+transkey_url+'/RSA.js"></script>');
document.write('<script type="text/javascript" src="'+transkey_url+'/seed.js"></script>');*/

document.write('<script type="text/javascript" src="'+transkey_url+'/TranskeyLibPack_op.js"></script>');

//document.write('<script type="text/javascript" src="'+transkey_url+'/rsa_oaep_files/sha1.js"></script>');
//document.write('<script type="text/javascript" src="'+transkey_url+'/rsa_oaep_files/aes-enc.js"></script>');
//document.write('<script type="text/javascript" src="'+transkey_url+'/rsa_oaep_files/hmac-sha1.js"></script>');
//document.write('<script type="text/javascript" src="'+transkey_url+'/rsa_oaep_files/js_hmac-sha1.js"></script>');

document.write('<script type="text/javascript" src="'+transkey_url+'/rsa_oaep_files/rsa_oaep-min.js"></script>');

//document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/base64.js"></script>');
//document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/ec.js"></script>');
//document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/jsbn.js"></script>');
//document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/jsbn2.js"></script>');
//document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/prng4.js"></script>');
//document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/rng.js"></script>');
//document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/rsa.js"></script>');
//document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/rsa2.js"></script>');
//document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/sec.js"></script>');
//document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/asn1hex-1.1.js"></script>');
//
//document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/sha256.js"></script>');
//document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/core-min.js"></script>');

//document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/sha512.js"></script>');
//document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/ripemd160.js"></script>');
//document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/rsapem.js"></script>');
//document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/rsasign.js"></script>');
//document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/x509.js"></script>');

document.write('<script type="text/javascript" src="'+transkey_url+'/jsbn/jsbn-min2.js"></script>');

document.write('<script type="text/javascript" src="'+transkey_url+'/typedarray.js"></script>');
document.write('<script type="text/javascript" src="'+transkey_surl+'?op=getToken&'+new Date().getTime()+tk_origin+'"></script>');
document.write('<script type="text/javascript" src="'+transkey_surl+'?op=getInitTime'+tk_origin+'"></script>');

var transkey=[];

var mtk=null;

var tk_btn_arr=[];

function initmTranskey(){
	setMaxDigits(131);	

	if(mtk==null){
		transkey.objs= new Array();
		mtk = new mTranskey();
		mtk.getPublicKey(transkey_surl);
		mtk.getClientWidth();
		if(useCheckTranskey){
			if(mtk.isiPhone||mtk.isiPad) {
				if (document.addEventListener) {
				    document.addEventListener("touchstart", checkTransKey, false);
				} else if (document.attachEvent) {
				    document.attachEvent("ontouchstart", checkTransKey);
				}
			} else {				
				if (document.addEventListener) {
				    document.addEventListener("mousedown", checkTransKey, false);
				} else if (document.attachEvent) {
				    document.attachEvent("onmousedown", checkTransKey);
				}
			}
		}
		
		if(window.addEventListener){
			window.addEventListener("resize", mtk.reSizeListener, false);
		}else{
			window.attachEvent("onresize", mtk.reSizeListener);
		}
	}

	var inputs = document.getElementsByTagName("input");
	for(var i = 0; i < inputs.length; i++){
		var input = inputs.item(i);
		if(input.getAttribute("data-tk-kbdType")!=null&&transkey[input.id]==null)
			mtk.setKeyboard(inputs.item(i));
	}
	
}



if (typeof XMLHttpRequest == "undefined") {
	XMLHttpRequest = function() {
    	try { 
    		return new ActiveXObject("Msxml2.XMLHTTP.6.0"); 
		} catch(e) {
		};
		
    	try { 
    		return new ActiveXObject("Msxml2.XMLHTTP.3.0"); 
		} catch(e) {
		};
		
    	try { 
    		return new ActiveXObject("Msxml2.XMLHTTP"); 
		} catch(e) {
		};
		
    	try { 
    		return new ActiveXObject("Microsoft.XMLHTTP"); 
		}  catch(e) {
		};
 
    	throw new Error("This browser does not support XMLHttpRequest or XMLHTTP.");
	};
};


function mTranskeyObj(inputObj, width, div, keyType, keyboardType, dataType){
	this.ele=null;
	this.allocate=false;
	this.id=inputObj.id;
	this.keyboardType=keyboardType+"Mobile";
	this.width=width;
	this.div=div;
	this.numberDiv=div.children["mtk_"+this.id+"_number"];
	this.lowerDiv=div.children["mtk_"+this.id+"_lower"];
	this.upperDiv=div.children["mtk_"+this.id+"_upper"];
	this.specialDiv=div.children["mtk_"+this.id+"_special"];
	this.keyTypeIndex=""; // "l ","u ","s ",""
	this.useUpper=false;
	this.useLower=false;
	this.useCaps=false;
	this.useSpecial=false;
	this.keyType=keyType;
	this.cap=false;
	this.special=false;
	this.useTranskey=mtk_useTranskey;
	this.useButton=false;
	this.button=null;
	this.inputObj=inputObj;
	this.frmId="";
	if(use_form_id)
		this.frmId = "_"+inputObj.form.id;
	this.hidden=document.getElementById("transkey_"+inputObj.id+this.frmId);
	this.hmac=document.getElementById("transkey_HM_"+inputObj.id+this.frmId);
	this.ExE2E=document.getElementById("transkey_ExE2E_"+inputObj.id+this.frmId);
	this.exE2E=inputObj.getAttribute("data-tk-ExE2E")==null?"false":inputObj.getAttribute("data-tk-ExE2E");
	this.fieldType=inputObj.type;
	this.bgImgChecked=false;
	this.imgWidth="";
	this.talkBack=mtk_useTalkBack;
	this.dki=new Array();
	this.keyboard = inputObj.getAttribute("data-tk-keyboard");
	this.allocationIndex = new GenKey().tk_getrnd_int();
	this.nextFocus=null;
	this.useInput=false;
	this.useInputDiv=null;
	this.tk_Special_Mask_StartPos = inputObj.getAttribute("data-tk_hkStart_pos");
	this.tk_Special_Mask_EndPos = inputObj.getAttribute("data-tk_hkEnd_pos");
	this.tk_Special_Mask = inputObj.getAttribute("data-tk_hk_mask")==null?"*":inputObj.getAttribute("data-tk_hk_mask");
	if(inputObj.getAttribute("data-tk-nextFocusId")!=null)
		this.nextFocus = inputObj.getAttribute("data-tk-nextFocusId");
	if(this.keyboard==null)
		this.keyboard = this.keyboardType;
	if(!useSession) {
		this.keyIndex = document.getElementById("keyIndex_"+inputObj.id+this.frmId).value;
		document.getElementById("keyboardType_"+inputObj.id+this.frmId).value = this.keyboardType;
		document.getElementById("fieldType_"+inputObj.id+this.frmId).value = this.fieldType;
	}
	
	var self = this;
	
	this.initKeyType = function(){
		this.cap=false;
		this.special=false;
	};
	
	this.setUrl = function(){
		
		if(transkey_divType==0){			
			if(this.keyboardType=="numberMobile"){
				var numberImg = new Image();
				numberImg.onload = function(){
					self.allocate=true;
					if(mtk_useTalkBack)
						self.getDummy();
					//self.setKeyType(self.keyType);
				};
				numberImg.src = getUrl("getKey", self, "single", self.allocationIndex)+"&talkBack="+self.talkBack+tk_origin;
				this.numberDiv.style.backgroundImage="url('"+checkTag(numberImg.src)+"')";
				this.numberDiv.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader( src='"+numberImg.src+"', sizingMethod='scale')";
			}else{
				var quertyImg = new Image();
				quertyImg.onload = function(){
					self.allocate=true;
					var url = getUrl("getKey", self, "upper", self.allocationIndex)+"&talkBack="+self.talkBack+tk_origin;
					self.upperDiv.style.backgroundImage="url('"+checkTag(url)+"')";
					self.upperDiv.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader( src='"+url+"', sizingMethod='scale')";
					url = getUrl("getKey", self, "special", self.allocationIndex)+"&talkBack="+self.talkBack+tk_origin;	
					self.specialDiv.style.backgroundImage="url('"+checkTag(url)+"')";
					self.specialDiv.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader( src='"+url+"', sizingMethod='scale')";
					if(mtk_useTalkBack)
						self.getDummy();
				};
				quertyImg.src = getUrl("getKey", this, "lower", this.allocationIndex)+"&talkBack="+this.talkBack+tk_origin;	
				this.lowerDiv.style.backgroundImage="url('"+checkTag(quertyImg.src)+"')";
				this.lowerDiv.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader( src='"+quertyImg.src+"', sizingMethod='scale')";
			}
		}
	};
	
	this.getDummy = function(){
		var request = new XMLHttpRequest();
		request.open("POST", transkey_surl, true);
		if(useCORS)
			request.withCredentials = true; 
		
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		request.onreadystatechange = function(){
			if (request.readyState == 4 && request.status == 200) {
				if(request.responseText.indexOf("SessionError")>-1){
					var errCodes = request.responseText.split("=");
					if(errCodes[1]=="1"){
						mtk.alert("session");
						if(useSession) {
							mtk.resetToken(transkey_surl);
							mtk.resetSessionKey(transkey_surl);
						}
					}
				}else{
					self.allocate=true;
					if(self.talkBack){
							if(self.keyboardType=="numberMobile"){
								self.talkBackNumberText=this.responseText.split(",");
								self.talkBackNumberText.splice(12, 3);
							}else{
								self.dki = this.responseText.split(",");
							}


						if(transkey_divType==0)
							mtk.setTalkBackKeys(self);
						mtk.setTalkBackText(self);
					}
				}
			}
		};
		
		try {
			request.send(getUrlPost("getDummy", self, "")+"&talkBack="+self.talkBack+tk_origin);
		} catch(e) {
			alert("TransKey error: Cannot load TransKey. Network is not available.");
			return false;
		}
	}
	
	this.checkInitTime = function(){
		var nowTime = new Date();
		
		var year = nowTime.getFullYear() - decInitTime.substring(0,4);
		var month = nowTime.getMonth()+1 - decInitTime.substring(4,6);
		var day = nowTime.getDate() - decInitTime.substring(6,8);
		var hour = nowTime.getHours() - decInitTime.substring(8,10);
		var min = nowTime.getMinutes() - decInitTime.substring(10,12);
		
		year *= 525600;
		month *= 44640;
		day *= 1440;
		hour *= 60;
		
		var elapsedTime = year + month + day + hour + min;
		
		if(elapsedTime > limitTime) {
			decInitTime = nowTime;
			alert("시간이 만료되었습니다.");
			var request = new XMLHttpRequest();
			request.open("GET", transkey_surl+"?op=getInitTime&"+new Date().getTime()+tk_origin, false);
			request.onreadystatechange = function(){
				if (request.readyState == 4 && request.status == 200) {
					decInitTime = request.responseText.split(";")[0];
					decInitTime = decInitTime.split("=")[1];
					decInitTime = decInitTime.replace("'","");
					decInitTime = decInitTime.replace("'","");

					initTime = request.responseText.split(";")[1];
					initTime = initTime.split("=")[1];
					initTime = initTime.replace("'","");
					initTime = initTime.replace("'","");
				}
				
			};
			try {
				request.send();
			} catch(e) {
				alert("TransKey error: Cannot load TransKey. Network is not available.");
				return false;
			}
			document.getElementById("initTime"+this.frmId).value = initTime;
			return;
		}
	}
	
	this.setBgImageForDivType1 = function(type){
		
		var img = new Image();
		img.onload = function(){
			if(self.allocate == false) {
				self.allocate=true;
				if(mtk_useTalkBack)
					self.getDummy();
				//self.setKeyType(self.keyType);
			}
		};
		img.src = getUrl("getKey", this, type, this.allocationIndex);
				
		if(type=="single"){
			for(var i=1; 5>i; i++){
				for(var j=0; 4>j; j++){
					try{
						this.div.childNodes[i].childNodes[j].childNodes[0].style.backgroundImage="url('"+checkTag(img.src)+"')";
					}catch(e){
						
					}
					
				}
			}
//			try{
//				this.div.childNodes[4].childNodes[0].childNodes[0].style.backgroundImage="url('"+checkTag(url)+"')";
//			}catch(e){
//				
//			}

		}else{
			for(var i=1; 5>i; i++){

				for(var j=0; 11>j; j++){
					try{
						this.div.childNodes[i].childNodes[j].childNodes[0].style.backgroundImage="url('"+checkTag(img.src)+"')";
					}catch(e){
						
					}

				}
				

			}
			
			var k=3;
			if(useSpace)
				k=4;
			
			for(var j=0; k>j; j++){
				try{
					this.div.childNodes[5].childNodes[j].childNodes[0].style.backgroundImage="url('"+checkTag(img.src)+"')";
				}catch(e){
					
				}

			}
		}

	};
	
	this.setDataType = function(dataType){
		if(keyboardType=="number")
			return;
		
		if(dataType==null){
			this.useCaps=true;
			this.useSpecial=true;
			this.useLower=true;
			this.useUpper=true;
		}else{
			for(var i=0; dataType.length>i; i++){

				switch(dataType.charAt(i)){
				case 'a':
					this.useLower=true;
					break;
				case 'A':
					this.useUpper=true;
					break;
				case '@' :
					this.useSpecial=true;
					break;
				}
			}
			if(this.useLower&&this.useUpper)
				this.useCaps=true;
			if(!this.useLower&&!this.useUpper)
				this.useSpecial=false;
				
		}		
	};
	
	this.setExE2E = function(ExE2E){
		this.ExE2E.value=ExE2E;
	};
	
	function getUrl(op, o, keyType, allocationIndex){
		if(!useSession){
			return transkey_surl+"?op="+op+"&name="+o.id+"&keyType="+keyType+"&keyboardType="+o.keyboard+"&fieldType="
			+o.fieldType+"&inputName="+o.inputObj.name+"&transkeyUuid="+mtk.transkeyUuid+"&exE2E="+o.exE2E
			+"&TK_requestToken="+TK_requestToken+"&allocationIndex="+allocationIndex+"&keyIndex="+o.keyIndex+"&initTime="+initTime+tk_origin;
		}
		else {
			return transkey_surl+"?op="+op+"&name="+o.id+"&keyType="+keyType+"&keyboardType="+o.keyboard+"&fieldType="
			+o.fieldType+"&inputName="+o.inputObj.name+"&transkeyUuid="+mtk.transkeyUuid+"&exE2E="+o.exE2E
			+"&TK_requestToken="+TK_requestToken+"&allocationIndex="+allocationIndex+tk_origin;
		}
	}
	
	function getUrlPost(op, o, keyType, allocationIndex){
		if(!useSession) {
			return "op="+op+"&name="+o.id+"&keyType="+keyType+"&keyboardType="+o.keyboard+"&fieldType="
			+o.fieldType+"&inputName="+o.inputObj.name+"&transkeyUuid="+mtk.transkeyUuid+"&exE2E="+o.exE2E+
			"&TK_requestToken="+TK_requestToken+"&allocationIndex="+allocationIndex+"&keyIndex="+o.keyIndex+"&initTime="+initTime+tk_origin;
		}
		else {
			return "op="+op+"&name="+o.id+"&keyType="+keyType+"&keyboardType="+o.keyboard+"&fieldType="
			+o.fieldType+"&inputName="+o.inputObj.name+"&transkeyUuid="+mtk.transkeyUuid+"&exE2E="+o.exE2E+
			"&TK_requestToken="+TK_requestToken+"&allocationIndex="+allocationIndex+tk_origin;
		}
	}
	
	function checkTag(value){
		return value.replace(/</gi,"&lt;").replace(/>/gi,"&gt;").replace(/'/gi, "&#39;").replace(/"/gi, "&#34;");
	}
		
	this.setWidth(width);
	this.setDataType(dataType);
	this.setKeyType(keyType);

}

mTranskeyObj.prototype.setButton = function(useB){
	this.useButton=useB;
	this.button = document.getElementById(this.inputObj.id+"_tk_btn");
	if(useB){
		if(mtk_useTranskey){
			this.button.className = "tk_btn_";
			this.button.setAttribute("data-tk-btnValue","true");

		}else{
			this.button.className = "tk_btn";
			this.button.setAttribute("data-tk-btnValue","false");
		}
		
		tk_btn_arr[this.button.id]=this.id;
		
		if(this.button.addEventListener ){
			this.button.addEventListener("click", mtk.buttonListener, false);
		}else{
			this.button.attachEvent("onclick", mtk.buttonListener);
		}

		
	}
};

mTranskeyObj.prototype.setKeyType = function(keyT){
	this.keyType = keyT;
	if(transkey_divType==1)
		this.setBgImageForDivType1(keyT);
	if(keyT=="single"){
		this.keyTypeIndex = "";
	}else{
		if(transkey_divType==0)
			this[keyT+"Div"].style.display="block";

		this.keyTypeIndex = keyT.charAt(0)+" ";

		if(keyT=="upper"){
			this.cap=true;
		}
		else if(keyT=="special"){
			this.special=true;
		}
	}
	
	if(this.allocate&&this.talkBack)
		mtk.setTalkBackText(this);


};

mTranskeyObj.prototype.setWidth = function(width){
	if(width>=600&&this.clientHeight>=600&&!mtk.horizontal){
		if(widthRatio != 1)
			this.width = width*widthRatio;
		else
			this.width=600;
	} else if(width>=360)
		this.width=360;
	else
		this.width=320;
};

mTranskeyObj.prototype.setQwertyKey = function(key){
	if(transkey_divType==0){
		this.lowerDiv.style.display="none";			
		this.upperDiv.style.display="none";	
		this.specialDiv.style.display="none";
		this[key+"Div"].style.display="block";
	}
	
};

mTranskeyObj.prototype.clear = function(){
	
	this.inputObj.value = "";		
	 
	this.hidden.value = "";
	
	this.hmac.value = "";
		
	if(this.useInput) {
		for(var i=0; i<this.useInputDiv.childElementCount; i++)
			this.useInputDiv.childNodes[i].value = "";
	}
};

mTranskeyObj.prototype.getCipherData = function(xecureRandomData, crtType){
	var v = mtk.inputFillEncData(this.inputObj);
	var aCipher = null;
	var aCipherArray = null;
	var aInputValue = null;
	var aInputHMValue = null;
	var encXecureRanData = null;
	var aRequest = null;

	aInputValue = v.hidden;
	
	if (aInputValue == null || aInputValue == "") {
		aCipher = "";
		return aCipher;
	}
	
	aInputHMValue = v.hmac;	
	
	var PKey = mtk.getPKey();

	encXecureRanData = mtk.phpbb_encrypt2048(xecureRandomData, PKey.k, PKey.e, PKey.n);
	
	var rsaPubKey="";
	
	var crtTypeParam = crtType;
	if(crtType=="pkc"){
		rsaPubKey = mtk.getCertPublicKey();
		crtTypeParam = "yettie";
	}
	
	var sPort = location.port;
	if(sPort.length<=0)
		sPort = '80';

	aRequest = new XMLHttpRequest();
	aRequest.open("POST", transkey_surl, false);
	aRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	aRequest.setRequestHeader("Cache-Control", "no-cache");
	
	if (aRequest.readyState == 4 && aRequest.status == 200) {
		 if(aRequest.responseText.indexOf("LimitTimeOver")>-1){
			 alert("시간이 만료되었습니다.");
		}
	}
	if(!useSession) {
		var seedKey = document.getElementById("seedKey"+this.frmId).value;
		
		aRequest.send("op=getPlainText&name=" + this.id + "&value=" + aInputValue + "&hmac=" 
				+ aInputHMValue + "&crtType=" + crtTypeParam + "&encXecureRanData=" + encXecureRanData 
				+ "&sPort=" + sPort+"&pubKey=" + rsaPubKey+"&keyIndex=" + this.keyIndex+"&fieldType="
				+ this.fieldType+"&keyboardType=" + this.keyboardType + "&encSeedKey=" + seedKey+"&initTime="+initTime);
	} else {
		aRequest.send("op=getPlainText&name=" + this.id + "&value=" + aInputValue + "&hmac=" 
				+ aInputHMValue + "&crtType=" + crtTypeParam + "&encXecureRanData=" + encXecureRanData 
				+ "&transkeyUuid=" + mtk.transkeyUuid + "&sPort=" + sPort + "&pubKey="+ rsaPubKey +"&TK_requestToken="+TK_requestToken);
	}
	
	if (aRequest.readyState != 4 || aRequest.status != 200) {
		aCipher = "";
		return aCipher;
	}
	
	aCipher = aRequest.responseText.replace(/\n/gi, '');
	if(crtType=="pkc"){
		return aRequest.responseText;
	}
	aCipherArray = aCipher.split(',');

	aCipher = "";
	for ( var i = 0; i < aCipherArray.length - 1; i++) {
		if (aCipherArray[i].length == 1) {
			aCipher += '0';
		}

		aCipher += aCipherArray[i];
	}

	return aCipher;
};

mTranskeyObj.prototype.setDiv = function(div){
	this.div=div;
	this.numberDiv=div.children["mtk_"+this.id+"_number"];
	this.lowerDiv=div.children["mtk_"+this.id+"_lower"];
	this.upperDiv=div.children["mtk_"+this.id+"_upper"];
	this.specialDiv=div.children["mtk_"+this.id+"_special"];
};

mTranskeyObj.prototype.done = function(){
	
};

function mTranskey(){
	var startEvent;
	this.isiPad = navigator.userAgent.indexOf("iPad")>-1;
	this.isiPhone = navigator.userAgent.indexOf("iPhone")>-1;
	this.isSafari=false;
	this.browser = null;

	if(navigator.userAgent.indexOf("Safari") > 0)
		this.isSafari=true;
	
	if (navigator.appName == 'Opera' || navigator.userAgent.indexOf("Safari") > 0 || navigator.userAgent.indexOf("Chrome") > 0 || navigator.userAgent.indexOf("Firefox") > 0)
		this.browser = 1;
	else if(this.isiPad || this.isiPhone && !this.isSafari) {
		this.browser = 3;
	} else {
		if(navigator.appName == "Microsoft Internet Explorer") this.browser = 3;
		else if(navigator.appName == "Netscape" && navigator.userAgent.toLowerCase().indexOf('trident')!=-1)  this.browser = 2;
		else this.browser = null;
	}
	
	if(this.isiPhone||this.isiPad){
		startEvent="ontouchstart";
	}else{
		startEvent="onmousedown";
	}
	var sessionKey = [, , , , , , , , , , , , , , , ];
	var genKey = new GenKey();
	var useCert = "true";
	var cert_pub = "";
	var cert_ca = "-----BEGIN CERTIFICATE-----MIIEHjCCAwagAwIBAgIJALcMNEp1tPYgMA0GCSqGSIb3DQEBCwUAMGcxCzAJBgNVBAYTAktSMR0wGwYDVQQKExRSYW9uU2VjdXJlIENvLiwgTHRkLjEaMBgGA1UECxMRUXVhbGl0eSBBc3N1cmFuY2UxHTAbBgNVBAMTFFJhb25TZWN1cmUgQ28uLCBMdGQuMB4XDTEzMDIwNzA5MDYyNVoXDTQzMDEzMTA5MDYyNVowZzELMAkGA1UEBhMCS1IxHTAbBgNVBAoTFFJhb25TZWN1cmUgQ28uLCBMdGQuMRowGAYDVQQLExFRdWFsaXR5IEFzc3VyYW5jZTEdMBsGA1UEAxMUUmFvblNlY3VyZSBDby4sIEx0ZC4wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCqB0MsUuAi7pWVmRWaCS7kAactycMghmOM7RiMbmXyHmatXJbrtOlNrGH8Xl4fdkCJjyUE2829zQy+lTJ2O3Uo3Nn7zK3+3Um9nDQXN2tapambthOXs0aHjnRCtuLMOSPlAx06o0yHP1nOGaV7hfY9PyJjIVh9Lk/oFp5A+wsi0wiQ+INMDrm/6xZrooEY7/TLMnE4v+nr+cpIf3hSrvI1gGTykFtGCy2Le1huqaTKkE9K0CF/Sd8Kvebj6R+MhlieDXiMZXZD++pRmd4cAmGAmnGn4YdJMyh16TCccPjT60KkMv84uNVjXBvnar8ZlzRQSgIhwp1KkRiMErMbVWCnAgMBAAGjgcwwgckwHQYDVR0OBBYEFPzIDKwqK4PCklaP6Mq4YXdq8McyMIGZBgNVHSMEgZEwgY6AFPzIDKwqK4PCklaP6Mq4YXdq8McyoWukaTBnMQswCQYDVQQGEwJLUjEdMBsGA1UEChMUUmFvblNlY3VyZSBDby4sIEx0ZC4xGjAYBgNVBAsTEVF1YWxpdHkgQXNzdXJhbmNlMR0wGwYDVQQDExRSYW9uU2VjdXJlIENvLiwgTHRkLoIJALcMNEp1tPYgMAwGA1UdEwQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHBRlEB4nu/gHwVFRzqbFOloR7aB0xIaMDykMWtovXHUQcTmmGyYQn0bMWaGVCD7SgRh1FisfciJzLP7f8OI5f7rA2tiBZD1PBtLMU7MytGIYlV/gcfWPbnqBVsKDm15AEUqH7ZahOm7np4d5Fr87r1bj2baXQPKSNd9yjh89fl6LthWLEQRYKKwhPYAA/QkeB2RE9MftmuOXJ6MnYyyx5xEZK2ofqwrRBvDmV/PjwdCSxhloiJVFHrp8lKPCsZywJ3v9IPpudjgBQ7SWqhDcPNo2diGB2dQ252g36K1H7u3aT9Xha33MFQXTTEDzVDhaXzaGk7X6T9v25dsOyOaLAo=-----END CERTIFICATE-----";
	var rng = new SecureRandom();
	var mKey = new Array();
	for(var i=0; keyboardLayouts.length>i; i++){
		mKey[keyboardLayouts[i]] = null;
	}
	this.now = null;
	this.fakeKey = null;
	this.getTextEnd=false;
	this.cssText = new Array();
	this.cssText["qwertyMobile"] = new Array();
	this.cssText["numberMobile"] = new Array();
	this.transkeyUuid;
	this.clientWidth;
	this.horizontal = false;
	this.webkitTapHighlightColor="";
	var genSessionKey = "";
	if(!useSession) {
		if(eval) {
			for(var i=0; keyboardLayouts.length>i; i++){
				eval("var "+keyboardLayouts[i]+"Size=''");
			}
		} else {
			var qwertyMobileSize = "";
			var numberMobileSize = "";
		}
	}
	this.talkBackLowerText = ['1','2','3','4','5','6','7','8','9','0','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
	this.talkBackUpperText = ['1','2','3','4','5','6','7','8','9','0','대문자Q','대문자W','대문자E','대문자R','대문자T','대문자Y','대문자U','대문자I','대문자O','대문자P','대문자A','대문자S','대문자D','대문자F','대문자G','대문자H','대문자J','대문자K','대문자L','대문자Z','대문자X','대문자C','대문자V','대문자B','대문자N','대문자M'];
	this.talkBackSpecialText = ['어금기호','물결표시','느낌표','골뱅이','우물정','달러기호','퍼센트','꺽쇠','엠퍼샌드','별표','왼쪽괄호','오른쪽괄호','빼기','밑줄','등호','더하기','왼쪽대괄호','왼쪽중괄호','오른쪽대괄호','오른쪽중괄호','역슬래시','수직막대','세미콜론','콜론','슬래시','물음표','쉼표','왼쪽꺽쇠괄호','마침표','오른쪽꺽쇠괄호','작은따옴표','따옴표','더하기','빼기','별표','슬래시'];
	this.talkBackNumberText = ['1','2','3','4','5','6','7','8','9','0'];
	
	this.getPKey = function(){
		var pKey = _x509_getPublicKeyHexArrayFromCertPEM(cert_pub);
		var PKey = new Array();

		PKey["n"] = pKey[0];
		PKey["k"] = 256; // length of n in bytes
		PKey["e"] = pKey[1];
		
		return PKey;
	};
	
	this.getCertPublicKey = function(){	
		return encodeURIComponent(this.crtPublicKey);
	};
	
	this.getPublicKey = function(url){
		var operation = "getPublicKey";
		var request = new XMLHttpRequest();
		request.open("POST", url, false);
		if(useCORS)
			request.withCredentials = true; 
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		request.onreadystatechange = function(){
			if (request.readyState == 4 && request.status == 200) {
				if (request.responseText) {
					cert_pub = request.responseText;
					mtk.generateSessionKey(transkey_surl);
				}
			}
		};
		
		try {
			request.send("op=" + operation +"&TK_requestToken="+TK_requestToken+tk_origin);
		} catch(e) {
			alert("TransKey error: Cannot load TransKey. Network is not available.");
			return false;
		}
	};
	
	this.generateSessionKey = function(url) {
		
		if(genSessionKey.length>0)
			return true;
		
		var vCA =  verifyCA();
		
		if( vCA == false || vCA =="expired"){
			if(vCA==false)
				alert("transkey : CA 검증이 실패 하였습니다. 프로그램이 정상작동 하지 않을 수 있습니다.");
			return false;
		}
		
		var pKey = _x509_getPublicKeyHexArrayFromCertPEM(cert_pub);

		var n = pKey[0];
		var k = 256; // length of n in bytes
		var e = pKey[1];
		
		this.transkeyUuid = genKey.tk_sh1prng();
		
		
		genSessionKey = genKey.GenerateKey(128);

		
		for(var i=0; i<16; i++)	{
			sessionKey[i] = Number("0x0" + genSessionKey.charAt(i));
		}

		var encSessionKey = mtk.phpbb_encrypt2048(genSessionKey, k, e, n);
			
		var licType = 0;
		if(!useSession)
			var operation = "getKeyInfo";
		else
			var operation = "setSessionKey";
		var request = new XMLHttpRequest();
		request.open("POST", url, false);
		if(useCORS)
			request.withCredentials = true; 
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.onreadystatechange = function(){
			if (request.readyState == 4 && request.status == 200) {
				if(request.responseText.indexOf("LicenseError")>-1){
					var errCodes = request.responseText.split("=");
					mtk.alert(errCodes[1]);
					mtk= null;
					return false;
				}

				if (request.responseXML) {
					var result = request.responseXML.firstChild;
					var res = null;
					var returns = "return [";
					for(var i=0; keyboardLayouts.length>i; i++){
						if(i==keyboardLayouts.length-1){
							returns += keyboardLayouts[i]+",";
						}else{
							returns += keyboardLayouts[i]+",";
						}	
					}
					returns += "]";
					for ( var i = 0; i < result.childNodes.length; i++) {
						var node = result.childNodes[i];
						if (node.tagName == "script") {
							for ( var j = 0; j < node.childNodes.length; j++) {
								if(node.childNodes[j].nodeValue.length>10){
									res = ( new Function( Key+node.childNodes[j].nodeValue.replace("//", "") +returns ) )();
									licType = ( new Function( Key+node.childNodes[j].nodeValue.replace("//", "") +"return licType" ) )();
									licExpiredDate = ( new Function( Key+node.childNodes[j].nodeValue.replace("//", "") +"return licExpiredDate" ) )();
									if(!useSession) {
										if(eval) {
											for(var i=0; keyboardLayouts.length>i; i++){
												eval(""+keyboardLayouts[i]+"Size = ( new Function( Key+node.childNodes[j].nodeValue.replace(\"//\", \"\") +\"return "+keyboardLayouts[i]+"Size\" ) )()");
											}
										} else {
											qwertyMobileSize = ( new Function( Key+node.childNodes[j].nodeValue.replace("//", "") +"return qwertyMobileSize" ) )();
											numberMobileSize = ( new Function( Key+node.childNodes[j].nodeValue.replace("//", "") +"return numberMobileSize" ) )();
										}
									}
								}
							}
						}
					}
					for(var i=0; keyboardLayouts.length>i; i++){
						mKey[keyboardLayouts[i]] = res[i];
					}

					var year = licExpiredDate.substr(0,4);
					var month = licExpiredDate.substr(5,2);
					var day = licExpiredDate.substr(8,2);
					licExpiredDate = "만료 날짜 : " + year + "년" + month + "월" + day + "일";
					
					if(licType == 1) {
						licenseType = "임시 라이선스";
					}
				}
			}
		};
		try {
			request.send("op=" + operation + "&key=" + encSessionKey + "&transkeyUuid=" + this.transkeyUuid+ "&useCert=" + useCert+"&TK_requestToken="+TK_requestToken+ "&mode=Mobile"+tk_origin);
		} catch(e) {
			alert("TransKey error: Cannot load TransKey. Network is not available.");
			return false;
		}
	};
	
	this.resetToken = function(url){
		var request = new XMLHttpRequest();
		if(useCORS)
			request.withCredentials = true; 
		request.open("GET", url+"?op=getToken&"+new Date().getTime()+tk_origin, false);
		request.onreadystatechange = function(){
			if (request.readyState == 4 && request.status == 200) {
				TK_requestToken = request.responseText.split("=")[1];
				TK_requestToken = TK_requestToken.replace(";","");
				mtk.resetSessionKey(transkey_surl);
			}
			
		};
		
		try {
			request.send();
		} catch(e) {
			alert("TransKey error: Cannot load TransKey. Network is not available.");
			return false;
		}
	}
	
	this.resetSessionKey = function(url){
		
		if( verifyCA() == false ){
			alert("CA 검증이 실패 하였습니다. 프로그램이 정상작동 하지 않을 수 있습니다.");
			return false;
		}
		
		var pKey = _x509_getPublicKeyHexArrayFromCertPEM(cert_pub);

		var n = pKey[0];
		var k = 256; // length of n in bytes
		var e = pKey[1];
		
		var encSessionKey = mtk.phpbb_encrypt2048(genSessionKey, k, e, n);
		
		
		var operation = "setSessionKey";
		var request = new XMLHttpRequest();
		if(useCORS)
			request.withCredentials = true; 
		request.open("POST", url, false);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		
		request.onreadystatechange = function(){
			if (request.readyState == 4 && request.status == 200) {
				if(request.responseText.indexOf("LicenseError")>-1){
					var errCodes = request.responseText.split("=");
					mtk.alert(errCodes[1]);
					mtk= null;
					return false;
				}
			}
		};
		
		try {
			request.send("op=" + operation + "&key=" + encSessionKey + "&transkeyUuid=" + this.transkeyUuid+ "&useCert=" + useCert+"&TK_requestToken="+TK_requestToken+ "&mode=Mobile"+tk_origin);
		} catch(e) {
			alert("TransKey error: Cannot load TransKey. Network is not available.");
			return false;
		}
	};
	
	this.inputFillEncData = function(input){
		var tkObj = transkey[input.id];
		var hidden = tkObj.hidden.value;
		var hmac = "";

		var maxSize = input.value.length+genKey.tk_getrnd_int()%10;
		
		var geo = "d 0 0";
		
		for(var j=input.value.length; j<maxSize; j++)
		{	
			var encrypted = SeedEnc(geo);
			hidden += transkey_delimiter + encrypted;
		}
		
		hmac = CryptoJS.HmacSHA256(hidden, genSessionKey);
		//hmac = CryptoJS.HmacSHA1(hidden, genSessionKey);
		
		var value = new Array();
		value["hidden"]=hidden;
		value["hmac"]=hmac;
		
		return value;
		
	};
	
	this.fillEncData = function()
	{
		for(var i=0;transkey.objs.length>i;i++){
			var tk = transkey[transkey.objs[i]];
			if(tk==null)
				continue;
			var hidden = tk.hidden;
			var HM = tk.hmac;
			var input = tk.inputObj;
			if(HM.value.length==0){
				var maxSize = input.value.length+genKey.tk_getrnd_int()%10;
				
				var geo = "d 0 0";
				

				for(var j=input.value.length; j<maxSize; j++)
				{	
					var encrypted = SeedEnc(geo);
					hidden.value += transkey_delimiter + encrypted;
				}		

				if(!useSession){
					var PKey = this.getPKey();
					var encSessionKey = this.phpbb_encrypt2048(genSessionKey, PKey.k, PKey.e, PKey.n);
					document.getElementById("seedKey"+tk.frmId).value = encSessionKey;
				}
				
				HM.value = CryptoJS.HmacSHA256(hidden.value, genSessionKey);
				//HM.value = CryptoJS.HmacSHA1(hidden.value, genSessionKey);
			}
			
		}
		

	};
	
	this.getEncData = function(index){
		var key = mKey[mtk.now.keyboardType][index];
		var x = key.xpoints[0];
		var y = key.ypoints[0];		
		var geo = this.now.keyTypeIndex + x + " " + y;
		return SeedEnc(geo);
	};
	
	this.getClientWidth = function(){
		if(window.orientation==0||window.orientation==180){
			this.horizontal = false;
		}else{
			this.horizontal = true;
		}
		if(this.isiPad){
			this.horizontal = false;
		}
		var div = document.createElement("div");
		div.setAttribute("id", "mtk");
		document.body.appendChild(div);
		if(div.addEventListener)
			div.addEventListener("touchstart", function(){}, false);
		div.style.width="100%";
		this.clientWidth = div.clientWidth;
		document.body.removeChild(div);
	};
	
	this.checkWidthSize = function(size){
		
		if(transkey_divType!=0)
			return false;
			
		var width;
		if(this.clientWidth>=600&&this.clientHeight>=600&&!mtk.horizontal){
			width=600;
		} else if(this.clientWidth>=360)
			width=360;
		else
			width=320;
		
		if(size==width)
			return true;
		else
			return false;
	};
	
	this.remove = function(inputObj){
		var div = transkey[inputObj.id].div;
		if(div==null)
			return;
		div.parentNode.removeChild(div);
		var hidden = transkey[inputObj.id].hidden;
		var hmac = transkey[inputObj.id].hmac;
		if(hidden!=null)
			hidden.parentNode.removeChild(hidden);
		if(hmac!=null)
			hmac.parentNode.removeChild(hmac);
		
		transkey[inputObj.id]= null;
	};
	 
	 this.setPosition = function(){
		 var div = this.now.div;	 
		 var inputObj = this.now.inputObj;
		 var xy = inputObj.getAttribute("data-tk-kbdxy");
		 var isBottom = inputObj.getAttribute("data-tk-bottom");
		 if(isBottom == undefined||isBottom=="false"){
			 if(xy == undefined){
				 if(transkey_divType==0){
					 var point = getOffsetPoint(inputObj);
					 div.style.top = point.y+inputObj.offsetHeight+"px";
					 var left = this.clientWidth/2 - this.now.width/2;
					 if(left<0)
						 left = 0;
					 div.style.left = left+"px";
				 }else if(transkey_divType==1){
					 var point = getOffsetPoint(inputObj);
					 div.style.top = point.y+inputObj.offsetHeight+"px";
					 if(widthRatio!=1) {
						 var left = (this.clientWidth*(1-widthRatio))/2;
						 if(left<0)
							 left = 0;
						 div.style.left = left+"px";
					 } else if(max_width!=0&&max_width>=300&&this.clientWidth>max_width) {
						 var left = (this.clientWidth-max_width)/2;
						 div.style.left = left+"px";
					 } else {
						 div.style.left = 0+"px";
					 }
				 }
			 }else{
				 var point = new Array();
				 point = xy.split(" ");
				 div.style.top = point[1]+"px";
				 div.style.left = point[0]+"px";
			 }
		 } else if(isBottom=="true"){
			 	var top = document.documentElement.clientHeight-getComputedStyle(div).height.replace("px","")-2;
				var left = 0;
				if(transkey_divType == 0) {
					 var point = getOffsetPoint(inputObj);
					 var left = this.clientWidth/2 - this.now.width/2;
					 if(left<0)
						 left = 0;
					 div.style.left = left+"px";
					 div.style.top = top+"px";
				} else if(transkey_divType==1){
					if(widthRatio!=1) {
						var left = (this.clientWidth*(1-widthRatio))/2;
						if(left<0)
							left = 0;
						div.style.left = left+"px"; 
					} else if(max_width!=0&&max_width>=300&&this.clientWidth>max_width) {
						 var left = (this.clientWidth-max_width)/2;
						 div.style.left = left+"px";
					} else {
						div.style.left = left+"px";
					}
					div.style.top = top+"px";
					this.reSize(this.now);
				}
		 }
	 };
	
	this.setKeyIndex = function(inputObj) {
		var PKey = this.getPKey();
		if(eval) {
			for(var i=0; keyboardLayouts.length>i; i++){
					if(inputObj.getAttribute("data-tk-kbdtype") == keyboardLayouts[i].replace("Mobile",""))
						eval ("keyIndex = tk_Random.random(0, "+ keyboardLayouts[i] + "Size, mtk.browser,navigator) + \"\"");	
			}
		} else {
			if(inputObj.getAttribute("data-tk-kbdtype") == "qwerty")
				keyIndex = tk_Random.random(0, qwertyMobileSize, mtk.browser, navigator) + "";
			else
				keyIndex = tk_Random.random(0, numberMobileSize, mtk.browser, navigator) + "";
		}
		
		if((keyIndex/10)<1)
			keyIndex = "0"+keyIndex;
		return this.phpbb_encrypt2048(keyIndex, PKey.k, PKey.e, PKey.n);
	}
	
	 this.setHiddenField = function(inputObj, ExE2E){
		 var obj = inputObj.form;
		 if(obj==null)
			 obj = inputObj.parentNode;
		 if(obj==null)
			 obj = document.body;
		 var frmId="";
		 if(use_form_id)
			 frmId = "_"+inputObj.form.id;
				 
		if(use_form_id&&obj.children.hidfrmId==null){
			var hidfrmId = document.createElement("input");
			hidfrmId.setAttribute("type", "hidden");
			hidfrmId.setAttribute("id", "hidfrmId");
			hidfrmId.setAttribute("name", "hidfrmId");
			hidfrmId.setAttribute("value", frmId.replace("_",""));
			obj.appendChild(hidfrmId);
		}
		if(!useSession) {
			var PKey = this.getPKey();
			var encSessionKey = this.phpbb_encrypt2048(genSessionKey, PKey.k, PKey.e, PKey.n);
			
			if(document.getElementById("seedKey"+frmId)==null){
				var seedKey = document.createElement("input");
				seedKey.setAttribute("type", "hidden");
				seedKey.setAttribute("id", "seedKey"+frmId);
				seedKey.setAttribute("name", "seedKey"+frmId);
				seedKey.setAttribute("value", encSessionKey);
				obj.appendChild(seedKey);
			}
			
			if(document.getElementById("initTime"+frmId)==null){
				var hidInitTime = document.createElement("input");
				hidInitTime.setAttribute("type", "hidden");
				hidInitTime.setAttribute("id", "initTime"+frmId);
				hidInitTime.setAttribute("name", "initTime"+frmId);
				hidInitTime.setAttribute("value", initTime);
				obj.appendChild(hidInitTime);
			}
			
			var sessionKey = document.createElement("input");
			sessionKey.setAttribute("type", "hidden");
			sessionKey.setAttribute("id", "keyIndex_"+inputObj.id+frmId);
			sessionKey.setAttribute("name", "keyIndex_"+inputObj.id+frmId);
			sessionKey.setAttribute("value", this.setKeyIndex(inputObj));
			obj.appendChild(sessionKey);
			
			var hidkeyboardType = document.createElement("input");
			hidkeyboardType.setAttribute("type", "hidden");
			hidkeyboardType.setAttribute("id", "keyboardType_"+inputObj.id+frmId);
			hidkeyboardType.setAttribute("name", "keyboardType_"+inputObj.id+frmId);
			hidkeyboardType.setAttribute("value", "");
			obj.appendChild(hidkeyboardType);
			
			var hidfieldType = document.createElement("input");
			hidfieldType.setAttribute("type", "hidden");
			hidfieldType.setAttribute("id", "fieldType_"+inputObj.id+frmId);
			hidfieldType.setAttribute("name", "fieldType_"+inputObj.id+frmId);
			hidfieldType.setAttribute("value", "");
			obj.appendChild(hidfieldType);
		}
		if(document.getElementById("transkeyUuid"+frmId)==null){
			var uuid = document.createElement("input");
			uuid.setAttribute("type", "hidden");
			uuid.setAttribute("id", "transkeyUuid"+frmId);
			uuid.setAttribute("name", "transkeyUuid"+frmId);
			uuid.value=this.transkeyUuid;
			obj.appendChild(uuid);
		}
		var hidden = document.createElement("input");
		hidden.setAttribute("type", "hidden");
		hidden.setAttribute("id", "transkey_"+inputObj.id+frmId);
		hidden.setAttribute("name", "transkey_"+inputObj.id+frmId);
		hidden.setAttribute("value", "");
		var hmac = document.createElement("input");
		hmac.setAttribute("type", "hidden");
		hmac.setAttribute("id", "transkey_HM_"+inputObj.id+frmId);
		hmac.setAttribute("name", "transkey_HM_"+inputObj.id+frmId);
		hmac.setAttribute("value", "");
		obj.appendChild(hidden);
		obj.appendChild(hmac);
		if(ExE2E!=null){
			var e2e = document.createElement("input");
			e2e.setAttribute("type", "hidden");
			e2e.setAttribute("id", "transkey_ExE2E_"+inputObj.id+frmId);
			e2e.setAttribute("name", "transkey_ExE2E_"+inputObj.id+frmId);
			e2e.setAttribute("value", ExE2E);
			obj.appendChild(e2e);
		}
	};
	
	this.setKeyType = function(dataType){
		if(dataType==undefined){
			return "lower";
		}
		switch(dataType.charAt(0)){
		case 'a':
			return "lower";
		case 'A':
			return "upper";
		case '@' :
			return "special";
		}
		
	};
	
	this.getText = function(encrypted, ele){
		var request = new XMLHttpRequest();
		request.open("POST", transkey_surl, false);
		
		if(useCORS)
			request.withCredentials = true;
		else
			request.setRequestHeader("Cache-Control", "no-cache");
		
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
		
		if(!useSession) {
			var seedKey = document.getElementById("seedKey"+this.now.frmId).value;
			request.send("op=letter&name="+this.now.id+"&value=" +encrypted+"&keyIndex=" +this.now.keyIndex+"&fieldType=" +this.now.fieldType+"&keyboardType=" +this.now.keyboardType+"&encSeedKey="+seedKey +"&initTime="+initTime+tk_origin);
		}
		else
			request.send("op=letter&transkeyUuid="+this.transkeyUuid+"&name="+this.now.id+"&value=" +encrypted+"&TK_requestToken="+TK_requestToken+tk_origin);
		
		if (request.readyState == 4 && request.status == 200) {
			if(request.responseText.indexOf("SessionError")>-1){
				var errCodes = request.responseText.split("=");
				if(errCodes[1]=="1"){
					mtk.alert("session");
					this.now.clear();
					if(useSession) {
						mtk.resetToken(transkey_surl);
						mtk.resetSessionKey(transkey_surl);
					}
					mtk.now.setUrl();
				}
			} else if(request.responseText.indexOf("LimitTimeOver")>-1){
				alert("시간이 만료되었습니다.");
			} else{
				mtk.now.inputObj.value = mtk.now.inputObj.value + request.responseText;
				if(mtk.now.useInput) {
					var value = mtk.now.inputObj.value;
					if(mtk.now.useInputDiv.childElementCount>3) {
						mtk.now.useInputDiv.childNodes[value.length+1].value = value[value.length-1];
					}
					else
						mtk.now.useInputDiv.childNodes[2].value = mtk.now.inputObj.value;
				}
			}
		}

	};
	
	
	this.getFakeKey = function(){
		var rnd1,rnd2;
		var k=4;
		if(useNoDummy)
			var k=3;
		
		if(transkey_divType==1){
			if(this.now.keyboardType=="numberMobile"){
				rnd1 = tk_Random.random(1, 4, mtk.browser,navigator); 
				rnd2 = tk_Random.random(0, k, mtk.browser,navigator); 
			}else{
				rnd1 = tk_Random.random(1, 5, mtk.browser,navigator);
				rnd2 = tk_Random.random(0, 11, mtk.browser,navigator);
				if(rnd1==4){
					if(rnd2==0)
						rnd2=rnd2+1;
					else if(rnd2>8)
						rnd2=rnd2-3;
				}
			}
		}else{
			if(this.now.keyboardType=="numberMobile"){
				rnd1 = getRandomValue(2)+2;
				rnd2 = getRandomValue(6);
				
			}else{
				rnd1 = getRandomValue(4)+4;
				rnd2 = getRandomValue(11);
				if(rnd1==7){
					if(rnd2==0)
						rnd2=rnd2+1;
					else if(rnd2>8)
						rnd2=rnd2-getRandomValue(6);
				}
			}
		}
		
		return mtk.now.div.children[rnd1].children[rnd2];
	};
	
    function getRandomValue(range) {

       var ramdomNum = new GenKey().tk_getrnd_int() % range;

        return ramdomNum;



    }
	
	this.setQwertyMobileCss = function(){
		var qwertyCss = "";

		
		if(this.clientWidth>=600&&this.clientHeight>=600&&!this.horizontal){
			qwertyCss = "transkey_qwerty3";
		}else if(this.clientWidth>=360){
			qwertyCss = "transkey_qwerty2";
		}else{
			qwertyCss = "transkey_qwerty1";
		}
		
		this.cssText["qwertyMobile"].div = "transkey_div "+qwertyCss+"_div";
		this.cssText["qwertyMobile"].layout = qwertyCss+"_layout";
		this.cssText["qwertyMobile"].row = qwertyCss+"_row";
		this.cssText["qwertyMobile"].key1 = qwertyCss+"_key1";
		this.cssText["qwertyMobile"].key2 = qwertyCss+"_key2";
		this.cssText["qwertyMobile"].del = qwertyCss+"_del";
		this.cssText["qwertyMobile"].sp = qwertyCss+"_sp";
		this.cssText["qwertyMobile"].clear = qwertyCss+"_clear";
		this.cssText["qwertyMobile"].done = qwertyCss+"_done";
		
	};
	
	this.setNumberMobileCss = function(){
		var numberCss="";
		if(this.clientWidth>=600&&this.clientHeight>=600&&!this.horizontal){
			numberCss = "transkey_number3";
		}else if(this.clientWidth>=360){
			numberCss = "transkey_number2";
		}else{
			numberCss = "transkey_number1";
		}
		
		this.cssText["numberMobile"].div = "transkey_div "+numberCss+"_div";
		this.cssText["numberMobile"].layout = numberCss+"_layout";
		this.cssText["numberMobile"].row = numberCss+"_row";
		this.cssText["numberMobile"].key1 = numberCss+"_key1";
		this.cssText["numberMobile"].key2 = numberCss+"_key2";
		this.cssText["numberMobile"].del = numberCss+"_del";
		this.cssText["numberMobile"].clear = numberCss+"_clear";
		this.cssText["numberMobile"].done = numberCss+"_done";
	};
	
	this.setQwertyMobileLayout = function(id, div, cssName){
		this.setQwertyMobileCss();
		if(transkey_divType==0){
			div.className=this.cssText.qwertyMobile.div;
			div.innerHTML = qwertyMobileLayout(id, this.cssText.qwertyMobile);
		}else if(transkey_divType==1){
			div.innerHTML = qwertyMobileLayoutForDIV(id, cssName);
		}

	};
	
	this.setNumberMobileLayout = function(id, div, cssName){
		this.setNumberMobileCss();
		if(transkey_divType==0){
			div.className=this.cssText.numberMobile.div;
			div.innerHTML = numberMobileLayout(id, this.cssText.numberMobile);
		}else if(transkey_divType==1){
			if(useNoDummy)
				div.innerHTML = numberMobileNDLayoutForDIV(id, cssName);
			else
				div.innerHTML = numberMobileLayoutForDIV(id, cssName);
		}
	};
	
	function offsetPoint() {
		this.x = 0;
		this.y = 0;
	}

	function getOffsetPoint(Element) {

        var point = new offsetPoint();

        point.x = 0;
        point.y = 0;

        while (Element) {
            point.x += Element.offsetLeft;
            point.y += Element.offsetTop;

            Element = Element.offsetParent;

            if(Element==null)
                break;
        }

        return point;
	}

	
	function SeedEnc(geo) {	
		var iv = [0x4d, 0x6f, 0x62, 0x69, 0x6c, 0x65, 0x54, 0x72, 0x61, 0x6e, 0x73, 0x4b, 0x65, 0x79, 0x31, 0x30];	// "MobileTransKey10"	  
		var inData = new Array(16);
		var outData = new Array(16);
		var roundKey = new Array(32);
	  
		for(var i=0; i<geo.length; i++)
		{			
			if(geo.charAt(i) == "l" || geo.charAt(i) == "u" || geo.charAt(i) == "s" || geo.charAt(i) == "d")
			{
				inData[i] = Number(geo.charCodeAt(i));
				continue;
			}
			else if(geo.charAt(i) == " ")
			{ 
				inData[i] = Number(geo.charCodeAt(i));
				continue;
			}
			inData[i] = Number(geo.charAt(i).toString(16));
		}
		inData[geo.length] = 32;		//" "
		inData[geo.length + 1] = 101;	//e
		var rndInt = genKey.tk_getrnd_int();
		inData[geo.length + 2] = rndInt % 100;

		Seed.SeedSetKey(roundKey, sessionKey);
		Seed.SeedEncryptCbc(roundKey, iv, inData, 16, outData);

		var encodedData = new Array(16);
		var encodedDataString = "";
		for(var i=0; i<16; i++)
		{
			if(transkey_encDelimiter == null)
				encodedData[i] = Number(outData[i]).toString(16);
			else
				encodedDataString += Number(outData[i]).toString(16)+transkey_encDelimiter;
		}
			
		
		if(transkey_encDelimiter == null)
			return encodedData;
		else
			return encodedDataString.substring(0, encodedDataString.length-1);
	}
	
	function Key() {
		this.name = "";
		
		this.npoints = 0;
		this.xpoints = new Array();
		this.ypoints = new Array();
		
		this.addPoint = function(x, y) {
			this.npoints++;
			this.xpoints.push(x);
			this.ypoints.push(y);
		};
		
		this.contains = function(x, y) {
			var startx = this.xpoints[0];
			var starty = this.ypoints[0];
			
			var endx = this.xpoints[2];
			var endy = this.ypoints[2];
			
			if ( startx < x && starty < y )
			{
				if ( endx > x && endy > y )
				{
					return 1;
				}
			}
			
			return 0;
		};
	}

	function qwertyMobileLayout(id, cssText){
		var layout = '<span class="transkey_warning">'+tk_comments+'</span>'+
		'<span id="mtk_'+id+'_lower" class="transkey_layout '+cssText.layout+'"></span>'+
		'<span id="mtk_'+id+'_upper" class="transkey_layout '+cssText.layout+'"></span>'+
		'<span id="mtk_'+id+'_special" class="transkey_layout '+cssText.layout+'"></span>'+
			'<div id="mtk_'+id+'_Row0" class="transkey_row '+cssText.row+'">'+
			'<div '+startEvent+'="mtk.start(event, this, 0);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 1);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 2);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 3);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 4);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 5);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 6);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 7);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 8);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 9);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 10);"  class="transkey_key '+cssText.key1+'"></div>'+
			'</div>'+
			'<div id="mtk_'+id+'_Row1" class="transkey_row '+cssText.row+'">'+
			'<div '+startEvent+'="mtk.start(event, this, 11);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 12);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 13);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 14);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 15);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 16);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 17);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 18);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 19);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 20);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 21);"  class="transkey_key '+cssText.key1+'"></div>'+
			'</div>'+
			'<div id="mtk_'+id+'_Row2" class="transkey_row '+cssText.row+'">'+
			'<div '+startEvent+'="mtk.start(event, this, 22);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 23);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 24);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 25);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 26);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 27);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 28);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 29);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 30);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 31);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 32);"  class="transkey_key '+cssText.key1+'"></div>'+
			'</div>'+
			'<div id="mtk_'+id+'_Row3" class="transkey_row '+cssText.row+'">'+
			'<div id="mtk_cp" '+startEvent+'="mtk.cap(event, this);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 33);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 34);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 35);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 36);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 37);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 38);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 39);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 40);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div id="mtk_del" '+startEvent+'="mtk.del(event, this);"  class="transkey_key '+cssText.del+'"></div>'+
			'</div>'+
			'<div id="mtk_'+id+'_Row4" class="transkey_row '+cssText.row+'">'+
			'<div id="mtk_sp" '+startEvent+'="mtk.sp(event, this);"  class="transkey_key '+cssText.sp+'">특수키</div>'+
			'<div id="mtk_clear" title="전체삭제" '+startEvent+'="mtk.clear(event, this);"  class="transkey_key '+cssText.clear+'"></div>'+
			'<div id="mtk_done" title="입력완료" '+startEvent+'="mtk.done(event, this);"  class="transkey_key '+cssText.done+'"></div>'+
			'</div>';
		
		return layout;
	}
	function numberMobileLayout(id, cssText){
		var layout = '<span class="transkey_warning">'+tk_comments+'</span>'+
			'<span id="mtk_'+id+'_number" class="transkey_layout '+cssText.layout+'"></span>'+
			'<div id="mtk_'+id+'_Row0" class="transkey_row '+cssText.row+'">'+
			'<div '+startEvent+'="mtk.start(event, this, 0);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 1);" class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 2);" class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 3);" class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 4);" class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 5);" class="transkey_key '+cssText.key1+'"></div>'+
			'</div>'+
			'<div id="mtk_'+id+'_Row1" class="transkey_row '+cssText.row+'">'+
			'<div '+startEvent+'="mtk.start(event, this, 6);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 7);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 8);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 9);"  class="transkey_key '+cssText.key1+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 10);"  class="transkey_key '+cssText.key2+'"></div>'+
			'<div '+startEvent+'="mtk.start(event, this, 11);"  class="transkey_key '+cssText.key1+'"></div>'+
			'</div>'+
			'<div id="mtk_'+id+'_Row2" class="transkey_row '+cssText.row+'">'+
			'<div id="mtk_clear" '+startEvent+'="mtk.clear(event, this);"  class="transkey_key '+cssText.clear+'"></div>'+
			'<div id="mtk_del" '+startEvent+'="mtk.del(event, this);"  class="transkey_key '+cssText.del+'"></div>'+
			'<div id="mtk_done" '+startEvent+'="mtk.done(event, this);"  class="transkey_key '+cssText.done+'"></div>'+		
			'</div>';
		return layout;
	}
	
	function qwertyMobileLayoutForDIV(id, cssText){
		var layout = '<div id="mtk_disp" class="dv_'+cssText+'_disp">';

		if(document.getElementById(id).getAttribute("data-tk-useinput")=="true") {
			layout = '<div id="mtk_disp" class="dv_'+cssText+'_disp" style="height: 1px; border:0px;" role="button" tabindex="0" aria-label="가상키보드 영역 입니다"></div>';
		} else {
			layout += '<div class="dv_'+cssText+'_disp_a" role="button" tabindex="0" aria-label="가상키보드 영역 입니다"></div>';
			layout += '<div class="dv_'+cssText+'_disp_b" '+startEvent+'="mtk.close();" role="button" tabindex="0" aria-label="가상키보드 닫기"></div></div>';
		}
		
		layout += '<div class="dv_'+cssText+'_div_2 dv_'+cssText+'_div2_Height dv_'+cssText+'_div_a">'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 0);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-4px -9px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 1);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-39px -9px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 2);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-73px -9px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 3);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-108px -9px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 4);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-143px -9px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 5);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-178px -9px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 6);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-213px -9px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 7);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-248px -9px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 8);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-284px -9px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 9);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-319px -9px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_end dv_'+cssText+'_div2_Height " '+startEvent+'="mtk.start(event, this, 10);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-354px -9px;"></div></div>'+
	'</div>'+
	'<div class="dv_'+cssText+'_div_2  dv_'+cssText+'_div2_Height">'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 11);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-4px -60px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 12);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-39px -60px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 13);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-73px -60px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 14);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-108px -60px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 15);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-143px -60px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 16);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-178px -60px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 17);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-213px -60px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 18);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-248px -60px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 19);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-284px -60px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 20);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-319px -60px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_end dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 21);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-354px -60px;"></div></div>'+
	'</div>'+
	'<div class="dv_'+cssText+'_div_2 dv_'+cssText+'_div2_Height">'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 22);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-4px -108px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 23);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-39px -108px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 24);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-73px -108px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 25);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-108px -108px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 26);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-143px -108px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 27);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-178px -108px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 28);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-213px -108px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 29);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-248px -108px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 30);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-284px -108px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 31);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-319px -108px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_end dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 32);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-354px -108px;"></div></div>'+
	'</div>'+
	'<div class="dv_'+cssText+'_div_2 dv_'+cssText+'_div2_Height">'+
	'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div_a dv_'+cssText+'_div2_Height" id="mtk_cp" '+startEvent+'="mtk.cap(event, this);" role="button" tabindex="0" aria-label="쉬프트"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-2px -157px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 33);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-39px -161px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 34);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-73px -161px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 35);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-108px -161px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 36);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-143px -161px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 37);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-178px -161px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 38);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-213px -161px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 39);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-248px -161px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 40);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-284px -161px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div_a dv_'+cssText+'_end dv_'+cssText+'_div2_Height" id="mtk_del" '+startEvent+'="mtk.del(event, this);" role="button" tabindex="0" aria-label="삭제"><div class="dv_'+cssText+'_div2_2  dv_'+cssText+'_div2_2_qTop" style="background-position:-333px -157px;width:40px;"></div></div>'+
	'</div>';
		if(useSpace) {
			layout += '<div class="dv_'+cssText+'_div_2 dv_'+cssText+'_end dv_'+cssText+'_div2_Height">'+
				'<div class="dv_'+cssText+'_div3 dv_'+cssText+'_div_a dv_'+cssText+'_div2_Height"  id="mtk_sp" '+startEvent+'="mtk.sp(event, this);" role="button" tabindex="0" aria-label="특수키"><div class="dv_'+cssText+'_div3_2 dv_'+cssText+'_div3_3_qTop" style="background-position:-16px -211px;"></div></div>'+
				'<div class="dv_'+cssText+'_div3 dv_'+cssText+'_div_a dv_'+cssText+'_div2_Height"  id="mtk_space" '+startEvent+'="mtk.clear(event, this);" role="button" tabindex="0" aria-label="전체사제"><div class="dv_'+cssText+'_div3_3 dv_'+cssText+'_div3_3_qTop" style="background-position:-75px -211px;"></div></div>'+
				'<div class="dv_'+cssText+'_div3 dv_'+cssText+'_div_a dv_'+cssText+'_div2_Height"  '+startEvent+'="mtk.start(event, this, 41);" role="button" tabindex="0" aria-label="스페이스바"><div class="dv_'+cssText+'_div3_3 dv_'+cssText+'_div3_3_qTop" style="background-position:-162px -212px;"></div></div>'+
				'<div class="dv_'+cssText+'_div3 dv_'+cssText+'_div_b dv_'+cssText+'_end dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.done(event, this);" role="button" tabindex="0" aria-label="입력완료"><div class="dv_'+cssText+'_div3_2 dv_'+cssText+'_div3_3_qTop" style="width:75px;height:27px;background-position:-282px -211px;"></div></div>'+
			'</div>';
		} else {
			layout += '<div class="dv_'+cssText+'_div_2 dv_'+cssText+'_end dv_'+cssText+'_div2_Height">'+
				'<div class="dv_'+cssText+'_div3 dv_'+cssText+'_div_a dv_'+cssText+'_div2_Height"  id="mtk_sp" '+startEvent+'="mtk.sp(event, this);" role="button" tabindex="0" aria-label="특수키"><div class="dv_'+cssText+'_div3_2 dv_'+cssText+'_div3_3_qTop" style="width:42px;height:27px;background-position:-31px -211px;"></div></div>'+
				'<div class="dv_'+cssText+'_div3 dv_'+cssText+'_div_a dv_'+cssText+'_div2_Height"  '+startEvent+'="mtk.clear(event, this);" role="button" tabindex="0" aria-label="전체삭제"><div class="dv_'+cssText+'_div3_3 dv_'+cssText+'_div3_3_qTop" style="background-position:-130px -212px;"></div></div>'+
				'<div class="dv_'+cssText+'_div3 dv_'+cssText+'_div_b dv_'+cssText+'_end dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.done(event, this);" role="button" tabindex="0" aria-label="입력완료"><div class="dv_'+cssText+'_div3_2 dv_'+cssText+'_div3_3_qTop" style="width:75px;height:27px;background-position:-263px -211px;"></div></div>'+
			'</div>';
		}
		if(showLicense&&licenseType!="")
			layout += '<div class="dv_'+cssText+'_licenseType" style="position : absolute;margin: 5px; color : red;">' + licenseType + " (" + licExpiredDate + ")" + '</div>';

		return layout;
	}
	
	function numberMobileLayoutForDIV(id, cssText){
		var layout = '<div id="mtk_disp" class="dv_'+cssText+'_disp">';
		
		if(document.getElementById(id).getAttribute("data-tk-useinput")=="true") {
			layout = '<div id="mtk_disp" class="dv_'+cssText+'_disp" style="height: 1px; border:0px;" role="button" tabindex="0" aria-label="가상키보드 영역 입니다"></div>';
		} else {
			layout += '<div class="dv_'+cssText+'_disp_a" role="button" tabindex="0" aria-label="가상키보드 영역 입니다"></div>';
			layout += '<div class="dv_'+cssText+'_disp_b" '+startEvent+'="mtk.close();" role="button" tabindex="0" aria-label="가상키보드 닫기"></div></div>';
		}
		
		layout += '<div class="dv_'+cssText+'_div_2 dv_'+cssText+'_div2_Height">'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 0);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2 dv_'+cssText+'_div2_2_nTop" style="background-position:-33px -20px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 1);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2 dv_'+cssText+'_div2_2_nTop" style="background-position:-131px -20px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 2);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2 dv_'+cssText+'_div2_2_nTop" style="background-position:-228px -20px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_end dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 3);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2 dv_'+cssText+'_div2_2_nTop" style="background-position:-327px -20px;"></div></div>'+
	'</div>'+
	'<div class="dv_'+cssText+'_div_2 dv_'+cssText+'_div2_Height">'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 4);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2 dv_'+cssText+'_div2_2_nTop" style="background-position:-33px -81px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 5);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2 dv_'+cssText+'_div2_2_nTop" style="background-position:-131px -81px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 6);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2 dv_'+cssText+'_div2_2_nTop" style="background-position:-228px -81px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_end dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 7);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2 dv_'+cssText+'_div2_2_nTop" style="background-position:-327px -81px;"></div></div>'+
	'</div>'+
	'<div class="dv_'+cssText+'_div_2 dv_'+cssText+'_div2_Height">'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 8);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2 dv_'+cssText+'_div2_2_nTop" style="background-position:-33px -142px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 9);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2 dv_'+cssText+'_div2_2_nTop" style="background-position:-131px -142px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 10);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2 dv_'+cssText+'_div2_2_nTop" style="background-position:-228px -142px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_end dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 11);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_2 dv_'+cssText+'_div2_2_nTop" style="background-position:-327px -142px;"></div></div>'+
	'</div>'+
	'<div class="dv_'+cssText+'_div_2 dv_'+cssText+'_end dv_'+cssText+'_div2_Height">'+
	'<div class="dv_'+cssText+'_div3 dv_'+cssText+'_div_a dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.del(event, this);" role="button" tabindex="0" aria-label="삭제"><div class="dv_'+cssText+'_div2_2 dv_'+cssText+'_div2_2_nTop" style="background-position:-33px -203px;"></div></div>'+
	'<div class="dv_'+cssText+'_div3 dv_'+cssText+'_div_a dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.clear(event, this);" role="button" tabindex="0" aria-label="전체 삭제"><div class="dv_'+cssText+'_div3_3 dv_'+cssText+'_div3_3_nTop" style="background-position:-114px -206px;"></div></div>'+
	'<div class="dv_'+cssText+'_div2  dv_'+cssText+'_div_b dv_'+cssText+'_end dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.done(event, this);" role="button" tabindex="0" aria-label="확인"><div class="dv_'+cssText+'_div3_2 dv_'+cssText+'_div3_3_nTop" style="background-position:-272px -206px;"></div></div>'+
	'</div>';
		if(showLicense&&licenseType!="")
			layout += '<div class="dv_'+cssText+'_licenseType" style="position : absolute;margin: 5px; color : red;">' + licenseType + " (" + licExpiredDate + ")" + '</div>';
		
		return layout;
	}
	
	function numberMobileNDLayoutForDIV(id, cssText){
		var layout = '<div id="mtk_disp" class="dv_'+cssText+'_disp">';
		
		if(document.getElementById(id).getAttribute("data-tk-useinput")=="true") {
			layout = '<div id="mtk_disp" class="dv_'+cssText+'_disp" style="height: 1px; border:0px;" role="button" tabindex="0" aria-label="가상키보드 영역 입니다"></div>';
		} else {
			layout += '<div class="dv_'+cssText+'_disp_a" role="button" tabindex="0" aria-label="가상키보드 영역 입니다"></div>';
			layout += '<div class="dv_'+cssText+'_disp_b" '+startEvent+'="mtk.close();" role="button" tabindex="0" aria-label="가상키보드 닫기"></div></div>';
		}
		
		layout += '<div class="dv_'+cssText+'_div_2 dv_'+cssText+'_div2_Height">'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 0);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_3 dv_'+cssText+'_div2_2_nTop" style="background-position:-39px -21px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 1);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_3 dv_'+cssText+'_div2_2_nTop" style="background-position:-147px -21px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_end dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 2);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_3 dv_'+cssText+'_div2_2_nTop" style="background-position:-254px -21px;"></div></div>'+
	'</div>'+
	'<div class="dv_'+cssText+'_div_2 dv_'+cssText+'_div2_Height">'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 3);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_3 dv_'+cssText+'_div2_2_nTop" style="background-position:-39px -82px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 4);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_3 dv_'+cssText+'_div2_2_nTop" style="background-position:-147px -82px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_end dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 5);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_3 dv_'+cssText+'_div2_2_nTop" style="background-position:-254px -82px;"></div></div>'+
	'</div>'+
	'<div class="dv_'+cssText+'_div_2 dv_'+cssText+'_div2_Height">'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 6);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_3 dv_'+cssText+'_div2_2_nTop" style="background-position:-39px -144px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 7);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_3 dv_'+cssText+'_div2_2_nTop" style="background-position:-147px -144px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2 dv_'+cssText+'_end dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 8);" role="button" tabindex="0"><div class="dv_'+cssText+'_div2_3 dv_'+cssText+'_div2_2_nTop" style="background-position:-254px -144px;"></div></div>'+
	'</div>'+
	'<div class="dv_'+cssText+'_div_2 dv_'+cssText+'_end dv_'+cssText+'_div2_Height">'+
		'<div class="dv_'+cssText+'_div3 dv_'+cssText+'_div_a dv_'+cssText+'_div2_Height"  '+startEvent+'="mtk.del(event, this);" role="button" tabindex="0" aria-label="삭제"><div class="dv_'+cssText+'_div2_3 dv_'+cssText+'_div2_2_nTop" style="background-position:-37px -203px;"></div></div>'+
		'<div class="dv_'+cssText+'_div3 dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.start(event, this, 9);" role="button" tabindex="0" aria-label="전체 삭제"><div class="dv_'+cssText+'_div2_3 dv_'+cssText+'_div2_2_nTop" style="background-position:-147px -207px;"></div></div>'+
		'<div class="dv_'+cssText+'_div2  dv_'+cssText+'_div_b dv_'+cssText+'_end dv_'+cssText+'_div2_Height" '+startEvent+'="mtk.done(event, this);" role="button" tabindex="0" aria-label="확인"><div class="dv_'+cssText+'_div3_4 dv_'+cssText+'_div3_3_nTop" style="background-position:-243px -206px;"></div></div>'+
	'</div>';
	if(showLicense&&licenseType!="")
		layout += '<div class="dv_'+cssText+'_licenseType" style="position : absolute;margin: 5px; color : red;">' + licenseType + " (" + licExpiredDate + ")" + '</div>';
	
	return layout;
	}

	
	this.transkeyInputLayout = function(inputObj){
		var id = inputObj.id;
		var type = inputObj.type;
		var maxLength = inputObj.maxLength;
		var keyboardType = transkey[inputObj.id].keyboardType;
		var inputText = inputObj.getAttribute("data-tk-inputtext")==null?"":inputObj.getAttribute("data-tk-inputtext");
		var inputImg = inputObj.getAttribute("data-tk-inputimg")==null?"":inputObj.getAttribute("data-tk-inputimg");
		var cssText = inputObj.getAttribute("data-tk-cssName");
		if(cssText==null){
			cssText = "transkey";
		}
		var layout = '<label class="transkey_input_label">'+ inputText +'</label><div class="dv_'+cssText+'_disp_b_not_input" '+startEvent+'="mtk.close();" style="position: absolute; top:5%; right:5%;" role="button" tabindex="0" aria-label="가상키보드 닫기"></div>';
		if(keyboardType=="numberMobile"&&maxLength>0) {
			if(transkey_divType==0)
				var margin = Math.floor((transkey[inputObj.id].width-37*maxLength)/(maxLength+1));
			else{
				if(max_width!=0&&max_width>=300&&mtk.clientWidth>max_width)
					var margin = Math.floor((max_width-37*maxLength)/(maxLength+1));
				else
					var margin = Math.floor(((mtk.clientWidth*widthRatio)-37*maxLength)/(maxLength+1));
			}
			for(var i=0; i<maxLength; i++) {
				layout += '<input id="tk_input_'+id+"_"+i+'" class="transkey_input2" type="'+type+'" style="margin-left:'+margin+'px;"/>';
			}
		}
		else 
			layout += '<input id="tk_input_'+id+'" class="transkey_input" type="'+type+'" readonly disabled/>';
		
		var iDiv = document.createElement("div");
		iDiv.setAttribute("id", "mtk_input_div_"+inputObj.id);
		iDiv.setAttribute("class", "transkey_input_div");
		iDiv.style.backgroundImage="url("+inputImg+")";
		iDiv.innerHTML = layout;
		document.body.appendChild(iDiv);
		transkey[inputObj.id].useInput = true;
		transkey[inputObj.id].useInputDiv = iDiv;
	};
	
	function pack(source)
	{
	   var temp = "";
	   for (var i = 0; i < source.length; i+=2)
	   {
	      temp+= String.fromCharCode(parseInt(source.substring(i, i + 2), 16));
	   }
	   return temp;
	}

	function char2hex(source)
	{
	   var hex = "";
	   for (var i = 0; i < source.length; i+=1)
	   {
	      var temp = source[i].toString(16);
	      switch (temp.length)
	      {
	         case 1:
	            temp = "0" + temp;
	            break;
	         case 0:
	           temp = "00";
	      }
	      hex+= temp;
	   }
	   return hex;
	}

	function xor(a, b)
	{
	   var length = Math.min(a.length, b.length);
	   var temp = "";
	   for (var i = 0; i < length; i++)
	   {
	      temp+= String.fromCharCode(a.charCodeAt(i) ^ b.charCodeAt(i));
	   }
	   length = Math.max(a.length, b.length) - length;
	   for (var i = 0; i < length; i++)
	   {
	      temp+= "\x00";
	   }
	   return temp;
	}

	function mgf1(mgfSeed, maskLen)
	{
	   var t = "";
	   var hLen = 20;
	   var count = Math.ceil(maskLen / hLen);
	   for (var i = 0; i < count; i++)
	   {
	      var c = String.fromCharCode((i >> 24) & 0xFF, (i >> 16) & 0xFF, (i >> 8) & 0xFF, i & 0xFF);
	      t+= pack(sha1Hash(mgfSeed + c));
	   }

	   return t.substring(0, maskLen);
	}

	function xorb(a, b) {
		var length = Math.min(a.length, b.length);
		var temp = "";
		for (var i = 0; i < length; i++) {
			temp += String.fromCharCode(a[i] ^ b[i]);
		}
		length = Math.max(a.length, b.length) - length;
		for (var i = 0; i < length; i++) {
			temp += "\x00";
		}
		return temp;
	}
	
	
	function strtobin(a) {
		var ret=new Uint8Array(a.length);
		
		for (var i = 0; i < a.length; i++) 
		{
			ret[i]= a.charCodeAt(i);
		}
		
		return ret;
	}
	
	function bytecopy(input,start,end) {
		
		var k = new Array(end-start); 
		for (var i = start,j=0; i < end; i++,j++) {
			k[j]=input[i];
		}
		return k;
		
	}
	
	function clear(input) {
		for (var i = 0; i < input.length; i++) {
			input[i]=0;
		}
	}
	
	this.rsaes_oaep_decrypt_key=function(m,d,n)
	{
		var _0x281f=["\x73\x75\x62\x73\x74\x72\x69\x6E\x67","\x6C\x65\x6E\x67\x74\x68","\x72\x73\x61\x65\x73\x5F\x6F\x61\x65\x70\x5F\x64\x65\x63\x72\x79\x70\x74","","\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65","\x63\x68\x61\x72\x43\x6F\x64\x65\x41\x74"];var m=b64tohex(m);encoded_rsa= m[_0x281f[0]](0,512);encoded_enc= m[_0x281f[0]](512,m[_0x281f[1]]);d= this[_0x281f[2]](encoded_rsa,d,n);var k= new Array(16);var iv= new Array(16);for(var i=0;i< 16;i++){k[i]= d[i]};for(var i=16,j=0;i< 32;i++,j++){iv[j]= d[i]};var roundKey= new Array(32);Seed.SeedSetKey(roundKey,k);encoded_byte= makeHexToArrayByte(encoded_enc);var outData= new Array(encoded_byte[_0x281f[1]]);Seed.SeedDecryptCbc(roundKey,iv,encoded_byte,encoded_byte[_0x281f[1]],outData);dec= _0x281f[3];for(var i=0;i< outData[_0x281f[1]];i++){if(outData[i]== 0){break};dec+= String[_0x281f[4]](outData[i])};decBin=  new Array(dec[_0x281f[1]]);for(var i=0;i< dec[_0x281f[1]];i++){decBin[i]= dec[_0x281f[5]](i)};base64= char2Base64(decBin);clear(k);clear(iv);clear(decBin);return base64;
		
	};
	
	this.rsaes_oaep_decrypt = function(m, d, n) {
		
		var _0x2604=["\x30\x31\x30\x30\x30\x31","\x6D\x6F\x64\x50\x6F\x77","","\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65","\x6C\x65\x6E\x67\x74\x68","\x63\x68\x61\x72\x43\x6F\x64\x65\x41\x74"];var _e= new BigInteger(_0x2604[0],16);var _d= new BigInteger(d,16);var _n= new BigInteger(n,16);mb=  new BigInteger(m,16);c= mb[_0x2604[1]](_d,_n);c= c.toString(16);EM= makeHexToArrayByte(c);maskedDB= _0x2604[2];maskedSeed= _0x2604[2];for(var i=0;i< 20;i++){maskedSeed+= String[_0x2604[3]](EM[i])};for(var i=0;i< EM[_0x2604[4]]- 20;i++){maskedDB+= String[_0x2604[3]](EM[20+ i])};seedMask= mgf1(maskedDB,20);seedMask1= strtobin(seedMask);seed= xor(maskedSeed,seedMask);seed1= strtobin(seed);dbMask= mgf1(seed,maskedDB[_0x2604[4]]);dbMask1= strtobin(dbMask);DB= xor(maskedDB,dbMask);DB1= strtobin(DB);var i=0;for(i= 20;i< DB[_0x2604[4]];i++){if(DB[_0x2604[5]](i)== 0x01){break}};i++;M=  new Uint8Array(DB[_0x2604[4]]- i);for(var j=0;j< DB[_0x2604[4]]- i;j++){M[j]= DB[_0x2604[5]](i+ j)};d= _0x2604[2];n= _0x2604[2];return M;

	};
		
	function rsaes_oaep_encrypt(m, n, k, e)
	{
	   var hLen = 20;


	   var mLen = m.length;
	   if (mLen > k - 2 * hLen - 2)
	   {
	   	alert("too long");
	   }

	   var lHash = "\xda\x39\xa3\xee\x5e\x6b\x4b\x0d\x32\x55\xbf\xef\x95\x60\x18\x90\xaf\xd8\x07\x09"; // pack(sha1Hash(""))

	   var ps = "";
	   var temp = k - mLen - 2 * hLen - 2;
	   for (var i = 0; i < temp; i++)
	   {
	      ps+= "\x00";
	   }

	   var db = lHash + ps + "\x01" + m;
	   var seed = "";
	   for (var i = 0; i < hLen + 4; i+=4)
	   {
	      temp = new Array(4);
	      rng.nextBytes(temp);
	      seed+= String.fromCharCode(temp[0], temp[1], temp[2], temp[3]);
	   }
	   seed = seed.substring(4 - seed.length % 4);
	   var dbMask = mgf1(seed, k - hLen - 1);
	   
	   var maskedDB = xor(db, dbMask);
	   var seedMask = mgf1(maskedDB, hLen);
	   var maskedSeed = xor(seed, seedMask);
	   var em = "\x00" + maskedSeed + maskedDB;

	   m = new Array();
	   for (i = 0; i < em.length; i++)
	   {
	      m[i] = em.charCodeAt(i);
	   }
	   m = new BigInteger(m, 256);
	   c = m.modPow(e, n);
	   c = c.toString(16);
	   if (c.length & 1)
	   {
	      c = "0" + c;
	   }

	   return c;
	}

	function pkcs7pad(plaintext)
	{
	   var pad = 16 - (plaintext.length & 15);
	   for (var i = 0; i < pad; i++)
	   {
	      plaintext+= String.fromCharCode(pad);
	   }
	   return plaintext;
	}

	function aes_encrypt(plaintext, key, iv)
	{
	   var ciphertext = new Array();
	   plaintext = pkcs7pad(plaintext);
	   key = new keyExpansion(key);
	   for (var i = 0; i < plaintext.length; i+=16)
	   {
	      var block = new Array(16);
	      for (var j = 0; j < 16; j++)
	      {
	         block[j] = plaintext.charCodeAt(i + j) ^ iv[j];
	      }
	      block = AESencrypt(block, key);
	      for (var j = 0; j < 16; j++)
	      {
	         iv[j] = block[j];
	      }
	      ciphertext = ciphertext.concat(block);
	   }
	   return ciphertext;
	}

	function phpbb_encrypt1024(plaintext)
	{
	   var temp = new Array(32);
	   rng.nextBytes(temp);
	   var iv = temp.slice(0, 16);
	   var key = "";
	   for (var i = 16; i < 32; i++) // eg. temp.slice(16, 32)
	   {
	      key+= String.fromCharCode(temp[i]);
	   }

	   var n = new BigInteger("00a52ebc98a9583a90b14d34c009d436996b590561224dd1f41bd262f17dbb70f0fe9d289e60a3c31f1f70a193ad93f0a77e9a491e91de9f9a7f1197d1ffadf6814b3e46d77903a8f687849662528cdc3ea5c7c8f3bdf8fb8d118f01441ce317bb969d8d35119d2d28c8c07cbcfb28919387bd8ee67174fb1c0b2d6b87dfa73f35", 16);
	   var k = 128; // length of n in bytes
	   var e = new BigInteger("010001", 16);

	   frm1.key1.value = rsaes_oaep_encrypt(plaintext, n, k, e);
	   frm1.iv1.value = char2hex(iv);
	   frm1.data1.value = char2hex(aes_encrypt(plaintext, key, iv));
	}


	this.phpbb_encrypt2048 = function(plaintext, k, e, n)
	{
	   var temp = new Array(32);
	   rng.nextBytes(temp);
	   var key = "";
	   for (var i = 16; i < 32; i++) // eg. temp.slice(16, 32)
	   {
	      key+= String.fromCharCode(temp[i]);
	   }

	   var _e = new BigInteger(e, 16);
	   var _n = new BigInteger(n, 16);
	   
	   var _rsaoen = "";
	   
	   while(_rsaoen.length<512){
			_rsaoen = rsaes_oaep_encrypt(plaintext, _n, k, _e);
			if(_rsaoen.length>511)
				break;
	   }
	   
	   return _rsaoen;
	};

	function makeHexToArrayByte(hexString)
	{
		var len = hexString.length/2;
		var result = Array(len);
		for (var i = 0; i < len; i++)
			result[i] = parseInt(hexString.substring(2*i, 2*i+2),16);
		return result;
	}

	function getTodayDate(){
		 var _date  = new Date();
		 var _year  = "" + _date.getFullYear();
		 var _month = "" + (_date.getMonth() + 1);
		 var _day   = "" + _date.getDate();

		 if( _month.length == 1 ) _month = "0" + _month;
		 if( ( _day.length ) == 1 ) _day = "0" + _day;

		 var tmp = "" + _year.substring(2, 4) + _month + _day;
		 return tmp;
	}
	
	function verifyCA() 
	{
		var x509_pub = new X509();
		x509_pub.readCertPEM(cert_pub);
	  	
//		var NotBefore = x509_pub.getNotBefore();
//		var NotAfter = x509_pub.getNotAfter();
		var Signature = x509_pub.getSignature();
		var CertInfo = x509_pub.getCertInfo();
		var abCertInfo = CryptoJS.enc.Hex.parse(CertInfo);
		var abHash =  CryptoJS.SHA256(abCertInfo).toString();
		
//		var todayDate = getTodayDate();		
//		if(todayDate < NotBefore.substring(0, 6) || todayDate >= NotAfter.substring(0, 6)) {
//		alert("transkey : 인증서 유효기간이 만료되었습니다.");
//		return "expired";
//		}
			
		var x509_ca = new X509();
		x509_ca.readCertPEM(cert_ca);

		var isValid = x509_ca.subjectPublicKeyRSA.verifyString(abHash, Signature);
		if (isValid) {
			return true;
		} else {
			return false;
		}
	}
}





mTranskey.prototype.setKeyboard = function(inputObj){
	var div = document.createElement("div");
	div.setAttribute("id", "mtk_"+inputObj.id);
	var _cssName = inputObj.getAttribute("data-tk-cssName");
	var divClassName = "transkey";
	var keyboardType = inputObj.getAttribute("data-tk-kbdType");
	var useTKInput = inputObj.getAttribute("data-tk-useinput");
	if(_cssName==null){
		_cssName = "transkey";
	}
	if(transkey_divType==1){
		if(keyboardType=="qwerty") {
			if(useTKInput=="true")
				divClassName+=" dv_"+_cssName+"_div dv_transkey_div_qHeight2";
			else
				divClassName+=" dv_"+_cssName+"_div dv_transkey_div_qHeight";
		}
		else {
			if(useTKInput=="true")
				divClassName+=" dv_"+_cssName+"_div dv_transkey_div_nHeight2";
			else
				divClassName+=" dv_"+_cssName+"_div dv_transkey_div_nHeight";
		}
	}
	div.setAttribute("class", divClassName);

	var dataType = inputObj.getAttribute("data-tk-dataType");
	var ExE2E = inputObj.getAttribute("data-tk-ExE2E");
	var keyType;
	if(keyboardType=="qwerty"){
		this.setQwertyMobileLayout(inputObj.id, div, _cssName);
		keyType = this.setKeyType(dataType);
	}
	else{
		this.setNumberMobileLayout(inputObj.id, div, _cssName);
		keyType="single";
	}

	//div.style.backgroundImage="url("+transkey_url+"/images/loading.gif)";
	
	this.setHiddenField(inputObj, ExE2E);
	
	transkey[inputObj.id] = new mTranskeyObj(inputObj, this.clientWidth, div, keyType, keyboardType, dataType);
	
	transkey[inputObj.id].setUrl();
	
	transkey[inputObj.id].setButton(mtk_useButton);
	
	transkey.objs.push(inputObj.id);
	
	document.body.appendChild(div);
	
	if(useTKInput=="true")
		mtk.transkeyInputLayout(inputObj);
};

mTranskey.prototype.setTalkBackText = function(transkeyObj){
	if(!transkeyObj.talkBack)
		return false;
	
	var count=0;
	var dmyCount=0;
	var keyIndex=0;
	var textArray;
	var isNumber=false;
	if(transkeyObj.keyTypeIndex=="l ")
		textArray = mtk.talkBackLowerText;
	else if(transkeyObj.keyTypeIndex=="u ")
		textArray = mtk.talkBackUpperText;
	else if(transkeyObj.keyTypeIndex=="s ")
		textArray = mtk.talkBackSpecialText;
	else{
		isNumber=true;
		if(transkey_divType==1)
			textArray = transkeyObj.talkBackNumberText;
		else
			textArray = transkeyObj.talkBackNumberText;
	}
	
	var childNodes = transkeyObj.div.childNodes;
	if(transkey_divType==1){
		for(var i=0;i<childNodes.length;i++){
			var child = childNodes[i];
			if(child.id=="mtk_disp"){
				
				continue;
			}
			if(child.tagName=="DIV"||child.tagName=="div"){
				for(var k=0;k<child.childNodes.length;k++){
					var key = child.childNodes[k];
					if(key.id==""){
						if(isNumber){
							if(keyIndex==12)
								return;
							if("="==transkeyObj.talkBackNumberText[keyIndex]){
								key.setAttribute('aria-label', "빈칸");
							}else{
								try{
									key.setAttribute('aria-label', textArray[keyIndex]);
								}catch(e){	
								}								
							}
							keyIndex++;
						}else{
							if(keyIndex==36)
								return;
							if(count==Number(transkeyObj.dki[dmyCount])){
								key.setAttribute('aria-label', "빈칸");
								dmyCount++;
							}else{
								try{
									key.setAttribute('aria-label', textArray[keyIndex]);
								}catch(e){	
								}	
								keyIndex++;
							}
							count++;
						}
						
					}
				}
			}
		}
	}else{
		for(var i=0;i<childNodes.length;i++){
			var child = childNodes[i];
			if(child.id=="mtk_disp"){
				
				continue;
			}
			if(child.tagName=="DIV"||child.tagName=="div"){
				for(var k=0;k<child.childNodes.length;k++){
					var key = child.childNodes[k];
					if(key.tagName=="DIV"||key.tagName=="div"){
						if(isNumber){
							if(keyIndex==12)
								return;
							if("="==transkeyObj.talkBackNumberText[keyIndex]){
								key.setAttribute('aria-label', "빈칸");
								keyIndex++;
							}else{
								key.setAttribute('aria-label', textArray[keyIndex]);
								keyIndex++;
							}
						}else{
							if(keyIndex==36)
								return;
							if(key.id==""){
								if(count==Number(transkeyObj.dki[dmyCount])){
									key.setAttribute('aria-label', "빈칸");
									dmyCount++;
								}else{
									key.setAttribute('aria-label', textArray[keyIndex]);
									keyIndex++;
								}
								count++;
							}
						}
					}
				}
			}
		}
	}
	
	
};

mTranskey.prototype.setTalkBackKeys = function(transkeyObj){
	if(!transkeyObj.talkBack)
		return false;
	
	var childNodes = transkeyObj.div.childNodes;
	for(var i=0;i<childNodes.length;i++){
		var child = childNodes[i];
		if(child.tagName=="DIV"||child.tagName=="div"){
			for(var k=0;k<child.childNodes.length;k++){
				var key = child.childNodes[k];
				if(key.tagName=="DIV"||key.tagName=="div"){
					if(key.id=="")
						key.setAttribute('aria-label', "");
					else if(key.id=="mtk_cp")
						key.setAttribute('aria-label', "쉬프트");
					else if(key.id=="mtk_del")
						key.setAttribute('aria-label', "삭제");
					else if(key.id=="mtk_sp")
						key.setAttribute('aria-label', "특수키");
					else if(key.id=="mtk_clear")
						key.setAttribute('aria-label', "전체삭제");
					else if(key.id=="mtk_done")
						key.setAttribute('aria-label', "입력완료");
					else if(useSpace&&key.id=="mtk_space")
						key.setAttribute('aria-label', "스페이스바");
						
				}
			}
		}
	}
};

mTranskey.prototype.setTalkBack = function(inputId){
	if(inputId==null){
		for(var i=0;i<transkey.objs.length;i++){
			var mtkObj = transkey[transkey.objs[i]];
			if(mtkObj==null)
				continue;
			if(transkey_divType==1){
				var inputObj = mtkObj.inputObj;
				mtk.remove(inputObj);			
				mtk_useTalkBack = true;
				mtk.setKeyboard(inputObj);
			}else{				
				if(mtk.now!=null)
					mtk.close();
				
				mtkObj.talkBack = true;
				mtkObj.setUrl();
			}


		}
	}else{
		var mtkObj = transkey[inputId];
		if(mtkObj==null)
			return false;
		if(transkey_divType==1){
			var inputObj = mtkObj.inputObj;
			mtk.remove(inputObj);
			var oriTB = mtk_useTalkBack;
			mtk_useTalkBack = true;
			mtk.setKeyboard(inputObj);
			mtk_useTalkBack = oriTB;
		}else{
			if(mtk.now!=null)
				mtk.close();
			
			mtkObj.talkBack = true;
			mtkObj.setUrl();
		}


	}
};

mTranskey.prototype.onKeyboard = function(inputObj){
	 document.body.height="100%";
	 this.webkitTapHighlightColor=document.body.style.webkitTapHighlightColor;
	 document.body.style.webkitTapHighlightColor="rgba(0,0,0,0)";
	 
	 if(this.now!=null)
		 this.focusout();
	 
	 this.now = transkey[inputObj.id];

	 if(!useSession&&limitTime>0)
		 this.now.checkInitTime();
	 
	 if(onKeyboard_allocate||!this.now.allocate) {
		 if(!useSession){
			 var hidKeyIndex = document.getElementById("keyIndex_"+inputObj.id+this.now.frmId);
			 hidKeyIndex.setAttribute("value", this.setKeyIndex(inputObj));
			 this.now.keyIndex = hidKeyIndex.value;
		 }
		 this.now.allocate=false;
		 this.now.allocationIndex = new GenKey().tk_getrnd_int();
		 if(transkey_divType==1)
			 this.now.setKeyType(this.now.keyType);
		 else 
			 this.now.setUrl();
	 }
	 
	 if(this.now!=null&&this.now.useTranskey){
		 if(!this.checkWidthSize(this.now.width)){
			 this.getClientWidth();
			 this.reSize(this.now);
		 }
		
		this.now.clear();
		var div = this.now.div;	 
		inputObj.disabled=true;
		inputObj.blur();
		
		this.setPosition();
		div.style.display="block";
		
		if(this.now.useInput){
			var inputHeight = getComputedStyle(this.now.useInputDiv).height.replace("px","")-getComputedStyle(this.now.useInputDiv).borderBottomLeftRadius.replace("px","");
			this.now.useInputDiv.style.width=div.clientWidth+"px";
			this.now.useInputDiv.style.top=div.style.top.replace("px", "")-inputHeight+"px";
			this.now.useInputDiv.style.left=div.style.left;
			this.now.useInputDiv.style.display="block";
		}
		
		inputObj.blur();
		
		setTimeout(function(){
			if(mtk.now.talkBack){
				if(transkey_divType==1){
					if(mtk.now.useInput)
						mtk.now.div.firstChild.focus();
					else
						mtk.now.div.firstChild.firstChild.focus();
				}
			}
		},100);

	 }
	 
 };

mTranskey.prototype.start = function(e, ele, index){

		mtk.keyPress(e, ele, useFakeKey);
	
		if(mtk_useTalkBack&&!clickDummy) {
			if(mtk.now.keyboardType=="numberMobile"){
				if(mtk.now.talkBackNumberText[index] == "=") {
					mtk.startCallBack();
					return;
				}
			} else {
				for(var i=0; i<mtk.now.dki.length; i++) {
					if(index == mtk.now.dki[i]) {
						mtk.startCallBack();
						return;
					}
				}
			}
		}
		
		var startMask = mtk.now.tk_Special_Mask_StartPos-1;
		var endMask = mtk.now.tk_Special_Mask_EndPos-1;
		var mask = mtk.now.tk_Special_Mask;
		
		var encrypted = mtk.getEncData(index);
		if(mtk.now.fieldType=="text") {
			if(mtk.now.inputObj.value.length >= startMask && mtk.now.inputObj.value.length <= endMask) {
				mtk.now.inputObj.value = mtk.now.inputObj.value + mask;
				if(mtk.now.useInput) {
					var value = mtk.now.inputObj.value;
					if(mtk.now.useInputDiv.childElementCount>3) {
						mtk.now.useInputDiv.childNodes[value.length+1].value = value[value.length-1];
					}
					else
						mtk.now.useInputDiv.childNodes[2].value = mtk.now.inputObj.value;
				}
			}
			else
				mtk.getText(encrypted, ele);
		} else {
			mtk.now.inputObj.value = mtk.now.inputObj.value + "*";
			if(mtk.now.useInput) {
				var value = mtk.now.inputObj.value;
				if(mtk.now.useInputDiv.childElementCount>3) {
					mtk.now.useInputDiv.childNodes[value.length+1].value = value[value.length-1]
				}
				else
					mtk.now.useInputDiv.childNodes[2].value = mtk.now.inputObj.value;
			}
		}

		mtk.now.hidden.value += transkey_delimiter + encrypted;
		if(mtk.now.inputObj.maxLength>0){
			if (mtk.now.inputObj.value.length >= mtk.now.inputObj.maxLength) {
				this.close();
				return;
			}
		}

		mtk.startCallBack();
};

mTranskey.prototype.del = function(e, ele){
		mtk.keyPress(e, ele, false);
		
		mtk.now.inputObj.value = mtk.now.inputObj.value.substring(0, mtk.now.inputObj.value.length - 1);
		
		if(mtk.now.useInput) {
			var value = mtk.now.inputObj.value;
			if(mtk.now.useInputDiv.childElementCount>3) {
				mtk.now.useInputDiv.childNodes[value.length+2].value = ""
			}
			else
				mtk.now.useInputDiv.childNodes[2].value = mtk.now.inputObj.value;
		}
		 
		var pos = mtk.now.hidden.value.lastIndexOf(transkey_delimiter);
		mtk.now.hidden.value = mtk.now.hidden.value.substring(0, pos);

		mtk.delCallBack();
};
	
mTranskey.prototype.sp = function(e, ele){
	if(mtk.now.useSpecial){
		mtk.keyPress(e, ele, false);
		if(mtk.now.special){
			if(mtk.now.cap||!mtk.now.useLower)
				mtk.now.setKeyType("upper");
			else
				mtk.now.setKeyType("lower");
			mtk.now.special=false;
		}else{
			mtk.now.setKeyType("special");
			mtk.now.special=true;
		}
		
		mtk.now.setQwertyKey(mtk.now.keyType);
		
		

	}else{
		this.alert("sp");
	}
};

mTranskey.prototype.getFakeKey = function(){
	var rnd1,rnd2;
	if(this.now.keyboardType=="numberMobile"){
		rnd1 = getRandomValue(2);
		rnd2 = getRandomValue(6);
		
	}else{
		rnd1 = getRandomValue(4)+3;
		rnd2 = getRandomValue(11);
		if(rnd1==6){
			if(rnd2==0)
				rnd2=rnd2+1;
			else if(rnd2>8)
				rnd2=rnd2-getRandomValue(6);
		}
	}
	return mtk.now.div.children[rnd1].children[rnd2];
};

mTranskey.prototype.fakeKeyPress = function(fakeKey){
	try{
		if(this.fakeKey!=null){
			this.fakeKey.style.backgroundColor="";
			this.fakeKey.style.borderColor="";
		}
		this.fakeKey = fakeKey;
		fakeKey.style.backgroundColor="rgba(115, 115, 115, 0.63)";
//		fakeKey.style.borderColor="#00CED1";
	}catch(ee){
		
	}


	
};

mTranskey.prototype.keyPress = function(e, ele, useFK){

	try{
		if(this.ele!=null){
			this.ele.style.backgroundColor="";
			this.ele.style.borderColor="";
		}
		this.ele=ele;
		if(e.preventDefault)
			e.preventDefault();
		var fakeKey=null;
		if(useFK){
			fakeKey = this.getFakeKey();
			mtk.fakeKeyPress(fakeKey);
		}
			
		
		ele.style.backgroundColor="rgba(115, 115, 115, 0.63)";
//		ele.style.borderColor="#00CED1";
		setTimeout(function(){
			ele.style.backgroundColor="";
			ele.style.borderColor="";
			if(useFK){
				fakeKey.style.backgroundColor="";
				fakeKey.style.borderColor="";
			}

		},100);
	}catch(ee){
		
	}
	
	return false;


};

mTranskey.prototype.startCallBack = function(){
	
};

mTranskey.prototype.clearCallBack = function(){
	
};

mTranskey.prototype.closeCallBack = function(){
	if ($('input[type=password]').sibilings('button').length>0){
		$('input[type=password]').sibilings('button').focus();
	}else{
		$('input[type=password]').focus();
	}
	
};

mTranskey.prototype.delCallBack = function(){
	
};

mTranskey.prototype.doneCallBack = function(){
	if ($('input[type=password]').sibilings('button').length>0){
		$('input[type=password]').sibilings('button').focus();
	}else{
		$('input[type=password]').focus();
	}
};

mTranskey.prototype.clear = function(e, ele){
	mtk.keyPress(e, ele, false);		
	mtk.now.clear();
	mtk.clearCallBack();
};

mTranskey.prototype.cap = function(e, ele){
	if(mtk.now.useCaps){
		mtk.keyPress(e, ele, false);
		if(mtk.now.cap){
			mtk.now.setKeyType("lower");
			mtk.now.cap = false;
		}else{
			mtk.now.setKeyType("upper");
			mtk.now.cap = true;
		}					
		
		mtk.now.setQwertyKey(mtk.now.keyType);
		mtk.now.special=false;
	}else{
		this.alert("cap");
	}
};
	
mTranskey.prototype.close = function(){
	document.body.style.webkitTapHighlightColor=mtk.webkitTapHighlightColor;
	mtk.now.inputObj.disabled=false;
	setTimeout(function(){
		mtk.now.div.style.display="none";
		if(mtk.now.keyboardType=="qwertyMobile"){
			mtk.now.initKeyType();
			mtk.now.setKeyType(mtk.setKeyType(mtk.now.inputObj.getAttribute("data-tk-dataType")));
			mtk.now.setQwertyKey(mtk.now.keyType);
		}
		if(mtk.now.useInput)
			mtk.now.useInputDiv.style.display="none";
		if(mtk.now.nextFocus!=null&&mtk_useTalkBack) {
			var nextFocus = mtk.now.nextFocus;
			mtk.now=null;
			document.getElementById(nextFocus).focus();
		} else {
			var nextFocus = document.body;
			mtk.now=null;
			nextFocus.focus();
		}
	},100);
	
	mtk.closeCallBack();
	return false;
};

mTranskey.prototype.done = function(e, ele){
	mtk.now.done();
	mtk.keyPress(e, ele, false);
	document.body.style.webkitTapHighlightColor=mtk.webkitTapHighlightColor;
	mtk.now.inputObj.disabled=false;
	setTimeout(function(){
		mtk.now.div.style.display="none";
		if(mtk.now.keyboardType=="qwertyMobile"){
			mtk.now.initKeyType();
			mtk.now.setKeyType(mtk.setKeyType(mtk.now.inputObj.getAttribute("data-tk-dataType")));
			mtk.now.setQwertyKey(mtk.now.keyType);
		}
		if(mtk.now.useInput)
			mtk.now.useInputDiv.style.display="none";
		if(mtk.now.nextFocus!=null&&mtk_useTalkBack) {
			var nextFocus = mtk.now.nextFocus;
			mtk.now=null;
			document.getElementById(nextFocus).focus();
		} else {
			var nextFocus = document.body;
			mtk.now=null;
			nextFocus.focus();
		}
	},100);
	
	mtk.doneCallBack();
	return false;
};

mTranskey.prototype.focusout = function(){
	document.body.style.webkitTapHighlightColor=mtk.webkitTapHighlightColor;
	mtk.now.inputObj.disabled=false;
	mtk.now.div.style.display="none";
	if(mtk.now.keyboardType=="qwertyMobile"){
		mtk.now.initKeyType();
		mtk.now.setKeyType(mtk.setKeyType(mtk.now.inputObj.getAttribute("data-tk-dataType")));
		mtk.now.setQwertyKey(mtk.now.keyType);
	}
	if(mtk.now.useInput)
		mtk.now.useInputDiv.style.display="none";
	mtk.now=null;
	return false;
};

mTranskey.prototype.alert = function(cmd){
	if(cmd=="setKeyboard")
		alert("transkey : qwerty키보드는 text타입을 지원하지 않습니다.");
	else if(cmd=="sp"||cmd=="cap")
		alert("해당키는 사용 할 수 없습니다.");
	else if(cmd=="session")
		alert("세션이 만료되었습니다.");
	else 
		alert("TouchEn transkey 라이선스에 문제가 발생했습니다. code : "+cmd);
};


mTranskey.prototype.buttonListener = function(e){
	var obj;
	if (e.type == "text" || e.type == "password") {
		obj = event;
	} else {
		e = e ? e : window.event;
		obj = e.target ? e.target : e.srcElement;
	}
	var id = tk_btn_arr[obj.id];
	
	var v = obj.getAttribute("data-tk-btnValue");
	if(v=="true"){
		obj.className = "tk_btn";
		transkey[id].clear();
		transkey[id].useTranskey=false;
		transkey[id].inputObj.readOnly=false;
		if(mtk.now!=null)
			mtk.close();
		obj.setAttribute("data-tk-btnValue","false");
	}else{
		obj.className = "tk_btn_";
		transkey[id].useTranskey=true;
		transkey[id].inputObj.readOnly=true;
		mtk.onKeyboard(transkey[id].inputObj);
		obj.setAttribute("data-tk-btnValue","true");

	}
	
};

mTranskey.prototype.reSize = function(transkeyObj){
	if(transkey_divType==0){
		mtk.reSizeForType0(transkeyObj);
	}else if(transkey_divType==1){
		mtk.reSizeForType1(transkeyObj);
	}

};

mTranskey.prototype.reSizeForType0 = function(transkeyObj){
	document.body.removeChild(transkeyObj.div);
//	if(transkeyObj.useInput)
//		transkeyObj.useInputDiv.style.display="none";
	var div = document.createElement("div");
	div.setAttribute("id", "mtk_"+transkeyObj.id);
	div.setAttribute("class", "transkey");
	var _cssName = transkeyObj.inputObj.getAttribute("data-tk-cssName");
	var keyboardType = transkeyObj.inputObj.getAttribute("data-tk-kbdType");
	var dataType = transkeyObj.inputObj.getAttribute("data-tk-dataType");
	var keyType;
	if(keyboardType=="qwerty"){
		this.setQwertyMobileLayout(transkeyObj.inputObj.id, div, _cssName);
		keyType = this.setKeyType(dataType);
	}
	else{
		this.setNumberMobileLayout(transkeyObj.inputObj.id, div, _cssName);
		keyType = "single";
	}
	div.style.backgroundImage="url("+transkey_url+"/images/loading.gif)";
	document.body.appendChild(div);

	transkeyObj.setDiv(div);
	transkeyObj.setWidth(this.clientWidth);

	transkeyObj.setUrl();
	
	if(transkeyObj.useInput){
		var maxLength = transkeyObj.inputObj.maxLength;
		
		var inputHeight = getComputedStyle(transkeyObj.useInputDiv).height.replace("px","")-getComputedStyle(transkeyObj.useInputDiv).borderBottomLeftRadius.replace("px","");
		transkeyObj.useInputDiv.style.width=transkeyObj.div.clientWidth+"px";
		transkeyObj.useInputDiv.style.top=transkeyObj.div.style.top.replace("px", "")-inputHeight+"px";
		transkeyObj.useInputDiv.style.left=transkeyObj.div.style.left;
		
		if(maxLength>2){
			if(transkey_divType==0)
				var margin = Math.floor((transkeyObj.width-37*maxLength)/(maxLength+1));
			else{
				if(max_width!=0&&max_width>=300&&mtk.clientWidth>max_width)
					var margin = Math.floor((max_width-37*maxLength)/(maxLength+1));
				else
					var margin = Math.floor(((mtk.clientWidth*widthRatio)-37*maxLength)/(maxLength+1));
			}
			
			for(var i=1; i<transkeyObj.useInputDiv.childElementCount; i++)
				transkeyObj.useInputDiv.childNodes[i].style.marginLeft=margin+"px";
		}
	}
	
	if(transkeyObj.talkBack){
		mtk.setTalkBackKeys(transkeyObj);
		mtk.setTalkBackText(transkeyObj);
	}
	transkeyObj.setKeyType(keyType);
};

mTranskey.prototype.reSizeForType1 = function(transkeyObj){
	if(transkeyObj.useInput){
		var maxLength = transkeyObj.inputObj.maxLength;
		
		var inputHeight = getComputedStyle(transkeyObj.useInputDiv).height.replace("px","")-getComputedStyle(transkeyObj.useInputDiv).borderBottomLeftRadius.replace("px","");
		transkeyObj.useInputDiv.style.width=transkeyObj.div.clientWidth+"px";
		transkeyObj.useInputDiv.style.top=transkeyObj.div.style.top.replace("px", "")-inputHeight+"px";
		transkeyObj.useInputDiv.style.left=transkeyObj.div.style.left;
		
		if(maxLength>2){
			if(transkey_divType==0)
				var margin = Math.floor((transkeyObj.width-37*maxLength)/(maxLength+1));
			else{
				if(max_width!=0&&max_width>=300&&mtk.clientWidth>max_width)
					var margin = Math.floor((max_width-37*maxLength)/(maxLength+1));
				else
					var margin = Math.floor(((mtk.clientWidth*widthRatio)-37*maxLength)/(maxLength+1));
			}
			
			for(var i=1; i<transkeyObj.useInputDiv.childElementCount; i++)
				transkeyObj.useInputDiv.childNodes[i].style.marginLeft=margin+"px";
		}
	}
	
	if(transkeyObj.keyboardType=="numberMobile"){

		var k=4;
		if(useNoDummy)
			var k=3;
		
		if(max_width!=0&&max_width>=300&&this.clientWidth>max_width)
			var ddivWidth = Math.floor(max_width/k-(k+1));
		else
			var ddivWidth = Math.floor(((this.clientWidth-(k+1))/k)*widthRatio);
		var edgeSize = this.clientWidth-(ddivWidth*k+(k+1));
		var edgePx = new Array(k);
		for(var i=0;i<k;i++){
			if(i<edgeSize)
				edgePx[i]=1;
			else
				edgePx[i]=0;
		}
		
		for(var i=1; 5>i; i++){
			if(i==4){
				transkeyObj.div.childNodes[i].childNodes[0].style.width=ddivWidth+edgePx[0]+"px";
				transkeyObj.div.childNodes[i].childNodes[1].style.width=ddivWidth+edgePx[1]+"px";
				transkeyObj.div.childNodes[i].childNodes[2].style.width=ddivWidth+ddivWidth+1+edgePx[2]+edgePx[3]+"px";		
				if(useNoDummy)
					transkeyObj.div.childNodes[i].childNodes[2].style.width=ddivWidth+edgePx[2]+"px";
			}else{
				for(var j=0; k>j; j++){
					transkeyObj.div.childNodes[i].childNodes[j].style.width=ddivWidth+edgePx[j]+"px";
				}
			}

		}
	}else{
			if(max_width!=0&&max_width>=300&&this.clientWidth>max_width)
				var ddivWidth = Math.floor(max_width/11-2);
			else
				var ddivWidth = Math.floor(((this.clientWidth-12)/11)*widthRatio);
		var edgeSize = this.clientWidth-(ddivWidth*11+12);
		var edgePx = new Array(11);
		for(var i=0;i<11;i++){
			if(i<edgeSize)
				edgePx[i]=1;
			else
				edgePx[i]=0;
		}
		
		for(var i=1; 6>i; i++){
			if(i==5){
				if(useSpace) {
					transkeyObj.div.childNodes[i].childNodes[0].style.width=ddivWidth+ddivWidth+1+edgePx[0]+edgePx[1]+"px";
					transkeyObj.div.childNodes[i].childNodes[1].style.width=ddivWidth+ddivWidth+1+edgePx[2]+edgePx[3]+"px";
					transkeyObj.div.childNodes[i].childNodes[2].style.width=ddivWidth+ddivWidth+ddivWidth+2+edgePx[4]+edgePx[5]+edgePx[6]+"px";
					transkeyObj.div.childNodes[i].childNodes[3].style.width=4*ddivWidth+3+edgePx[7]+edgePx[8]+edgePx[9]+edgePx[10]+"px";
				}
				else {
					transkeyObj.div.childNodes[i].childNodes[0].style.width=ddivWidth+ddivWidth+ddivWidth+2+edgePx[0]+edgePx[1]+edgePx[2]+"px";
					transkeyObj.div.childNodes[i].childNodes[1].style.width=ddivWidth+ddivWidth+ddivWidth+2+edgePx[3]+edgePx[4]+edgePx[5]+"px";
					transkeyObj.div.childNodes[i].childNodes[2].style.width=5*ddivWidth+4+edgePx[6]+edgePx[7]+edgePx[8]+edgePx[9]+edgePx[10]+"px";
				}
			}else if(i==4){
				for(var j=0; 9>j; j++){
					transkeyObj.div.childNodes[i].childNodes[j].style.width=ddivWidth+edgePx[j]+"px";
				}
				transkeyObj.div.childNodes[i].childNodes[9].style.width=ddivWidth+ddivWidth+1+edgePx[9]+edgePx[10]+"px";
			}else{
				for(var j=0; 11>j; j++){
					transkeyObj.div.childNodes[i].childNodes[j].style.width=ddivWidth+edgePx[j]+"px";
				}
			}

		}
	}

};

mTranskey.prototype.reSizeListener = function(){
	mtk.getClientWidth();
	if(mtk.now!=null){
		if(transkey_divType==1) {
			if(!mtk.checkWidthSize(mtk.now.width)){
				mtk.reSize(mtk.now);
			}
		}
		 var div = mtk.now.div;
		 var maxLength = mtk.now.inputObj.maxLength;
		 
		 mtk.setPosition();
		if(mtk.now.useTranskey)
			div.style.display="block";
		if(mtk.now.useInput){
			var inputHeight = getComputedStyle(mtk.now.useInputDiv).height.replace("px","")-getComputedStyle(mtk.now.useInputDiv).borderBottomLeftRadius.replace("px","");
			mtk.now.useInputDiv.style.width=div.clientWidth+"px";
			mtk.now.useInputDiv.style.top=div.style.top.replace("px", "")-inputHeight+"px";
			mtk.now.useInputDiv.style.left=div.style.left;
			
			if(maxLength>2){
				if(transkey_divType==0)
					var margin = Math.floor((mtk.now.width-37*maxLength)/(maxLength+1));
				else{
					if(max_width!=0&&max_width>=300&&mtk.clientWidth>max_width)
						var margin = Math.floor((max_width-37*maxLength)/(maxLength+1));
					else
						var margin = Math.floor(((mtk.clientWidth*widthRatio)-37*maxLength)/(maxLength+1));
				}
				
				for(var i=2; i<mtk.now.useInputDiv.childElementCount; i++)
					mtk.now.useInputDiv.childNodes[i].style.marginLeft=margin+"px";
			}
		}
	}
};

function tk_contains(parent, child, deep)

{
    if (parent == child || (mtk.now.useInputDiv != null && child.parentElement == mtk.now.useInputDiv))
    	return true;
    	

    var items = parent.children;
    var count = items.length;

    for ( var i = 0; i < count; i++) {
          if (items[i] == child)
                 return true;
          if (deep == true && tk_contains(items[i], child, deep))
                 return true;
    }
    return false;
}

function checkTransKey(nsEvent) {

    var inputObj;

    if (nsEvent.type == "text" || nsEvent.type == "password") {
          inputObj = event;
    } else {
          nsEvent = nsEvent ? nsEvent : window.event;
          inputObj = nsEvent.target ? nsEvent.target : nsEvent.srcElement;
    }
    
    if(mtk.now!=null){
        var transkeyDiv = mtk.now.div;

        if (tk_contains(transkeyDiv, inputObj, true) == false) {
    		mtk.focusout();	
        }
    }
}