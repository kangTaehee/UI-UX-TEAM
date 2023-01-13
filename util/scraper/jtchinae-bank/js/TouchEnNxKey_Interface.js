/**
****************************************************
TouchEnNxKey_Interface.js
****************************************************
| Version     작성자        수정일        변경사항 
 ---------  -------  -----------  ----------    
| v1.0.0.7    강남준    2021.01.29  
| v1.0.0.6    강남준    2021.01.29  
| v1.0.0.5    김민정    2020.12.21  
| v1.0.0.4    강남준    2019.07.05
| v1.0.0.3    백서린    2018.11.12
| v1.0.0.2    허혜림    2018.01.31      
| v1.0.0.1    백서린    2017.01.20      최초

****************************************************
 Copyright ⒞ RaonSecure Co., Ltd. 
 * 본 코드에 대한 모든 권한은 (주)라온시큐어 있으며 동의없이 사용/배포/가공할 수 없습니다.
****************************************************
**/

// TODO Plugin Object Define
var TOUCHENEX;

var downBasePath = location.protocol+"//"+location.host;

// TODO Plugin Info Set
var touchenexInfo = {
	"exPluginCallName"	: "TOUCHENEX",			
	"exPluginName"		: "TOUCHENEX",			
	"exPluginInfo"		: "touchenexInfo",		
	"exModuleName"		: "nxkey",			
	"tkInstallpage"		: TouchEnNxConfig.installPage.nxkey,
	"tkMainpage"		: TouchEnNxConfig.tkMainpage.nxkey, 
	"tkInstalled"		: false,
	"exInstalled"		: false,
	"clInstalled"		: false,
	"exErrFunc"			:"TK_CommonError",
	"exErrFunc2"		: "",//모듈 변조시 FAQ 페이지로 이동 로직 추가
	"lic"				: TouchEnNxConfig.lic,

	// Module Info, 플러그인 설치파일 경로
	"moduleInfo" : {
		"exWinVer"			: nxKeyConfig.version.exWinVer,
		"exWinClient"		: nxKeyConfig.module.exWinClient,
		"exWin64Ver"		: nxKeyConfig.version.exWin64Ver,
		"exWin64Client"		: nxKeyConfig.module.exWin64Client,
		"exMacVer"			: nxKeyConfig.version.exMacVer,
		"exMacClient"		: nxKeyConfig.module.exMacClient
	},

	// EX Protocol Info, EX를 포함한 플러그인 클라이언트 파일 경로
	"exProtocolInfo" : {
		"exWinProtocolVer"			: nxKeyConfig.version.exWinProtocolVer,
		"exWinProtocolDownURL"		: nxKeyConfig.module.exWinProtocolDownURL,
		"exWin64ProtocolDownURL"	: nxKeyConfig.module.exWin64ProtocolDownURL,
		"exMacProtocolVer"			: nxKeyConfig.version.exMacProtocolVer,
		"exMacProtocolDownURL"		: nxKeyConfig.module.exMacProtocolDownURL
	},

	//////////////////////////////////////////////////////////////
	//////       CrossEX AREA DO NOT EDIT !!
	//////////////////////////////////////////////////////////////
	"isInstalled"		: false,
	"exProtocolName"	: "touchenex",
	"exExtHeader"		: "touchenex",
	"exNPPluginId"		: "touchenexPlugin",
	"exNPMimeType"		: "application/x-raon-touchenex",
	"exFormName"		: "__CROSSEX_FORM__",
	"exFormDataName"	: "__CROSSEX_DATA__",


	"exEdgeInfo" : {
		"isUse"			: TouchEnNxConfig.daemon.info.isUse,
		"addScript"		: TouchEnNxConfig.commonPath+"TouchEnNx_daemon.js",
		"portChecker"	: TouchEnNxConfig.commonPath+"TouchEnNx_port_checker.js",
		"localhost"		: TouchEnNxConfig.daemon.info.localhost,
		"edgeStartPort"	: TouchEnNxConfig.daemon.info.edgeStartPort,
		"portChkCnt"	: TouchEnNxConfig.daemon.info.portChkCnt,
		"allSupport"	: false,
		"daemonVer"  : nxKeyConfig.version.daemonVer,
		"macDaemonVer"	: nxKeyConfig.version.macDaemonVer,
		"linuxDaemonVer": nxKeyConfig.version.linuxDaemonVer,
		"daemonDownURL"			:	nxKeyConfig.module.daemonDownURL,
		"macDaemonDownURL"			:	nxKeyConfig.module.macDaemonDownURL,
//		"ubuntu32DaemonDownURL"		:	nxKeyConfig.module.ubuntu32DaemonDownURL,
//		"ubuntu64DaemonDownURL"		:	nxKeyConfig.module.ubuntu64DaemonDownURL,
//		"fedora32DaemonDownURL"		:	nxKeyConfig.module.fedora32DaemonDownURL,
//		"fedora64DaemonDownURL"		:	nxKeyConfig.module.fedora64DaemonDownURL,
		"supportBrowser" : TouchEnNxConfig.daemon.SupportBrowser,
		"macSupportBrowser" : TouchEnNxConfig.daemon.macSupportBrowser,
		"linuxSupportBrowser" : TouchEnNxConfig.daemon.linuxSupportBrowser
	},
	// module minimum specification
	// PASS, ALL, NO
	"checkSpec"	: true,
	"reqSpec"	: {
		"OS"	: {
			"WINDOWS"	: "5.1",	// XP=5.1, VISTA=6.0, Win7=6.1, Win8=6.2, Win8.1=6.3, Win10=6.4/10.0
			"MACOSX"	: "10.8",	// Leopard=10.5, Snow Leopard=10.6, Lion=10.7, Mountain Lion=10.8, Mavericks=10.9, Yosemite=10.10, El Capitan=10.11
			"LINUX"		: "NO"
		},
		"Browser": {
			"MSIE"		: TouchEnNxConfig.moduleMinVer.MSIE,
			"EDGE"		: TouchEnNxConfig.moduleMinVer.Edge,
			"CHROME"	: TouchEnNxConfig.moduleMinVer.chromeMinVer,
			"FIREFOX"	: TouchEnNxConfig.moduleMinVer.FireFoxMinVer,
			"OPERA"		: TouchEnNxConfig.moduleMinVer.OperaMinVer,
			"SAFARI_WIN": TouchEnNxConfig.moduleMinVer.SafariMinVer,
			"SAFARI_MAC": "PASS"
		}
	},
	//////////////////////////////////////////////////////////////
	//////       CrossEX AREA DO NOT EDIT !!
	//////////////////////////////////////////////////////////////
	"isInstalled"		: false,				
	"exProtocolName"	: "touchenex",
	"exExtHeader"		: "touchenex",
	"exNPPluginId"		: "touchenexPlugin",
	"exNPMimeType"		: "application/x-raon-touchenex",
	"exSiteName"		: "raon",
	// Extension Info
	"exExtensionInfo" : {
		"exChromeExtVer"		: nxKeyConfig.version.extension.exChromeExtVer,
		"exChromeExtDownURL"	: nxKeyConfig.module.extension.exChromeExtDownURL,
		"exFirefoxExtVer"		: nxKeyConfig.version.extension.exFirefoxExtVer,
		"exFirefoxExtDownURL"	: nxKeyConfig.module.extension.exFirefoxExtDownURL,
		"exFirefoxJpmExtVer" : nxKeyConfig.version.extension.exFirefoxJpmExtVer,
		"exFirefoxJpmExtDownURL" : nxKeyConfig.module.extension.exFirefoxJpmExtDownURL,
		"exFirefoxExtIcon"		: "",//48*48 icon
		"exOperaExtVer"			: nxKeyConfig.version.extension.exOperaExtVer,
		"exOperaExtDownURL"		: nxKeyConfig.module.extension.exOperaExtDownURL
	}
};

