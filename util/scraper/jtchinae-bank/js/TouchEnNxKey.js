/**
****************************************************
TouchEnNxKey.js
****************************************************
| Version     작성자        수정일        변경사항 
 ---------  -------  -----------  ---------- 
| v1.0.0.10   강남준    2021.08.26
| v1.0.0.9    강남준    2021.08.14
| v1.0.0.8    강남준    2020.02.17
| v1.0.0.7    강남준    2019.07.05
| v1.0.0.6    강남준    2018.12.14
| v1.0.0.5    백서린    2018.11.12
| v1.0.0.4    허혜림    2017.12.26      
| v1.0.0.3    허혜림    2017.01.23      
| v1.0.0.2    백서린    2017.01.20      
| v1.0.0.1    백서린    2017.01.20      최초

****************************************************
 Copyright ⒞ RaonSecure Co., Ltd. 
  * 본 코드에 대한 모든 권한은 (주)라온시큐어 있으며 동의없이 사용/배포/가공할 수 없습니다.
****************************************************
**/





if (!window.console)
    console = {
        log: function (msg) {}
    };


/** 지원 브라우저 체크 */	
var useTouchEnnxKey = false;
try{
	if(TOUCHENEX_UTIL.isWin() || TOUCHENEX_UTIL.isMac()){
		if(TOUCHENEX_UTIL.isIE() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(TouchEnNxConfig.moduleMinVer.MSIE)) useTouchEnnxKey = true;
		else if(TOUCHENEX_UTIL.isChrome() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(TouchEnNxConfig.moduleMinVer.chromeMinVer)) useTouchEnnxKey = true;
		else if(TOUCHENEX_UTIL.isFirefox() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(TouchEnNxConfig.moduleMinVer.FireFoxMinVer)) useTouchEnnxKey = true;
		else if(TOUCHENEX_UTIL.isOpera() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(TouchEnNxConfig.moduleMinVer.OperaMinVer)) useTouchEnnxKey = true;
		else if(TOUCHENEX_UTIL.isSafari() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(TouchEnNxConfig.moduleMinVer.SafariMinVer)) useTouchEnnxKey = true;
		else if(TOUCHENEX_UTIL.isEdge())	useTouchEnnxKey = true;
		else useTouchEnnxKey = false;
	} else{
		useTouchEnnxKey = false;
	}
}catch(e){
	useTouchEnnxKey = false;
}

/** 브라우저 및 OS 정보 */
var TouchEn_BaseBRW = {
    ua: navigator.userAgent.toLowerCase(),
    ie: navigator.appName == 'Microsoft Internet Explorer',
    ie_: navigator.userAgent.match('MSIE') == 'MSIE',
    ns: navigator.appName == 'Netscape',
    ff: navigator.userAgent.match('Firefox') == 'Firefox',
    sf: navigator.userAgent.match('Safari') == 'Safari',
    op: navigator.userAgent.match('Opera') == 'Opera',
    cr: navigator.userAgent.match('Chrome') == 'Chrome',
    win: navigator.platform.match('Win') == 'Win',
    mac: navigator.userAgent.match('Mac') == 'Mac',
    linux: navigator.userAgent.match('Linux') == 'Linux',
    ie11: navigator.userAgent.match('Trident/7.0') == 'Trident/7.0'
};

var getTouchEnNXEType = {
    MSIEBrowser: (TouchEn_BaseBRW.win && (TouchEn_BaseBRW.ie || TouchEn_BaseBRW.ie11 || TouchEn_BaseBRW.ie_)),
    WebKitBrowser: (TouchEn_BaseBRW.mac || TouchEn_BaseBRW.ff || TouchEn_BaseBRW.sf || TouchEn_BaseBRW.cr || TouchEn_BaseBRW.op),
    OtherOS: (TouchEn_BaseBRW.mac || TouchEn_BaseBRW.linux)
};

function getInternetExplorerVersion() {
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}


var tk_Special_Mask_StartPos = "data-tk_hkStart_pos";
var tk_Special_Mask_EndPos =  "data-tk_hkEnd_pos";
var tk_Special_Mask = "data-tk_hk_mask";

var bDaemonType = false;
var TouchEnNx_preKeyCode=0;
var bInit = 0;
var bAddListner = 0;
var TouchEnNXE_E2EDATA = "";
var TouchEnNXE_SeedKey = "";
var cipherEncText = "";
var bAutoFocus = false;
//var TNK_SR = "";

var BSKeyBeingActive = false;

var DomID;
var TouchEnKeyNXE_CurObj;
var loadflag = false;
var fnGetEncXWCallback;
var fnGetEncYTCallback;
var fnGetEncGNCallback;
var fnGetEncUNCallback;
var fnGetEncHNCallback;
var bEnc2 = false;
var bTobe = false;


var tekOption = TouchEnNxConfig.solution.nxkey.tekOption;

if(TouchEnNxConfig.warningMacSierra == true && TOUCHENEX_UTIL.getOSInfo().name == "Sierra")
{
	alert("MAC OS X 10.12 Sierra 버전은 지원하지 않습니다.");
}

function IsGetAttributeNull(obj, attValue)
{
	if(obj == undefined) return true;
	if (attValue == undefined) return true;
	
	if (obj.getAttribute(attValue) == null)
		return true;
	
	return false;
}

function isDefaultSecurityOn(inputObj)
{
	if (tekOption.idbase == "true") {
		if (tekOption.defaultsecurityid == "false")
			return false;
	}
	else {
		if (inputObj.form && (inputObj.form.getAttribute("DefaultSecurity") == "off" || inputObj.form.getAttribute("data-DefaultSecurity") == "off"))
			return false;
	}
	return true;
}

//해당 입력 필드가 e2e 인지 여부를 판단
function isEnc(inputObj)
{
	if(inputObj.getAttribute("enc") == "on" 
		|| inputObj.getAttribute("enc") == "true" 
		|| inputObj.getAttribute("enc") == "yes"
		|| inputObj.getAttribute("data-enc") == "on" 
		|| inputObj.getAttribute("data-enc") == "true" 
		|| inputObj.getAttribute("data-enc") == "yes"
		)
		return true;
		
	if(inputObj.getAttribute("type") == "password" && tekOption.defaultenc == "true")		
		return true;
	
	return false;
}

function isSecurity(inputObj)
{
		if (isEnc(inputObj))
			return true;
			
		if (inputObj.getAttribute("security") == "on" ||  inputObj.getAttribute("security") == "true" || inputObj.getAttribute("security") == "yes" ||
		inputObj.getAttribute("data-security") == "on" || inputObj.getAttribute("data-security")=="true" || inputObj.getAttribute("data-security") == "yes")
			return true;
			
		if (IsGetAttributeNull(inputObj, "security") == true && IsGetAttributeNull(inputObj, "data-security") == true)
		{
			if(inputObj.getAttribute("tk_security") == "true")
				return true;
		}
		
		if(inputObj.getAttribute("type") == "password")
			return true;
		
		if (isDefaultSecurityOn(inputObj))
			return true;
		
		return false;
}


/**
 * 모듈 로딩
 *
 * status 가 true이면 체크를 요청한 모든 모듈이 정상 설치되었음을 의미합니다. 각각의 모듈은 info 배열 내 값을 통하여
 * 확인합니다. 페이지 최초 접속시에는 체크후에 반드시 LOADING을 수행하여 모듈별 EX실행 객체가 정상적으로 생성되도록 합니다.
 * LOADING은 status 값이 true인 경우에만 동작합니다.
 */
function TK_Loading() {
    try {
        if (!loadflag) {
        	//TouchEnNx.processingbar(true);
        if (window.onbeforeunload == null)
            window.onbeforeunload = function(){}; // cache 삭제

            TOUCHENEX_CHECK.check([touchenexInfo], "TK_Load");
            loadflag = true;
        }
    } catch (e) {
    	TouchEnNx.processingbar(false);
    }
}


function TK_Load(check) {
    try {
        exlog("TK_LoadingCallback", check);
        currStatus = check;
        if (currStatus.status) {
            touchenexInfo.tkInstalled = currStatus.status;
            TOUCHENEX_LOADING("TK_LoadingCallback");
        } else {
            TK_notInstall(currStatus);
        }
    } catch (e) {
    	TouchEnNx.processingbar(false);
    }
}

/**
 * 키보드보안 정상 로딩시 모듈 실행
 */
function TK_LoadingCallback(installed) {
    try {
        if (installed) {
            if (getTouchEnNXEType.WebKitBrowser && bAddListner == 0) {
                TK_AddEventListner();
            }
            if (bInit == 0) {
                TK_ApplySecurity();
            }
        }
    } catch (e) {
    	TouchEnNx.processingbar(false);
    }
}

/**
 * 설치 페이지 이동 함수 설명 : 설치 완료시 메인페이지 이동 함수 호출 TouchEnNxKey_Interface.js 에 페이지 설치를
 * 위해 이동 할 페이지 경로를 설정합니다.
 */


function TK_installPage() {
	TouchEnNx.processingbar(false);
    alert("고객님의 안전한 결제 위하여 \n보안프로그램 설치가 필요합니다.\n[확인]을 선택하시면 설치페이지로 연결됩니다.\n");
    if (typeof TouchEnKey_installpage == "undefined") {
        location.href = touchenexInfo.tkInstallpage;
   }
}

/**
 * 미 설치 일 떄 동작 함수.
 */
/**
 * 미 설치 일 떄 동작 함수.
 */
function TK_notInstall(currStatus) {
        try {
            if (!currStatus.status) { // 미 설치 일때
                touchenexInfo.tkInstalled = currStatus.status;
                if (typeof TouchEnKey_installpage == "undefined") {
                    TK_installPage();
                } else {
                    if (!currStatus.info[0].isInstalled) {
                        if (!currStatus.info[0].extension) {
                            // EX 미설치 chrome , firefox, opera extension 자동 이동
                            if (TOUCHENEX_UTIL.isChrome() || TOUCHENEX_UTIL.isFirefox() || (TOUCHENEX_UTIL.isOpera())) {
                                // TouchEnKey_extensiondownload();
                                touchenexInfo.exInstalled = false;
                            }
                        } else {
                            touchenexInfo.exInstalled = true;
                        }

                        if (!currStatus.info[0].client || !currStatus.info[0].EX) {
                            // client 파일이 미설치 되 었을 경우
                            touchenexInfo.clInstalled = false;
                        } else {
                            touchenexInfo.clInstalled = true;
                        }
                    } else {
                        // 설치완료
                        if (typeof TouchEnKey_installpage != "undefined") {
                            // 설치페이지이면 메인페이지 이동 로직 추가 또는메인페이지 이동 함수 호출
                        }
                    }
                }
            } else { // 설치완료
                touchenexInfo.tkInstalled = currStatus.status;
                if (typeof TouchEnKey_installpage != "undefined") {
                    // 설치페이지 이면 메인 페이지 이동 로직 추가 또는 메인 페이지 이동 함수 호출
                }
            }
        } catch (e) {
			exlog("_TOUCHENNX", "TK_notInstall() exception");
		}
    }
    /**
     * 정상 설치여부 확인을 위한 샘플 callback 으로 오는 인자값은 {"status":"false",
     * "info":[{"name":exPluginName, "isInstalled":true, "extension":true,
     * "EX":true, "client":true}}]}
     *
     * status 가 true이면 체크를 요청한 모든 모듈이 정상 설치되었음을 의미합니다. 각각의 모듈은 info 배열 내 값을 통하여
     * 확인합니다. 체크후에 반드시 LOADING을 수행하여 모듈별 EX실행 객체가 정상적으로 생성되도록 합니다. LOADING은 status
     * 값이 true인 경우에만 동작합니다.
     */

function TK_isInstallcheck() {
    try {
        TOUCHENEX_CHECK.check([touchenexInfo], 'TK_installCheckCallback');
    } catch (e) {
		exlog("_TOUCHENNX", "TK_isInstallcheck() exception");
	}
}

function TK_installCheck(callback) {
    try {
        TOUCHENEX_CHECK.check([touchenexInfo], callback);
    } catch (e) {
		exlog("_TOUCHENNX", "TK_installCheck() exception");
	}
}

function TK_installCheckCallback(check) {
    try {
        currStatus = check;
        if (currStatus.status) {
            touchenexInfo.tkInstalled = currStatus.status;
            if (typeof TouchEnKey_installpage != "undefined") {
                // 설치페이지 이면 메인페이지 이동 로직 추가 또는 메인페이지 이동 함수 호출
            }
        } else {
            TK_notInstall(currStatus); // 미설치 일 경우 함수 호출
        }
    } catch (e) {
		exlog("_TOUCHENNX", "TK_installCheckCallback() exception");
	}
}

function TouchEnKey_download() {
    
		if( (TOUCHENEX_UTIL.isWin() || TOUCHENEX_UTIL.isMac()) && (tekOption.runtype == "onlydaemon" || tekOption.runtype == "mainextension"))
		{
			TOUCHENEX_INSTALL.download('nxkey', 'daemon');
		}
		else
		{
			TOUCHENEX_INSTALL.download('nxkey', 'client');
		}
}

function TouchEnKey_extensiondownload() {
    TOUCHENEX_INSTALL.download('nxkey', 'extension');
}

function TK_DoSubmitByGetEnc() {
    if (tekOption.usegetenc != "true") {
        alert("Option usegetenc is not true");
    }
    frm = document.forms[0];
    if (getTouchEnNXEType.MSIEBrowser) {
        makeKeyData(frm);
    } else {
        GetEncData();
    }
}

