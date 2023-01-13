/*-------------------------------------------------------------
  - Author(s): 차용진(Yong-Jin,Cha)
  - date : 2008. 08. 19
  - Copyright Notice : (주)포이시스 http://www.foresys.co.kr
  - @(#) commonFunction.js 1.0
  - Description : 공통 함수 
  - modified : 
  
  	ex)
  	<script src="/js/commonFunction.js"></script>

  -------------------------------------------------------------*/

/**
 *	[trim 함수]
 *
 *	ex) var a = "     학교종이 땡땡땡       ";
 *		alert("["+a.trim()+"]");
 */
String.prototype.trim = function()
{
     return this.replace(/(^\s*)|(\s*$)|($\s*)/g, "");
}

/**
 *	[replaceAll 함수]
 *
 *	ex) var dt = "2010-09-10";
 *		alert(dt.replaceAll('-', ''));
 */
String.prototype.replaceAll = function(regex, replacement)
{
     return this.split(regex).join(replacement);
}

/**
 *	[bytes 함수]
 *
 *	ex) var str = "가나다라abcd";
 *		alert(str.bytes());
 */
String.prototype.bytes = function()
{
	 	var str = this;
	 	var l = 0;
	 	for (var i=0; i<str.length; i++) l += (str.charCodeAt(i) > 128) ? 2 : 1;
	 		return l;
}

/*************************
	글자수 체크
	Edit Box Type
		
	<form name='form'>
		<input type='text' name='chk1' onkeyup='byteCHK(30,this);'>
	</form>
***************************/ 
function byteCHK(sz, obj)
{
	if (obj.value.bytes() > sz){ //80바이트를 넘기면
  		if (event.keyCode != '8') //백스페이스는 지우기작업시 바이트 체크하지 않기 위해서
  		{
   			alert("Chars : "+sz+" 까지 입력 가능");
   			obj.focus();
  		}
  		var kr = 0;
  		var en = 0;
  		var total = 0;
  		
  		for (var i=0; i<obj.value.length; i++){
  			if(obj.value.charCodeAt(i) > 128){
  				total += 2;
  				kr += 1;
  			} else {
  				total += 1;
  				en += 1;
  			}
  			if(total>sz){
  				obj.value = obj.value.substring(0, Number(kr+en-1));
  				return document.all.Length_msg.innerText = "Chars : "+obj.value.bytes()+"/"+sz;
  			}
  		}
 	}

 	document.all.Length_msg.innerText = "Chars : "+obj.value.bytes()+"/"+sz;
}

/**
 *	[BO 함수]
 *
 *	<button onmouseover="BO(this, 1);" onmouseout="BO(this, 0);">버튼</button>
 */
function BO(obj, type)
{
	if(type == 1)	obj.className = 'btn_over';
	else			obj.className = '';
}

/********************************
	리스트 마우스 오버시 칼러 변경
	onmouseover="RC(this, 1);" 
	onmouseout="RC(this, 0);"
	onclick="RC(this, 2);"
*********************************/
function RC(cell, ov){
	if(cell.style.backgroundColor == '#e1dbfd'){
		if(ov == 2)	cell.style.backgroundColor = ''; 
	} else {
		if(ov == 1){	
			cell.style.backgroundColor = '#e3edf2'; 
		} else if(ov == 2){	
			for(var i=0; i<cell.parentNode.rows.length; i++)
			{
				if(cell.parentNode.rows[i].style.backgroundColor == '#e1dbfd'){
					cell.parentNode.rows[i].style.backgroundColor = ''; 
				}
			}
			cell.style.backgroundColor = '#e1dbfd'; 
		} else {
			cell.style.backgroundColor = ''; 
		}
	}
}

	/********************************
		<input> text 포커스시 변경
		onblur="FC1(0);"
	*********************************/
	function FC1(ov){
		if(ov == 0){
			document.all.msg_div.style.display = "none";
			document.all.msg_div_bg.style.display = "none";
		} 
	}
	

	/**
     * 로딩바 뷰
     */
     function viewLoadingBar(sw){
     	if(sw == 'on')	document.all.loading_bar.style.display = 'block';
     	else 			document.all.loading_bar.style.display = 'none';
     }
     
     /**
      * 신청 버튼 뷰
      */
      function viewButton(sw){
      	if(sw == 'on')	document.all.apply_btn.style.display = 'block';
      	else 			document.all.apply_btn.style.display = 'none';
      }
      

	function screenOn() {
    document.getElementById("divLoading").style.visibility = "visible";
    document.getElementById("divBody").style.visibility = "";
	document.body.style.cursor = "wait";
	}
	
	function screenOff() {
    document.getElementById("divLoading").style.visibility = "hidden";
    document.getElementById("divBody").style.visibility = "";
	document.body.style.cursor = "default";
	}  



	/********************************************************
		버튼 롤 오버 처리
	*********************************************************/

	function MM_swapImgRestore() { //v3.0
	  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
	}

	function MM_preloadImages() { //v3.0
	  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
	    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
	}

	function MM_swapImage() { //v3.0
	  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
	   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
	}

	function MM_findObj(n, d) { //v4.01
	  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	  if(!x && d.getElementById) x=d.getElementById(n); return x;
	}
	
	
	
	
