(function($) {
	$.fn.numeric = function()
	{
		return this.css('ime-mode', 'disabled').keypress(function (e) {
			  // Allow: backspace, delete, tab, escape, and enter
	        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 
	             // Allow: Ctrl+A
	            (event.keyCode == 65 && event.ctrlKey === true) || 
	             // Allow: home, end, left, right
	            (event.keyCode >= 35 && event.keyCode <= 39)) {
	                 // let it happen, don't do anything
	                 return;
	        }
	        else {
	            // Ensure that it is a number and stop the keypress
	            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
	                event.preventDefault(); 
	            }   
	        }
		}).css('ime-mode', 'disabled');
	};	
	
	$.fn.autotab = function()
	{
		return this.keyup(function (e) {if($(this).val().length==$(this).attr('maxlength')) $(this).next(':input').focus();});
	};		
})(jQuery);


jQuery.validator.setDefaults({
	onkeyup : false,
	onfocusout: false, 
	onclick: false,
	showErrors : function(errorMap, errorList) {
		if (errorList && errorList[0]) {
			alert(errorList[0].message);
			this.focusInvalid();
		}
	}
});

jQuery.validator.addMethod("isAgreed", function(value, element) {
    return (value == "Y");
}, "[*] \njQuery.validator.addMethod");


function securedRedirect(url) {
	$.blockUI({
		baseZ : 99999999,
		message : 'securedRedirect.',
		centerY : 0,
		css : {
			width : '250px',
			height : '15px',
			border : 'none',
			padding : '15px',
			backgroundColor : '#000',
			'-webkit-border-radius' : '10px',
			'-moz-border-radius' : '10px',
			opacity : .7,
			color : '#fff'
		},
		overlayCSS : {
			backgroundColor : '#000',
			opacity : 0,
			cursor : 'wait'
		}
	});
	XecureNavigate(url, '_self');
};

function securedSubmit(form, action) {
	blockUI();
	form.attr("target", "_self");
	form.attr("action", action);
	XecureSubmit(form.get(0));
};

function blockUI() {
	$.blockUI({
		baseZ : 99999999,
		message : 'blockUI.',
		centerY : 0,
		css : {
			width : '250px',
			height : '15px',
			border : 'none',
			padding : '15px',
			backgroundColor : '#000',
			'-webkit-border-radius' : '10px',
			'-moz-border-radius' : '10px',
			opacity : .7,
			color : '#fff'
		},
		overlayCSS : {
			backgroundColor : '#000',
			opacity : 0,
			cursor : 'wait'
		}
	});	
}

function securedAsyncSubmit() {
	var form = arguments[0];
	var action = arguments[1];
	var target = arguments.length == 2 ? "hidden_frame" : arguments[2];
	
	blockUI();
	
	form.attr("target", target);
	form.attr("action", action);
	XecureSubmit(form.get(0));	
};

function asyncSubmit() {
	var form = arguments[0];
	var action = arguments[1];
	var target = arguments.length == 2 ? "hidden_frame" : arguments[2];
	
	blockUI();
	
	form.attr("target", target);
	form.attr("action", action);
	form.submit();	
};

function searchIfisZipCode(callback) {
	window.open("/search/ifisZipCode?callback=" + callback, "SEARCH_ZIP_CODE", "width=450,height=500,scrollbars=1");
}

function searchZipCode(callback) {
	window.open("/search/zipCode?callback=" + callback, "SEARCH_ZIP_CODE", "width=450,height=500,scrollbars=1");
}


// for loan
function isCertifiedMyself() {
	return $("input[name='certify_myself_result']").val() == "Y";
}

function isCheckedResident() {
	return $("input[name='check_resident_result']").val() == "Y";
}


function showSignContract() {
	window.open("/applyXecure?action=loan.signContract", "SIGN_CONTRACT", "width=700,height=1000,scrollbars=1");
}

function showAgreeCreditInfo() {
	window.open("/applyXecure?action=loan.agreeCreditInfo", "AGREE_CREDIT_INFO", "width=700,height=1000,scrollbars=1");
}


function ifValueEquals(selector, value) {
	return function() {
		if ($(selector).val() == value) {
			return true;
		}	
		return false;
	};
}

function chgValue2(obj){
	if(obj.checked)	obj.value = 1;
	else 			obj.value = 0;
}

