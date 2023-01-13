

/**
****************************************************
TouchEnNx_config.js
****************************************************
| Version     작성자        수정일        변경사항 
 ---------  -------  -----------  ----------    
| v1.0.0.1    허혜림    2017.10.23      

****************************************************
 Copyright ⒞ RaonSecure Co., Ltd. 
****************************************************
**/

var nxFwConfig = {};
nxFwConfig.version = {
	
	extension :{
		exChromeExtVer		:	"1.0.1.14",
		exFirefoxExtVer		:	"1.0.2.5",
		exFirefoxJpmExtVer	:	"1.0.1.12",
		exOperaExtVer		:	"1.0.1.13"
	},
	
		exWinVer			:	"1.0.0.23",
		exWin64Ver			:	"1.0.0.23",
		exWinProtocolVer	:	"1.0.1.1091",
		daemonVer			:	"1.0.2.4",
		daemon64DownURL		:	"1.0.2.4",
		exMacVer			:	"1.0.0.1",
		exMacProtocolVer	:	"1.0.0.956"
};


nxFwConfig.module = {
	
	
		extension	:{
		//exChromeExtDownURL	: "https://chrome.google.com/webstore/detail/dncepekefegjiljlfbihljgogephdhph",
		exChromeExtDownURL	: "https://download.raonsecure.com/extension/chrome/chrome.html",
		exFirefoxExtDownURL	: TouchEnNxConfig.path.base + "/extension/touchenex_firefox.xpi",
		exFirefoxJpmExtDownURL	: TouchEnNxConfig.path.base + "/extension/jpm_touchenex_firefox.xpi",
		exOperaExtDownURL	: TouchEnNxConfig.path.base + "/extension/touchenex_opera.nex"
	},
	
		/** 방화벽 설정 */
		exWinClient					:	TouchEnNxConfig.path.base + "/nxFw/module/TEFW_Installer.exe",
		exWin64Client				:	TouchEnNxConfig.path.base + "/nxFw/module/TEFW_Installer64.exe",
		daemonDownURL				:	TouchEnNxConfig.path.base + "/nxFw/module/TEFW_Installer.exe",
		exMacClient					:	TouchEnNxConfig.path.base + "/nxFw/module/TEFW_Installer.pkg",
		exMacProtocolDownURL		: 	TouchEnNxConfig.path.base + "/nxFw/module/TEFW_Installer.pkg"
		
};