/*************************
commonFunction_new.js
***************************/	
	
/*************************
	글자수 체크
	Edit Box Type
	
	<form name='form'>
	<input type='text' name='chk1' onkeyup='byteCHK(30,this);'>
	</form>
***************************/ 

String.prototype.bytes2 = function(){
 	var str = this;
 	var l = 0;
 	for (var i=0; i<str.length; i++) l += (str.charCodeAt(i) > 128) ? 2 : 1;
 		return l;
}

 
// 배경색 변경
function colorCH(cell,color){ 
    cell.style.backgroundColor = color; 
} 

// 글자색변경 
function FcolorCH(cell,color){ 
    cell.style.color = color; 
} 

/********************************
	숫자 증가 감소 
	onclick="NumSteper('fee_rt', 'p', 5);" 
	onclick="NumSteper('fee_rt', 'm', 0);" 
*********************************/
function NumSteper(inputNm, type, min_max){
	var nm = eval("userForm."+inputNm);
	if(type == 'p'){
		if(min_max != nm.value)	nm.value = Number(nm.value) + 0.5;
	} else {
		if(min_max != nm.value) nm.value = Number(nm.value) - 0.5;
	}
}

/********************************
	숫자 증가 감소 
	onclick="NumSteper('fee_rt', 'p', 5);" 
	onclick="NumSteper('fee_rt', 'm', 0);" 
*********************************/
function NumSteper2(inputNm, type, min_max){
	var nm = eval("userForm."+inputNm);
	if(type == 'p'){
		if(min_max != nm.value)	nm.value = Number(nm.value) + 1;
	} else {
		if(min_max != nm.value) nm.value = Number(nm.value) - 1;
	}
}

 
/********************************
	리스트 마우스 오버시 칼러 변경
	onmouseover="BC(this, 1);" 
	onmouseout="BC(this, 0);"
*********************************/
function BC(cell, ov){

	if(cell.disabled == false){
		if(ov == 1){	
			cell.style.backgroundColor = '#E6F3FF'; 
		} else {
			cell.style.backgroundColor = '#D2EAFF'; 
		}
	}
}

/********************************
	<input> text 포커스시 변경
	onfocus="FC(this, 1);" 
	onblur="FC(this, 0);"
*********************************/
function FC(cell, ov){
	if(ov == 1){
		cell.style.backgroundColor = '#E8F8D6'; 	// 배경색
		cell.style.border = '1px #8DD93B solid';	// 선굵기, 선색, 선종류(dotted, dashed, solid, double, groove, 
													// 					ridge, inset, window-inset, outset)
		//cell.style.height = '12px';
	
	} else {
		cell.style.backgroundColor = ''; 
		cell.style.border = '1px solid #074F83';
		//cell.style.height = '14px';
	}
}

	
// 숫자체크   onblur="number_check(this);"
function number_check(str)
{
	var chk
	var chk2 = 0
		var id_length = str.value.length
	for(i = 0 ; i < id_length ; i++){
    	chk = str.value.charCodeAt(i)
    	if((chk == 46) || (chk >= 48 && chk <= 57)){}
    	else chk2++
    }
	if(chk2 != 0){alert('0~9 . 만 입력할 수 있습니다.');str.focus()}
}

// 두줄 마우스 오버 color 	onmouseover=setColor(this,'#FFCCFF') onmouseout=setColor(this,'')
function setColor(trName, color, id) { 

	rownum = trName.rowIndex;	
	oObj = eval(id+".rows");

	if(rownum%2==0) {

		oObj[rownum].style.backgroundColor=color;
		oObj[rownum+1].style.backgroundColor=color;
	} else {
		oObj[rownum-1].style.backgroundColor=color;
		oObj[rownum].style.backgroundColor=color;
    }
	
} 