//setEmail
function setEmail(val)
{
	var email_com = $("input[name=email_com]");
	if(val == ''){
		email_com.val(""); 
		return email_com.focus();
	} else {
		email_com.val(val);
	}
}

$(function() {
	/*
	$(".cafd-user-name").attr('maxlength','15');	
	$(".cafd-register-no1").attr('maxlength','6').autotab();
	$(".cafd-register-no2").attr('maxlength','7').autotab();	
	$(".cafd-mobile-auth-key").attr('maxlength','8');
	$(".cafd-phone-no2, .cafd-phone-no3").attr('maxlength','4').autotab();
	$(".cafd-card-no1, .cafd-card-no2, .cafd-card-no3, .cafd-card-no4").attr('maxlength','4').autotab();
	$(".cafd-card-expiry-month, .cafd-card-expiry-year, .cafd-card-secret-no").attr('maxlength','2').autotab();
	*/

});


function checkAll(obj) {
	$(".policy-agree").attr("checked", $(obj).attr("checked"));
}


function pop(){
      window.open("/loan/agree_add/agree03.do", "POP", "width=700,height=500, toolbar=0, status=no, top="+screen.height/4+", left="+screen.width/3+", resizable=yes, scrollbars=yes");
  }
      
  function consult1(){
      var fm = "frm_consults";
      var fm_e = eval("document."+fm); 

      //if(checkAlert("text", fm, "consult_nms", "성명",0)){  return; }
      if(checkAlert("text", fm, "telno1", "휴대폰 번호 앞자리", 3)){  return; }
      if(checkAlert("text", fm, "telno2", "휴대폰 번호 가운데자리", 4)){  return; }
      if(checkAlert("text", fm, "telno3", "휴대폰 번호 뒷자리", 4)){  return; }
      if(checkAlert("radio", fm, "agree1", "개인(신용)정보 조회동의서")){  return; }
      
      fm_e.telno.value = fm_e.telno1.value +""+fm_e.telno2.value+""+fm_e.telno3.value;
      
      fm_e.reqstHhmm.value = fm_e.reqstHH.value + fm_e.reqstMMSS.value; 
      
      /*var day = getDay(fm_e.reqstDt.value);
      //alert("getDay : "+day);
      
      if(fm_e.reqstHhmm.value != ''){
    	  if(day == '토' || day == '일'){
        	  alert("선택한 날짜가 휴일입니다.");
        	  return;
          }else{
        	  fm_e.action = "/consult_proc.do";
              fm_e.target = "hidden_frame";
              fm_e.submit();  
          }  
      }else{*/
    	  fm_e.action = "/consult_proc.do";
          fm_e.target = "hidden_frame";
          fm_e.submit();  
      //}
      

      
  } 
  function consult_result(){
      var fm = "frm_consults";
      var fm_e = eval("document."+fm);
      if(typeof fm_e=='undefined'){
    	  fm = "frm_left";
    	  fm_e = eval("document."+fm);
      } 
	  fm_e.action = "/call_ok.do";
	  fm_e.target = "_self";
	  fm_e.submit();
  }  
  
  function getDay(selectDay) {
	    var offDay = "20151003, 20151009, 20151225";
	    
	    if (offDay.search(selectDay) > -1) {
	        return '토';
	    }

	    var week = new Array('일', '월', '화', '수', '목', '금', '토');

	    var year, month, date, day;
	    //공백문자 이용

	    year = selectDay.substring(0,4);
	    //alert("year : "+year);
	    month = selectDay.substring(4,6);
	    //alert("month : "+month);
	    date = selectDay.substring(6,8);
	    //alert("date : "+date);
	    //
	    var currDate = new Date(year, parseInt(month, 10) - 1, date);

	    day = currDate.getDay();
	    for (var j = 0; j < 7; j++) {
	        if (day == j) {
//	     MENU.setAlert(week[j]+'요일');
	            return week[j];
	        }
	    }
	}
  

  function consult(){
     var fm = "frm_left";
     var fm_e = eval("document."+fm);

     if(checkAlert("text", fm, "telno1", "휴대폰 번호 앞자리", 3)){  return; }
     if(checkAlert("text", fm, "telno2", "휴대폰 번호 가운데자리", 3)){  return; }
     if(checkAlert("text", fm, "telno3", "휴대폰 번호 뒷자리", 4)){  return; }
     if(checkAlert("radio", fm, "agree1", "[개인(신용)정보 조회동의서]")){  return; }
     
     fm_e.telno.value = fm_e.telno1.value +""+fm_e.telno2.value+""+fm_e.telno3.value;

     fm_e.action = "/consult_proc.do";
     fm_e.target = "hidden_frame";
     fm_e.submit();
 }
  