function TK_makeEncData(frmObj) {
    try {
        cipherEncText = "";
        if (tekOption.usegetenc == "true") {
            alert("Option usegetenc is not false");
        }
        if (tekOption.usegetenc == "true") {
            GetEncData();
        } else {
            if (tekOption.idbase == "true") {
                var nodeLen = document.all.length;
                var htmlColl = document.all;
                for (var k = 0; k < nodeLen; k++) {
                    if (htmlColl[k].id.indexOf('E2E_') != -1) {
                        cipherEncText += htmlColl[k].id;
                        cipherEncText += "=";
                        cipherEncText += htmlColl[k].value;
                        cipherEncText += "%TK%";
                    }
                }
            } else {
                for (var k = 0; k < frmObj.elements.length; k++) {
                    if (frmObj.elements[k].tagName == "INPUT") {
                        if (frmObj.elements[k].name.indexOf('E2E_') != -1) {
                            cipherEncText += frmObj.elements[k].name;
                            cipherEncText += "=";
                            cipherEncText += frmObj.elements[k].value;
                            cipherEncText += "%TK%";
                        }
                    }
                }
            }
			
			if (IsAllowIdOverlap() == true)
			{
				if (tekOption.idbase == "true") {
					document.getElementById("hid_enc_data").value = cipherEncText;
				} else {
					frmObj.hid_enc_data.value = cipherEncText;
				}
			}
			else
			{
				var encField = "";
    			if (tekOption.idbase == "true")
    			{
    				 encField =  GetHiddenEncFieldName();
    				 var hid_enc_filed = document.getElementById(encField);
    				 
    				 if(typeof hid_enc_filed != "undefined" )
    					 hid_enc_filed.value = cipherEncText;
    					 
    			}
    			 else
    			{
    				 encField = GetHiddenEncFieldName(frmObj);
    				 
    				 frmObj[encField].value = cipherEncText;
    			}   			 
    		}
			return true;
        }
    } 
	catch (e) 
	{
        return false;
    }
}

function TK_ApplySecurity() {
    if (typeof TouchEnKey_installpage != "undefined")
        return false;
    if (getTouchEnNXEType.WebKitBrowser) {
        var array = new Uint8Array(16);
        window.crypto.getRandomValues(array);
        DomID = TouchEnNXE_createHexString(array, 16);
        DomID = DomID.substring(0, 32);
    } else {
        DomID = "iecb" + TOUCHENEX_UTIL.createId();
    }
	
	if(TOUCHENEX_UTIL.isMac() && TOUCHENEX_UTIL.isSafari() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= 12) {
		window.addEventListener("beforeunload", function (event) {
			try {
				touchenexInterface.TK_RealStop([false, DomID], "TK_Stop_callback");
				tekOption.bstart = 0;
			} catch (e) {
				exlog("_TOUCHENNX", "TK_ApplySecurity() beforeunload");
			}
			
			event.returnValue = "";
		});
	}

    TK_SetCallBack();
    try {
        if (window.frameElement)
            tekOption.iframename = window.frameElement.getAttribute("name");
        else
            tekOption.iframename = "";
    } catch (e) {
        tekOption.iframename = "_unknown_";
    }
    tekOption.exformname = touchenexInfo.exFormName;
    
    if (tekOption.iframename != "") {
      for (var i = 0; i < document.forms.length; i++) {
		var frmName = GetAttributeFormName(document.forms[i]);
        if (frmName != null && frmName != "" && frmName != touchenexInfo.exFormName) {
          tekOption.searchformname = frmName;
          break;
        }
      }
    }
    
    if (document.createEvent)
    	tekOption.firetype = "dispatch";
    
	if (typeof TNK_SR == "string") 
	{
		tekOption.srdk = TNK_SR;
	}
	tekOption.browserinfo = TOUCHENEX_UTIL.getBrowserInfo().browser;
	
	for(var i=0; i<TOUCHENEX_CHECK.chkInfoStatus.info.length; i++) {
		if (TOUCHENEX_CHECK.chkInfoStatus.info[i].licExpire != undefined && TOUCHENEX_CHECK.chkInfoStatus.info[i].licExpire != "")
			tekOption.licexpiredate = TOUCHENEX_CHECK.chkInfoStatus.info[i].licExpire;
	}
	
    var strOption = JSON.stringify(tekOption);
	touchenexInterface.TK_Init([false, DomID, strOption, ""],
        "TK_Init_callback");

	var k=0;
    try {
        if (tekOption.idbase == "true") {
            var htmlAllColl = document.all;

            for (var j = 0; j < htmlAllColl.length; j++) {
                if (htmlAllColl[j].tagName == "INPUT" &&
                    (htmlAllColl[j].type == "text" || htmlAllColl[j].type == "password") && isEnc(htmlAllColl[j])) {
                    Tk_InputErase(htmlAllColl[j]);
                }
            }
        } else {
            for (var i = 0; i < document.forms.length; i++) {
                for (var j = 0; j < document.forms[i].elements.length; j++) {
                  var bFound = false;
                  if (document.forms[i].elements[j].tagName == "INPUT" && (document.forms[i].elements[j].type == "text" || document.forms[i].elements[j].type == "password") && isEnc(document.forms[i].elements[j])) 
                    bFound = true;
                  if (bFound) {
                    Tk_InputErase(document.forms[i].elements[j]);
                    if (k == 0)
                      TouchEnKeyNXE_CurObj = document.forms[i].elements[j];
                    k++;
                  }
                }
            }
        }
    } catch (e) {
    	TouchEnNx.processingbar(false);
    }

}

function TK_Init_callback(result) {
	if(result.isvm == "true"){
		TouchEnNx.processingbar(false);
		if(typeof TouchEnNx.success == "function")	TouchEnNx.success(result);
	}
    if (result.result == "true") {

        bInit = 1;
        try {
            if (tekOption.idbase == "true") {
                makeEncDataId();
                //document.forms[0].id1.focus();
            } else {
                for (var i = 0; i < document.forms.length; i++) {
                    var frm = document.forms[i];
					if (GetAttributeFormName(frm) != undefined && GetAttributeFormName(frm) != touchenexInfo.exFormName)
                        makeEncDataEx(frm);
                }

            }
			
		if(TOUCHENEX_UTIL.isEdge())
		{
			var htmlAllColl = document.all;
			for (var j = 0; j < htmlAllColl.length; j++) 
			{
                if (htmlAllColl[j].tagName == "INPUT" && (htmlAllColl[j].type == "text" || htmlAllColl[j].type == "password")) 
				{	
					htmlAllColl[j].focus();
					htmlAllColl[j].blur();
					break;
                }
            }
		}
            
			if(result.enc2 == "true") {
			   bEnc2 = true;
			}

        } catch (e) {if(typeof TouchEnNx.success == "function") TouchEnNx.success(result);}
    	if(typeof TouchEnNx.success == "function")	TouchEnNx.success(result);
    }
    
}

function TK_SetCallBack() {
    var topURL;
    try {
        topURL = window.top.location.protocol + "//" + window.top.location.host + window.top.location.pathname;
    } catch (e) {
        topURL = document.referrer;
    }

    var cbdata = [];
    cbdata.push({
        "callbackid": DomID,
        "callback": TOUCHENEX_CONST.frameName + "update_callback",
        "orgurl": location.protocol + "//" + location.host + location.pathname,
        "topurl": topURL
    });
    touchenexInterface.TestEXPush(cbdata);
    tekOption.setcallback ="true";
}

function focusDataClear(inputObj){
	 try{
		if(getTouchEnNXEType.WebKitBrowser){
			if(tekOption.idbase == "true"){
				TK_Clear("", inputObj.id);
			}else{
			TK_Clear(GetAttributeFormName(inputObj.form), inputObj.name);
			}
			inputObj.selectionStart = 0;
			inputObj.selectionEnd = 0;
			inputObj.focus();
			var range = inputObj.createTextRange();
			range.collapse(false);
			range.select();	 
		}
	}catch(e){
		exlog("_TOUCHENNX", "focusDataClear() exception");
	}
}

/** 20150904 수정 */
function TK_Start(nsEvent) {
    if (tekOption.SetCallback == "false") {
        TK_SetCallBack();
        tekOption.SetCallback = "true";
    }
    if (!getTouchEnNXEType.WebKitBrowser)
        return;
    var theEvent;
    var inputObj;
    var comm=0;
    if (nsEvent.type == "text" || nsEvent.type == "password") {
        inputObj = nsEvent;
    } else {
        theEvent = nsEvent ? nsEvent : window.event;
        inputObj = theEvent.target ? theEvent.target : theEvent.srcElement;
    }
    if (bInit == 0) {
        inputObj.blur();
        return;
    }
    try {
				if(inputObj.value.length == 0 && bInit==1){
        	focusDataClear(inputObj);
        }
        var varEnableDummy = "off";
		
		if(inputObj.type=="text" && inputObj.getAttribute("data-dataType")=="n" && isEnc(inputObj) && inputObj.value.indexOf(",") > -1){
          	varEnableDummy = "on"; 
        	 comm = inputObj.value.split(",").length;
             if(comm > 1) comm--;
             else comm = 0;
        }
        TouchEnKeyNXE_CurObj = inputObj;
        var bReadOnly = "false";
        if (inputObj.readOnly == true)
            bReadOnly = "true";
        //ID 기반, FormName 이 없으면 ID 기반 방식으로 동작한다. 
        var formName = "";
        if (tekOption.idbase != "true") // ID기반이 아니면 ForeName을 set 한다.
            formName = GetAttributeFormName(inputObj.form);
		
		
		// 디폴트 시큐리티 여부를 확인한다. 
		// 표준, 하위 호환성 지원 
		var defaultSecurity = 1;
		if (!isDefaultSecurityOn(inputObj))
			defaultSecurity = 0x0;
		
        var tekInput = {
            "formName": formName,
            "name": inputObj.name,
            "id": inputObj.id,
            "type": inputObj.type,
            "enc": inputObj.getAttribute("enc"),
            "data-enc": inputObj.getAttribute("data-enc"),
            "maxlength": inputObj.getAttribute("maxlength"),
            "datatype": inputObj.getAttribute("datatype"),
            "data-datatype": inputObj.getAttribute("data-datatype"),
            "mask": inputObj.getAttribute("mask"),
            "data-mask": inputObj.getAttribute("data-mask"),
            "security": inputObj.getAttribute("security"),
            "data-security": inputObj.getAttribute("data-security"),
            "inputlength": inputObj.value.length,
            "inputdom": inputObj.value,
            "readonly": bReadOnly,
            "comm" : comm,
            "enabledummy" : varEnableDummy,
			"jsversion" : 1,
			"defaultsecurity" : defaultSecurity
        };
		
		
        if (inputObj.id.toString().length > 0 && tekOption.idbase == "true") {

            tekInput.formName = "";
            touchenexInterface.TK_Start(
                          [false, inputObj.id, DomID, tekInput], "TK_Start_callback");
        } else {
            touchenexInterface.TK_Start(
                          [false, inputObj.name, DomID, tekInput], "TK_Start_callback");
        }
    } catch (e) {
		exlog("_TOUCHENNX", "TK_Start() exception");
	}
}

function TK_Start_callback(result) {

    if (isEnc(TouchEnKeyNXE_CurObj)) {
        if (TouchEnKeyNXE_CurObj.value.length != 0 && TouchEn_BaseBRW.ff == false) {
            if (TouchEnKeyNXE_CurObj.selectionStart < TouchEnKeyNXE_CurObj.value.length) {
                TouchEnKeyNXE_CurObj.selectionStart = TouchEnKeyNXE_CurObj.value.length;
                TouchEnKeyNXE_CurObj.selectionEnd = TouchEnKeyNXE_CurObj.value.length;
            }

        }
    }

	if (result.StartReadyComplete != undefined)
	{
		if(result.StartReadyComplete=="success")
		{	
			//E2ESize 가 undefined E2E 필드가 아니다 
			if(result.E2ESize != undefined && result.InputName == TouchEnKeyNXE_CurObj.name)
			{
				
			     var comm = TouchEnKeyNXE_CurObj.value.split(",").length;
            	 if(comm > 1) comm--;
             	 else comm = 0;

				var E2EInputSize = parseInt(result.E2ESize, 10);
				var curInfiedlSize = TouchEnKeyNXE_CurObj.value.length;
				
				if (E2EInputSize != curInfiedlSize)
				{
					Tk_InputErase(TouchEnKeyNXE_CurObj);
					if(tekOption.idbase=="true")
							TK_Request2("ClearDB", "", TouchEnKeyNXE_CurObj.id, "");
					else
							TK_Request2("ClearDB", GetAttributeFormName(TouchEnKeyNXE_CurObj.form), TouchEnKeyNXE_CurObj.name, "");
				}
			}
			tekOption.bstart=1;
			
			return;
		}
	}
	
    if (result == "StartReadyComplete") {
        tekOption.bstart = 1;
        return;
    }

    if (result == "Start_Failed") {
        tekOption.bstart = 0;
        TK_Clear(TouchEnKeyNXE_CurObj.formName, TouchEnKeyNXE_CurObj.name);

        var HiddenEnc = "";

        if (tekOption.idbase == "true") {
            TK_Clear("", TouchEnKeyNXE_CurObj.id);
            HiddenEnc = "E2E_" + TouchEnKeyNXE_CurObj.id;

            if (isEnc(TouchEnKeyNXE_CurObj)) {
            	Tk_InputErase(document.getElementById(HiddenEnc)[0]);
            	Tk_InputErase(TouchEnKeyNXE_CurObj);
            }

        } else {
            TK_Clear(TouchEnKeyNXE_CurObj.formName, TouchEnKeyNXE_CurObj.name);
            HiddenEnc = "E2E_" + TouchEnKeyNXE_CurObj.name;

            if (isEnc(TouchEnKeyNXE_CurObj)) {
            	Tk_InputErase(document.getElementsByName(HiddenEnc)[0]);
            	Tk_InputErase(TouchEnKeyNXE_CurObj);
            }
        }
        TouchEnKeyNXE_CurObj.blur();
    }
}

function TK_Stop(nsEvent) {

    if (!getTouchEnNXEType.WebKitBrowser)
        return;

    var theEvent;
    var inputObj;

    if (nsEvent.type == "text" || nsEvent.type == "password") {
        inputObj = nsEvent;
    } else {
        theEvent = nsEvent ? nsEvent : window.event;
        inputObj = theEvent.target ? theEvent.target : theEvent.srcElement;
    }
    try {
        if (inputObj.id.toString().length > 0 && tekOption.idbase == "true") {
            touchenexInterface.TK_Stop([false, DomID, inputObj.id], "TK_Stop_callback");
        } else {
            touchenexInterface.TK_Stop([false, DomID, inputObj.name], "TK_Stop_callback");
        }
    } catch (e) {
		exlog("_TOUCHENNX", "TK_Stop() exception");
	}
}