// 두줄 마우스 오버 color 	onmouseover=setColor(this,'#FFCCFF') onmouseout=setColor(this,'')
function setColor2(trName, color) { 
	rownum = trName.rowIndex;	
	oObj = table_id2.rows;

	if(rownum%2==0) {

		oObj[rownum].style.backgroundColor=color;
		oObj[rownum+1].style.backgroundColor=color;
	} else {
		oObj[rownum-1].style.backgroundColor=color;
		oObj[rownum].style.backgroundColor=color;
    }
	
} 

// 보였다 안보였다 하기..
function toggleMenu(currMenu) {
	
    if (document.all) {
            thisMenu = eval("document.all." + currMenu + ".style");
            if (thisMenu.display == "block") {
                    thisMenu.display = "none";
            }
            else {
                    thisMenu.display = "block";
            }
            return false;
    }
    else {
            return true;
    }
}

// 정해진 숫자만큼 반올림.. 소수점자리..
// var a = 2.6666666;
// a = fncRoundPrecision(a, 2);
// a = 2.67
function fncRoundPrecision(val, precision){
	var p = Math.pow(10, precision);
	return Math.round(val * p) / p;
}

/********************************
		숫자에 콤파 세팅
		SetComma(1230000) ==> 1,230,000
	*********************************/
	function SetComma(numstr) {
		  var numstr = String(numstr);
		  var re0 = /(\d+)(\d{3})($|\..*)/;
		  if (re0.test(numstr))
		    return numstr.replace(
		      re0,
		      function(str,p1,p2,p3) { return SetComma(p1) + "," + p2 + p3; }
		    );
		  else
		    return numstr;
		}

// ㎡ 를 평으로 계산
// ex ; 85㎡= 85 x  0.3025 = 25.71평 
// var a = 85;
// a = fncRoundPrecision(fncMTtoPYUNG(a), 2);
// a =  25.71
function fncMTtoPYUNG(val){
	var p = Number(val) * 0.3025;
	return p;
}

/*************************
	주민번호 미성년자 체크 (만 19세)
***************************/
function RenoLimitCheck(re_no){
	// 들어온 주민번호
	var re_yy = "";
	var re_mm = "";
	var re_dd = "";
	var reg_sex = 0;
	var man_age = 0;
	re_yy = re_no.substring(0,2);
	re_mm = Number(re_no.substring(2,4));			
	re_dd = Number(re_no.substring(4,6));
	reg_sex = Number(re_no.substring(7,8));
	
	if(reg_sex == 1 || reg_sex ==2 )  
		re_yy = "19"+ re_yy;
	else
		re_yy = "20"+ re_yy;
	
	re_yy = Number(re_yy);
	
	// 현재 날짜
	now=new Date(); // 현재시간 가져오기
	year=now.getYear(); // 년도 가져오기
	month=now.getMonth()+1; // 월 가져오기 (+1)
	date=now.getDate(); // 날짜 가져오기
	
	// 만 나이계산
	if(date < re_dd)			re_mm = re_mm +1;
	if(month < re_mm)			re_yy = re_yy +1;
	man_age = year - re_yy;
	return man_age
}

/*************************
	입력문자 길이 체크 
	ex) onkeyup = "length_Check(this, 10)"
***************************/
function length_Check(obj, c_len){
	var o_len = obj.value.length;
	if(o_len > c_len){
		alert("입력범위를 초과하였습니다.\n\n"+c_len+"자 까지 입력이 가능합니다.");
		obj.value = obj.value.substring(0, c_len);
	}
}

		
/*************************
	전화번호 정합성 체크
	ex) onblur = "telCheck(this)"
***************************/
function telCheck(obj){
	var obj_val = obj.value;
	var obj_nm = obj.name;
	var obj_ln = obj_nm.length;
	var obj_ty = obj_nm.substring(obj_ln-1, obj_ln);
	
	if(obj_ty == '2'){
		if(obj_val.length > 0 && obj_val.length < 3){
			alert("자리수가 정확하지 않습니다. \n\n공백 또는 3~4자리를 입력하세요.");
			return obj.focus();
		}
	} else if(obj_ty == '3'){
		if(obj_val.length > 0 && obj_val.length < 4){
			alert("자리수가 정확하지 않습니다. \n\n공백 또는 4자리를 입력하세요.");
			return obj.focus();
		}
	}
}


/* - 삭제*/
function delMinus(checkStr) {

	var sumVal = "";
	
	for (i=0; i<checkStr.length; i++){
		numCheck = checkStr.substring(i,i+1);
	
		if (numCheck < '0' || numCheck > '9' ){ 
			numCheck = "";
		}
		
		sumVal += numCheck;
		
	}
	
	return sumVal;
}


