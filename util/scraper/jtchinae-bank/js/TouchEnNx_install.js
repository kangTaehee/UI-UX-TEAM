 /**						 
****************************************************
TouchEnNx_Install.js
****************************************************
| Version     작성자        수정일        변경사항 
 ---------  -------  -----------  ---------- 
| v1.0.0.6    임 동    2021.03.25   eval()함수 제거 확인
| v1.0.0.5    강남준    2019.06.11
| v1.0.0.4    강남준    2018.11.12    
| v1.0.0.3    백서린    2018.11.12     
| v1.0.0.2    강남준    2018.02.09      
| v1.0.0.1    백서린    2017.01.20      최초

****************************************************
 Copyright ⒞ RaonSecure Co., Ltd. 
  * 본 코드에 대한 모든 권한은 (주)라온시큐어 있으며 동의없이 사용/배포/가공할 수 없습니다.
****************************************************
**/

var TOUCHENEX_INSTALL = {
	
	installWindow : null,
	
	download : function( moduleName, type, ostype ) {
		//2016-07-05
		var downloadInfo ="";// touchenexInfo;
		try{
			if(moduleName =="nxkey"){
				downloadInfo = touchenexInfo;
			}else if(moduleName =="nxwirelesscert"){
				downloadInfo = keysharpnxInfo;
			}else if(moduleName	=="nxweb"){
				downloadInfo = touchennxwebInfo;
			}else if(moduleName == "nxfirewall"){
				downloadInfo = touchennxfwInfo;
			}else if(moduleName == "biz"){
				downloadInfo = keysharpbizInfo;
			}
		}catch(e){
				exlog("_INSTALL.download", "download Info");
		}
		
		var pluginInfo = {};
		for(var i = 0; i < TOUCHENEX_CONST.pluginInfo.length; i++){
			if(TOUCHENEX_CONST.pluginInfo[i].exModuleName == moduleName){
				pluginInfo = TOUCHENEX_CONST.pluginInfo[i];
				//exlog("_INSTALL.download", pluginInfo);
				break;
			}
		}
		
		function inner_random() { 
			var seed = new Date().getTime(); 
			seed = (seed*9301+49297) % 233280; 
			return seed/(233280.0);
		}
		
		var dummyParam = "dummy="+Math.floor(inner_random() * 10000) + 1;
		
		// Extension
		if(type == "extension"){
			
			if(TOUCHENEX_UTIL.isChrome()){
				
				if(!this.installWindow || this.installWindow.closed){
					this.installWindow = window.open(downloadInfo.exExtensionInfo.exChromeExtDownURL);
					if(this.installWindow == null) alert("팝업차단을 확인해주세요.");
				}
				
			} else if(TOUCHENEX_UTIL.isFirefox()) {
				
				var params = {};
				dummyParam = "ver=" + downloadInfo.exExtensionInfo.exFirefoxExtVer;
				
				params[downloadInfo.exProtocolName + "_firefox"] = {
					URL: downloadInfo.exExtensionInfo.exFirefoxExtDownURL + "?" + dummyParam,
					IconURL: downloadInfo.exExtensionInfo.exFirefoxExtIcon
				};
				InstallTrigger.install(params);
				
			} else if(TOUCHENEX_UTIL.isOpera()) {
				if(Number(TOUCHENEX_UTIL.getBrowserVer()) >= 74){//74부터 opera nex 지원 중단으로 인한 chrome extension 설치 방식으로 변경
					if(!this.installWindow || this.installWindow.closed){
						this.installWindow = window.open(downloadInfo.exExtensionInfo.exChromeExtDownURL);
						if(this.installWindow == null) alert("팝업차단을 확인해주세요.");
					}
				}else{
					dummyParam = "ver=" + downloadInfo.exExtensionInfo.exOperaExtVer;
					location.href = downloadInfo.exExtensionInfo.exOperaExtDownURL + "?" + dummyParam;
				}
			} else {
				alert("현재 브라우저는 extension 설치를 지원하지 않습니다.");
			}
			return;
		}
		
		// EX
		if(type == "EX"){
			var downURL = "";
			
			if(TOUCHENEX_UTIL.isWin()){
				if(TOUCHENEX_UTIL.getBrowserBit() == "64"){
					downURL = downloadInfo.exProtocolInfo.exWin64ProtocolDownURL;
				} else {
					downURL = downloadInfo.exProtocolInfo.exWinProtocolDownURL;
				}
			} else if(TOUCHENEX_UTIL.isMac()){
				downURL = downloadInfo.exProtocolInfo.exMacProtocolDownURL;
			} else if(TOUCHENEX_UTIL.isLinux()){
				if(ostype == 'ubuntu32')
				{
					downURL = downloadInfo.exProtocolInfo.exUbuntu32ProtocolDownURL;
				}
				else if(ostype == 'ubuntu64')
				{
					downURL = downloadInfo.exProtocolInfo.exUbuntu64ProtocolDownURL;
				}
				else if(ostype == 'fedora32')
				{
					downURL = downloadInfo.exProtocolInfo.exFedora32ProtocolDownURL;
				}
				else if(ostype == 'fedora64')
				{	
					downURL = downloadInfo.exProtocolInfo.exFedora64ProtocolDownURL;
				}
				// TODO
			}
			
			if(!TOUCHENEX_UTIL.isIE()){
				dummyParam = "ver=" + downloadInfo.exProtocolInfo.exWinProtocolVer;
				location.href = downURL + "?" + dummyParam;
			} else {
				location.href = downURL;
			}
			return;
		}
		
		// Daemon
		if(type == "daemon"){
			var downURL = "";
			var bSupportBrowser = false;
					
			if (TOUCHENEX_UTIL.isIE() || (TOUCHENEX_UTIL.isWin() && TOUCHENEX_UTIL.isSafari() && !TOUCHENEX_UTIL.isChrome()))
			{				
				if(TOUCHENEX_UTIL.isIE() && TOUCHENEX_UTIL.getBrowserBit() == "64"){
					downURL = downloadInfo.moduleInfo.exWin64Client;
				} else {
					downURL = downloadInfo.moduleInfo.exWinClient;
				}
			}
			else {
				//if(typeof TOUCHENEX_UTIL.typeDaemonEX == "function" && TOUCHENEX_UTIL.typeDaemonEX(pluginInfo)){
				//if(TOUCHENEX_UTIL.isEdge() || TOUCHENEX_UTIL.isChrome() || TOUCHENEX_UTIL.isFirefox() || TOUCHENEX_UTIL.isOpera()) {
					var daemonInfo = downloadInfo.exEdgeInfo;
					var browserType = TOUCHENEX_UTIL.getBrowserInfo().browser;
					var supportBrowser;
					if(TOUCHENEX_UTIL.isWin()){
						supportBrowser = daemonInfo.supportBrowser;
					}else if(TOUCHENEX_UTIL.isMac()){
						supportBrowser = daemonInfo.macSupportBrowser;
					}else if(TOUCHENEX_UTIL.isLinux()){
						supportBrowser = daemonInfo.linuxSupportBrowser;
					}
					if(daemonInfo && supportBrowser instanceof Array && supportBrowser.length > 0)
					{
						for(var i = 0; i < supportBrowser.length; i++)
						{
							var reqBrowser = supportBrowser[i];
							if(browserType.toUpperCase() == reqBrowser.toUpperCase())
							{
								if(TOUCHENEX_UTIL.isMac()){
									downURL = downloadInfo.moduleInfo.exMacClient;
								}else if(TOUCHENEX_UTIL.isLinux()){
								
								}else{
									if(TouchEnNxConfig.runtype == "mainextension" && TOUCHENEX_UTIL.isFirefox() && TOUCHENEX_UTIL.getBrowserBit() == "64" && typeof touchenex_nativecall != "undefined")
									{
										downURL = downloadInfo.moduleInfo.exWin64Client;
									}
									else
									{
										downURL = downloadInfo.moduleInfo.exWinClient;									
									}								
								}
								
								bSupportBrowser = true;
							}
						}
					}
				
				if(bSupportBrowser == false) 
				{
					alert("현재 브라우저는 daemon 설치를 지원하지 않습니다.");
					return;
				}
			}
				
			location.href = downURL;
				   
			return;
		}

		
		// Client
		if(type == "client"){
			var downURL = "";
			
			if(TOUCHENEX_UTIL.isWin()){
				//if((TOUCHENEX_UTIL.isIE() || TOUCHENEX_UTIL.isFirefox()) && TOUCHENEX_UTIL.getBrowserBit() == "64"){
				if(TOUCHENEX_UTIL.getBrowserBit() == "64"){
					downURL = downloadInfo.moduleInfo.exWin64Client;
				} else {
					downURL = downloadInfo.moduleInfo.exWinClient;
				}
			} else if(TOUCHENEX_UTIL.isMac()){
				downURL = downloadInfo.moduleInfo.exMacClient;
			} else if(TOUCHENEX_UTIL.isLinux()){
				if(ostype == 'ubuntu32')
				{
					downURL = downloadInfo.exProtocolInfo.exUbuntu32ProtocolDownURL;
				}
				else if(ostype == 'ubuntu64')
				{
					downURL = downloadInfo.exProtocolInfo.exUbuntu64ProtocolDownURL;
				}
				else if(ostype == 'fedora32')
				{
					downURL = downloadInfo.exProtocolInfo.exFedora32ProtocolDownURL;
				}
				else if(ostype == 'fedora64')
				{	
					downURL = downloadInfo.exProtocolInfo.exFedora64ProtocolDownURL;
				}
				// TODO
			}
			
			if(!TOUCHENEX_UTIL.isIE()){
				dummyParam = "ver=" + downloadInfo.moduleInfo.exWinVer;
				location.href = downURL + "?" + dummyParam;
			} else {
				location.href = downURL;
			}
			return;
		}
	}
};