function TK_Stop_callback(result) {}

function TK_Keyup(nsEvent) {
    var theEvent;
    var inputObj;

    if (!getTouchEnNXEType.WebKitBrowser)
        return;
    if (nsEvent.type == "text" || nsEvent.type == "password") {
        inputObj = nsEvent;
    } else {
        theEvent = nsEvent ? nsEvent : window.event;
        inputObj = theEvent.target ? theEvent.target : theEvent.srcElement;
    }
    var keycode = typeof nsEvent.which == "number" ? nsEvent.which : nsEvent.keyCode;
	if(keycode == undefined){
		exlog("_TOUCHENNX", "KeyCode undefined");
	}else{	
    var chCode = keycode.toString();

    if (tekOption.usebspress == undefined || tekOption.usebspress != "true") {
        if (keycode == 8) {
            BSKeyBeingActive = false;
        }
    }
}
}

function TK_Keypress(nsEvent) {
    var theEvent;
    var inputObj;

    if (!getTouchEnNXEType.WebKitBrowser)
        return;
    if (nsEvent.type == "text" || nsEvent.type == "password") {
        inputObj = nsEvent;
    } else {
        theEvent = nsEvent ? nsEvent : window.event;
        inputObj = theEvent.target ? theEvent.target : theEvent.srcElement;
    }
    var keycode = typeof nsEvent.which == "number" ? nsEvent.which : nsEvent.keyCode;
    var chCode = keycode.toString();
}

function TK_KeyDown(nsEvent) {
    var theEvent;
    var inputObj;

    if (!getTouchEnNXEType.WebKitBrowser)
        return;

    if (nsEvent.type == "text" || nsEvent.type == "password") {
        inputObj = nsEvent;
    } else {
        theEvent = nsEvent ? nsEvent : window.event;
        inputObj = theEvent.target ? theEvent.target : theEvent.srcElement;
    }

    try {
        // Call win32 export functionSS
        var keycode = typeof nsEvent.which == "number" ? nsEvent.which : nsEvent.keyCode;
        var chCode = keycode.toString();
		TouchEnNx_preKeyCode = keycode;
		
		var TK_isSecurity = false;
		var TK_isEnc = false;
		TK_isSecurity = isSecurity(TouchEnKeyNXE_CurObj);
		TK_isEnc = isEnc(TouchEnKeyNXE_CurObj);
		
		if(TK_isEnc == true) TK_isSecurity = true;


        if (tekOption.bstart != 1 && TK_isSecurity == true) {
        	return TK_InputCancle();
        }
		
		if(TOUCHENEX_UTIL.isMac())
		{
			if (keycode == 50 && TK_isSecurity == true && nsEvent.shiftKey==true)
			{	
				if (tekOption.tk_isRunningSecurity == "true")
				{
					return TK_InputCancle(nsEvent);
				}
			}
		}		
				
					
		if (keycode == 32)
		{
			if (inputObj.getAttribute("data-datatype") == "h" || inputObj.getAttribute("datatype") == "h"
				|| inputObj.getAttribute("data-datatype") == "hn"   || inputObj.getAttribute("datatype") == "hn" 
				|| inputObj.getAttribute("data-datatype") == "ahn"  || inputObj.getAttribute("datatype") == "ahn"
				|| inputObj.getAttribute("data-datatype") == "ha"	|| inputObj.getAttribute("datatype") == "ha"
				)
			{
				return TK_InputCancle(nsEvent);
				}
			}
		
		if (keycode == 0xff)
		{
			return TK_InputCancle(nsEvent);
		}
		
		TouchEnKeyNXE_CurObj.scrollLeft = TouchEnKeyNXE_CurObj.scrollWidth;
        

		
        if (TouchEnKeyNXE_CurObj.getAttribute("security") == "off" || TouchEnKeyNXE_CurObj.getAttribute("data-security") == "off") {
            if(keycode != 8 && keycode != 46)
				return;
        }

		// 붙여넣기 키 조합 감지
		var isPaste = false;
		var key = nsEvent.key;
        var cmd_held = nsEvent.metaKey | nsEvent.ctrlKey;
		if(cmd_held && key.toLowerCase() == "v") {
			isPaste = true; // 붙여넣기 키 조합이라면
		} else {
			isPaste = false;
		}
		
        // e2e 영역에 대해서 앞뒤위아래 커서 이동 금지, delete 키 금지
        if (isEnc(TouchEnKeyNXE_CurObj)) 
        { 
        	//defaultEnc 가 허용일때 paswword 필드에 대해서는 e2e가 기본설정이므로 허용을 막아야 한다.
            if (keycode == 0x25 || keycode == 0x26 || keycode == 0x27 || keycode == 0x28 ||
                keycode == 0x21 || keycode == 0x22 || keycode == 0x24 || keycode == 46 || isPaste == true) 
            {
            	return TK_InputCancle(nsEvent);
				}
            }

        if (isPaste == true) {
            if ((tekOption.defaultpaste == "false") || (tekOption.defaultpaste == "off") || (tekOption.defaultpaste == "no")) {
                //defaultpaste false 라도 비보안 영역은 붙여 넣기를 허용 
                if (TouchEnKeyNXE_CurObj.getAttribute("data-security") != "off" && TouchEnKeyNXE_CurObj.getAttribute("security") != "off") 
                {
                	return TK_InputCancle(nsEvent);
					}
            } else {
                // 일반 보안 영역 (E2E 아님)
                // 붙여 넣기 허용 일때, Datytype 이 들어 가 있으면 허용 하지 않는다. 
                // datatype 이 존재 하면 붙여 넣기 금지. 
                if (TouchEnKeyNXE_CurObj.getAttribute("datatype") != null || TouchEnKeyNXE_CurObj.getAttribute("data-datatype") != null) 
                {
                	return TK_InputCancle(nsEvent);
					}
                }
            }

        if (keycode == 8 || keycode == 46) {
            if (isEnc(TouchEnKeyNXE_CurObj)) {

                if (keycode == 8 && (tekOption.usebspress == undefined || tekOption.usebspress != "true")) {
                    if (BSKeyBeingActive == true) 
                    {
                    	return TK_InputCancle(nsEvent);
                    }
                    BSKeyBeingActive = true;
                }

                // DOM Comma 가 쓰여질 경우, 보안 모듈은 이 Comma 의 존재를 알지 못한다. 				
                // DOM 과 보안 모듈간의 데이터길이 동기화를 위해 모듈에 comma 의 쓰여졌다는걸 알린다.					
                if (TouchEnKeyNXE_CurObj.value[TouchEnKeyNXE_CurObj.value.length - 1] == ",") {
                    TK_Request("comma", "--");
                }
                
                var kLen = 32;    
                if (bEnc2 == true) 
                    kLen = 64;

                touchenexInterface.TK_KeyDown([false, chCode],
                    "TK_KeyDown_callback");

                if (tekOption.idbase == "true") {
                    var e2eEle = document.getElementById("E2E_" + inputObj.id);
                    if (inputObj && inputObj.id) {
                        if (e2eEle.value.length > 0) {
                            var value = e2eEle.value.substring(0, e2eEle.value.length - kLen);
                            Tk_InputErase(document.getElementById("E2E_" + inputObj.id));
                            document.getElementById("E2E_" + inputObj.id).value = value;
                        }
                    }
                } else {
					var e2eEle = null;
					var frmTmp = null;
					if (IsAllowIdOverlap() == true)
					{
						e2eEle = document.getElementsByName("E2E_" + inputObj.name);
						frmTmp = findElmentByNames(document.getElementsByName(inputObj.name)[0]);
					}
					else
					{
						frmTmp = document.activeElement.form;
						if (typeof frmTmp == "undefined") frmTmp = document.forms[0];
						
						e2eEle = frmTmp["E2E_" + inputObj.name];
					}

                    if (inputObj && inputObj.name) {
                        if (e2eEle[0].value.length > 0) {
                            var value = e2eEle[0].value.substring(0, e2eEle[0].value.length - kLen);
                            Tk_InputErase(frmTmp["E2E_" + inputObj.name]);
                            frmTmp["E2E_" + inputObj.name].value = value;
                        }
                    }
                }
                TouchEnKeyNXE_CurObj.value = TouchEnKeyNXE_CurObj.value.toString().substring(0, TouchEnKeyNXE_CurObj.value.toString().length);

            } else { //E2E 가 아닐때

                var len = TouchEnKeyNXE_CurObj.selectionEnd - TouchEnKeyNXE_CurObj.selectionStart;
                var CaretPos = GetCaretPosition(TouchEnKeyNXE_CurObj);
                var MaxLength = TouchEnKeyNXE_CurObj.getAttribute("maxlength");
                if ((keycode == 8 && len == 0 && CaretPos == 0) || (keycode == 46 && CaretPos == MaxLength)) 
                {
                	return TK_InputCancle(nsEvent);
                }
                if (len > 0) {
                    touchenexInterface.TK_KeyDown([false, chCode, len],
                        "TK_KeyDown_callback");
                } else {
                    touchenexInterface.TK_KeyDown([false, chCode],
                        "TK_KeyDown_callback");
                }
            }
        } else {
            if (tekOption.bstart == 0) 
            {
            	return TK_InputCancle(nsEvent);
            }

            if (keycode == 120)
            {
                var len = TouchEnKeyNXE_CurObj.value.length;
                touchenexInterface.TK_KeyDown([false, "255", len],
                "TK_KeyDown_callback");
            }

        }
    } catch (e) {
		exlog("_TOUCHENNX", "TK_KeyDown() exception");
	}
}

function TK_InputCancle(nsEvent)
{
	if (typeof nsEvent != undefined)
	{
	   if (TouchEn_BaseBRW.ff)
           nsEvent.preventDefault();
       else
    	   nsEvent.returnValue = false;
	}
	return false;
}

function TK_Change(nsEvent) {
}

function TK_Input(nsEvent) {
	if (TouchEnKeyNXE_CurObj == undefined) return;
	
	    if (nsEvent.type == "text" || nsEvent.type == "password") {
        inputObj = nsEvent;
    } else {
        theEvent = nsEvent ? nsEvent : window.event;
        inputObj = theEvent.target ? theEvent.target : theEvent.srcElement;
    }
		
	
	/*
		넥사크로 연동 시 'A', '0', '_' 더미 문자 Event 충돌 방지 
	*/
	if (TK_IsNal(theEvent.eventOwner) == false)
	{
		if (theEvent.eventOwner == "NXKEY")
			return;
	}	


	var bSecurity = true;
	if (inputObj.getAttribute("security") == "off" ||  inputObj.getAttribute("security") == "false" || inputObj.getAttribute("security") == "no" ||
		inputObj.getAttribute("data-security") == "off" || inputObj.getAttribute("data-security")=="false" || inputObj.getAttribute("data-security") == "no")
		bSecurity = false;

       
	if (tekOption.keyboardonly == "true" && bSecurity==true)
	{
		if (TouchEnNx_preKeyCode == 8 || TouchEnNx_preKeyCode == 46) return;
		if (TouchEnNx_preKeyCode > 128 || TouchEnNx_preKeyCode == 0) return;
		if (TouchEnKeyNXE_CurObj.value.length >1)
			TouchEnKeyNXE_CurObj.value = TouchEnKeyNXE_CurObj.value.substring(0,TouchEnKeyNXE_CurObj.value.length-1);
		else
			Tk_InputErase(TouchEnKeyNXE_CurObj);
			
		TouchEnNx_preKeyCode=0;	
		return;
	}
		

	if(tekOption.bstart != 1 && TouchEnKeyNXE_CurObj!=undefined && bSecurity==true)
	{
		if(TouchEnNx_preKeyCode != 0) {
			Tk_InputErase(TouchEnKeyNXE_CurObj);			
		}
	}
	
	if (TouchEnKeyNXE_CurObj.value.length == 0 && TouchEnKeyNXE_CurObj!=undefined)
		if(tekOption.idbase == "true"){
			TK_Clear("", TouchEnKeyNXE_CurObj.id);
		}else{
		TK_Clear(GetAttributeFormName(TouchEnKeyNXE_CurObj.form), TouchEnKeyNXE_CurObj.name);
		}
	
	// 키보드 보안은 시작 했는데, 보안 안된 데이터가 들어오면 암호화 한다. 
	var bE2E = isEnc(inputObj);
	if(tekOption.bstart == 1 && bE2E == true)
	{
		
		if (TouchEnNx_preKeyCode == 8 || TouchEnNx_preKeyCode == 46) return;
		
		var code;
		if (inputObj.value.length > 0)
		{
			code = inputObj.value[inputObj.value.length-1];
			if(tekOption.idbase == "true"){
				TK_Request2("ReqCryptData", "", inputObj.id, code);
			} else {
			TK_Request2("ReqCryptData", GetAttributeFormName(inputObj.form), inputObj.name, code);
		}			
		}			
		//console.log("20160405 inputValue : " + inputObj.value + " code : " + code );
		
	}
  TouchEnNx_preKeyCode=0;  
}

function TK_KeyDown_callback(result) {}

function TK_Select(nsEvent) {
    var theEvent;
    var inputObj;

    if (nsEvent.type == "text" || nsEvent.type == "password") {
        inputObj = nsEvent;
    } else {
        theEvent = nsEvent ? nsEvent : window.event;
        inputObj = theEvent.target ? theEvent.target : theEvent.srcElement;
    }

    if ((inputObj.selectionStart > 0 && inputObj.selectionEnd > 0) || (inputObj.selectionEnd - inputObj.selectionStart > 0)) {
        if (isEnc(inputObj)) {
            if (TouchEn_BaseBRW.ff)
            {
                nsEvent.preventDefault();
            }
            else
            {
                
                if (inputObj.selectionStart < inputObj.value.length) {
                    inputObj.selectionStart = inputObj.value.length;
                    inputObj.selectionEnd = inputObj.value.length;
                }
            }
        }
    }

    return true;
}