//image rollOver script
function rollOver(obj){   

     var img = obj.src.split('off.gif');
     obj.src = img[0] + 'on.gif';
}

function rollOut(obj){
	var img = obj.src.split('on.gif');
    obj.src = img[0] + 'off.gif';
}
    

//===========  popup관련 스크립트  START  ============	
function openWindow(url,intWidth,intHeight) {
      return window.open(url, "_blank", "width="+intWidth+",height="+intHeight+",resizable=0,scrollbars=no") ;
}
 
/* 이름지정 팝업  */
function solPop(url, n, w, h, s) {
var winl = (screen.width - w) / 2;
var wint = (screen.height - h) / 2;
winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+','+s+','
win = window.open(url, n, winprops)
if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
}
/* <a href="javascript:solPop('../','solPop',400,400,1)">링크</a>  */	

/** 
모달 띄우기  
opener의 document객체를 넘기기 때문에    
var opener =window.dialogArguments; ==> 이렇게 opener에서 넘긴 파라미터를 받는다. 
opener.document.getElementsByTagName("input")으로 팝업에서 opener의 값을 받을수있다.
**/
function tipsWindow_open(_url, _feature, _width, _height){
var _var;
var url =_url;
    _feature =  'dialogWidth:' + _width + 'px;dialogHeight:'+ _height+'px;center:yes;status:no;help:no;scrollbars:no;'
    _var       = window.showModalDialog(_url ,window ,_feature);
    return _var;
}
/** 
모달 띄우기  
opener의 document객체를 넘기기 때문에    
var opener =window.dialogArguments; ==> 이렇게 opener에서 넘긴 파라미터를 받는다. 
opener.document.getElementsByTagName("input")으로 팝업에서 opener의 값을 받을수있다.
**/
function tipsWindow_openResize(_url, _feature, _width, _height){
var _var;
var url =_url;
    _feature =  'dialogWidth:' + _width + 'px;dialogHeight:'+ _height+'px;center:yes;status:no;help:no;resizable:yes;scrollbars:no;'
    _var       = window.showModalDialog(_url ,window ,_feature);
    return _var;
} 

//===========  popup관련 스크립트  END  ============	
//===========  형변환관련 스크립트  START  ============	
function NumberFormString(_str){
	var strObj = _str;
	var rtnVal = 0;		
	try{
			rtnVal =parseInt(strObj);
	}catch(e){
		  alert(e);
			rtnVal = 0;
	}
	return rtnVal;
}	
//===========  형변환관련 스크립트  END  ============	


//검색어 클리어
function clearKeyword(obj){	
	//alert(obj.value);
	obj.value= "";
	return obj.focus();	
}


//=========== 선택된 obj활성화  ============		
function chgMode(id){

	var obj_chk = eval("document.frm1."+id+"_chk");		
	var obj = eval("document.frm1."+id);	
	if(obj_chk.checked){	
		obj.disabled = false;
		obj.focus();
	}else{
		obj.disabled = true;
	}	
}

function chgMode2(id){
	var obj_chk = eval("document.frm1."+id+"_chk");		
	var obj = eval("document.frm1."+id);	
	var obj2 = eval("document.frm1."+id+"2");	
	if(obj_chk.checked){
		obj.disabled = false;
		obj.focus();
		obj2.disabled = false;
	}else{
		obj.disabled = true;
		obj2.disabled = true;
	}	
}

function chgMode3(id){

	var obj_chk = eval("document.frm1."+id+"_chk");		
	var obj = eval("document.frm1."+id);
	
	if(obj_chk.checked == true){
		obj[0].checked =true;
	}else{
	   for(var i =0,n=obj.length;i<n;i++){
			obj[i].checked = false;
	   }   
	}	
}	

/**  radiobutton의 name을 넘기면 선택된 값을 return   **/
function rtnRdVal(_rdObj){ 
var rObj = _rdObj;
var rVal = "";
//alert("rObj.length:"+rObj.length);
for(var i =0,n=rObj.length;i<n;i++){
	if(rObj[i].checked==true){rVal =rObj[i].value;}
}
return rVal;
}
/** 선택된 checkbox객체의  check여부를 체크되었으면 true 아니면 false 리턴 */
function rtnChkOnOff(_chkObj){
	//alert("rtnChkOnOff");
var ckObj = _chkObj;
var ckVal = false;
if(ckObj.checked==true){ckVal =true;}		

return ckVal;
}


                                               												  										  
/**************************************************************************/
/*                                                                        */
/*  U_mail_check() : e-mail 주소 체크 함수                                */
/*                                                                        */
/*  call page      : common                                               */
/*  parameters     : object                                               */
/*  return         :                                                      */
/*                                                                        */
/**************************************************************************/
                                            											  