/****************************
 ** edge condition
 ** include exproto_ext_daemon.js
 ****************************/
//function touchenexEdgeCond(){
//	return touchenexInfo.exEdgeInfo.isUse && TOUCHENEX_UTIL.isEdge();
//}
//if(touchenexEdgeCond()){
//	document.write("<script type='text/javascript' src='" + touchenexInfo.exEdgeInfo.addScript + "'></script>");
//}

// TODO Plugin Interface Define
var touchenexInterface = {
	exCommonError : function( response ){
		// TODO module check error
		alert("exCommonError" + JSON.stringify(response));
	},
	
	exSpecError : function( type, reqSpec ){
		if(type == "OS"){
			var printOS = "";
			if(TOUCHENEX_UTIL.isWin()){
				var winName = "";
				//XP=5.1, XP(x64)=5.2, VISTA=6.0, Win7=6.1, Win8=6.2, Win8.1=6.3, Win10=10.0
				if(reqSpec.WINDOWS == "5.1") winName = "XP";
				else if(reqSpec.WINDOWS == "5.2") winName = "XP";
				else if(reqSpec.WINDOWS == "6.0") winName = "VISTA";
				else if(reqSpec.WINDOWS == "6.1") winName = "Win7";
				else if(reqSpec.WINDOWS == "6.2") winName = "Win8";
				else if(reqSpec.WINDOWS == "6.3") winName = "Win8.1";
				else if(reqSpec.WINDOWS == "10.0") winName = "Win10";
				printOS = "WINDOWS " + winName + "이상";
			} else if(TOUCHENEX_UTIL.isMac()) printOS = "MACOSX " + reqSpec.MACOSX + "이상";
			else if(TOUCHENEX_UTIL.isLinux()) printOS = "LINUX " + reqSpec.LINUX + "이상";
			else printOS = "UNDEFINED OS";
			
			alert("지원하지 않는 운영체제입니다.");
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
	
	InitEcho : function( params, callback ){
		TOUCHENEX.setEcho(true);
		var exCallback = "touchenexInterface.InitEchoCallback";
		TOUCHENEX.Invoke("TestEX", params, exCallback, callback);
	},
	
	InitEchoCallback : function( result ) {
		TOUCHENEX.setEcho(false);
		try{
			var strSerial = JSON.stringify(result);
			exlog("touchenexInterface.InitEchoCallback", result);
			if(result.callback){
				TOUCHENEX_UTIL.runCallback(result.callback, result.reply);
			}
		} catch (e) {
			exlog("touchenexInterface.InitEchoCallback [exception] result", result);
			exalert("touchenexInterface.InitEchoCallback", "처리중 오류가 발생하였습니다.\n" + "result : "+result + "\nexception : " + e);
		}
	},
	
	TestEX : function( params, callback ){
		
		var exCallback = "touchenexInterface.TestEXCallback";
		TOUCHENEX.Invoke("TestEX", params, exCallback, callback);
	},
	
	TestEXCallback : function( result ) {
		try{
			var strSerial = JSON.stringify(result);
			exlog("touchenexInterface.TestEXCallback", result);
			if(result.callback){
				TOUCHENEX_UTIL.runCallback(result.callback, result.reply);
			}
		} catch (e) {
			exlog("touchenexInterface.TestEXCallback [exception] result", result);
			exalert("touchenexInterface.TestEXCallback", "처리중 오류가 발생하였습니다.\n" + "result : "+result + "\nexception : " + e);
		}
	},
	
	TestEXPush : function( params ){
		TOUCHENEX.SetPushCallback("new", params);
	},
	
	TestEXPushAdd : function( params ){
		TOUCHENEX.SetPushCallback("add", params);
	},
	
	//////////////////////////////////////////////
	// UserDefinition Interface Code Area......
	//////////////////////////////////////////////
	
	
	//=======================================================
	// start here...

	TK_Request : function( params, callback ){
		var exCallback = "touchenexInterface.TK_RequestCallback";
		TOUCHENEX.Invoke("Request", params, exCallback, callback);
	},
	
	TK_RequestCallback : function( result ) {
		try{
			var strSerial = JSON.stringify(result);
			exlog("touchenexInterface.TK_RequestCallback", result);
			TOUCHENEX_UTIL.runCallback(result.callback, result.reply);
		} catch (e) {
			exlog("touchenexInterface.TK_RequestCallback [exception] result", result);
			exalert("touchenexInterface.TK_RequestCallback", "처리중 오류가 발생하였습니다.\n" + "result : "+result + "\nexception : " + e);
		}
	},
	
	GetEncData : function( params, callback){
			var exCallback = "touchenexInterface.GetEncDataCallback";
			TOUCHENEX.Invoke("GetEncData", params, exCallback, callback);		
	},
	
	
	GetEncDataCallback : function( result ) {
		try{
			var strSerial = JSON.stringify(result);
			exlog("touchenexInterface.GetEncDataCallback", result);
			if(result.callback){
				TOUCHENEX_UTIL.runCallback(result.callback, result);
			}
		} catch (e) {
			exlog("touchenexInterface.GetEncDataCallback [exception] result", result);
			exalert("touchenexInterface.GetEncDataCallback", "처리중 오류가 발생하였습니다.\n" + "result : "+result + "\nexception : " + e);
		}
	},


	TK_Start : function( params, callback ){
		exlog("TK_Start.params", params);
		var exCallback = "touchenexInterface.TK_StartCallback";
		TOUCHENEX.Invoke("Key_Start", params, exCallback, callback);
	},
	
	TK_StartCallback : function( result ) {
		try{
			var strSerial = JSON.stringify(result);
			exlog("touchenexInterface.TK_StartCallback", result);
			//exalert("touchenexInterface.TK_StartCallback", result);
			TOUCHENEX_UTIL.runCallback(result.callback, result.reply);
		} catch (e) {
			exlog("touchenexInterface.TK_StartCallback [exception] result", result);
			exalert("touchenexInterface.TK_StartCallback", "처리중 오류가 발생하였습니다.\n" + "result : "+result + "\nexception : " + e);
		}
	},
	
	TK_Init : function( params, callback ){
		exlog("TK_Init.params", params);
		var exCallback = "touchenexInterface.TK_InitCallback";
		TOUCHENEX.Invoke("Key_Init", params, exCallback, callback);
	},
	
	TK_InitCallback : function( result ) {
		try{
			var strSerial = JSON.stringify(result);
			exlog("touchenexInterface.TK_InitCallback", result);
			//exalert("EXInterface.TK_StartCallback", result);
			TOUCHENEX_UTIL.runCallback(result.callback, result.reply);
		} catch (e) {
			exlog("touchenexInterface.TK_InitCallback [exception] result", result);
			exalert("touchenexInterface.TK_InitCallback", "처리중 오류가 발생하였습니다.\n" + "result : "+result + "\nexception : " + e);
		}
	},

	TK_Stop : function( params, callback ){

		var exCallback = "touchenexInterface.TK_StopCallback";
		TOUCHENEX.Invoke("Key_Stop", params, exCallback, callback);
	},

	TK_StopCallback : function( result ) {
		try{
			var strSerial = JSON.stringify(result);
			exlog("touchenexInterface.TK_StopCallback", result);
			//exalert("touchenexInterface.TK_StopCallback", result);
			TOUCHENEX_UTIL.runCallback(result.callback, result.reply);
		} catch (e) {
			exlog("touchenexInterface.TK_StopCallback [exception] result", result);
			exalert("touchenexInterface.TK_StopCallback", "처리중 오류가 발생하였습니다.\n" + "result : "+result + "\nexception : " + e);
		}
	},

	TK_RealStop : function( params, callback ){

		var exCallback = "touchenexInterface.TK_RealStopCallback";
		TOUCHENEX.Invoke("Key_RealStop", params, exCallback, callback);
	},

	TK_RealStopCallback : function( result ) {
		try{
			var strSerial = JSON.stringify(result);
			exlog("touchenexInterface.TK_RealStopCallback", result);
			//exalert("touchenexInterface.TK_StopCallback", result);
			TOUCHENEX_UTIL.runCallback(result.callback, result.reply);
		} catch (e) {
			exlog("touchenexInterface.TK_RealStopCallback [exception] result", result);
			exalert("touchenexInterface.TK_RealStopCallback", "처리중 오류가 발생하였습니다.\n" + "result : "+result + "\nexception : " + e);
		}
	},

	TK_KeyDown : function( params, callback ){

		var exCallback = "touchenexInterface.TK_KeyDownCallback";
		TOUCHENEX.Invoke("Key_Keydown", params, exCallback, callback);
	},

	TK_KeyDownCallback : function( result ) {
		try{
			var strSerial = JSON.stringify(result);
			exlog("touchenexInterface.TK_KeyDownCallback", result);
			//exalert("touchenexInterface.TK_KeyDownCallback", result);
			TOUCHENEX_UTIL.runCallback(result.callback, result.reply);
		} catch (e) {
			exlog("touchenexInterface.TK_KeyDownCallback [exception] result", result);
			exalert("touchenexInterface.TK_KeyDownCallback", "처리중 오류가 발생하였습니다.\n" + "result : "+result + "\nexception : " + e);
		}
	}

};