function TK_SetScroll(start, end) {

    try {

        if (isEnc(TouchEnKeyNXE_CurObj)) 
        {
                TouchEnKeyNXE_CurObj.selectionStart = start;
                TouchEnKeyNXE_CurObj.selectionEnd = end;
        }
    } catch (e) {
		exlog("_TOUCHENNX", "TK_SetScroll() exception");
	}
}



function TK_click(nsEvent) {

    if (nsEvent.type == "text" || nsEvent.type == "password") {
        inputObj = nsEvent;
    } else {
        theEvent = nsEvent ? nsEvent : window.event;
        inputObj = theEvent.target ? theEvent.target : theEvent.srcElement;
    }

    try {
        // Call win32 export functionSS		
        EncOnFieldDisableEvent(inputObj);

        if (isEnc(TouchEnKeyNXE_CurObj)) //defaultEnc 가 허용일때 paswword 필드에 대해서는 e2e가 기본설정이므로 허용을 막아야 한다.
        {
            if (TouchEnKeyNXE_CurObj.selectionStart < TouchEnKeyNXE_CurObj.value.length) {
                TouchEnKeyNXE_CurObj.selectionStart = TouchEnKeyNXE_CurObj.value.length;
                TouchEnKeyNXE_CurObj.selectionEnd = TouchEnKeyNXE_CurObj.value.length;
            }
        }


    } catch (e) {
		exlog("_TOUCHENNX", "TK_click() exception");
	}
}

//보안대상인지 여부 확인 (리스너 걸지 여부)
function TK_IsSecurityType(obj)
{
	
	if (obj.tagName == "INPUT" && (obj.type == "text" || obj.type == "password" || obj.type == "tel" || obj.type == "number" || obj.type == "email"))
		return true;
	
	return false;
}

function TK_AddEventListner() {
    try {
        if (tekOption.idbase == "true") {
            var htmlAllColl = document.all;
            for (var j = 0; j < htmlAllColl.length; j++) {
               	if (TK_IsSecurityType(htmlAllColl[j]) == true) 
				{
                    TK_AddEventListner2(htmlAllColl[j]);
                }
            }
        } else {
            for (var i = 0; i < document.forms.length; i++) {
                for (var j = 0; j < document.forms[i].elements.length; j++) 
				{
                    if (TK_IsSecurityType(document.forms[i].elements[j]) == true) 
					{
						var eleObj = document.forms[i].elements[j];
                        TK_AddEventListner2(eleObj);
                        //eleObj.setAttribute("tk_security", "true");
                    }
                }
            }
        }
        bAddListner = true;
    } catch (e) {
		exlog("_TOUCHENNX", "TK_AddEventListner() exception");
	}
}

function TK_AddEventListner2(eobj) {
    if (!getTouchEnNXEType.WebKitBrowser) return false;
    try {
        if (eobj.addEventListener) {
            eobj.addEventListener("focus", TK_Start, false);
            eobj.addEventListener("blur", TK_Stop, false);
            eobj.addEventListener("keydown", TK_KeyDown, false);
            eobj.addEventListener("keypress", TK_Keypress, false);
            eobj.addEventListener("keyup", TK_Keyup, false);
            eobj.addEventListener("select", TK_Select);
            eobj.addEventListener("click", TK_click);
            eobj.addEventListener("contextmenu", TK_OnContextMenu);
            eobj.addEventListener("paste", TK_OnPaste);
            eobj.addEventListener("change", TK_Change);
            eobj.addEventListener("input", TK_Input);
        } else if (eobj.attachEvent) {
            eobj.attachEvent("onfocus", TK_Start);
            eobj.attachEvent("onblur", TK_Stop);
            eobj.attachEvent("onkeydown", TK_KeyDown);
            eobj.attachEvent("onkeypress", TK_Keypress);
            eobj.attachEvent("onkeyup", TK_Keyup);
            eobj.attachEvent("onselect", TK_Select);
            eobj.attachEvent("onclick", TK_click);
            eobj.attachEvent("oncontextmenu", TK_OnContextMenu);
            eobj.attachEvent("onpaste", TK_OnPaste);
            eobj.attachEvent("onchange", TK_Change);
            eobj.attachEvent("oninput", TK_Input);
        }
        if ((bInit != undefined && bInit != 0) && eobj.value.length==0) {
        	if(tekOption.idbase == "true"){
				TK_Clear("", eobj.id);
			}else{
        	TK_Clear(GetAttributeFormName(eobj.form), eobj.name);
        }
        }
		
		if (eobj.getAttribute("security") == "off" ||  eobj.getAttribute("security") == "false" || eobj.getAttribute("security") == "no" ||
		eobj.getAttribute("data-security") == "off" || eobj.getAttribute("data-security")=="false" || eobj.getAttribute("data-security") == "no")
		{
			eobj.setAttribute("tk_security", "false");
		}
		else if (eobj.getAttribute("security") == "on" ||  eobj.getAttribute("security") == "true" || eobj.getAttribute("security") == "yes" ||
		eobj.getAttribute("data-security") == "on" || eobj.getAttribute("data-security")=="true" || eobj.getAttribute("data-security") == "yes")
		{
			eobj.setAttribute("tk_security", "true");
		}
		else
		{
			eobj.setAttribute("tk_security", "true");
		}	
    } catch (e) {
		exlog("_TOUCHENNX", "TK_AddEventListner2() exception");
	}
}

function DrawHiddenElements() {
    try {

	var hidKeyData = "hid_key_data";
	var hidEncData = "hid_enc_data";
	var hidkeyDataId = "hid_key_data";
	var hidEncDataId ="hid_enc_data";
	
	var form = null;
	var e2eEle = null;
	
	if (IsAllowIdOverlap() == false)
	{
		form = document.activeElement.form;
		if (typeof form == "undefined") form = document.forms[0];
		
		if (typeof form.name != "undefined" &&  form.name.length > 0 ) 
		{
			hidKeyData = "hid_key_data_" + form.name;
			hidEncData = "hid_enc_data_" + form.name;
		}
		if (typeof form.id != "undefined" &&  form.id.length > 0 ) 
		{
			hidkeyDataId = "hid_key_data_" + form.id;
			hidEncDataId = "hid_enc_data_" + form.id;
		}
	}
	
	 e2eEle = findElementByName(form,hidKeyData);
	
    if (e2eEle == null) {
            var newEle = document.createElement("input");
            newEle.type = "hidden";
            newEle.name = hidKeyData;
            newEle.id = hidkeyDataId;
            Tk_InputErase(newEle);
            form.appendChild(newEle);
        } else {
            if (e2eEle.name != undefined)
            {
            	e2eEle.name = hidKeyData;
                e2eEle.id   = hidkeyDataId;
            }
        }
		
		e2eEle = null; 
        e2eEle = findElementByName(form, hidEncData);
        if (e2eEle == null) {

            var newEle = document.createElement("input");
            newEle.type = "hidden";
            newEle.name = hidEncData;
            newEle.id = hidEncDataId;
            Tk_InputErase(newEle);         
            form.appendChild(newEle);
        } else {
        	e2eEle.name = hidEncData;
        	e2eEle.id = hidEncDataId;
        }
    } catch (e) {
		exlog("_TOUCHENNX", "DrawHiddenElements() exception");
    }
}

function DrawHiddenElements(form) {
    try {
		
		var hidkeyDataId = "hid_key_data";
		var hidEncDataId ="hid_enc_data";
		var e2eEle = null;
		
		if (IsAllowIdOverlap() == false)
		{
			if (typeof form.id != "undefined" &&  form.id.length > 0 ) 
			{
				hidkeyDataId = "hid_key_data_" + form.id;
				hidEncDataId = "hid_enc_data_" + form.id;
			}
		}
		
		e2eEle = findElementByName(form, hidkeyDataId);
		
        if (e2eEle == null) {
            var newEle = document.createElement("input");
            newEle.type = "hidden";
            newEle.name = hidkeyDataId;			  
            newEle.id = hidkeyDataId;
            Tk_InputErase(newEle);            
            form.appendChild(newEle);
        } else {
            if (e2eEle.name != undefined) {
            	e2eEle.name = hidkeyDataId;
                e2eEle.id = hidkeyDataId;
            }
        }
		
		e2eEle = null;
		e2eEle = findElementByName(form, hidEncDataId);
		
        if (e2eEle == null) {

            var newEle = document.createElement("input");
            newEle.type = "hidden";
            newEle.name = hidEncDataId;
            newEle.id = hidEncDataId;
            Tk_InputErase(newEle);
            form.appendChild(newEle);
        } else {
            e2eEle.id = hidEncDataId;
        }
    } catch (e) {
		exlog("_TOUCHENNX", "DrawHiddenElements(form) exception");
    }
}


function DrawHiddenElementsId() {
    try {
		var hidkeyDataId = "hid_key_data";
		var hidEncDataId ="hid_enc_data";
		var e2eEle = null;
		
		if (IsAllowIdOverlap() == false)
		{
			if (typeof form.id != "undefined" &&  form.id.length > 0 )
			{
				hidkeyDataId = hidkeyDataId +"_" + form.id;
				hidEncDataId = hidEncDataId +"_ " +  form.id;
			}
		}
		
		
		e2eEle = findElmentByNamesId("hid_key_data");
        if (e2eEle == null) {
            var newEle = document.createElement("input");
            newEle.type = "hidden";
            newEle.id = "hid_key_data";

            Tk_InputErase(newEle);
            document.body.appendChild(newEle);
        } else {
            if (e2eEle.id != undefined) {
                e2eEle.id = "hid_key_data";
            }
        }
        
        e2eEle = null;

        e2eEle = findElmentByNamesId("hid_enc_data");
        if (e2eEle == null) {
            var newEle = document.createElement("input");
            newEle.type = "hidden";
            newEle.id = "hid_enc_data";

            Tk_InputErase(newEle);
            document.body.appendChild(newEle);

        } else {
            if (e2eEle.id != undefined)
                e2eEle.id = "hid_enc_data";
        }
    } catch (e) {
		exlog("_TOUCHENNX", "DrawHiddenElementsId() exception");
    }
}

function GetEncDataFun(keyData, frm, eleName) {
    touchenexInterface.GetEncData([keyData, frm, eleName],
        "GetEncDataCallback2");
}

function makeKeyData(formObj) {
    var len = formObj.elements.length;

    for (var j = 0; j < len; j++) {
        if (formObj.elements[j].tagName == "INPUT" && isEnc(formObj.elements[j])) {
            GetEncDataFun("", GetAttributeFormName(formObj), formObj.elements[j].name);
        }
    }
    GetEncDataFun(tekOption.cert, "", "");
}

function makeEncDataEx(formObj) {

    if (tekOption.idbase == "true") {
        DrawHiddenElementsId();
    } else {
        DrawHiddenElements(formObj);
    }

    var e2eEle = "";
    var j = 0;
    var name = new Array(formObj.elements.length);
    var value = new Array(formObj.elements.length);
    var len = formObj.elements.length;
    var makeEncFiled = false;
    for (var i = 0; i < len; i++) {
        makeEncFiled = false;
        var InputObject = formObj.elements[j];

        if (tekOption.defaultenc != "undefined") {
            if (InputObject.tagName == "INPUT" && (tekOption.defaultenc == "on" || tekOption.defaultenc == "yes" || tekOption.defaultenc == "true")) {
                if (InputObject.type == "password")
                    makeEncFiled = true;
            }
        }
        if (makeEncFiled == false) {
            if (InputObject.tagName == "INPUT" && isEnc(InputObject)) {
                makeEncFiled = true;
            }
        }        
        
        if (makeEncFiled == true) {
        	if (InputObject.tagName == "INPUT" && isEnc(InputObject)) {
	            name[j] = "";
	            value[j] = "";
	            name[j] = "E2E_" + InputObject.name;
	
	            e2eEle = findElementByName(formObj, name[j]);
	            if (e2eEle == null) {
	                var newEle = document.createElement("input");
	                newEle.type = "hidden";
	                newEle.name = name[j];
	                Tk_InputErase(newEle);
	                formObj.appendChild(newEle);
	            }
	            try{
	            	InputObject.setAttribute("autocomplete", "off");
	        	}catch(e){
					exlog("_TOUCHENNX", "makeEncFiled setAttribute exception");
				}
        	}
        }
        j++;
    }
}

function makeEncDataId() {
    DrawHiddenElementsId();
    var e2eEle = "";
    var j = 0;
    var makeEncFiled = false;
    var htmlAllColl = document.all;
    var len = htmlAllColl.length;

    for (var i = 0; i < len; i++) {
        if (htmlAllColl[i].tagName != "INPUT") continue;
        if (htmlAllColl[i].type != "text" && htmlAllColl[i].type != "password") continue;

        makeEncFiled = false;
        InputObject = htmlAllColl[i];
        if (tekOption.defaultenc != "undefined") {
            if (InputObject.tagName == "INPUT" && (tekOption.defaultenc == "on" || tekOption.defaultenc == "yes" || tekOption.defaultenc == "true")) {
                if (InputObject.type == "password")
                    makeEncFiled = true;
            }
        }
        if (makeEncFiled == false) {
            if (InputObject.tagName == "INPUT" && isEnc(InputObject)) {
                makeEncFiled = true;
            }
        }

        if (makeEncFiled == true) {
            var E2E_id = "E2E_" + InputObject.id;
            e2eEle = findElmentByNamesId(E2E_id);
            if (e2eEle == null) {
                var newEle = document.createElement("input");
                newEle.type = "hidden";
                newEle.id = E2E_id;
                Tk_InputErase(newEle);
                document.body.appendChild(newEle);
            } else {
            	Tk_InputErase(document.getElementById(E2E_id));
            }
        }
        j++;
    }
}




