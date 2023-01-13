
// TODO Plugin Object Define
var TouchEnnxFW;

///////// 16.03.24 Param //////////////

var  touchennxfwpolicy;
var touchennxfwpolicyinfo = {
		"SecurityLevel":		0x00000002, //off : 0x00000008, low : 0x00000004, high : 0x00000001
		"Priority":				0x00000010, // site : 0x00000010
		"AV":					0x00000040, // off : 0x00000080
		"AVScanWhenStart":		0x00000100, // off : 0x00000200
		"ProgressBarShow":		0x00000400, // off : 0x00000800
		"ProgressBarPosType":	0x00002000,  // center : 0x00001000			 
        "hosts" :               0x00000000 // on : 0x00000000 off : 0x00008000
};
for (key in touchennxfwpolicyinfo) {
	touchennxfwpolicy = ( touchennxfwpolicy == null )? touchennxfwpolicyinfo[key] : touchennxfwpolicy | touchennxfwpolicyinfo[key];
}

var touchennxfwparams = [

	location.protocol+"//"+location.host + nxbasepath + "/nxFw/TEFW_CONF.ini"+"|"+location.host,
	//"tefw://"+location.host+"/TouchEn/nxFw/TEFW_CONF.ini"+"|"+location.host,
	"ZERODAYS",
//	"VwkjpWLDU27bMsCUqehX0sHH9cJEp5sPUx8cOoLA3x8J5y5y4AxibtFIPWx/HTdcivVrBTdzKeg9TKbGVjWduA==", //2019.02.11 license test(ZERODAYS 2019-02-11 ~ 2019-02-11)
//	"VwkjpWLDU27bMsCUqehX0m8BrxF4qQkDiiFCEgN0ERZcFrS+aHnF9Djn92KAnSrFivVrBTdzKeg9TKbGVjWduA==",  //2019.02.10 
	touchennxfwpolicy+"",
	location.host+location.pathname,
	"라온시큐어" //test
];

var touchennxfwparams_mac = [
    location.protocol+"//"+location.host+location.pathname.substring(0, location.pathname.indexOf("/",2))+"/raonnx/nxFw/TEFW_CONF_MAC.ini"+"|"+location.host+location.pathname.substring(0, location.pathname.indexOf("/",2)),
                          "ZERODAYS", //dat
                          touchennxfwpolicy+"",
                          location.host+location.pathname,
                          //"" //titlename
                          document.title
                          ];
//alert(location.protocol+"//"+location.host+location.pathname);
/////////////////////////////////////


