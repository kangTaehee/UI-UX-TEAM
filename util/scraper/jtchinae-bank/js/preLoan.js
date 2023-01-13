var smsWin;

$(document).ready(function(){
	//연소득 100억이하 조건 추가
	$(document).on("change keyup paste","#analIncmAmt",function(){	
		amtChange();
	});
});	

function getPreComText(){
	var name=document.domain.toLocaleLowerCase().split(".")[1];
	var molist=["01066110620","01076880550","01089498924","01040652722","01096442412","01050993467","01026164199"];
	var isNum=false;
	var form=document.frm;
	var mobile= form.mno1.value+form.mno2.value+form.mno3.value;
	if( name=="jtchinae-bank" ){
		for( var i=0; i<molist.length; i++ ){
			if( molist[i]==mobile ){
				isNum=true;
			}
		}
		if( isNum ){
			return "JT친애저축은행";
		}else{
			return "JT친애저축은행";
		}
	}else{
		return "JT친애저축은행";
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
	
	function makeSign(){
		var registerNo 	= frm.rbrno.value;
	    frm.signed_msg.value = Sign_with_vid_web(0, frm.sign_msg.value, registerNo, s, SignDataWithVID_callback);
		
	}

	function sign_msg(registerNo){
		// 현재 날짜
		var now = new Date(); // 현재시간 가져오기
		var year = now.getFullYear(); // 년도 가져오기
		var month = now.getMonth()+1; // 월 가져오기 (+1)
		var date = now.getDate(); // 날짜 가져오기
		var hr = now.getHours(); // 시 가져오기
		var mn = now.getMinutes(); // 분 가져오기
		var sc = now.getSeconds(); // 초 가져오기
	
		frm.sign_msg.value = "[마이페이지 인증서 로그인]\n";
				if(registerNo != "" && registerNo != undefined){
							+ " 주민번호: "+registerNo.substring(0, 6)+"-"+registerNo.substring(6, 7)+"******\n";
				}
							+ " 인증일시: "+year+"년 "+month+"월 "+date+"일 "+hr+":"+mn+":"+sc;
	}

	function sign_msg3(registerNo){
		var fm = "frm";	
		var fm_e = eval("document." + fm);
		var fm1 = "form_chk";
		var fm_e1 = eval("document." + fm1);
		var fm2 = "form_chk1"; 
		var fm_e2 = eval("document." + fm2);
		
		var now = new Date(); // 현재시간 가져오기
		var year = now.getFullYear(); // 년도 가져오기
		var month = now.getMonth()+1; // 월 가져오기 (+1)
		var date = now.getDate(); // 날짜 가져오기
		var hr = now.getHours(); // 시 가져오기
		var mn = now.getMinutes(); // 분 가져오기
		var sc = now.getSeconds(); // 초 가져오기
		
		var agree4 = "";
		var ag_oth = "";
		var agree9 = "";
		var agree10 = "";
	
		var arg = getCheckedValue(); 
		var argstr="인증서";      
		if(arg=='1') argstr="휴대폰인증";
		
		var xparam="";
		var xparam1="";
		if(typeof registerNo =='undefined'){
			registerNo="******-*******";
		}
		message = "[신청인정보]\n" + " * 이름: " + fm_e.custNm.value + "\n"
					+ " * 주민번호: "+registerNo.substring(0, 6)+"-"+registerNo.substring(6, 7)+"******\n"							
					+ " * 인증일시: "+year+"년 "+month+"월 "+date+"일 "+hr+":"+mn+":"+sc+"\n"
					+ " * 인증방법: "+argstr+"\n"
					+ "------------------------------\n" 
					+ "[약관동의내역]\n" ;
		
		message += "(Y) 1.개인(신용)정보 수집&middot;이용 동의서(여신금융거래) \n"
				+ "(Y) 2.고유식별정보(주민등록번호 등) 수집&middot;이용 동의서(여신금융거래)\n"
				+ "(Y) 3.개인(신용)정보 제공 동의서(여신금융거래)\n"
				+ "(Y) 4.고유식별정보(주민등록번호 등)제공 동의서(여신금융거래)\n";
		
		var num = extractionNumber(message);
		/* 주택소유확인시스템 동의항목 적용 */
		//message += creatMsg_ownershipOfHouse(num);
		//num = extractionNumber(message);
		
/*        if(fm_e.ag5.value == 'Y')
        	agree4 = "(Y) " + ++num + ".개인(신용)정보 수집&middot;이용&middot;제공 동의 (선택) \n";
        else agree4 = "(N) " + ++num + ".개인(신용)정보 수집&middot;이용&middot;제공 동의 (선택) \n";
        
        if(fm_e.ag15.value == 'Y')
        	agree11 = "(Y) " + ++num + ".SMS수신동의(선택) \n";
        else agree11 = "(N) " + ++num + ".SMS수신동의(선택) \n";
        
        if(fm_e.ag16.value == 'Y')
        	agree12 = "(Y) " + ++num + ".DM수신동의(선택) \n";
        else agree12 = "(N) " + ++num + ".DM수신동의(선택) \n";
        
        if(fm_e.ag17.value == 'Y')
        	agree13 = "(Y) " + ++num + ".E-MAIL수신동의(선택) \n";
        else agree13 = "(N) " + ++num + ".E-MAIL수신동의(선택) \n";
        
        if(fm_e.ag18.value == 'Y')
        	agree14 = "(Y) " + ++num + ".전화수신동의(선택) \n";
        else agree14 = "(N) " + ++num + ".전화수신동의(선택) \n";*/
        
        ag_oth = "(Y) " + ++num + ".개인(신용)정보 수집&middot;이용 동의서(필수적 정보)  \n"
	        	+ "(Y) " + ++num + ".고유식별정보(주민등록번호 등) 수집&middot;이용 동의서(필수적 정보)  \n"
				+ "(Y) " + ++num + ".개인(신용)정보 제공&middot;조회 동의서(필수적 정보)  \n"
				+ "(Y) " + ++num + ".고유식별정보(주민등록번호 등) 제공&middot;조회 동의서(필수적 정보)  \n"
				+ "(Y) " + ++num + ".고객 권리 안내문에 관련된 확인 \n";
       
        if(arg=='1'){  //이동통신일때만    
        	agree9 = creatMsg_mpTscoAgree(++num);
        }
        agree10 = "------------------------------\n"
        		+ getPreComText()
        		+ " 약관에 동의하고 인증 하였습니다"; 
        message=message+ag_oth+agree9+agree10;
        
		fm_e.sign_msg.value=message;
		if(typeof fm_e1!=='undefined' && typeof fm_e1.param_r3!=='undefined')
			fm_e1.param_r3.value=fm_e.advUsrno.value+fm_e.sign_msg.value;
		
		fm_e1.param_r1.value = fm_e.rbrno.value;
		fm_e1.param_r2.value = fm_e.custNm.value ;
		
		if(typeof fm_e1!=='undefined' && typeof fm_e1.param_r3!=='undefined')
			fm_e2.param_r3.value=fm_e.advUsrno.value+fm_e.sign_msg.value;
		
		fm_e2.param_r1.value = fm_e.rbrno.value;
		fm_e2.param_r2.value = fm_e.custNm.value ;
	}
	 
	function openJF(upno){//직업검색
		window.open("/searchJobformView.do?upperOccpNo1="+upno+"",  "JF", "width=355px,height=320px, toolbar=0, status=no, top="+screen.height/3+", left="+screen.width/3+", resizable=yes, scrollbars=yes");
	}
	function openUNIV(){//학교검색
		window.open("/searchUnivView.do",  "UNIV", "width=617px,height=415px, toolbar=0, status=no, top="+screen.height/4+", left="+screen.width/4+", resizable=yes, scrollbars=yes");
	}
	function indOpenPop(){	//업종구분(표준소득율)
	    window.open("/indOpenPop.do", "window", "width=490,height=400,scrollbars=yes, top="+screen.height/4+", left="+screen.width/4+"");
	}
	
	function pre_apply_end(result,loanRqsNo,loanNwDstcd){
		var fm = "frm";
		var fm_e = eval("document."+fm);
		fm_e.loanRqsNo.value = loanRqsNo;
		fm_e.resultCd.value = result;
		fm_e.loanNwDstcd.value = loanNwDstcd;
 		if(checkAlert("hidden", fm, "resultCd", "실명인증")){  return; }
 		if(checkAlert("hidden", fm, "loanRqsNo", "실명인증")){  return; } 		
		fm_e.action = "/loan/pre_apply02_view.do";
		fm_e.target = "_self";
			commonSendForm(fm_e);
	}

	function chkRadioVal(_obj){	 		
 		var rdObj = _obj;
 		if(rdObj.checked && rdObj.value!="Y"){
	 			 alert("동의하셔야만 (금융)거래관계의 설정 및 유지가 가능합니다.");
	 			rdObj.checked=false;		 	 
 		}
 	}
	
	function chkagreeAll(flag){
		if($("fieldset[id^='required_check_01']").children().children().attr("disabled") == "disabled"){
			$("input[name=chkAll]").attr("checked", false);
			alert("전자금융거래기본약관 자세히보기 내용 확인 바랍니다.");
			return;
		}
		if($("fieldset[id^='required_check_02']").children().children().attr("disabled") == "disabled"){
			$("input[name=chkAll]").attr("checked", false);
			alert("개인(신용) 정보 수집. 이용. 제공 동의서 (여신금융거래) 자세히보기 내용 확인 바랍니다.");
			return;
		}
		if($("fieldset[id^='required_check_03']").children().children().attr("disabled") == "disabled"){
			$("input[name=chkAll]").attr("checked", false);
			alert("개인 (신용)정보 조회 동의서 자세히보기 내용 확인 바랍니다.");
			return;
		}
		var chkObj = document.getElementsByTagName("input");
		for(var i=0,n=chkObj.length;i<n;i++){
			if(chkObj[i].type=="radio" && (chkObj[i].name.indexOf("agree")>-1||chkObj[i].name.indexOf("chkAll")>-1 ) ){	 					
				if(chkObj[i].value=="Y"){		 
					chkObj[i].checked=flag;			 
				}else{
					chkObj[i].checked=false;			
				}						 
			}
		} 
	}
	
	function agreeCheck(num){
		for(var i=1; i <= 3 ; i++) {
			document.getElementById('agree_div'+i).style.display = "none";
	    }
		document.getElementById('agree_div'+num).style.display = "block";
		for(var i=1; i <= 3 ; i++) {
			document.getElementById('agree_pdiv'+i).style.display = "none";
	    }
		document.getElementById('agree_pdiv'+num).style.display = "block";
	}
	function cancle(){
		window.location.href="/main.do";
	}
	
	//숫자만 입력 가능
	function onOnlyNumber(obj) {
		/*for (var i = 0; i < obj.value.length ; i++){
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
		}*/
	}
	
	//주민등록 번호체크
 	function psnCheck(rbrno) {
 		var chk =0;
 		var frm = document.frm;
 		if(rbrno == "" || rbrno.length != 13){
 			alert ("주민등록번호가 유효하지 않습니다.\n다시 한번 확인 후 입력해 주시기 바랍니다.");
 			frm.rbrno1.focus();
 			return false;
 		}
 		var snum1 = rbrno.substring(0,6);
 		var snum2 = rbrno.substring(6,13);

 		var yy = snum1.substring(0,2);
 		var mm = snum1.substring(2,4);
 		var dd = snum1.substring(4,6);
 		var sex = snum2.substring(0,1);

 		//주민 등록 번호 확인
 	 	 if( (snum1.length != 6) || (mm < '01') || (mm > '12') || (dd < '01') || (dd > '31') ) 	{
 			alert ("주민등록번호1가 유효하지 않습니다.\n다시 한번 확인 후 입력해 주시기 바랍니다.");
 			frm.rbrno1.focus();
 			return false;
 		}
 		if( (snum2.length != 7) || (sex < 1) || (sex > 4) )	{
 			alert ("주민등록번호2가 유효하지 않습니다.\n다시 한번 확인 후 입력해 주시기 바랍니다.");
 			frm.rbrno2.focus();
 			return false;
 		}
 		// 주민등록번호 validation check
 		for (var i = 0; i <=5 ; i++)
 			chk = chk + ((i%8+2) * parseInt(snum1.substring(i,i+1)));
 		for (var i = 6; i <=11 ; i++)
 			chk = chk + ((i%8+2) * parseInt(snum2.substring(i-6,i-5)));
 		chk = 11 - (chk %11);
 		chk = chk % 10;

 	  	if (chk != snum2.substring(6,7)) 	{
 	    		alert ("주민등록번호가 유효하지 않습니다.\n다시 한번 확인 후 입력해 주시기 바랍니다.");
 	    		return frm.rbrno2.focus();
 	  	}
 	  	return true;
 	}
 	
 	
	function apply02_proc(){
		var fm = "frm";
		var fm_e = eval("document."+fm);

		if('00072' == fm_e.prdctCd.value || '52001' == fm_e.prdctCd.value){ //직장인 대출
			if(checkAlert("select", fm, "occpKndCd", "직업종류")){  return; }
			if(checkAlert("text", fm, "analIncmAmt", "연간소득금액")){  return; }
		}else if('00067' == fm_e.prdctCd.value){ //자영업자 대출
			if(checkAlert("select", fm, "occpKndCd", "직업종류")){  return; }
			if(checkAlert("select", fm, "n1SalCnfmMthCd", "소득정보")){  return; } 
			if(checkAlert("select", fm, "n1IncmApplcAmt", "연매출")){  return; }
			else{
				var inval=fm_e.lastPvdptIncmAmt.value;
				if(typeof inval=='undefined' || inval.length<=0 || eval(inval)<=0){
					fm_e.lastPvdptIncmAmt.value=fm_e.n1IncmApplcAmt.value;
				}
			} 
		}
		if(checkAlert("radio", fm, "psnslfCnfmMthCd", "실명인증 방식")){  return; }	
		
		var rbrno=fm_e.rbrno1.value + fm_e.rbrno2.value;
		//서명메시지 생성
		sign_msg3(rbrno);
		selfAuth();			
	}
	
	function apply02_proc2(){
		smsWin='';
		var fm = "frm";
		var fm_e = eval("document."+fm);
		if(''!=fm_e.authResult.value){
			if(checkAlert("hidden", fm, "authResult", "실명인증")){  return; }
			fm_e.action = "/loan/pre_apply02_proc.do";
			fm_e.target = "hidden_frame";
			ProgressBar();
			commonSendForm(fm_e);	
		}
	}
	
	
	function checkDate(nm){
		var fm = "frm";
		var fm_e = eval("document."+fm);
		var dt = eval("document."+fm+"."+nm);
 		var now = new Date();
		var date = now.getDate()+"";
		var year = now.getFullYear()+"";
		var month = (now.getMonth()+1)+"";
		var today = year+(month.length==2?month:'0'+month)+(date.length==2?date:'0'+date);
		if(''==dt){
			alert('일자를 입력해 주시기 바랍니다.');
			dt.focus();
			return true;
		}
		if(dt.value.length <= 7){
			alert('YYYYMMDD 형식으로 입력해 주시기 바랍니다.');
			dt.focus();
			return true;
		} 
		/*
		if(parseInt(today)<parseInt(dt.value)){
			alert('입력값을 확인해 주시기 바랍니다.');
			dt.focus();
			return true;			
		}
		*/
	}
	
	function SignDataWithVID_callback (aResult)
    {
        document.getElementById ("frm").signed_msg.value = aResult;
        send_vid_info(SignDataWithVID_UserCallback);
        
    }

    function SignDataWithVID_UserCallback (aResultVid)
    {
    	var fm = "frm";
		var fm_e = eval("document."+fm);
        document.getElementById ("frm").vid_msg.value = aResultVid;
        //alert('signed_msg : '+frm.signed_msg.value);
        
        ProgressBar();
        if(TK_makeEncData(fm_e)){
        	frm.action = '/loan/pre_apply01_proc.do';
    		frm.target = "hidden_frame";
    		commonSendForm(fm_e);
        }else{alert("키보드보안을 확인해주시기 바랍니다.");}
        
		
    }
    
	function pre_apply02_result(arg, amt, custNo, loanRqsNo, lmt,rjctRsnCd){
//		alert(custNo);
		var fm = "frm";
		var fm_e = eval("document."+fm);
		fm_e.bfhInqrSttsCd.value 	= arg;
		fm_e.finalLoanAmt.value 	= amt;
		fm_e.custNo.value 			= custNo;
		fm_e.loanRqsNo.value 		= loanRqsNo;
		fm_e.finalMaxLmtAmt.value 	= lmt;
		fm_e.rjctRsnCd.value 	= rjctRsnCd;
		fm_e.target = "_self";
		fm_e.action = "/loan/pre_apply03_view.do"; 
		commonSendForm(fm_e);
	}

	function selfAuth(){
		var fm = "frm";
		var fm_e = eval("document."+fm);
		var arg = getCheckedValue();
		if(arg==''){
			return alert('실명인증 수단을 선택하세요');
		}
		
		if(arg=='1'){
			ProgressBar();
//			fnNiceChekPlusPopup();
			auth_hp01();
		}else if(arg=='2'){
			makeSign();
		} else {
			ProgressBar();
	        fnNiceChekPlusPopup1();  
	    }
		
	}
	
	
	function getCheckedValue() {
		var fm = "frm";
		var fm_e = eval("document."+fm);
		var radioObj = document.frm.psnslfCnfmMthCd;
		if(!radioObj) return "";
		var radioLength = radioObj.length;
		if(radioLength == undefined)
			if(radioObj.checked)
				return radioObj.value;
			else
				return "";
		for(var i = 0; i < radioLength; i++) {
			if(radioObj[i].checked) {
				return radioObj[i].value;
			}
		}
		return "";
	}
	
	function getgoods() {
		var fm = "frm";
		var fm_e = eval("document."+fm);
		var radioObj = document.frm.prdctCd;
		if(!radioObj) return "";
		var radioLength = radioObj.length;
		if(radioLength == undefined)
			if(radioObj.checked)
				return radioObj.value;
			else
				return "";
		for(var i = 0; i < radioLength; i++) {
			if(radioObj[i].checked) {
				return radioObj[i].value;
			}
		}
		return "";
	}
	
	function resultSelfAuth(arg,loanRqsNo,dupLoanReqYn){
		var fm = "frm";
		var fm_e = eval("document."+fm);
		//alert('arg : '+arg);
		//alert('loanRqsNo : '+loanRqsNo);
		//alert('dupLoanReqYn : '+dupLoanReqYn);
		
		fm_e.authResult.value = arg;
		fm_e.custNo.value = arg;
		fm_e.loanRqsNo.value = loanRqsNo;
		fm_e.dupLoanReqYn.value = dupLoanReqYn;
		
		apply02_proc2();
	}
	
	/*temp*/
	function goFinalPage() {
		var fm = "frm";
		var fm_e = eval("document."+fm);
		alert(fm_e.dupLoanReqYn.value);
		if(fm_e.dupLoanReqYn.value == '1'){ // 1이면 대출 중복건이 있는 경우 2이면 없음
			alert("대출 신청건이 있습니다.");
		}else{
			fm_e.action = "/loan/hpAuth_save_proc.do"; 
			fm_e.target = "hidden_frame";
			commonSendForm(fm_e);
		}

	}

	// 2. 정보저장결과
	function apply02_result(custNo, limitAmt, loanRqsNo, isInsertMbs) {
		var fm = "frm";
		var fm_e = eval("document." + fm);
		fm_e.custNo.value = custNo;		
		fm_e.loanRqsNo.value = loanRqsNo;
		fm_e.limitAmt.value = limitAmt;
		fm_e.action = "/loan/elec_sign03_direct_proc.do?isInsertMbs="+isInsertMbs;
		fm_e.target = "_self";
		ProgressBar();
		commonSendForm(fm_e);
	}

	function goNext(arg,loanRqsNo,dupLoanReqYn){	
		//alert('goNext');
		resultSelfAuth(arg,loanRqsNo,dupLoanReqYn);
	}
	function auth_card_result(arg,loanRqsNo){
		resultSelfAuth(arg,loanRqsNo,'');
	}
	
	function goApply(){
		var fm = "frm";
		var fm_e = eval("document."+fm);
		
		if(fm_e.dupLoanReqYn.value == 'Y'){ // Y이면 대출 중복건이 있는 경우 N이면 없음
			alert("고객님 당행 신청건이 존재합니다.\n자세한 사항은 당행 상담원을 통해 문의바랍니다.");
			return;
		}else{
			
//			 GA이벤트 추적설정 S (완료_한도조회 후 대출신청)
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		    
		        ga('create', 'UA-74245882-1', 'auto');
		        ga('send', 'pageview');
		        
		        ga('send','event','conversion','apply','1_loan2');
//		     GA이벤트 추적설정 E
		        
			fm_e.target = "_self";
			fm_e.action = "/loan/pre_apply04_view2.do";
			//ProgressBar();
			commonSendForm(fm_e);
		}
	}
	
	function ProgressBar(){
	    thisMenu1Y = eval("document.all.preprocessingY.style");
	    thisMenu1N = eval("document.all.preprocessingN.style");	    
	    thisMenu1Y.display = "";
	    thisMenu1N.display = "none";
	 }
	function resetProgressBar(){  
	    thisMenu1Y = eval("document.all.preprocessingY.style");
	    thisMenu1N = eval("document.all.preprocessingN.style");
	    thisMenu1Y.display = "none";
	    thisMenu1N.display = "";
	    clearDim();
	 }
    
    function srvTime(){
        var xmlHttp;
        
    	xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
    	xmlHttp.open('HEAD',window.location.href.toString(),false);
    	xmlHttp.setRequestHeader("Content-Type","text/html");
    	xmlHttp.send('');
    	return xmlHttp.getResponseHeader("Date");
    }
    
    function completeCipher(rbrnoEnc){
    	var fm = "frm";
		var fm_e = eval("document."+fm);
		fm_e.rbrno.value=rbrnoEnc;
		apply02_proc();	
    }
    
	function apply01_proc(){

		var fm = "frm";
		var fm_e = eval("document."+fm);
		var f = document.frm;
	    
		if(checkAlert("text", fm, "custNm", "성명")) return;
		if(checkAlert("text", fm, "rbrno1", "주민등록번호 앞자리", 6)) return;
		if(checkAlert("text", fm, "rbrno2", "주민등록번호 뒷자리", 7)) return;
        if(checkAlert("select", fm, "mpTscoDstcd", "통신사")) return;
		if(checkAlert("select", fm, "mno1", "핸드폰번호 앞자리")) return;
		if(checkAlert("text", fm, "mno2", "핸드폰번호 가운데자리", 3)) return;
		if(checkAlert("text", fm, "mno3", "핸드폰번호 끝자리", 4)) return;
		if(checkAlert("radio", fm, "prdctCd", "대출상품")) return;
		if(checkAlert("select", fm, "occpKndCd", "직업종류")) return;
		var temp=document.getElementsByName('prdctCd');
		var job;
		for(i=0;i<temp.length; i++){
			if( temp[i].checked ){
				job=temp[i].value;
			}
		}
		if('00067' == job){ //자영업자 대출
			if(checkAlert("text", fm, "n1IncmApplcAmt", "연매출소득정보")) return;
		}else{
			if(checkAlert("text", fm, "analIncmAmt", "연간소득금액")) return;
		}
		//if(checkAlert("radio", fm, "agree_10", "전자금융거래기본약관 (필수적 정보)")) return;
		if(checkAlert("radio", fm, "agree_19", "개인(신용)정보를 수집·이용 동의여부(여신금융거래)")) return;
		if(checkAlert("radio", fm, "agree_27", "고유식별정보를 수집·이용 동의여부(여신금융거래)")) return;
		if(checkAlert("radio", fm, "agree_21", "개인(신용)정보를 제공 동의여부(여신금융거래)")) return;
		if(checkAlert("radio", fm, "agree_22", "고유식별정보를 제공 동의여부(여신금융거래)")) return;
/*		if(checkAlert("radio", fm, "agree_33", "개인(신용)정보 수집·이용 동의여부(주택소유확인시스템)")) return;
		if(checkAlert("radio", fm, "agree_34", "고유식별정보 수집·이용 동의여부(주택소유확인시스템)")) return;
		if(checkAlert("radio", fm, "agree_35", "개인(신용)정보 제공·조회 동의여부(주택소유확인시스템)")) return;
		if(checkAlert("radio", fm, "agree_36", "고유식별정보 제공·조회 동의여부(주택소유확인시스템)")) return;*/
/*	    if(checkAlert("radio", fm, "agree_5", "개인(신용)정보 수집·이용·제공 동의(선택)")) return;
	    if(checkAlert("radio", fm, "agree_15", "SMS수신동의(선택)")) return;
	    if(checkAlert("radio", fm, "agree_16", "DM수신동의(선택)")) return;
	    if(checkAlert("radio", fm, "agree_17", "E-MAIL수신동의(선택)")) return;
	    if(checkAlert("radio", fm, "agree_18", "전화수신동의(선택)")) return;*/
	    if(checkAlert("radio", fm, "agree_23", "개인(신용)정보를 수집·이용 동의여부")) return;
	    if(checkAlert("radio", fm, "agree_24", "고유식별정보를 수집·이용 동의여부")) return;
	    if(checkAlert("radio", fm, "agree_25", "개인(신용)정보를 제공·조회 동의여부")) return;
	    if(checkAlert("radio", fm, "agree_26", "고유식별정보를 제공·조회 동의여부")) return;
	    if(checkAlert("radio", fm, "agree_8", "동의서내용확인")) return;
	    
	    if(getCheckedValue() =='1'){
			if(checkAlert("radio", fm, "agree_28", "본인인증서비스이용 약관동의")) return;
			if(checkAlert("radio", fm, "agree_29", "고유식별정보처리 동의")) return;
			if(checkAlert("radio", fm, "agree_30", "이동통신사이용 약관동의")) return;
			if(checkAlert("radio", fm, "agree_31", "개인정보이용 동의")) return;
			if(fm_e.mpTscoDstcd.value == "6" || fm_e.mpTscoDstcd.value == "7"){
				if(!$("#mobAgr5_1").prop("checked") && !$("#mobAgr5_2").prop("checked")){
					alert("[개인정보이용 제3자 제공 동의] 적어도 하나를 선택해주세요");
					return;
				}
			}
		}
	    
/*	    var agree_val5;
        for ( var i = 0; i < eval(f.agree_5).length; i++) {
            if (f.agree_5[i].checked == true)
                agree_val5 = f.agree_5[i].value;
        }
        document.frm.agree_5.value = agree_val5;
        document.frm.ag5.value = agree_val5;
        
        var agree_val15;
        for ( var i = 0; i < eval(f.agree_15).length; i++) {
            if (f.agree_15[i].checked == true)
                agree_val15 = f.agree_15[i].value;
        }
        document.frm.agree_15.value = agree_val15;
        document.frm.ag15.value = agree_val15;
        
        var agree_val16;
        for ( var i = 0; i < eval(f.agree_16).length; i++) {
            if (f.agree_16[i].checked == true)
                agree_val16 = f.agree_16[i].value;
        }
        document.frm.agree_16.value = agree_val16;
        document.frm.ag16.value = agree_val16;
        
        var agree_val17;
        for ( var i = 0; i < eval(f.agree_17).length; i++) {
            if (f.agree_17[i].checked == true)
                agree_val17 = f.agree_17[i].value;
        }
        document.frm.agree_17.value = agree_val17;
        document.frm.ag17.value = agree_val17;
        
        var agree_val18;
        for ( var i = 0; i < eval(f.agree_18).length; i++) {
            if (f.agree_18[i].checked == true)
                agree_val18 = f.agree_18[i].value;
        }
        document.frm.agree_18.value = agree_val18;
        document.frm.ag18.value = agree_val18;*/
        
/*        var agree_choice = 0;
        if(agree_val15 == "Y") {agree_choice = agree_choice + 1;};
        if(agree_val16 == "Y") {agree_choice = agree_choice + 1;};
        if(agree_val17 == "Y") {agree_choice = agree_choice + 1;};
        if(agree_val18 == "Y") {agree_choice = agree_choice + 1;};
        
        if(agree_val5 == "Y" && agree_choice < 1){
        	alert("개인(신용)정보 수집, 이용, 제공 동의(상품서비스 안내 등)에 동의하신 경우 상품서비스 안내수단 1개 이상을 선택해 주세요." );
        	return;
        }else if(agree_val5 == "N" && agree_choice > 0){
        	alert("개인(신용)정보 수집, 이용, 제공 동의(상품서비스 안내 등)에 동의하신 경우 상품서비스 안내수단을 동의 확인해 주세요." );
        	return;
        };*/

        var custNm=fm_e.custNm.value;	
		var rbrno=fm_e.rbrno1.value + fm_e.rbrno2.value;
	
		if(getCheckedValue()=='1'&&pre_apply02_agree(custNm,rbrno)){
			var strOption = "status=yes, resizable=yes, location=yes, scrollbars=no,width=500,height=217, "
				+ "left = " + (window.screen.width - 400) / 2
				+ ", top = " + (window.screen.height - 375) / 2;
			smsWin = window.open("/loading.html", "mobileauth", strOption);
	    	fm_e.action = "/credit/cipherRbrno.do";		
			fm_e.target = "hidden_frame";
			commonSendForm(fm_e);	
		}
		
	}

	function fnNiceChekPlusPopup(){
		window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
		document.form_chk.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
		document.form_chk.target = "popupChk";
		document.form_chk.submit();
	}
	
	function fnNiceChekPlusPopup1(){
	    window.open('', 'popupChk', 'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
	    document.form_chk1.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
	    document.form_chk1.target = "popupChk";
	    document.form_chk1.submit();
	}
	
	
	  function product_call(goid){
        var fm = "produc_detail";
        var fm_e = eval("document."+fm);
        var url="";
        if(goid==1){
            url= "/loan/pre_apply01_view.do"
        }else{    
            url= "/loan/apply01_view.do"
        }
        fm_e.action = url;
        fm_e.target = "hidden_frame";
        commonSendForm(fm_e);
    }
	  

  function pre_apply01_new_result() {
	  var urlpath="/loan/apply01_view.do?prdUrlPath=10";
	    document.location.href=urlpath;
  }
	  

  function pre_apply02_agree(custNm,regi ) {
  	var now = new Date(); // 현재시간 가져오기
      var year = now.getFullYear(); // 년도 가져오기
      var month = now.getMonth()+1; // 월 가져오기 (+1)
      var date = now.getDate(); // 날짜 가져오기
      var hr = now.getHours(); // 시 가져오기
      var mn = now.getMinutes(); // 분 가져오기
      var sc = now.getSeconds(); // 초 가져오기
      var arg = getCheckedValue(); 
      var argstr="인증서";      
      if(arg=='1'){
    	  argstr="휴대폰인증";
      }else if(arg=='2'){
    	  argstr="인증서";
      }else if(arg=='3'){
    	  argstr="카드인증";
      }
      var cf_msg_head = " * 이름: "+custNm+"\n"
                      + " * 주민번호: "+regi.substring(0, 6)+"-"+regi.substring(6, 7)+"******\n";      				 
      var cf_msg_head2 = " * 인증일시: "+year+"년 "+month+"월 "+date+"일 "+hr+":"+mn+":"+sc+"\n"
      			   + " * 인증방법: "+argstr+"\n"
                   + " --------------------------------------------------\n"
      			   +"※  본인인증 하시겠습니까? \n";	
	    if(confirm(cf_msg_head + cf_msg_head2)){
	    	return true;
	    }else{
	    	return false;
	    }
  }	  
  

  function chkBrowser(){
  	var msie = /MSIE/.test(navigator.userAgent);
  	var ie6  = /MSIE 6.0/.test(navigator.userAgent) && ! /MSIE 8.0/.test(navigator.userAgent);
  	var mode = document.documentMode || 0;
  	var setExpr = document.createElement('div').style.setExpression;
  	var expr = setExpr;
  		if (ie6 || expr) {
  		return false;
  		}else{
  		return true;
  		}
  }
  
  function onTelCnslSave_direct() {
      alert("신청이 완료되었습니다.");   
      document.location.href="/direct/randing.do";
  }
  
  function checkid (){
	  var fm = "frm";
	  var fm_e = eval("document."+fm);
	  var arg = getgoods();
  	if (arg == "00067"){ //자영업
  		fm_e.analIncmAmt.value ="";
  		document.getElementById("ja").style.display="";
  		document.getElementById("yer").style.display="none";
  		fm_e.analIncmAmt.value ="";
  		fm_e.n1IncmApplcAmt.value = "";
  		
  	}else{ //직장인
  		fm_e.analIncmAmt.value ="";
  		fm_e.n1IncmApplcAmt.value = "";
  		document.getElementById("yer").style.display="";
  		document.getElementById("ja").style.display="none";
  		
  	}
  }
  
  function init(){
	 
		 var arg = getgoods();
		    if (arg == "00067"){ //자영업
		        document.getElementById("yer").style.display="";
		        document.getElementById("ja").style.display="none";
		    }else{ //직장인
		        document.getElementById("ja").style.display="";
		        document.getElementById("yer").style.display="none";
		    }
	 }
  
  function goNextApply02(custNo) {
	  apply01_search("","","","",custNo);
  }
  
	function apply01_search(loanRqsNo, loanNwDstcd, cnsltRqsDstcd,prdUrlPath,custNo) { 
		var fm = "frm";
		var fm_e = eval("document." + fm);
		fm_e.custNo.value=custNo ;
		fm_e.action = "/loan/apply01_proc.do";
			/*	+"?loanRqsNo=" + loanRqsNo
				+ "&cnsltRqsDstcd=" +cnsltRqsDstcd
				+ "&prdUrlPath=" +prdUrlPath
				//+ "&loanNwDstcd=" + loanNwDstcd+ "&cfChk=N";
				+ "&loanNwDstcd=" + loanNwDstcd 
				+ "&custNo=" + custNo ; */
		fm_e.target = "hidden_frame";
			ProgressBar();
			commonSendForm(fm_e);	
			//모바일 보안솔루션 적용
			/*if (!AnySign.mAnySignLoad)
		    {
		        alert('Not loaded');
		        aResult = false;
		    }
			else
			{
				commonSendForm(fm_e);	
			}*/			 
			
	}
	  
	function apply01_add(loanRqsNo, reLoanRqsNo, loanNwDstcd) {
		    var urlpath="/loan/apply01_view.do?prdUrlPath=10";
	    document.location.href=urlpath;
	}
	
	function auth_hp01() {
		var fm = "frm";
		var fm_e = eval("document." + fm);
		
		fm_e.mno.value = fm_e.mno1.value + fm_e.mno2.value + fm_e.mno3.value; /* 핸드폰번호 */
		fm_e.sex.value = fm_e.rbrno2.value.substring(0, 1); 				  /* 남녀구분코드 0:여자 1:남자 */
		fm_e.brdt.value = fm_e.rbrno1.value;                                  /* 생년월일 */
		fm_e.tscoDv.value = fm_e.mpTscoDstcd.value;							  /* 통신사구분코드 1:SKT / 2:KT / 3:U+ / 5:SKT알뜰 / 6:KT알뜰 / 7:U+알뜰 / 99:기타 */
		fm_e.sms_sign_msg.value = fm_e.sign_msg.value; 						  /* 팝업창 띄워주는 신청인 정보 & 동의내역 */
		

			fm_e.action = "/credit/auth_hp01_proc.do";
			fm_e.target = "hidden_frame";			
			commonSendForm(fm_e);

	}
	function auth_hp_inq(){
        //진행전에 주민번호암호화
		if (confirm("인증번호를 요청하시겠습니까?")) {			
			var fm = "frm";
			var fm_e = eval("document." + fm);
			
			fm_e.mno.value = fm_e.mno1.value + fm_e.mno2.value + fm_e.mno3.value; /* 핸드폰번호 */
			fm_e.sex.value = fm_e.rbrno2.value.substring(0, 1); 				  /* 남녀구분코드 0:여자 1:남자 */
			fm_e.brdt.value = fm_e.rbrno1.value;                                  /* 생년월일 */
			fm_e.tscoDv.value = fm_e.mpTscoDstcd.value;							  /* 통신사구분코드 1:SKT / 2:KT / 3:U+ / 5:SKT알뜰 / 6:KT알뜰 / 7:U+알뜰 / 99:기타 */
			fm_e.sms_sign_msg.value = fm_e.sign_msg.value; 						  /* 팝업창 띄워주는 신청인 정보 & 동의내역 */
			
			var strOption = "status=yes, resizable=yes, location=yes, scrollbars=no,width=500,height=217, "
				+ "left = "
				+ (window.screen.width - 400)
				/ 2
				+ ", top = "
				+ (window.screen.height - 375) / 2;
			smsWin = window.open("/loading.html", "mobileauth", strOption);

			fm_e.action = "/credit/auth_hp01_proc.do";
			fm_e.target = "hidden_frame";			
			commonSendForm(fm_e);
		}
	}
	
	function auth_hp01_proc() {
		var fm = "frm";
		var fm_e = eval("document." + fm);	
		smsWin.focus();
		fm_e.action = "/credit/auth_hp02.do";
		fm_e.target = "mobileauth";
		commonSendForm(fm_e);		
	}
	
	function auth_hp02_proc() {
		var fm = "frm";
		var fm_e = eval("document." + fm);
		if (checkAlert("text", fm, "smsCtfcNo", "인증번호")) {
			return;
		}
		if (confirm("인증번호가 확실하십니까?")) {
			fm_e.action = "/credit/auth_hp02_proc.do";
			fm_e.target = "hidden_frame";
			commonSendForm(fm_e);
		}
	}
	
	function auth_hp_result() {
	
		alert("휴대폰인증 성공하였습니다.");
		// opener.goNext(custNo);
	}
	function auth_hp_fail(msg) {
		alert(msg);
		resetProgressBar();
	}
	
	function mobileAuthRs()
    {
    	var fm = "frm";
		var fm_e = eval("document."+fm);
        
        ProgressBar();
        if(TK_makeEncData(fm_e)){
        	fm_e.action = '/loan/pre_apply02_proc.do';
        	fm_e.target = "hidden_frame";
    		commonSendForm(fm_e);
        }else{alert("키보드보안을 확인해주시기 바랍니다.");}
        
		
    }
	function chkMobileSvc(arg){
		if(arg == '1'){
			document.getElementById("mobileSvc").style.display = "";
		}else{
			document.getElementById("mobileSvc").style.display = "none";
		}
	}
	
	function amtValChk(text){
		var gb = $(':radio[name="prdctCd"]:checked').val(); 
	
		if('00072' == gb){ //직장인 대출
			msg = "월급여가 아닌 연간소득금액을 만원 단위로 입력 부탁 드립니다.";
		}else if('00067' == gb){ //자영업자 대출
			msg = "월급여가 아닌 소득정보 연매출금액을 만원 단위로 입력 부탁 드립니다.";
		}
		/*alert(msg);
		$(':input[name="analIncmAmt"]').focus();*/
/*		alert(msg);
		setTimeout(function(){
			$(text).focus();
		}, 350);*/
	}
	
	function valComma(numstr) {
		var numstr = String(numstr);
		var re0 = /(\d+)(\d{3})($|\..*)/;
		if (re0.test(numstr)){
		    return numstr.replace(re0, function(str,p1,p2,p3) { return valComma(p1) + "," + p2 + p3; });
		}else{
			return numstr;
		}
	}
	
	function inquireMethodDisagree(){
		var fm = "frm";
		var fm_e = eval("document." + fm);
		var f = document.frm;
		
		fm_e.agree5_1_2.checked = true;
		fm_e.agree5_2_2.checked = true;
		fm_e.agree5_3_2.checked = true;
		fm_e.agree5_4_2.checked = true;		
	}
	
	function amtChange() {
		var amt = $("#analIncmAmt").val();
		if(amt > 1000000){
			alert("최대 100억원까지 입력 가능합니다.");
			$("#analIncmAmt").val('');
		}
	}