function GetEncData() {

    if (tekOption.idbase == "true") {
        var nodeLen = document.all.length;
        var htmlColl = document.all;

        for (var k = 0; k < nodeLen; k++) {
            var ele = htmlColl[k];
            if (ele.type == "hidden" && (ele.id.indexOf("E2E_") != -1)) {
                if (tekOption.UseGetEnc == "true" && tekOption.clearbufferonempty == "true") {
                    var eleRaw = ele.name.substring(ele.id.indexOf("_") + 1);
                    if (document.getElementById(eleRaw).value.length == 0) {
                        continue;
                    }
                }
                touchenexInterface.GetEncData([false, "",
     ele.id.substring(4, ele.id.length), DomID],
                    "GetEncDataCallback");
            }
        }
    } else {
        for (var k = 0; k < frm.length; k++) {
            var ele = frm.elements[k];
            if (ele.type == "hidden" && (ele.name.indexOf("E2E_") != -1)) {
                if (tekOption.usegetenc == "true" && tekOption.clearbufferonempty == "true") {
                    var eleRaw = ele.name.substring(ele.name.indexOf("_") + 1);
                    if (document.getElementsByName(eleRaw)[0].value.length == 0) {
                        continue;
                    }
                }
                touchenexInterface.GetEncData([false, GetAttributeFormName(frm),
     ele.name.substring(4, ele.name.length), DomID],
                    "GetEncDataCallback");
            }
        }

        var end = "GetEncEnd";
        touchenexInterface.GetEncData([false, null, end, DomID],
            "GetEncDataCallback");
    }
}

function TouchEnKey_UIEevents(frm, ele, event, keycode) {
    var obj;
    var e;

	obj = document.activeElement;
	eventName = event.replace("on", "");
	//triggerEvent(obj, e, keycode);

	var htmlEvents = {
        onkeydown: 1,
        onkeypress: 1,
        onkeyup: 1
    };
    var eventOjb;
	if (document.createEvent) {
        eventOjb = document.createEvent('HTMLEvents');
        eventOjb.initEvent(eventName, true, true);
	}else if (document.createEventObject) {
        eventOjb = document.createEventObject();
        eventOjb.eventType = eventName;
	}
	
	/*
		넥사크로 연동 시 키보드 보안에서 발생한 Event 임을 명시 
	*/
	if(keycode == '0' || keycode == 'A' || keycode == '_')
    {
		eventOjb.eventOwner = 'NXKEY';
    } 


    eventOjb.eventName = eventName;
    eventOjb.keyCode = keycode;
    eventOjb.which = keycode;

    if (obj.dispatchEvent) {
		obj.dispatchEvent(eventOjb);
    } else if (obj.fireEvent && htmlEvents['on' + eventName]) {
        obj.fireEvent('on' + eventOjb.eventType, eventOjb);
    } else if (obj[eventName]) {
        obj[eventName]();
    } else if (obj['on' + eventName]) {
        obj['on' + eventName]();
    }
}

var ishasfocus = true;
function onBlur() {
	ishasfocus = false;
};
function onFocus(){
	ishasfocus = true;
};

function TK_RealStopProcess(activeObj)
{
	
	var isRealStopProcess = true;
	
	
	if (TK_IsNal(tekOption.useAddElementType) == true && tekOption.useAddElementType == "true")
	{
		if ((activeObj.type == "text" || activeObj.type == "password" || activeObj.type == "email" 
			|| activeObj.type == "tel") && TK_isSecurity == true)
		{
			isRealStopProcess = false;
		}
	}
	else
	{
		if ((activeObj.type == "text" || activeObj.type == "password") && TK_isSecurity == true) {
			isRealStopProcess = false;
		}
	}
	
	if (tekOption.idbase == "true") {
		if (isRealStopProcess == false) {
			return false;;
		} else {
			try {
				touchenexInterface.TK_RealStop([false, DomID], "TK_Stop_callback");
				if (tekOption.bstart == 0) {
					if (isSecurity() == false)
						tekOption.bstart = 1;
				}
			} catch (e) {
				exlog("_TOUCHENNX", "id base isSecurity set exception");
			}
		}
	} else {
		if (isRealStopProcess == false) {
			return false;
		} else {
			try {
				touchenexInterface.TK_RealStop([false, DomID], "TK_Stop_callback");
				if (tekOption.bstart == 0) {
					if (isSecurity() == false)
						tekOption.bstart = 1;
				}
			} catch (e) {
				exlog("_TOUCHENNX", "form base isSecurity set exception");
			}
		}
	}
	
	return true;
}


function update_callback(result) {
    if (result.length != undefined) {
        result = JSON.parse(result);
    }

    if (result.ClearCallBack != undefined) {
        tekOption.setcallback = "false";
    }

    if (result.FaqMove != undefined) {
        this.top.location.href = result.FaqMove;
        return;
    }

	if (result.Refresh != undefined) {
		window.location.reload(true);
		return;
	}
	
    if (document.hasFocus() == false) {
        touchenexInterface.TK_RealStop([false, DomID], "TK_Stop_callback");
        tekOption.bstart = 0;
        return;
    }

    if (result.GetActiveElement != undefined) {

        var bsecurityOff = false;

        var activeObj = document.activeElement;
        if (activeObj != undefined) {
			if(TOUCHENEX_UTIL.isSafari()) {
				var name = "";
				window.onblur = onBlur;
				window.onfocus = onFocus;
				
				if (tekOption.idbase == "true")
					tek_name = activeObj.id;
				else
					tek_name = activeObj.name;
				
				if (tek_name == result.GetActiveElement) 
				{
					  touchenexInterface.TK_RealStop([false, DomID], "TK_Stop_callback");
                        tekOption.bstart = 0;
						return;
				}
				
				if( ishasfocus == false) {
					try {
						touchenexInterface.TK_RealStop([false, DomID], "TK_Stop_callback");
						tekOption.bstart = 0;
					} catch (e) {
						exlog("_TOUCHENNX", "update_callback() ishasfocus");
					}
				}
			}
			
            // blur 가 발생한 input 객체와, 지금 활성한된 입력필드가 같은지를 비교하여, 틀리면 stop 시키지 않는다.
            // activeObj 가 "" 이면 stop 시킨다. (alert 창이 들때, INPUT 이면서 activeObj 가 "" 로 들어온다//)

		var TK_isSecurity = false;
		var TK_isEnc = false;
		TK_isSecurity = isSecurity(activeObj);
		TK_isEnc = isEnc(activeObj);
		
		if (TK_isEnc == true)
			TK_isSecurity = true;
			
		
				
			if (TK_isSecurity == true && (activeObj.type == "text"  || activeObj.type == "password"))
			{
				return;
			}
			
			if (TK_RealStopProcess(activeObj) == false) return;
        }
    }

    if (result.inputClear != undefined) {
        if (tekOption.idbase == "true") {
            var HiddenEnc = "E2E_" + result.inputClear;
            var TK_tmp = document.getElementById(result.inputClear);
            if (isEnc(TK_tmp)) {
            	Tk_InputErase(document.getElementById(HiddenEnc));
            	Tk_InputErase(document.getElementById(result.inputClear));
                return;
            }
            else{
                if ( document.getElementById(HiddenEnc) != undefined)
                {
                	Tk_InputErase(document.getElementById(HiddenEnc));
                	Tk_InputErase(document.getElementById(result.inputClear));
                }
                return;
            }
        } else {
            var HiddenEnc = "E2E_" + result.inputClear;
            var TK_tmp = document.getElementsByName(result.inputClear)[0];
            if (isEnc(TK_tmp)) {
            	Tk_InputErase(document.getElementsByName(HiddenEnc)[0]);
            	Tk_InputErase(document.getElementsByName(result.inputClear)[0]);
                return;
            }
            else
            {
                if ( document.getElementsByName(HiddenEnc)[0] != undefined)
                {
                	Tk_InputErase(document.getElementsByName(HiddenEnc)[0]);
                	Tk_InputErase(document.getElementsByName(result.inputClear)[0]);
                }
                return;
            }
        }
    }

    if (result.EncData != undefined) 
	{
		var TK_isEncAppend = true;
		if (TK_IsNal(result.value) == true)
			return;
		var TK_RecvDataLength = result.value.split("_#_").length;	

		if (TK_RecvDataLength == 4) {
			TK_isEncAppend = TK_AddChar_Request(result);
		}
		
		if (TK_isEncAppend == true)
			TK_EncData_Request(result);					 
		return;
	}
	
	
	
	if (TouchEn_BaseBRW.mac && result.KeySecurity != undefined)
	{
		if(tekOption.tk_isRunningSecurity == "false")
		{ 
			tekOption.tk_isRunningSecurity = "true";
			TK_Request2("jsDummyGenStart", "", "", "");
		}
	}


    if (result.addChar != undefined) 
	{
		return TK_AddChar_Request(result);
	}
		
    if (result.E2E_END != undefined) {
        if (tekOption.idbase == "true") {
            document.body.hid_key_data.value = TouchEnNXE_SeedKey;
        } else {
            frm.hid_key_data.value = TouchEnNXE_SeedKey;
        }
        return;
    }


    if (result.SeedKey != undefined) {
            cipherEncText = "";
            TouchEnNXE_SeedKey = result.value;
			var hidKeyData = null;

            if (tekOption.idbase == "true") {
                DrawHiddenElementsId();
                document.getElementById("hid_key_data").value = TouchEnNXE_SeedKey;
            } else {
                for (var i = 0; i < document.forms.length; i++) {
					var frm = document.forms[i];
                    DrawHiddenElements(frm);
					if (IsAllowIdOverlap() == false)
					{
						hidKeyData = GetHiddenKeyFieldName(frm);
						if (frm[hidKeyData].value.length < 512)
							frm[hidKeyData].value =TouchEnNXE_SeedKey;
						
					}
					else
					{
						if (frm.hid_key_data != undefined)
						{
							if (frm.hid_key_data.value.length < 512)
								frm.hid_key_data.value =TouchEnNXE_SeedKey;
						}
					}
                }
            }
	}
}

function GetHiddenEncFieldName(form)
{
	
	var hidEncDataField ="hid_enc_data";
	
	if (typeof form != "undefined" ) 
	{
		if (typeof form.name != "undefined" &&  form.name.length > 0 )
		{
			hidEncDataField= "hid_enc_data_" + form.name;
		}
		if (typeof form.id != "undefined" &&  form.id.length > 0 )
		{
			hidEncDataField = "hid_enc_data_" +  form.id;
		}
	}
	
	return hidEncDataField;
}

function GetHiddenKeyFieldName(form)
{
	var hidkeyDataField ="hid_key_data";
	
	if (typeof form != "undefined" ) 
	{
		if (typeof form.name != "undefined" &&  form.name.length > 0 )
		{
			hidkeyDataField= "hid_key_data_" + form.name;
		}
		if (typeof form.id != "undefined" &&  form.id.length > 0 )
		{
			hidkeyDataField = "hid_key_data_" +  form.id;
		}
	}
	
	return hidkeyDataField;
}

function GetEncDataCallback(Result) {

}

function GetEncDataCallback2(result) {
    formObj = document.forms[0];
    var name, value;
    var result = result.reply;
    if (result.keydata == undefined) {
        name = "E2E_" + result.name;
        id = "E2E_" + result.name;
        value = result.value;

        cipherEncText += name;
        cipherEncText += "=";
        cipherEncText += value;
        cipherEncText += "%TK%";
        e2eEle = findElementByName(formObj, name);
        if (e2eEle == null) {
            var newEle = document.createElement("input");
            newEle.type = "hidden";
            newEle.name = name;
            newEle.id = name;
            newEle.value = value;
            formObj.appendChild(newEle);
        } else {
            e2eEle.value = value;
        }
    } else {
        DrawHiddenElements(formObj);

        formObj.hid_key_data.value = result.keydata;
        formObj.hid_enc_data.value = cipherEncText;
        cipherEncText = "";


        document.forms[0].method = "post";
        document.forms[0].action = "./jsp/result.jsp";
        document.forms[0].submit();
    }
}

function TouchEnNXE_createHexString(arr, size) {
    var result = "";
    for (var i = 0; i < size; i++) {
        var str = arr[i].toString(16);

        if (str.length == 1) {
            str = '0' + str;
        }
        result += str;
    }
    return result;
}

function findElementByName(formObj, eleName) {
    try {
        if (eleName == null) {
            return null;
        }
        var findEle = null;
        var len = formObj.elements.length;
        for (var k = 0; k < len; k++) {
            if (eleName == formObj.elements[k].name) {
                findEle = formObj.elements[k];
            }
        }
        return findEle;
    } catch (e) {
		exlog("_TOUCHENNX", "findElementByName() exception");

    }
}

function findElmentByNames(Element) {
    try {
        if (Element == null)
            return null;
        while (Element) {
            Element = Element.parentNode;
            if (Element.tagName == "FORM" || Element.tagName == "form") {
                return Element;
                break;
            }
        }
    } catch (e) {
			exlog("_TOUCHENNX", "findElmentByNames() exception");

    }
}


function findElmentByNamesId(id) {
    try {
        if (id == null) {
            return null;
        }
        var findEle = null;

        var htmlAllColl = document.all;
        for (var j = 0; j < htmlAllColl.length; j++) {
            if (htmlAllColl[j].tagName == "INPUT" && htmlAllColl[j].type == "hidden") {
                if (htmlAllColl[j].id == id) {
                    findEle = htmlAllColl[j];
                    return findEle;
                }
            }
        }
        return findEle;
    } catch (e) {
			exlog("_TOUCHENNX", "findElmentByNamesId() exception");

    }

}

function GetCaretPosition(oField) {
    var iCaretPos = 0;
    if (document.selection) {
        oField.focus();
        var oSel = document.selection.createRange();
        oSel.moveStart('character', -oField.value.length);
        iCaretPos = oSel.text.length;
    } else if (oField.selectionStart || oField.selectionStart == '0') {
        iCaretPos = oField.selectionStart;
    }
    return (iCaretPos);
}