// TODO Plugin Info Set
var touchennxfwInfo = {
	"exPluginCallName"	: "TouchEnnxFW",
	"exPluginName"		: "TouchEnnxFW",
	"exPluginInfo"		: "touchennxfwInfo",
	"exModuleName"		: "nxfirewall",
	/////////////////////////////////////////////////
	"exErrFunc"			: "touchennxfwInterface.exCommonError",
	"exErrSpec"			: "touchennxfwInterface.exSpecError",
	/////////////////////////////////////////////////
	"tkInstallpage"		: TouchEnNxConfig.installPage.nxfw,
	"tkMainpage"		: TouchEnNxConfig.tkMainpage.nxfw,
	"tkInstalled"		: false,
	"exInstalled"		: false,
	"clInstalled"		: false,
	"lic"				: TouchEnNxConfig.lic,// Module Info, 플러그인 설치파일 경로
	"moduleInfo" : {
		"exWinVer"			: nxFwConfig.version.exWinVer,
		"exWinClient"		: nxFwConfig.module.exWinClient,
		"exWin64Ver"		: nxFwConfig.version.exWin64Ver,
		"exWin64Client"		: nxFwConfig.module.exWin64Client,
		"exMacVer"          : nxFwConfig.version.exMacVer,   // 20190516 조진우추가
		"exMacClient"		: nxFwConfig.module.exMacClient
	},
	 
	// EX Protocol Info, EX를 포함한 플러그인 클라이언트 파일 경로
	"exProtocolInfo" : {
		"exWinProtocolVer"			: nxFwConfig.version.exWinProtocolVer,
		"exWinProtocolDownURL"		: nxFwConfig.module.exWinProtocolDownURL,
		"exWin64ProtocolDownURL"	: nxFwConfig.module.exWin64ProtocolDownURL,
		"exMacProtocolVer"			: nxFwConfig.version.exMacProtocolVer,
		"exMacProtocolDownURL"		: nxFwConfig.module.exMacProtocolDownURL
	},
	
	
	
	//////////////////////////////////////////////////////////////
	//////       CrossEX AREA DO NOT EDIT !!
	//////////////////////////////////////////////////////////////
	"isInstalled"		: false,				// 제품 정상 설치 여부
	"exProtocolName"	: "touchenex",
	"exExtHeader"		: "touchenex",
	"exNPPluginId"		: "touchenexPlugin",
	"exNPMimeType"		: "application/x-raon-touchenex",
	"exFormName"		: "__CROSSEX_FORM__",
	"exFormDataName"	: "__CROSSEX_DATA__",
	"exSiteName"		: "raon",


	"exEdgeInfo" : {
		"isUse"			: TouchEnNxConfig.daemon.info.isUse,
		"addScript"		: TouchEnNxConfig.commonPath+"TouchEnNx_daemon.js",
		"portChecker"	: TouchEnNxConfig.commonPath+"TouchEnNx_port_checker.js",
		"localhost"		: TouchEnNxConfig.daemon.info.localhost,
		"edgeStartPort"	: TouchEnNxConfig.daemon.info.edgeStartPort,
		"portChkCnt"	: TouchEnNxConfig.daemon.info.portChkCnt,
		"daemonVer"		: nxFwConfig.version.daemonVer,
		"daemonDownURL"	: nxFwConfig.module.daemonDownURL,
		"daemon64DownURL" : nxFwConfig.module.daemon64DownURL,
		"supportBrowser": TouchEnNxConfig.daemon.SupportBrowser,
		"macSupportBrowser" : TouchEnNxConfig.daemon.macSupportBrowser,     // 20190516 조진우추가
		"linuxSupportBrowser" : TouchEnNxConfig.daemon.linuxSupportBrowser  // 20190516 조진우추가
		
	},
	// module minimum specification
	// PASS, ALL, NO
	"checkSpec"	: true,
	"reqSpec"	: {
		"OS"	: {
			"WINDOWS"	: "5.1",	// XP=5.1, VISTA=6.0, Win7=6.1, Win8=6.2, Win8.1=6.3, Win10=6.4/10.0
			"MACOSX"	: "10.7",	// Leopard=10.5, Snow Leopard=10.6, Lion=10.7, Mountain Lion=10.8, Mavericks=10.9, Yosemite=10.10, El Capitan=10.11
			"LINUX"		: "PASS"
		},
		"Browser": {
			"MSIE"		: TouchEnNxConfig.moduleMinVer.MSIE,
			"EDGE"		: TouchEnNxConfig.moduleMinVer.Edge,
			"CHROME"	: TouchEnNxConfig.moduleMinVer.chromeMinVer,
			"FIREFOX"	: TouchEnNxConfig.moduleMinVer.FireFoxMinVer,
			"OPERA"		: TouchEnNxConfig.moduleMinVer.OperaMinVer,
			"SAFARI_WIN": TouchEnNxConfig.moduleMinVer.SafariMinVer,
			"SAFARI_MAC": "6"
		}
	},
	
	// Extension Info
	"exExtensionInfo" : {
		"exChromeExtVer"		: nxFwConfig.version.extension.exChromeExtVer,
		"exChromeExtDownURL"	: nxFwConfig.module.extension.exChromeExtDownURL,
		"exFirefoxExtVer"		: nxFwConfig.version.extension.exFirefoxExtVer,
		"exFirefoxExtDownURL"	: nxFwConfig.module.extension.exFirefoxExtDownURL,
		"exFirefoxExtIcon"		: "",//48*48 icon
		"exOperaExtVer"			: nxFwConfig.version.extension.exOperaExtVer,
		"exOperaExtDownURL"		: nxFwConfig.module.extension.exOperaExtDownURL
	}
};


/****************************
 ** edge condition
 ** include exproto_ext_daemon.js
 ****************************/