function U_mail_check(object){                                          
                                            
var email = object.value;                     
                                            
if(email == ""){                              
 alert("e-mail 이 입력되지 않았습니다.");     
 return false;                              
}                                             
                                            	
var digit = '@._-1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                                              
for(i=0; i < email.length; i++){                
  if(digit.indexOf(email.substring(i,i+1)) < 0) 	{
     alert('email 주소에 사용할 수 없는 문자가 사용되었습니다.');
     object.value = "";
     return false;                           
  }                                          
}                                              
                                             
if(email.indexOf('@')==-1 || email.indexOf('.')==-1){ 
 alert('email 주소 양식이 잘못되었습니다.');
 object.value = "";                         
 return false;                              
}                                             
} 
//process bar 설정 
function switchScreenOn() {
document.getElementById("divLoading").style.visibility = "visible";
document.getElementById("divBody").style.visibility = "";
	document.body.style.cursor = "wait";
}
function switchScreenOff() {
document.getElementById("divLoading").style.visibility = "hidden";
document.getElementById("divBody").style.visibility = "";
	document.body.style.cursor = "default";
}     

function nothing() {
	return;
}


function RC2(cell, ov){
	
	//alert("tt");
	if(cell.style.backgroundColor == '#f4f88e'){
		if(ov == 2)	cell.style.backgroundColor = ''; 
	} else {
		if(ov == 1){	
			cell.style.backgroundColor = '#e3edf2'; 
		} else if(ov == 2){				
			cell.style.backgroundColor = '#f4f88e';			
		} else {
			cell.style.backgroundColor = ''; 
		}
	}
}



 /**
 * 상품목록
 */
function statServiceList(val){
	
	if(val == 'all'){
	
		document.frm_list.acct_div3.style.width="180px";
		document.frm_list.acct_div3.style.height="60px";		
		document.frm_list.acct_div3.disabled=true;
				
	}else{
	
		var url ="/analysis/statServiceList.do?val="+val;
			
		document.frm_list.acct_div3.disabled=false;		
		fillSelectAJAX(url, document.frm_list.acct_div3);
	}	
		
}	

 /**
 * 상품목록 타겟 ID 로 세팅
 */
function statServiceList_ID(val){
	
	if(val == 'all'){
	
		document.frm_list.acct_div3_id.style.width="180px";
		document.frm_list.acct_div3_id.style.height="20px";		
		document.frm_list.acct_div3_id.disabled=true;
				
	}else{
	
		var url ="/statistics/statServiceList.do?val="+val;
			
		document.frm_list.acct_div3_id.disabled=false;		
		fillSelectAJAX(url, document.frm_list.acct_div3_id);
	}	
		
}

/**
 * 상품목록(TB_FS_LMGOODS 에서 조회)
 */
function statGoodsSvcList(val){
	
	if(val == 'all'){
	
		document.frm_list.acct_div3.style.width="180px";
		document.frm_list.acct_div3.style.height="20px";		
		document.frm_list.acct_div3.disabled=true;
				
	}else{
	
		var url ="/statistics/statGoodsSvcList.do?val="+val;
			
		document.frm_list.acct_div3.disabled=false;		
		fillSelectAJAX(url, document.frm_list.acct_div3);
	}	
		
}

function delBar(val) {
	
	var c;
	var reval = "" ;
	if (val == null || val.length == 0) {
		return val;
	}
	
	for (c=0; c < val.length; c++) {
	    ch = val.charAt(c);
	  
	   	if (ch != '-' ) {
			reval += ch;
	    }
	}
	
	return reval;
}
	
////////////////////////

//다음 필드로 이동
function NextField(fr, tt, sz){
	var p_size = eval("frm01."+fr).value.length
	if(p_size == sz){
		return eval("frm01."+tt).focus();
	} else {
		return false;
	}
}
	
//다음 필드로 이동
function NextField2(fr, tt, sz){
	var p_size = eval("frm."+fr).value.length
	if(p_size == sz){
		return eval("frm."+tt).focus();
	} else {
		return false;
	}
}

//동의 한번에 하기
function setAgree(frm){
	//var frm= document.frm01;
	
	if( frm.agree.checked){
		try{
			frm.agree1.checked=true;
		} catch(Exception){}
		frm.agree2.checked=true;
		frm.agree3.checked=true;

	}else{
		try{
			frm.agree1.checked=false;
		} catch(Exception){}
		frm.agree2.checked=false;
		frm.agree3.checked=false;
	}
}
	