function TK_Request(key, value) {

    var strReq;


    if (key != null) {
        var req = {
            "key": key,
            "value": value
        };
        strReq = JSON.stringify(req);
    } else {
        strReq = JSON.stringify(value);

    }

    touchenexInterface.TK_Request([strReq], "TK_Request_Callback");
}


function TK_Request2(key, frmname, elename, value) {
    var req = {
        "key": key,
        "frmname": frmname,
        "elename": elename,
        "DomID": DomID,
        "value": value
    };
    TK_Request(null, req);
}

function TK_RequestEx(key, req) {
    TK_Request(null, req);
}

function TK_Request_Callback(result) {
    if (result.key == undefined)
        return;
    if (result.key == "isVM"){
    }
    else if (result.key == "XW_Crypt") {
        fnGetEncXWCallback(result.value);
    }
    else if (result.key == "YT_Crypt") {
    	  fnGetEncYTCallback(result.value);
    }
    else if (result.key == "GN_Crypt") {
        fnGetEncGNCallback(result.value);
    }
    else if (result.key == "UN_Crypt") {
       fnGetEncUNCallback(result.value);
    }
    else if (result.key == "HN_Crypt") {
	     fnGetEncHNCallback(result.value);
    }
}

function IsDenyPaste(nsEvent) {

    if (nsEvent.type == "text" || nsEvent.type == "password") {
        inputObj = nsEvent;
    } else {
        theEvent = nsEvent ? nsEvent : window.event;
        inputObj = theEvent.target ? theEvent.target : theEvent.srcElement;
    }

    try {
        if (isEnc(inputObj)) {
            return true;
        }

        // 일반 보안 영역 (E2E 아님)
        // 붙여 넣기 허용 일때, Datytype 이 들어 가 있으면 허용 하지 않는다.
        // datatype 이 존재 하면 붙여 넣기 금지.


        if ((tekOption.defaultpaste == "false") || (tekOption.defaultpaste == "off") || (tekOption.defaultpaste == "no")) {
            //defaultpaste false 라도 비보안 영역은 붙여 넣기를 허용
            if (TouchEnKeyNXE_CurObj.getAttribute("data-security") != "off" && TouchEnKeyNXE_CurObj.getAttribute("security") != "off") {
                return true;
            }

        } else {
            if (TouchEnKeyNXE_CurObj.getAttribute("datatype") != null || TouchEnKeyNXE_CurObj.getAttribute("data-datatype") != null) {
                return true;
            }

        }

    } catch (e) {
			exlog("_TOUCHENNX", "IsDenyPaste() exception");
	}

    return false;
}

function TK_OnContextMenu(nsEvent) {
    if (IsDenyPaste(nsEvent) == true) {
        nsEvent.preventDefault();
    }
    return;
}

function TK_OnPaste(nsEvent) {
    if (IsDenyPaste(nsEvent) == true) {
        nsEvent.preventDefault();
    }
    return;
}

/**
 * TKClear 함수
 * 사용방법 
 * Fome 기반 : TK_Clear(frmname, elename)
 * Id 기반 : TK_Clear("", idname)
 */
function TK_Clear(frmname, elename) {
    try {
		
		var inputObj = "";
		var inputObj_E2E = "";
		
		/*
			id 기반인지 여부 판단
			true  : id 기반 
			false : form, name 기반 
		*/
		if (TK_IsNal(frmname) == true)
		{
			inputObj = document.getElementById(elename);
			if (isEnc(inputObj))
			{
				inputObj_E2E = document.getElementById("E2E_"+elename);
			}
		}
		else
		{
			inputObj = document.getElementsByName(elename)[0];
			if (isEnc(inputObj))
			{
				inputObj_E2E = document.getElementsByName("E2E_" + elename)[0];
			}
		}
		
		
        if (bInit != undefined && bInit != 0) {
        	if(getTouchEnNXEType.MSIEBrowser){
        		TK_Request2("Clear", frmname, elename, "");
        	}else{
        		TK_Request2("ClearDB", frmname, elename, "");
        	}
        }
        var inputObj = document.getElementsByName(elename)[0];
        
       if (isEnc(inputObj)) 
		{
			if (TK_IsNal(inputObj_E2E) == false)
			{
				Tk_InputErase(inputObj);
				Tk_InputErase(inputObj_E2E);
			}
		}
		
    } catch (e) {
		exlog("_TOUCHENNX", "TK_Clear() exception");
	}
}

/**
 * 웹 브라우저의 DOM을 다시 분석하는 기능으로, 웹페이지 로딩 후
 * 동적필드 생성시 TouchEnKey_ReScan()함수를 사용해야 보안이 동작합니다.
 * ReScan함수 호출 후에는 기존 입력된 값이 삭제됩니다.
 *
 * 사용방법 TK_Rescan() : Dom 전체 scan
 */
function TK_Rescan() {
	if (bInit == undefined && bInit == 0) return;
	if(!useTouchEnnxKey) return;
        try {
            if (getTouchEnNXEType.MSIEBrowser) {
                TK_Request2("Rescan2", "");
            } else if (getTouchEnNXEType.WebKitBrowser) {
                for (var i = 0; i < document.forms.length; i++) {
                    if (GetAttributeFormName(document.forms[i]) != undefined && GetAttributeFormName(document.forms[i]) != touchenexInfo.exFormName)
                        makeEncDataEx(document.forms[i]);
                }
                TK_AddEventListner();
            }
        } catch (e) {
				exlog("_TOUCHENNX", "TK_Rescan() exception");
		}
}

    /**
     * TouchEn nxKey 동적 필드 생성시 키보드보안 적용을 위해 Form 단위로 scanning 하는 함수
     *
     * 사용방법 TK_EnqueueList_frm(frmName) : Form 단위 scan
     *
     * Parameter - frmName : form 의 name
     */
function TK_EnqueueList_frm(frmname) {
	if (bInit == undefined && bInit == 0)	return;
	if(!useTouchEnnxKey) return;
    try {
        var frm = document.getElementsByName(frmname)[0];
        var elelength = frm.elements.length;
        for (var j = 0; j < elelength; j++) {
            if (frm.elements[j].tagName == "INPUT" && (frm.elements[j].type == "text" || frm.elements[j].type == "password")) {
                if (getTouchEnNXEType.MSIEBrowser) {
                    TK_Request2("EnqueueList", frmname, frm.elements[j].name, "");
                } else if (getTouchEnNXEType.WebKitBrowser) {
                    if (GetAttributeFormName(frm) != undefined && GetAttributeFormName(frm) != touchenexInfo.exFormName)
                        makeEncDataEx(frm);
                    TK_AddEventListner2(frm.elements[j]);
                }
                if (isEnc(frm.elements[j])) {
                	//frm.elements[j].value = ""; 2015.09.04 주석
                    if (document.getElementsByName("E2E_" + frm.elements[j].name)[0] != undefined) {
                    	Tk_InputErase(document.getElementsByName("E2E_" + frm.elements[j].name)[0]);
                    }
                }
            }
        }
    } catch (e) {
			exlog("_TOUCHENNX", "TK_EnqueueList_frm() exception");
	}
}

/**
 * TouchEn nxKey 동적 필드 생성시 키보드보안 적용을 위해 Form,element 단위로 scanning 하는 함수
 *
 * 사용방법 
 * Form 기반 : TK_EnqueueList(frmName ,eleName) Element 단위 scan
 * id 기반 : TK_EnqueueList("", idName) id 단위 scan
 *
 * Parameter - frmName : form 의 name - eleName : input element의 name
 */
function TK_EnqueueList(frmname, elename) {
	if (bInit == undefined && bInit == 0)	return;
	if(!useTouchEnnxKey) return;
    try {
        var inputObj = document.getElementsByName(elename)[0];
        if (getTouchEnNXEType.MSIEBrowser) {
            TK_Request2("EnqueueList", frmname, elename, "");
        } else if (getTouchEnNXEType.WebKitBrowser) {
            var frm = document.getElementsByName(frmname)[0];
            if (GetAttributeFormName(frm) != undefined && GetAttributeFormName(frm) != touchenexInfo.exFormName)
                makeEncDataEx(frm);
            TK_AddEventListner2(inputObj);
        }
        //inputObj.value = ""; 2015.09.04 주석
        if (isEnc(inputObj)) {
        	
            if (document.getElementsByName("E2E_" + inputObj.name)[0] != undefined) {
            	Tk_InputErase(document.getElementsByName("E2E_" + inputObj.name)[0]);
            }
        }
    } catch (e) {
			exlog("_TOUCHENNX", "TK_EnqueueList() exception");
	}
}

function EncOnFieldDisableEvent(nsEvent) {
    if (nsEvent.type == "text" || nsEvent.type == "password") {
        inputObj = nsEvent;
    } else {
        theEvent = nsEvent ? nsEvent : window.event;
        inputObj = theEvent.target ? theEvent.target : theEvent.srcElement;
    }

    if (isEnc(inputObj)) {

        inputObj.onselectstart = function () {
            return false;
        };
        inputObj.unselectable = "on";
        inputObj.style.MozUserSelect = "none";

        return;
    }
}

function TK_GetEncXW(frmName, eleName, sKey, callback) {
    fnGetEncXWCallback = callback;
    var req = {
        "key": "GetEncData",
        "securekey": sKey,
        "id": eleName,
        "formName": frmName
    };
    TK_RequestEx(null, req);
}

function TK_GetEncYT(frmName, eleName, pubKey, callback)
{
	fnGetEncYTCallback = callback;
	var req = {
		"key": "GetEncDataYT",
		"pubkey": pubKey,
		"id": eleName,
		"formName": frmName
	};
  TK_RequestEx(null, req);
 }

function TK_GetEncGN(frmName, eleName, sid, pubKey, callback)
{
	fnGetEncGNCallback = callback;
	var req = {
		"key": "GetEncDataGN",
		"pubkey": pubKey,
		"id": eleName,
		"formName": frmName,
		"sid":sid
  }
  TK_RequestEx(null, req);
}

function TK_GetEncUN(frmName, eleName, pubKey, callback)
{
  fnGetEncUNCallback = callback;
  var req = {
     "key": "GetEncDataUN",
     "pubkey": pubKey,
     "id": eleName,
     "formName": frmName
  };
  TK_RequestEx(null, req);
}

function TK_GetEncHN(frmName, eleName, op1, op2, op3, op4, callback)
{
	fnGetEncHNCallback = callback;
	var req = {
		"key": "GetEncDataHN",
		"op1": op1,
		"op2": op2,
		"op3": op3,
		"op4": op4,
		"id": eleName,
		"formName": frmName
	};
  TK_RequestEx(null, req);
}

function TK_OnContextMenu(nsEvent) {
    if (nsEvent.type == "text" || nsEvent.type == "password") {
        inputObj = nsEvent;
    } else {
        theEvent = nsEvent ? nsEvent : window.event;
        inputObj = theEvent.target ? theEvent.target : theEvent.srcElement;
    }

    try {
        if (isEnc(inputObj)) {
            nsEvent.preventDefault();
            TK_click(nsEvent);
        }
	} catch (e) {
			exlog("_TOUCHENNX", "TK_OnContextMenu() exception");
	}

    return;
}

function TK_OnPaste(nsEvent) {
	if (nsEvent.type == "text" || nsEvent.type == "password") {
        inputObj = nsEvent;
    } else {
        theEvent = nsEvent ? nsEvent : window.event;
        inputObj = theEvent.target ? theEvent.target : theEvent.srcElement;
    }

    try {
        if (isEnc(inputObj)) {
            nsEvent.preventDefault();
			return;
        }

        // 일반 보안 영역 (E2E 아님)
        // 붙여 넣기 허용 일때, Datytype 이 들어 가 있으면 허용 하지 않는다.
        // datatype 이 존재 하면 붙여 넣기 금지.

        if ((tekOption.defaultpaste == "false") || (tekOption.defaultpaste == "off") || (tekOption.defaultpaste == "no")) {
            //defaultpaste false 라도 비보안 영역은 붙여 넣기를 허용
            if (TouchEnKeyNXE_CurObj.getAttribute("security") == "off" || TouchEnKeyNXE_CurObj.getAttribute("data-security") == "off") {
                return;
			} else {
				nsEvent.preventDefault();
			}
        } else {
            if (TouchEnKeyNXE_CurObj.getAttribute("datatype") != null || TouchEnKeyNXE_CurObj.getAttribute("data-datatype") != null) {
				nsEvent.preventDefault();
            }
        }

    } catch (e) {
			exlog("_TOUCHENNX", "TK_OnPaste() exception");
	}

    return;
}

function TK_InvalidateSession(srdk) {
    var req = {
        "key": "InvalidateSession",
        "srdk": srdk
    };
    TK_RequestEx(null, req);
}

/** 20150904 변경 */
function TK_EncModify(value,formname, elename) {

    var req = {
        "formname" : formname,
        "name" : elename,
        "key": "EncModify",
        "value": value
    };
    if (bInit != undefined && bInit != 0) {
        TK_RequestEx(null, req);
    }
		if (getTouchEnNXEType.MSIEBrowser) 
			return;	
			
	var e2e_ele = "E2E_" + TouchEnKeyNXE_CurObj.name;
	var frm = TouchEnKeyNXE_CurObj.form;
	
	if (value == "on" || value == "yes" || value == "true")
	{
		if (document.getElementsByName(e2e_ele)[0] == undefined && frm != undefined)
		{
			var newEle = document.createElement("input");
				newEle.type = "hidden";
				newEle.name = e2e_ele;
				Tk_InputErase(newEle);
				frm.appendChild(newEle);
		}
	}
	else
	{
		if (document.getElementsByName(e2e_ele)[0] != undefined)
		{
			Tk_InputErase(document.getElementsByName(e2e_ele)[0]);
		}
		
	}
}

//. 한 에러당 에러코드가 여러번 들어와서 TK_CommonError가 여러번 수행된다.
//. 때문에 alert가 여러번 뜨는 이슈가 발생해서 alert는 한번만 뜨도록 다음과 같이 전역변수를 추가했다.
var alertEnd = false; 