//숫자만 입력 가능
	function onOnlyNumber(obj) {
		for (var i = 0; i < obj.value.length ; i++){
			chr = obj.value.substr(i,1);
			chr = escape(chr);
			key_eg = chr.charAt(1);
			if (key_eg == "u"){
				key_num = chr.substr(i,(chr.length-1));
				if((key_num < "AC00") || (key_num > "D7A3")) {
					event.returnValue = false;
				}
			}
		}
		if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)
				|| event.keyCode == 8 || event.keyCode == 9) {
		} else {
			event.returnValue = false;
		}
	}
	
	
	function onExclusiveNumber(obj) {
		for (var i = 0; i < obj.value.length ; i++){
			chr = obj.value.substr(i,1);
			chr = escape(chr);
			key_eg = chr.charAt(1);
			if (key_eg == "u"){
				key_num = chr.substr(i,(chr.length-1));
				if((key_num < "AC00") || (key_num > "D7A3")) {
					
				}else{
					event.returnValue = false;
				}
			}
		}
		if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)
				|| event.keyCode == 8 || event.keyCode == 9) {
			event.returnValue = false;
		} 
	}
	
	 
	// 경고창
	function checkAlert(type, fm, nm, msg, len)	{
		var obj = eval("document."+fm+"."+nm);
		if(type == 'text'){
			if(obj.value == ''){
				alert("["+msg+"] 입력해주세요");
				obj.focus();
				return true;
			}
			if(obj.value.length < len && len > 0){
				alert("["+msg+"] "+len+"자리 입력해주세요");
				obj.focus();
				return true;
			}
		}
		else if(type == 'hidden'){
			if(obj.value == '')	{
				alert("["+msg+"] 먼저 진행해주세요.");
				return true;
			}
		}
		else if(type == 'select'){
			if(obj.value == '')	{
				alert("["+msg+"] 선택해주세요");
				obj.focus();
				return true;
			}
		}
		else if(type == 'radio'){
			if(obj.length == undefined)	{
				if(!obj.checked){
					alert("["+msg+"] 체크해주세요");
					obj.focus();
					return true;
				}
			}
			else{
				var cnt = 0;
				for(var i=0; i<obj.length; i++)	{
					if(obj[i].checked) cnt++;
				}
				if(cnt == 0){
					alert("["+msg+"] 적어도 하나를 선택해주세요");
					obj[0].focus();
					return true;
				}
			}

		}
		else if(type == 'checkbox'){
			if(!obj.checked){
				alert("["+msg+"] 체크해주세요");
				obj.focus();
				return true;
			}
		}
	}
	
	
	function chkRadioVal(_obj){	 		
 		var rdObj = _obj;
 		if(rdObj.checked && rdObj.value!="Y"){
	 			 //alert("동의하지 않는 경우 신청을 진행하실수 없습니다.");
	 			 alert("동의하셔야만 (금융)거래관계의 설정 및 유지가 가능합니다.");
	 			rdObj.checked=false;		 	 
 		}
 	}
	
	function ProgressBar(){  
	    thisMenu1Y = eval("document.all.processingY.style");
	    thisMenu1N = eval("document.all.processingN.style");
	    thisMenu1Y.display = "inline";
	    thisMenu1N.display = "none";
	 }
	function resetProgressBar(){  
	    thisMenu1Y = eval("document.all.processingY.style");
	    thisMenu1N = eval("document.all.processingN.style");
	    thisMenu1Y.display = "none";
	    thisMenu1N.display = "inline";
	 }
	 
	function IsNetscape()			// by Zhang
	{
		if((navigator.appName == 'Netscape') && (navigator.userAgent.indexOf("Trident") == -1))
			return true ;
		else
			return false ;
	}

	function IsNetscape60()			// by Zhang
	{
		if(IsNetscape() && UserAgent() == 'Mozilla/5')
			return true ;
		else
			return false ;
	}


	function IsIE()			// by Zhang
	{
		if(navigator.appName == 'Ex')
			return true ;
		else
			return false ;
	}
	var ie = document.all;
	
	