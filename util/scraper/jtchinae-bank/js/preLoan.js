var smsWin;

$(document).ready(function(){
	//���ҵ� 100������ ���� �߰�
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
			return "JTģ����������";
		}else{
			return "JTģ����������";
		}
	}else{
		return "JTģ����������";
	}
}

	// ���â
	function checkAlert(type, fm, nm, msg, len)	{
		var obj = eval("document."+fm+"."+nm);
		if(type == 'text'){
			if(obj.value == ''){
				alert("["+msg+"] �Է����ּ���");
				obj.focus();
				return true;
			}
			if(obj.value.length < len && len > 0){
				alert("["+msg+"] "+len+"�ڸ� �Է����ּ���");
				obj.focus();
				return true;
			}
		}
		else if(type == 'hidden'){
			if(obj.value == '')	{
				alert("["+msg+"] ���� �������ּ���.");
				return true;
			}
		}
		else if(type == 'select'){
			if(obj.value == '')	{
				alert("["+msg+"] �������ּ���");
				obj.focus();
				return true;
			} 
		}
		else if(type == 'radio'){
			if(obj.length == undefined)	{
				if(!obj.checked){
					alert("["+msg+"] üũ���ּ���");
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
					alert("["+msg+"] ��� �ϳ��� �������ּ���");
					obj[0].focus();
					return true;
				}
			}

		}
		else if(type == 'checkbox'){
			if(!obj.checked){
				alert("["+msg+"] üũ���ּ���");
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
		// ���� ��¥
		var now = new Date(); // ����ð� ��������
		var year = now.getFullYear(); // �⵵ ��������
		var month = now.getMonth()+1; // �� �������� (+1)
		var date = now.getDate(); // ��¥ ��������
		var hr = now.getHours(); // �� ��������
		var mn = now.getMinutes(); // �� ��������
		var sc = now.getSeconds(); // �� ��������
	
		frm.sign_msg.value = "[���������� ������ �α���]\n";
				if(registerNo != "" && registerNo != undefined){
							+ " �ֹι�ȣ: "+registerNo.substring(0, 6)+"-"+registerNo.substring(6, 7)+"******\n";
				}
							+ " �����Ͻ�: "+year+"�� "+month+"�� "+date+"�� "+hr+":"+mn+":"+sc;
	}

	function sign_msg3(registerNo){
		var fm = "frm";	
		var fm_e = eval("document." + fm);
		var fm1 = "form_chk";
		var fm_e1 = eval("document." + fm1);
		var fm2 = "form_chk1"; 
		var fm_e2 = eval("document." + fm2);
		
		var now = new Date(); // ����ð� ��������
		var year = now.getFullYear(); // �⵵ ��������
		var month = now.getMonth()+1; // �� �������� (+1)
		var date = now.getDate(); // ��¥ ��������
		var hr = now.getHours(); // �� ��������
		var mn = now.getMinutes(); // �� ��������
		var sc = now.getSeconds(); // �� ��������
		
		var agree4 = "";
		var ag_oth = "";
		var agree9 = "";
		var agree10 = "";
	
		var arg = getCheckedValue(); 
		var argstr="������";      
		if(arg=='1') argstr="�޴�������";
		
		var xparam="";
		var xparam1="";
		if(typeof registerNo =='undefined'){
			registerNo="******-*******";
		}
		message = "[��û������]\n" + " * �̸�: " + fm_e.custNm.value + "\n"
					+ " * �ֹι�ȣ: "+registerNo.substring(0, 6)+"-"+registerNo.substring(6, 7)+"******\n"							
					+ " * �����Ͻ�: "+year+"�� "+month+"�� "+date+"�� "+hr+":"+mn+":"+sc+"\n"
					+ " * �������: "+argstr+"\n"
					+ "------------------------------\n" 
					+ "[������ǳ���]\n" ;
		
		message += "(Y) 1.����(�ſ�)���� ����&middot;�̿� ���Ǽ�(���ű����ŷ�) \n"
				+ "(Y) 2.�����ĺ�����(�ֹε�Ϲ�ȣ ��) ����&middot;�̿� ���Ǽ�(���ű����ŷ�)\n"
				+ "(Y) 3.����(�ſ�)���� ���� ���Ǽ�(���ű����ŷ�)\n"
				+ "(Y) 4.�����ĺ�����(�ֹε�Ϲ�ȣ ��)���� ���Ǽ�(���ű����ŷ�)\n";
		
		var num = extractionNumber(message);
		/* ���ü���Ȯ�νý��� �����׸� ���� */
		//message += creatMsg_ownershipOfHouse(num);
		//num = extractionNumber(message);
		
/*        if(fm_e.ag5.value == 'Y')
        	agree4 = "(Y) " + ++num + ".����(�ſ�)���� ����&middot;�̿�&middot;���� ���� (����) \n";
        else agree4 = "(N) " + ++num + ".����(�ſ�)���� ����&middot;�̿�&middot;���� ���� (����) \n";
        
        if(fm_e.ag15.value == 'Y')
        	agree11 = "(Y) " + ++num + ".SMS���ŵ���(����) \n";
        else agree11 = "(N) " + ++num + ".SMS���ŵ���(����) \n";
        
        if(fm_e.ag16.value == 'Y')
        	agree12 = "(Y) " + ++num + ".DM���ŵ���(����) \n";
        else agree12 = "(N) " + ++num + ".DM���ŵ���(����) \n";
        
        if(fm_e.ag17.value == 'Y')
        	agree13 = "(Y) " + ++num + ".E-MAIL���ŵ���(����) \n";
        else agree13 = "(N) " + ++num + ".E-MAIL���ŵ���(����) \n";
        
        if(fm_e.ag18.value == 'Y')
        	agree14 = "(Y) " + ++num + ".��ȭ���ŵ���(����) \n";
        else agree14 = "(N) " + ++num + ".��ȭ���ŵ���(����) \n";*/
        
        ag_oth = "(Y) " + ++num + ".����(�ſ�)���� ����&middot;�̿� ���Ǽ�(�ʼ��� ����)  \n"
	        	+ "(Y) " + ++num + ".�����ĺ�����(�ֹε�Ϲ�ȣ ��) ����&middot;�̿� ���Ǽ�(�ʼ��� ����)  \n"
				+ "(Y) " + ++num + ".����(�ſ�)���� ����&middot;��ȸ ���Ǽ�(�ʼ��� ����)  \n"
				+ "(Y) " + ++num + ".�����ĺ�����(�ֹε�Ϲ�ȣ ��) ����&middot;��ȸ ���Ǽ�(�ʼ��� ����)  \n"
				+ "(Y) " + ++num + ".�� �Ǹ� �ȳ����� ���õ� Ȯ�� \n";
       
        if(arg=='1'){  //�̵�����϶���    
        	agree9 = creatMsg_mpTscoAgree(++num);
        }
        agree10 = "------------------------------\n"
        		+ getPreComText()
        		+ " ����� �����ϰ� ���� �Ͽ����ϴ�"; 
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
	 
	function openJF(upno){//�����˻�
		window.open("/searchJobformView.do?upperOccpNo1="+upno+"",  "JF", "width=355px,height=320px, toolbar=0, status=no, top="+screen.height/3+", left="+screen.width/3+", resizable=yes, scrollbars=yes");
	}
	function openUNIV(){//�б��˻�
		window.open("/searchUnivView.do",  "UNIV", "width=617px,height=415px, toolbar=0, status=no, top="+screen.height/4+", left="+screen.width/4+", resizable=yes, scrollbars=yes");
	}
	function indOpenPop(){	//��������(ǥ�ؼҵ���)
	    window.open("/indOpenPop.do", "window", "width=490,height=400,scrollbars=yes, top="+screen.height/4+", left="+screen.width/4+"");
	}
	
	function pre_apply_end(result,loanRqsNo,loanNwDstcd){
		var fm = "frm";
		var fm_e = eval("document."+fm);
		fm_e.loanRqsNo.value = loanRqsNo;
		fm_e.resultCd.value = result;
		fm_e.loanNwDstcd.value = loanNwDstcd;
 		if(checkAlert("hidden", fm, "resultCd", "�Ǹ�����")){  return; }
 		if(checkAlert("hidden", fm, "loanRqsNo", "�Ǹ�����")){  return; } 		
		fm_e.action = "/loan/pre_apply02_view.do";
		fm_e.target = "_self";
			commonSendForm(fm_e);
	}

	function chkRadioVal(_obj){	 		
 		var rdObj = _obj;
 		if(rdObj.checked && rdObj.value!="Y"){
	 			 alert("�����ϼž߸� (����)�ŷ������� ���� �� ������ �����մϴ�.");
	 			rdObj.checked=false;		 	 
 		}
 	}
	
	function chkagreeAll(flag){
		if($("fieldset[id^='required_check_01']").children().children().attr("disabled") == "disabled"){
			$("input[name=chkAll]").attr("checked", false);
			alert("���ڱ����ŷ��⺻��� �ڼ������� ���� Ȯ�� �ٶ��ϴ�.");
			return;
		}
		if($("fieldset[id^='required_check_02']").children().children().attr("disabled") == "disabled"){
			$("input[name=chkAll]").attr("checked", false);
			alert("����(�ſ�) ���� ����. �̿�. ���� ���Ǽ� (���ű����ŷ�) �ڼ������� ���� Ȯ�� �ٶ��ϴ�.");
			return;
		}
		if($("fieldset[id^='required_check_03']").children().children().attr("disabled") == "disabled"){
			$("input[name=chkAll]").attr("checked", false);
			alert("���� (�ſ�)���� ��ȸ ���Ǽ� �ڼ������� ���� Ȯ�� �ٶ��ϴ�.");
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
	
	//���ڸ� �Է� ����
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
	
	//�ֹε�� ��ȣüũ
 	function psnCheck(rbrno) {
 		var chk =0;
 		var frm = document.frm;
 		if(rbrno == "" || rbrno.length != 13){
 			alert ("�ֹε�Ϲ�ȣ�� ��ȿ���� �ʽ��ϴ�.\n�ٽ� �ѹ� Ȯ�� �� �Է��� �ֽñ� �ٶ��ϴ�.");
 			frm.rbrno1.focus();
 			return false;
 		}
 		var snum1 = rbrno.substring(0,6);
 		var snum2 = rbrno.substring(6,13);

 		var yy = snum1.substring(0,2);
 		var mm = snum1.substring(2,4);
 		var dd = snum1.substring(4,6);
 		var sex = snum2.substring(0,1);

 		//�ֹ� ��� ��ȣ Ȯ��
 	 	 if( (snum1.length != 6) || (mm < '01') || (mm > '12') || (dd < '01') || (dd > '31') ) 	{
 			alert ("�ֹε�Ϲ�ȣ1�� ��ȿ���� �ʽ��ϴ�.\n�ٽ� �ѹ� Ȯ�� �� �Է��� �ֽñ� �ٶ��ϴ�.");
 			frm.rbrno1.focus();
 			return false;
 		}
 		if( (snum2.length != 7) || (sex < 1) || (sex > 4) )	{
 			alert ("�ֹε�Ϲ�ȣ2�� ��ȿ���� �ʽ��ϴ�.\n�ٽ� �ѹ� Ȯ�� �� �Է��� �ֽñ� �ٶ��ϴ�.");
 			frm.rbrno2.focus();
 			return false;
 		}
 		// �ֹε�Ϲ�ȣ validation check
 		for (var i = 0; i <=5 ; i++)
 			chk = chk + ((i%8+2) * parseInt(snum1.substring(i,i+1)));
 		for (var i = 6; i <=11 ; i++)
 			chk = chk + ((i%8+2) * parseInt(snum2.substring(i-6,i-5)));
 		chk = 11 - (chk %11);
 		chk = chk % 10;

 	  	if (chk != snum2.substring(6,7)) 	{
 	    		alert ("�ֹε�Ϲ�ȣ�� ��ȿ���� �ʽ��ϴ�.\n�ٽ� �ѹ� Ȯ�� �� �Է��� �ֽñ� �ٶ��ϴ�.");
 	    		return frm.rbrno2.focus();
 	  	}
 	  	return true;
 	}
 	
 	
	function apply02_proc(){
		var fm = "frm";
		var fm_e = eval("document."+fm);

		if('00072' == fm_e.prdctCd.value || '52001' == fm_e.prdctCd.value){ //������ ����
			if(checkAlert("select", fm, "occpKndCd", "��������")){  return; }
			if(checkAlert("text", fm, "analIncmAmt", "�����ҵ�ݾ�")){  return; }
		}else if('00067' == fm_e.prdctCd.value){ //�ڿ����� ����
			if(checkAlert("select", fm, "occpKndCd", "��������")){  return; }
			if(checkAlert("select", fm, "n1SalCnfmMthCd", "�ҵ�����")){  return; } 
			if(checkAlert("select", fm, "n1IncmApplcAmt", "������")){  return; }
			else{
				var inval=fm_e.lastPvdptIncmAmt.value;
				if(typeof inval=='undefined' || inval.length<=0 || eval(inval)<=0){
					fm_e.lastPvdptIncmAmt.value=fm_e.n1IncmApplcAmt.value;
				}
			} 
		}
		if(checkAlert("radio", fm, "psnslfCnfmMthCd", "�Ǹ����� ���")){  return; }	
		
		var rbrno=fm_e.rbrno1.value + fm_e.rbrno2.value;
		//����޽��� ����
		sign_msg3(rbrno);
		selfAuth();			
	}
	
	function apply02_proc2(){
		smsWin='';
		var fm = "frm";
		var fm_e = eval("document."+fm);
		if(''!=fm_e.authResult.value){
			if(checkAlert("hidden", fm, "authResult", "�Ǹ�����")){  return; }
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
			alert('���ڸ� �Է��� �ֽñ� �ٶ��ϴ�.');
			dt.focus();
			return true;
		}
		if(dt.value.length <= 7){
			alert('YYYYMMDD �������� �Է��� �ֽñ� �ٶ��ϴ�.');
			dt.focus();
			return true;
		} 
		/*
		if(parseInt(today)<parseInt(dt.value)){
			alert('�Է°��� Ȯ���� �ֽñ� �ٶ��ϴ�.');
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
        }else{alert("Ű���庸���� Ȯ�����ֽñ� �ٶ��ϴ�.");}
        
		
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
			return alert('�Ǹ����� ������ �����ϼ���');
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
		if(fm_e.dupLoanReqYn.value == '1'){ // 1�̸� ���� �ߺ����� �ִ� ��� 2�̸� ����
			alert("���� ��û���� �ֽ��ϴ�.");
		}else{
			fm_e.action = "/loan/hpAuth_save_proc.do"; 
			fm_e.target = "hidden_frame";
			commonSendForm(fm_e);
		}

	}

	// 2. ����������
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
		
		if(fm_e.dupLoanReqYn.value == 'Y'){ // Y�̸� ���� �ߺ����� �ִ� ��� N�̸� ����
			alert("���� ���� ��û���� �����մϴ�.\n�ڼ��� ������ ���� ������ ���� ���ǹٶ��ϴ�.");
			return;
		}else{
			
//			 GA�̺�Ʈ �������� S (�Ϸ�_�ѵ���ȸ �� �����û)
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		    
		        ga('create', 'UA-74245882-1', 'auto');
		        ga('send', 'pageview');
		        
		        ga('send','event','conversion','apply','1_loan2');
//		     GA�̺�Ʈ �������� E
		        
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
	    
		if(checkAlert("text", fm, "custNm", "����")) return;
		if(checkAlert("text", fm, "rbrno1", "�ֹε�Ϲ�ȣ ���ڸ�", 6)) return;
		if(checkAlert("text", fm, "rbrno2", "�ֹε�Ϲ�ȣ ���ڸ�", 7)) return;
        if(checkAlert("select", fm, "mpTscoDstcd", "��Ż�")) return;
		if(checkAlert("select", fm, "mno1", "�ڵ�����ȣ ���ڸ�")) return;
		if(checkAlert("text", fm, "mno2", "�ڵ�����ȣ ����ڸ�", 3)) return;
		if(checkAlert("text", fm, "mno3", "�ڵ�����ȣ ���ڸ�", 4)) return;
		if(checkAlert("radio", fm, "prdctCd", "�����ǰ")) return;
		if(checkAlert("select", fm, "occpKndCd", "��������")) return;
		var temp=document.getElementsByName('prdctCd');
		var job;
		for(i=0;i<temp.length; i++){
			if( temp[i].checked ){
				job=temp[i].value;
			}
		}
		if('00067' == job){ //�ڿ����� ����
			if(checkAlert("text", fm, "n1IncmApplcAmt", "������ҵ�����")) return;
		}else{
			if(checkAlert("text", fm, "analIncmAmt", "�����ҵ�ݾ�")) return;
		}
		//if(checkAlert("radio", fm, "agree_10", "���ڱ����ŷ��⺻��� (�ʼ��� ����)")) return;
		if(checkAlert("radio", fm, "agree_19", "����(�ſ�)������ �������̿� ���ǿ���(���ű����ŷ�)")) return;
		if(checkAlert("radio", fm, "agree_27", "�����ĺ������� �������̿� ���ǿ���(���ű����ŷ�)")) return;
		if(checkAlert("radio", fm, "agree_21", "����(�ſ�)������ ���� ���ǿ���(���ű����ŷ�)")) return;
		if(checkAlert("radio", fm, "agree_22", "�����ĺ������� ���� ���ǿ���(���ű����ŷ�)")) return;
/*		if(checkAlert("radio", fm, "agree_33", "����(�ſ�)���� �������̿� ���ǿ���(���ü���Ȯ�νý���)")) return;
		if(checkAlert("radio", fm, "agree_34", "�����ĺ����� �������̿� ���ǿ���(���ü���Ȯ�νý���)")) return;
		if(checkAlert("radio", fm, "agree_35", "����(�ſ�)���� ��������ȸ ���ǿ���(���ü���Ȯ�νý���)")) return;
		if(checkAlert("radio", fm, "agree_36", "�����ĺ����� ��������ȸ ���ǿ���(���ü���Ȯ�νý���)")) return;*/
/*	    if(checkAlert("radio", fm, "agree_5", "����(�ſ�)���� �������̿롤���� ����(����)")) return;
	    if(checkAlert("radio", fm, "agree_15", "SMS���ŵ���(����)")) return;
	    if(checkAlert("radio", fm, "agree_16", "DM���ŵ���(����)")) return;
	    if(checkAlert("radio", fm, "agree_17", "E-MAIL���ŵ���(����)")) return;
	    if(checkAlert("radio", fm, "agree_18", "��ȭ���ŵ���(����)")) return;*/
	    if(checkAlert("radio", fm, "agree_23", "����(�ſ�)������ �������̿� ���ǿ���")) return;
	    if(checkAlert("radio", fm, "agree_24", "�����ĺ������� �������̿� ���ǿ���")) return;
	    if(checkAlert("radio", fm, "agree_25", "����(�ſ�)������ ��������ȸ ���ǿ���")) return;
	    if(checkAlert("radio", fm, "agree_26", "�����ĺ������� ��������ȸ ���ǿ���")) return;
	    if(checkAlert("radio", fm, "agree_8", "���Ǽ�����Ȯ��")) return;
	    
	    if(getCheckedValue() =='1'){
			if(checkAlert("radio", fm, "agree_28", "�������������̿� �������")) return;
			if(checkAlert("radio", fm, "agree_29", "�����ĺ�����ó�� ����")) return;
			if(checkAlert("radio", fm, "agree_30", "�̵���Ż��̿� �������")) return;
			if(checkAlert("radio", fm, "agree_31", "���������̿� ����")) return;
			if(fm_e.mpTscoDstcd.value == "6" || fm_e.mpTscoDstcd.value == "7"){
				if(!$("#mobAgr5_1").prop("checked") && !$("#mobAgr5_2").prop("checked")){
					alert("[���������̿� ��3�� ���� ����] ��� �ϳ��� �������ּ���");
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
        	alert("����(�ſ�)���� ����, �̿�, ���� ����(��ǰ���� �ȳ� ��)�� �����Ͻ� ��� ��ǰ���� �ȳ����� 1�� �̻��� ������ �ּ���." );
        	return;
        }else if(agree_val5 == "N" && agree_choice > 0){
        	alert("����(�ſ�)���� ����, �̿�, ���� ����(��ǰ���� �ȳ� ��)�� �����Ͻ� ��� ��ǰ���� �ȳ������� ���� Ȯ���� �ּ���." );
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
  	var now = new Date(); // ����ð� ��������
      var year = now.getFullYear(); // �⵵ ��������
      var month = now.getMonth()+1; // �� �������� (+1)
      var date = now.getDate(); // ��¥ ��������
      var hr = now.getHours(); // �� ��������
      var mn = now.getMinutes(); // �� ��������
      var sc = now.getSeconds(); // �� ��������
      var arg = getCheckedValue(); 
      var argstr="������";      
      if(arg=='1'){
    	  argstr="�޴�������";
      }else if(arg=='2'){
    	  argstr="������";
      }else if(arg=='3'){
    	  argstr="ī������";
      }
      var cf_msg_head = " * �̸�: "+custNm+"\n"
                      + " * �ֹι�ȣ: "+regi.substring(0, 6)+"-"+regi.substring(6, 7)+"******\n";      				 
      var cf_msg_head2 = " * �����Ͻ�: "+year+"�� "+month+"�� "+date+"�� "+hr+":"+mn+":"+sc+"\n"
      			   + " * �������: "+argstr+"\n"
                   + " --------------------------------------------------\n"
      			   +"��  �������� �Ͻðڽ��ϱ�? \n";	
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
      alert("��û�� �Ϸ�Ǿ����ϴ�.");   
      document.location.href="/direct/randing.do";
  }
  
  function checkid (){
	  var fm = "frm";
	  var fm_e = eval("document."+fm);
	  var arg = getgoods();
  	if (arg == "00067"){ //�ڿ���
  		fm_e.analIncmAmt.value ="";
  		document.getElementById("ja").style.display="";
  		document.getElementById("yer").style.display="none";
  		fm_e.analIncmAmt.value ="";
  		fm_e.n1IncmApplcAmt.value = "";
  		
  	}else{ //������
  		fm_e.analIncmAmt.value ="";
  		fm_e.n1IncmApplcAmt.value = "";
  		document.getElementById("yer").style.display="";
  		document.getElementById("ja").style.display="none";
  		
  	}
  }
  
  function init(){
	 
		 var arg = getgoods();
		    if (arg == "00067"){ //�ڿ���
		        document.getElementById("yer").style.display="";
		        document.getElementById("ja").style.display="none";
		    }else{ //������
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
			//����� ���ȼַ�� ����
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
		
		fm_e.mno.value = fm_e.mno1.value + fm_e.mno2.value + fm_e.mno3.value; /* �ڵ�����ȣ */
		fm_e.sex.value = fm_e.rbrno2.value.substring(0, 1); 				  /* ���౸���ڵ� 0:���� 1:���� */
		fm_e.brdt.value = fm_e.rbrno1.value;                                  /* ������� */
		fm_e.tscoDv.value = fm_e.mpTscoDstcd.value;							  /* ��Ż籸���ڵ� 1:SKT / 2:KT / 3:U+ / 5:SKT�˶� / 6:KT�˶� / 7:U+�˶� / 99:��Ÿ */
		fm_e.sms_sign_msg.value = fm_e.sign_msg.value; 						  /* �˾�â ����ִ� ��û�� ���� & ���ǳ��� */
		

			fm_e.action = "/credit/auth_hp01_proc.do";
			fm_e.target = "hidden_frame";			
			commonSendForm(fm_e);

	}
	function auth_hp_inq(){
        //�������� �ֹι�ȣ��ȣȭ
		if (confirm("������ȣ�� ��û�Ͻðڽ��ϱ�?")) {			
			var fm = "frm";
			var fm_e = eval("document." + fm);
			
			fm_e.mno.value = fm_e.mno1.value + fm_e.mno2.value + fm_e.mno3.value; /* �ڵ�����ȣ */
			fm_e.sex.value = fm_e.rbrno2.value.substring(0, 1); 				  /* ���౸���ڵ� 0:���� 1:���� */
			fm_e.brdt.value = fm_e.rbrno1.value;                                  /* ������� */
			fm_e.tscoDv.value = fm_e.mpTscoDstcd.value;							  /* ��Ż籸���ڵ� 1:SKT / 2:KT / 3:U+ / 5:SKT�˶� / 6:KT�˶� / 7:U+�˶� / 99:��Ÿ */
			fm_e.sms_sign_msg.value = fm_e.sign_msg.value; 						  /* �˾�â ����ִ� ��û�� ���� & ���ǳ��� */
			
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
		if (checkAlert("text", fm, "smsCtfcNo", "������ȣ")) {
			return;
		}
		if (confirm("������ȣ�� Ȯ���Ͻʴϱ�?")) {
			fm_e.action = "/credit/auth_hp02_proc.do";
			fm_e.target = "hidden_frame";
			commonSendForm(fm_e);
		}
	}
	
	function auth_hp_result() {
	
		alert("�޴������� �����Ͽ����ϴ�.");
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
        }else{alert("Ű���庸���� Ȯ�����ֽñ� �ٶ��ϴ�.");}
        
		
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
	
		if('00072' == gb){ //������ ����
			msg = "���޿��� �ƴ� �����ҵ�ݾ��� ���� ������ �Է� ��Ź �帳�ϴ�.";
		}else if('00067' == gb){ //�ڿ����� ����
			msg = "���޿��� �ƴ� �ҵ����� ������ݾ��� ���� ������ �Է� ��Ź �帳�ϴ�.";
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
			alert("�ִ� 100������� �Է� �����մϴ�.");
			$("#analIncmAmt").val('');
		}
	}