function TK_FaqMove(faq) { 

    if (faq =="1") //강제 중지 시
    { 
    	this.top.location.href = "http://faq.touchen.co.kr/nxKey/page/damage.htm"; 
    } 
    else if (faq == "2") //변조 시
    { 
		this.top.location.href = "http://faq.touchen.co.kr/nxKey/page/damage.htm"; 
	}
	else if (faq == "3") //라이센스 에러 시
	{
		this.top.location.href = "http://faq.touchen.co.kr/nxKey/page/lic_check_fail.html";
	}
			
	return; 
} 

function TK_CommonError( response ){ 
    if(response.ERR == "BLOCK"){ 
    	if(bInit==0) //init 전에 block에러가 오면 라이센스 에러로 판단한다. 
		{ 	/* 라이센스 에러 시 */
			if(alertEnd==false)
			{
				alert(response.NAME + " 라이센스를 확인하세요."); 
				alertEnd = true;
			}
			TK_FaqMove(3);
		} 
		else //init 이후에 block에러가 오면 강제 중지로 판단한다.
		{ 	/* 강제중지 에러 시 */
			if(alertEnd == false)
			{
				alert(response.NAME + " 프로그램에 오류가 발생하였습니다.(daemon)\n페이지를 새로고침 하세요."); 
				alertEnd = true;
			}
			//alert(response.NAME + " 프로그램에 오류가 발생하였습니다.(daemon)\n페이지를 새로고침 하세요."); 
			TK_FaqMove(1);
		} 
    }
    else if(response.ERR == "BLOCK:EX"){ 
	
		if(alertEnd == false)
		{	/* crossex 모듈 변조 시 */
			alert(response.NAME + " 프로그램이 변조되었습니다.(EX)\n재설치가 필요합니다.");
			alertEnd = true;
        }
		TK_FaqMove(2); 
    }
    else if(response.ERR == "BLOCK:CLIENT"){ 
		if(alertEnd == false)
		{	/* 키보드보안 모듈 변조 시 */
			alert(response.NAME + " 프로그램이 변조되었습니다.(client)\n재설치가 필요합니다.");
			alertEnd = true;
		}
        TK_FaqMove(2); 
    }
	else if(response.ERR == "BLOCK:DISCONNECTED"){
		//. 라이센스 에러일 때 block에러와 함께 이 에러가 들어온다. 
		//. block 에러와 중복되기 때문에 일단 이 에러에 따른 처리는 하지 않는다.
		/*
		if(alertEnd == false)
		{	
			alert(response.NAME + " 프로그램이 중단되었습니다.(client)\n페이지를 새로고침하세요.");
			alertEnd = true;
		}
		TK_FaqMove(2);
		*/
	}
    else if(response.ERR == "BLOCK:INTERNAL"){ 
		//. 데몬에서는 상위 프로세스를 중지했을 때 INTERNAL 에러가 오고
		//. 하위 프로세스를 중지했을 때는 BLOCK 에러가 왔었다.
		//. extension방식에서의 internal 에러는 어떤 에러인지 확실하지 않다.
		
		if(alertEnd == false)
		{	
			alert(response.NAME + " 프로그램이 중단되었습니다.(client)\n페이지를 새로고침하세요.");
			alertEnd = true;
		}
		
        TK_FaqMove(1); 
		
    }
    return;
}

function GetAttributeFormName(form)
{
	var frmName = form.getAttribute("name");
	if(typeof frmName != "string" && form.attributes["name"] != undefined)
	{
		frmName = form.attributes["name"].value;
	}  
	
	return frmName;	
}



function TK_postInit(argFrm)
{
	var keyFieldName = "";
	var encFieldName = "";
	var frm="";
	
	frm = argFrm;

	
	if (tekOption.idbase == "true")
		TK_makeEncData();
	else TK_makeEncData(frm);
	
	
	var encFieldName =  GetHiddenEncFieldName(frm);	
	var keyFieldName = GetHiddenKeyFieldName(frm);
	
	if (TOUCHENEX_UTIL.isIE()!=true && tekOption.idbase != "true")
	{
		if (frm[encFieldName] != undefined)
		{
			frm[encFieldName].name = "hid_enc_data";
			frm[encFieldName].id = "hid_enc_data";
		
		}
		
		if (frm[keyFieldName] != undefined && tekOption.idbase != "true")
		{
			frm[keyFieldName].name =  "hid_key_data";
			frm[keyFieldName].id = "hid_key_data";
	
		}
	}
		
	return frm;
}


function TK_postFinish(frm)
{
 var keyFieldName = "";
 var encFieldName ="";
 
 
 if (TOUCHENEX_UTIL.isIE()!=true)
 {
  
  var encFieldName =  GetHiddenEncFieldName(frm); 
  var keyFieldName = GetHiddenKeyFieldName(frm);

  
  
  if (frm["hid_key_data"] != undefined && tekOption.idbase != "true")
  { 
   frm["hid_key_data"].name  = keyFieldName;
   frm["hid_key_data"].id  = keyFieldName;
  }
  
  if (frm["hid_enc_data"] != undefined && tekOption.idbase != "true")
  {
   frm["hid_enc_data"].name  = encFieldName;
   frm["hid_enc_data"].id  = encFieldName;
  }
    
 }
 
}

function Tk_InputErase(element)
{
	
	if (typeof element != "undefined")
	{
		if (element.getAttribute("type") == "hidden")
			TK_HiddenElementErase(element);
		else
			TK_NomalElementErase(element);
	}
	
}

function TK_HiddenElementErase(element) {
	if (TK_IsNal(element) == false)
		element.value = "";
}

function TK_NomalElementErase(element) {
	if (TK_IsNal(element) == false)
		element.value = "";
}

function IsAllowIdOverlap()
{
	var nRet = false;
	if (typeof tekOption.isAllowIdOverlap == "undefined" || tekOption.isAllowIdOverlap == "true" || TOUCHENEX_UTIL.isIE() == true )
	{
		nRet = true;
	}
	
	return nRet;
}


function IsFormTrans()
{
	var nRet = false;
	
	if (typeof tekOption.isFormTrans == "undefined" || tekOption.isFormTrans == "true"  )
	{
		nRet = true;
	}
	
	return nRet;
}

function IsSpecialTkMask(eobj)
{
	if (eobj != null && eobj.getAttribute("data-tk-usemask") != null && typeof eobj.getAttribute("data-tk-usemask") == "string" && eobj.getAttribute("data-tk-usemask") == "true")
	{
		return true;
	}
	return false;
}

function TK_KeyInputToInputObj(inputObj, value)
{	
	if (typeof inputObj == "object")
	{
		if (IsSpecialTkMask(inputObj) == true)
		{
			var startPos = 0; 
			var endPos   = 1024; 
			var mask = '*';
			
			if (inputObj.getAttribute(tk_Special_Mask_StartPos) != null)
				startPos = parseInt(inputObj.getAttribute(tk_Special_Mask_StartPos));
			if (inputObj.getAttribute(tk_Special_Mask_EndPos) != null)
				endPos = parseInt(inputObj.getAttribute(tk_Special_Mask_EndPos));
			if (inputObj.getAttribute(tk_Special_Mask) != null)
					mask = inputObj.getAttribute(tk_Special_Mask);
					
		
			
			if (inputObj.value.length+1 >= startPos && inputObj.value.length < endPos)
				value = inputObj.value+mask;
	 
		}
		inputObj.value = value;
	}
}

/*
	Object Null And  Empty Check 
*/

function TK_IsNal(obj) {
	if (typeof obj == "undefined" || obj == null || obj == "")
		return true;

	return false;

}

function TK_InputEncWithPlain(result) {
	//console.log("20190806 - 4-1, tekOption.bstart : " + tekOption.bstart);
	if (tekOption.bstart == false)
		return;

	var TK_frm = "";
	var TK_cur_Field = "";
	var TK_cur_E2E_Field = "";
	var TK_szCh = "";
	var TK_e2eValue = "";

	TK_e2eValue = result.value.split('_#_')[0];
	TK_szCh = result.value.split('_#_')[1];

	if (tekOption.idbase == "true") {
		TK_cur_Field = document.getElementById(result.EncData.split("_")[1]);

		if (tekOption.usegetenc == "false") {
			var crypt = document.getElementById(result.EncData).value;
			Tk_InputErase(document.getElementById(result.EncData));
			document.getElementById(result.EncData).value = crypt + TK_e2eValue;

		} else {
			//console.log("20190806 - 4-3");
			var e2eEle = findElmentByNamesId(result.name);
			var nodeLen = document.all.length;
			var htmlColl = document.all;

			for (var k = 0; k < nodeLen; k++) {
				if (result.EncData == htmlColl[k].id) {
					htmlColl[k].value = result.value.split('_')[0];
					cipherEncText += htmlColl[k].id;
					cipherEncText += "=";
					cipherEncText += result.value.split('_')[0];
					cipherEncText += "%TK%";
				}

			}
			//console.log("20190806 - 4-4");
		}
	} else {
		//console.log("20190806 - 4-5");
		TK_cur_Field = document.getElementsByName(result.EncData.split("_")[1])[0];

		//if (result.EncData.split('E2E_')[1] != TouchEnKeyNXE_CurObj.name) return;
		if (TK_IsNal(TK_frm) == true) {
			//console.log("20190806 - 4-6");
			if (document.getElementsByName(result.EncData)[0] != undefined)
				TK_frm = document.getElementsByName(result.EncData)[0].form;
			//console.log("20190806 - 4-7");
		}

		if (tekOption.usegetenc == "false") {
			if (TK_IsNal(TK_frm) == false) {
				//console.log("20190806 - 4-8");
				var crypt = TK_frm[result.EncData].value;
				Tk_InputErase(TK_frm[result.EncData]);
				TK_frm[result.EncData].value = crypt + TK_e2eValue;
			}
		} else {
			for (var k = 0; k < TK_frm.length; k++) {
				if (result.EncData == TK_frm.elements[k].name) {
					TK_frm.elements[k].value = result.value.split('_')[0];
					cipherEncText += TK_frm.elements[k].name;
					cipherEncText += "=";
					cipherEncText += result.value.split('_')[0];
					cipherEncText += "%TK%";
				}
			}
		}
	}

	if (bTobe == true) {
		var dummykey = TK_szCh;

		if (TK_szCh >= '0' && TK_szCh <= '9')
			dummykey = '0';
		else if ((TK_szCh >= 'a' && TK_szCh <= 'z') ||
			(TK_szCh >= 'A' && TK_szCh <= 'Z'))
			dummykey = 'A';
		else
			dummykey = '_';

		TouchEnKey_UIEevents(0, TK_cur_Field, "keydown", dummykey);
		TouchEnKey_UIEevents(0, TK_cur_Field, "keypress", dummykey);
	}

	if (isEnc(TK_cur_Field)) {
		var inputText = TK_cur_Field.value;
		TK_KeyInputToInputObj(TK_cur_Field, inputText + TK_szCh);
		if (bTobe == true && TK_cur_Field.classList.value.indexOf("nexa") > -1)
			TouchEnKey_UIEevents(0, TK_cur_Field, "input", dummykey);
	} else {
		var MaxLength = TK_cur_Field.getAttribute("maxlength");
		var valueLength = TK_cur_Field.value.length;
		if (MaxLength != undefined && valueLength >= MaxLength) {
			if (TK_cur_Field.selectionStart == 0 && TK_cur_Field.selectionEnd == valueLength) {}
			else {
				return;
			}
		}

		if (TK_cur_Field.value.length > 0) {
			var caretPos = GetCaretPosition(TK_cur_Field);
			var tmpValue = TK_cur_Field.value.toString();
			var tmpValue2 = "";

			var selectSize = TK_cur_Field.selectionEnd - TK_cur_Field.selectionStart;
			if (selectSize > 0) {

				if (TK_cur_Field.selectionEnd == TK_cur_Field.value.length) {
					tmpValue = TK_cur_Field.value.substring(0, TK_cur_Field.selectionStart);
					//TK_cur_Field.value = "";
					TK_KeyInputToInputObj(TK_cur_Field, tmpValue + TK_szCh);

					if (bTobe == true) {
						if (TK_cur_Field._linked_element.parent.linkedcontrol._type_name == "MaskEdit") {
							var bTobe_MaskEdit_length = TK_cur_Field.value.length;
							TouchEnKey_UIEevents(0, TK_cur_Field, "input", dummykey);
							TK_cur_Field.selectionEnd = bTobe_MaskEdit_length;
						} else {
							TouchEnKey_UIEevents(0, TK_cur_Field, "input", dummykey);
							TK_cur_Field.selectionEnd = TK_cur_Field.value.length;
						}
					} else {
						TK_cur_Field.selectionEnd = TK_cur_Field.value.length;
					}
				} else {
					tmpValue = TK_cur_Field.value.substring(0, TK_cur_Field.selectionStart);
					tmpValue2 = TK_cur_Field.value.substring(TK_cur_Field.selectionEnd, TK_cur_Field.value.length);
					//TK_cur_Field.value = "";
					TK_KeyInputToInputObj(TK_cur_Field, tmpValue + TK_szCh + tmpValue2);
					TK_cur_Field.selectionStart = tmpValue.length + 1;
					TK_cur_Field.selectionEnd = tmpValue.length + 1;

					if (bTobe == true)
						TouchEnKey_UIEevents(0, TK_cur_Field, "input", dummykey);
				}
			} else {
				TK_KeyInputToInputObj(TK_cur_Field, tmpValue.substring(0, caretPos) + TK_szCh + tmpValue.substring(caretPos));
				TK_cur_Field.selectionStart = caretPos + 1;
				TK_cur_Field.selectionEnd = caretPos + 1;

				if (bTobe == true)
					TouchEnKey_UIEevents(0, TK_cur_Field, "input", dummykey);
			}
		} else {
			if (TK_cur_Field.end - TK_cur_Field.start > 1)
				Tk_InputErase(TK_cur_Field);

			TK_KeyInputToInputObj(TK_cur_Field, TK_szCh);

			if (bTobe == true) {
				TK_cur_Field.selectionStart = TK_cur_Field.value.length;
				TK_cur_Field.selectionEnd = TK_cur_Field.value.length;
				TouchEnKey_UIEevents(0, TK_cur_Field, "input", dummykey);
			}
		}
		TK_cur_Field.selectionStart = TK_cur_Field.selectionEnd;
	}

	if (tekOption.generate_event == "true" ||
		tekOption.generate_event == "yes" || tekOption.generate_event == "on") {
		if (TK_szCh >= "0" && TK_szCh <= "9") {
			TouchEnKey_UIEevents(0, TK_cur_Field, "keydown", 48);
			TouchEnKey_UIEevents(0, TK_cur_Field, "keypress", 48);
			TouchEnKey_UIEevents(0, TK_cur_Field, "keyup", 48);
		} else if ((TK_szCh <= "z" && TK_szCh >= "a") || (TK_szCh <= "Z" && TK_szCh >= "A")) {
			TouchEnKey_UIEevents(0, TK_cur_Field, "keydown", 65);
			TouchEnKey_UIEevents(0, TK_cur_Field, "keypress", 65);
			TouchEnKey_UIEevents(0, TK_cur_Field, "keyup", 65);
		} else {
			TouchEnKey_UIEevents(0, TK_cur_Field, "keydown", 189);
			TouchEnKey_UIEevents(0, TK_cur_Field, "keypress", 189);
			TouchEnKey_UIEevents(0, TK_cur_Field, "keyup", 189);
		}
	} else {
		TouchEnKey_UIEevents(0, TK_cur_Field, "keydown", 120);
		TouchEnKey_UIEevents(0, TK_cur_Field, "keypress", 120);
		TouchEnKey_UIEevents(0, TK_cur_Field, "keyup", 120);
	}
	return;
}