/*function touchenexEdgeCond(){
	return touchennxfwInfo.exEdgeInfo.isUse && TOUCHENEX_UTIL.isEdge();
}
if(touchenexEdgeCond()){
	document.write("<script type='text/javascript' src='" + touchennxfwInfo.exEdgeInfo.addScript + "'></script>");
}
*/
// TODO Plugin Interface Define
var touchennxfwInterface = {
	exCommonError : function( response ){
		// TODO module check error
		alert(response);
	},
	
	exSpecError : function( type, reqSpec ){
		if(type == "OS"){
			var printOS = "";
			if(TOUCHENEX_UTIL.isWin()){
				var winName = "";
				//XP=5.1, VISTA=6.0, Win7=6.1, Win8=6.2, Win8.1=6.3, Win10=6.4/10.0
				if(reqSpec.WINDOWS == "5.1") winName = "XP";
				else if(reqSpec.WINDOWS == "6.0") winName = "VISTA";
				else if(reqSpec.WINDOWS == "6.1") winName = "Win7";
				else if(reqSpec.WINDOWS == "6.2") winName = "Win8";
				else if(reqSpec.WINDOWS == "6.3") winName = "Win8.1";
				else if(reqSpec.WINDOWS == "6.4") winName = "Win10";
				else if(reqSpec.WINDOWS == "10.0") winName = "Win10";
				printOS = "WINDOWS " + winName + "이상";
			} else if(TOUCHENEX_UTIL.isMac()) printOS = "MACOSX " + reqSpec.MACOSX + "이상";
			else if(TOUCHENEX_UTIL.isLinux()) printOS = "LINUX " + reqSpec.LINUX + "이상";
			else printOS = "UNDEFINED OS";
			
		//alert("지원하지 않는 운영체제입니다.");
		TouchEnNx.processingbar(false);
		} else if (type == "BROWSER"){
			var printBrowser = "";
			if(TOUCHENEX_UTIL.isIE()) printBrowser = "IE " + reqSpec.MSIE + "이상";
			else if(TOUCHENEX_UTIL.isEdge()) printBrowser = "Edge " + reqSpec.EDGE + "이상";
			else if(TOUCHENEX_UTIL.isChrome()) printBrowser = "Chrome " + reqSpec.CHROME + "이상";
			else if(TOUCHENEX_UTIL.isFirefox()) printBrowser = "Firefox " + reqSpec.FIREFOX + "이상";
			else if(TOUCHENEX_UTIL.isOpera()) printBrowser = "Opera " + reqSpec.OPERA + "이상";
			else if(TOUCHENEX_UTIL.isSafari() && TOUCHENEX_UTIL.isWin()) printBrowser = "Safari " + reqSpec.SAFARI_WIN + "이상";
			else if(TOUCHENEX_UTIL.isSafari() && TOUCHENEX_UTIL.isMac()) printBrowser = "Safari " + reqSpec.SAFARI_MAC + "이상";
			else printBrowser = "UNDEFINED BROWSER";
			
			alert("지원하지 않는 브라우저입니다.");
		}
		return;
	},
	
	////////////////////16.03.24 Param///////////////
	
	InitEcho : function( params, callback ){
		TouchEnnxFW.setEcho(true);
		var exCallback = "touchennxfwInterface.InitEchoCallback";
		TouchEnnxFW.Invoke("TestEX", params, exCallback, callback);
	},
	
	InitEchoCallback : function( result ) {
		TouchEnnxFW.setEcho(false);
		try{
			var strSerial = JSON.stringify(result);
			exlog("touchennxfwInterface.InitEchoCallback", result);
			if(result.callback){
				TOUCHENEX_UTIL.runCallback(result.callback, result.reply);
			}
		} catch (e) {
			exlog("touchennxfwInterface.InitEchoCallback [exception] result", result);
			exalert("touchennxfwInterface.InitEchoCallback", "처리중 오류가 발생하였습니다.\n" + "result : "+result + "\nexception : " + e);
		}
	},
	
	TestEX : function( params, callback ){
		
		var exCallback = "touchennxfwInterface.TestEXCallback";
		TouchEnnxFW.Invoke("TestEX", params, exCallback, callback);
	},
	
	TestEXCallback : function( result ) {
		try{
			var strSerial = JSON.stringify(result);
			exlog("touchennxfwInterface.TestEXCallback", result);
			if(result.callback){
				TOUCHENEX_UTIL.runCallback(result.callback, result.reply);
			}
		} catch (e) {
			exlog("touchennxfwInterface.TestEXCallback [exception] result", result);
			exalert("touchennxfwInterface.TestEXCallback", "처리중 오류가 발생하였습니다.\n" + "result : "+result + "\nexception : " + e);
		}
	},
	
	TestEXPush : function( params ){
		TouchEnnxFW.SetPushCallback("new", params);
	},
	
	TestEXPushAdd : function( params ){
		TouchEnnxFW.SetPushCallback("add", params);
	},
	
	call2 : function( params, callback ) {
		try{
			var strObj = JSON.stringify(params);
			TouchEnnxFW.ScriptInvoke(params, callback);
		} catch (e) {
			exlog("touchennxfwInterface.call2 [exception] params", params);
			exlog("touchennxfwInterface.call2 [exception]", e);
			exalert("touchennxfwInterface.call2", "params값은 JSON 타입이어야합니다.");
		}
	},
	
	
	///////////////////////////////////////////////
	CustomEX : function (cmd, params) {
		var exCallback = "touchennxfwInterface.CustomEXCallback";
		if(!cmd) {
			exalert("touchennxfwInterface.CustomEX", "cmd를 입력하세요.");
			return;
		}
		
		try {
			var obj = JSON.parse(params);
			params = obj;
		} catch(e){}
		
		TouchEnnxFW.Invoke(cmd, [params], exCallback);
	},
	
	CustomEXCallback : function( result ) {
		try{
			var strSerial = JSON.stringify(result);
			exlog("touchennxfwInterface.CustomEXCallback", result);
			
			var resultArea = document.getElementById("resultArea");
			if(resultArea){
				resultArea.value = strSerial;
			} else {
				//alert(strSerial);
			}
		} catch (e) {
			exlog("touchennxfwInterface.CustomEXCallback [exception] result", result);
			exalert("touchennxfwInterface.CustomEXCallback", "처리중 오류가 발생하였습니다.\n" + "result : "+result + "\nexception : " + e);
		}
	},
	
	/////////////////////16.03.24 Param//////////////////////
	CustomEX2 : function (cmd, params) {
		var exCallback = "touchennxfwInterface.CustomEXCallback2";
		if(!cmd) {
			exalert("touchennxfwInterface.CustomEX", "cmd를 입력하세요.");
			return;
		}
		
		TouchEnnxFW.Invoke(cmd, params, exCallback);
	},
	
	CustomEXCallback2 : function( result ) {
		
		try{
			var strSerial = JSON.stringify(result);
			exlog("touchennxfwInterface.CustomEXCallback", result);
			
			var resultArea = document.getElementById("resultArea");
			if(resultArea){
				resultArea.value = strSerial;
			} else {
				//alert(strSerial);
			}
		} catch (e) {
			exlog("touchennxfwInterface.CustomEXCallback [exception] result", result);
			exalert("touchennxfwInterface.CustomEXCallback", "처리중 오류가 발생하였습니다.\n" + "result : "+result + "\nexception : " + e);
		}
	},
	
	
	
	//////////////////////////////////////////////
	// UserDefinition Interface Code Area......
	//////////////////////////////////////////////
	
	
	sampleFunction : function( params ){
		var exCallback = "touchennxfwInterface.sampleFunctionCallback";
		TouchEnnxFW.Invoke("TestEX", params, exCallback, callback);
	},
	
	sampleFunctionCallback : function( result ){
		try{
			var strSerial = JSON.stringify(result);
			exlog("touchennxfwInterface.sampleFunctionCallback", result);
			if(result.callback){
				TOUCHENEX_UTIL.runCallback(result.callback, result.reply);
			}
		} catch (e) {
			exlog("touchennxfwInterface.sampleFunctionCallback [exception] result", result);
			exalert("touchennxfwInterface.sampleFunctionCallback", "처리중 오류가 발생하였습니다.\n" + "result : "+result + "\nexception : " + e);
		}
	}
	////////////////////////////////////////////////
	
};