function TK_SeedKey_Request() {
	cipherEncText = "";
	TouchEnNXE_SeedKey = result.value;
	var hidKeyData = null;

	if (tekOption.idbase == "true") {
		DrawHiddenElementsId();
		document.getElementById("hid_key_data").value = TouchEnNXE_SeedKey;
	} else {
		for (var i = 0; i < document.forms.length; i++) {
			var frm = document.forms[i];
			DrawHiddenElements(frm);
			if (IsAllowIdOverlap() == false) {
				hidKeyData = GetHiddenKeyFieldName(frm);
				if (frm[hidKeyData].value.length < 512)
					frm[hidKeyData].value = TouchEnNXE_SeedKey;

			} else {
				if (frm.hid_key_data != undefined) {
					if (frm.hid_key_data.value.length < 512)
						frm.hid_key_data.value = TouchEnNXE_SeedKey;
				}
			}
		}
	}

}
function TK_AddChar_Request(result) {

	var frm;
	var TK_cur_Field = "";
	var TK_cur_E2E_Field = "";
	var TK_szCh = "";
	var dummykey = "";
	var TK_RecvDataLength = 1;
	var TK_index = 0;
	var TK_curFiledLength = 0;								   

	if (tekOption.bstart == false)
		return false;

	if (TK_IsNal(result.value) == false) {
		TK_szCh = result.value.split('_#_')[1];
		TK_index = result.value.split("_#_")[3];


		var tk_string_Pos = result.EncData.search("E2E_");
		if (tk_string_Pos != 0) return;
		
		if (tekOption.idbase == "true") {
			var TK_Cur_Field_Id = result.EncData.replace("E2E_", "");
			TK_cur_Field = document.getElementById(TK_Cur_Field_Id);
			TK_cur_E2E_Field =  document.getElementById("E2E_" + TK_cur_Field.id);
		} else {
			var TK_Cur_Field_Name = result.EncData.replace("E2E_", "");
			TK_cur_Field = document.getElementsByName(TK_Cur_Field_Name)[0];
			TK_cur_E2E_Field =  document.getElementsByName("E2E_" + TK_cur_Field.name)[0];
		}
		
		if ( TK_cur_E2E_Field.value.length > 0) 	
			TK_curFiledLength = TK_cur_E2E_Field.value.length / 32;
			
		if (TK_index == 0)		
		{
			Tk_InputErase(TK_cur_Field);
			Tk_InputErase(TK_cur_E2E_Field);
		}
		
		if (TK_curFiledLength != TK_index)
		{
			Tk_InputErase(TK_cur_Field);
			Tk_InputErase(TK_cur_E2E_Field);
			if(tekOption.idbase=="true")
				TK_Request2("ClearDB", "", TK_cur_Field.id, "");
			else
				TK_Request2("ClearDB", GetAttributeFormName(TK_cur_Field.form), TK_cur_Field.name, "");
			
			return false;
		}
		
	} else {
		if (tekOption.idbase == "true") {
			TK_cur_Field = document.getElementById(result.addChar.split("_#_")[1]);
		} else {
			TK_cur_Field = document.getElementsByName(result.addChar.split("_#_")[1])[0];
		}
		TK_szCh = result.addChar.split("_#_")[0];
	}

	if (bTobe == true) {
		dummykey = TK_szCh;

		if (TK_szCh >= '0' && TK_szCh <= '9')
			dummykey = '0';
		else if ((TK_szCh >= 'a' && TK_szCh <= 'z') ||
			(TK_szCh >= 'A' && TK_szCh <= 'Z'))
			dummykey = 'A';
		else
			dummykey = '_';

		TouchEnKey_UIEevents(0, TK_cur_Field, "keydown", dummykey);
		TouchEnKey_UIEevents(0, TK_cur_Field, "keypress", dummykey);
	}

	if (isEnc(TK_cur_Field)) {
		var inputText = TK_cur_Field.value;
		TK_KeyInputToInputObj(TK_cur_Field, inputText + TK_szCh);
		if (bTobe == true && TK_cur_Field.classList.value.indexOf("nexa") > -1)
			TouchEnKey_UIEevents(0, TK_cur_Field, "input", dummykey);
	} else {
		var MaxLength = TK_cur_Field.getAttribute("maxlength");
		var valueLength = TK_cur_Field.value.length;
		if (MaxLength != undefined && valueLength >= MaxLength) {
			if (TK_cur_Field.selectionStart == 0 && TK_cur_Field.selectionEnd == valueLength) {}
			else {
				return false;
			}
		}

		if (TK_cur_Field.value.length > 0) {
			var caretPos = GetCaretPosition(TK_cur_Field);
			var tmpValue = TK_cur_Field.value.toString();
			var tmpValue2 = "";

			var selectSize = TK_cur_Field.selectionEnd - TK_cur_Field.selectionStart;
			if (selectSize > 0) {

				if (TK_cur_Field.selectionEnd == TK_cur_Field.value.length) {
					tmpValue = TK_cur_Field.value.substring(0, TK_cur_Field.selectionStart);
					//TK_cur_Field.value = "";
					TK_KeyInputToInputObj(TK_cur_Field, tmpValue + TK_szCh);

					if (bTobe == true) {
						if (TK_cur_Field._linked_element.parent.linkedcontrol._type_name == "MaskEdit") {
							var bTobe_MaskEdit_length = TK_cur_Field.value.length;
							TouchEnKey_UIEevents(0, TK_cur_Field, "input", dummykey);
							TK_cur_Field.selectionEnd = bTobe_MaskEdit_length;
						} else {
							TouchEnKey_UIEevents(0, TK_cur_Field, "input", dummykey);
							TK_cur_Field.selectionEnd = TK_cur_Field.value.length;
						}
					} else {
						TK_cur_Field.selectionEnd = TK_cur_Field.value.length;
					}
				} else {
					tmpValue = TK_cur_Field.value.substring(0, TK_cur_Field.selectionStart);
					tmpValue2 = TK_cur_Field.value.substring(TK_cur_Field.selectionEnd, TK_cur_Field.value.length);
					//TK_cur_Field.value = "";
					TK_KeyInputToInputObj(TK_cur_Field, tmpValue + TK_szCh + tmpValue2);
					TK_cur_Field.selectionStart = tmpValue.length + 1;
					TK_cur_Field.selectionEnd = tmpValue.length + 1;

					if (bTobe == true)
						TouchEnKey_UIEevents(0, TK_cur_Field, "input", dummykey);
				}
			} else {
				TK_KeyInputToInputObj(TK_cur_Field, tmpValue.substring(0, caretPos) + TK_szCh + tmpValue.substring(caretPos));
				TK_cur_Field.selectionStart = caretPos + 1;
				TK_cur_Field.selectionEnd = caretPos + 1;

				if (bTobe == true)
					TouchEnKey_UIEevents(0, TK_cur_Field, "input", dummykey);
			}
		} else {
			if (TK_cur_Field.end - TK_cur_Field.start > 1)
				Tk_InputErase(TK_cur_Field);

			TK_KeyInputToInputObj(TK_cur_Field, TK_szCh);

			if (bTobe == true) {
				TK_cur_Field.selectionStart = TK_cur_Field.value.length;
				TK_cur_Field.selectionEnd = TK_cur_Field.value.length;
				TouchEnKey_UIEevents(0, TK_cur_Field, "input", dummykey);
			}
		}
		TK_cur_Field.selectionStart = TK_cur_Field.selectionEnd;
	}

	if (tekOption.generate_event == "true" ||
		tekOption.generate_event == "yes" || tekOption.generate_event == "on") {
		if (TK_szCh >= "0" && TK_szCh <= "9") {
			TouchEnKey_UIEevents(0, TK_cur_Field, "keydown", 48);
			TouchEnKey_UIEevents(0, TK_cur_Field, "keypress", 48);
			TouchEnKey_UIEevents(0, TK_cur_Field, "keyup", 48);
		} else if ((TK_szCh <= "z" && TK_szCh >= "a") || (TK_szCh <= "Z" && TK_szCh >= "A")) {
			TouchEnKey_UIEevents(0, TK_cur_Field, "keydown", 65);
			TouchEnKey_UIEevents(0, TK_cur_Field, "keypress", 65);
			TouchEnKey_UIEevents(0, TK_cur_Field, "keyup", 65);
		} else {
			TouchEnKey_UIEevents(0, TK_cur_Field, "keydown", 189);
			TouchEnKey_UIEevents(0, TK_cur_Field, "keypress", 189);
			TouchEnKey_UIEevents(0, TK_cur_Field, "keyup", 189);
		}
	} else {
		TouchEnKey_UIEevents(0, TK_cur_Field, "keydown", 120);
		TouchEnKey_UIEevents(0, TK_cur_Field, "keypress", 120);
		TouchEnKey_UIEevents(0, TK_cur_Field, "keyup", 120);
	}

	return true;

}
function TK_EncData_Request(result) {

	var frm;
	var TK_cur_Field = "";
	var TK_cur_E2E_Field = "";
	var TK_szCh = "";
	var TK_e2eValue = "";

	if (tekOption.bstart == false)
		return;

	var TK_RecvDataLength = result.value.split("_#_").length;
	if (TK_RecvDataLength == 4)
		TK_e2eValue = result.value.split('_#_')[0];
	else
		TK_e2eValue = result.value;

	if (tekOption.idbase == "true") {

		if (tekOption.usegetenc == "false") {
			var crypt = document.getElementById(result.EncData).value;
			Tk_InputErase(document.getElementById(result.EncData));
			document.getElementById(result.EncData).value = crypt + TK_e2eValue;
		} else {
			//console.log("20190806 - 4-3");
			var e2eEle = findElmentByNamesId(result.name);
			var nodeLen = document.all.length;
			var htmlColl = document.all;

			for (var k = 0; k < nodeLen; k++) {
				if (result.EncData == htmlColl[k].id) {
					htmlColl[k].value = TK_e2eValue;
					cipherEncText += htmlColl[k].id;
					cipherEncText += "=";
					cipherEncText += TK_e2eValue;
					cipherEncText += "%TK%";
				}

			}
			//console.log("20190806 - 4-4");
		}
	} else {

		if (frm == undefined) {
			//console.log("20190806 - 4-6");
			if (document.getElementsByName(result.EncData)[0] != undefined)
				frm = document.getElementsByName(result.EncData)[0].form;
			//console.log("20190806 - 4-7");
		}

		if (tekOption.usegetenc == "false") {
			if (frm != undefined) {
				//console.log("20190806 - 4-8");
				var crypt = frm[result.EncData].value;
				Tk_InputErase(frm[result.EncData]);
				frm[result.EncData].value = crypt + TK_e2eValue;
			}
		} else {
			for (var k = 0; k < frm.length; k++) {
				if (result.EncData == frm.elements[k].name) {
					frm.elements[k].value = TK_e2eValue;
					cipherEncText += frm.elements[k].name;
					cipherEncText += "=";
					cipherEncText += TK_e2eValue;
					cipherEncText += "%TK%";
				}
			}
		}
	}
	return;
}

function TK_InterClear_Request() {
	var HiddenEnc = "";
	var TK_tmp = "";
	if (tekOption.idbase == "true") {
		HiddenEnc = "E2E_" + result.inputClear;
		TK_tmp = document.getElementById(result.inputClear);
		if (isEnc(TK_tmp)) {
			Tk_InputErase(document.getElementById(HiddenEnc));
			Tk_InputErase(document.getElementById(result.inputClear));
			return;
		} else {
			if (document.getElementById(HiddenEnc) != undefined) {
				Tk_InputErase(document.getElementById(HiddenEnc));
				Tk_InputErase(document.getElementById(result.inputClear));
			}
			return;
		}
	} else {
		HiddenEnc = "E2E_" + result.inputClear;
		TK_tmp = document.getElementsByName(result.inputClear)[0];
		if (isEnc(TK_tmp)) {
			Tk_InputErase(document.getElementsByName(HiddenEnc)[0]);
			Tk_InputErase(document.getElementsByName(result.inputClear)[0]);
			return;
		} else {
			if (document.getElementsByName(HiddenEnc)[0] != undefined) {
				Tk_InputErase(document.getElementsByName(HiddenEnc)[0]);
				Tk_InputErase(document.getElementsByName(result.inputClear)[0]);
			}
			return;
		}
	}
}