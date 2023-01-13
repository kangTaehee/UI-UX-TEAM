/**
****************************************************
TouchEnNx_config.js
****************************************************
| Version     작성자        수정일        변경사항 
 ---------  -------  -----------  ----------
 | v1.0.0.9    강남준    2021.08.14
 | v1.0.0.8    강남준    2021.01.29
 | v1.0.0.7    강남준    2020.02.17
 | v1.0.0.6    강남준    2019.07.05
 | v1.0.0.5    강남준    2018.12.14
 | v1.0.0.4    백서린    2018.11.12
 | v1.0.0.3    강남준    2018.05.14
 | v1.0.0.2    허혜림    2018.01.31
 | v1.0.0.1    허혜림    2017.12.20          

****************************************************
 Copyright ⒞ RaonSecure Co., Ltd. 
****************************************************
**/

var nxKeyConfig ={};
nxKeyConfig.version = {
	
	extension :   {
		exChromeExtVer		:	"1.0.0.0",
		exFirefoxExtVer		:	"1.0.2.5",
		exFirefoxJpmExtVer	:	"1.0.1.12",
		exOperaExtVer		:	"1.0.1.14"
	},
		
	/** 키보드보안 설정 */
		tkappiver			:	"1.0.0.69",
		tkappmver			:	"1.0.0.59",
		exWinVer			:	"1.0.0.75",
		exWin64Ver			:	"1.0.0.75",
		exWinProtocolVer	:	"1.0.1.1243",
		daemonVer			:   "1.0.2.8",
		macDaemonVer		:   "1.0.1.7",
		linuxDaemonVer		:   "1.0.0.1",
		exMacVer			:	"1.0.0.13",
		exMacProtocolVer	:	"1.0.1.1392"
};

nxKeyConfig.module = {
	
	extension	:{
		//exChromeExtDownURL	: "https://chrome.google.com/webstore/detail/dncepekefegjiljlfbihljgogephdhph",
		exChromeExtDownURL	: "https://download.raonsecure.com/extension/chrome/chrome.html",
		exFirefoxExtDownURL	: TouchEnNxConfig.path.base + "/extension/touchenex_firefox.xpi",
		exFirefoxJpmExtDownURL	: TouchEnNxConfig.path.base + "/extension/jpm_touchenex_firefox.xpi",
		exOperaExtDownURL	: TouchEnNxConfig.path.base + "/extension/touchenex_opera.nex"
	},
	
		exWinClient		            :	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_32bit.exe",
		exWin64Client            	:	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_64bit.exe",
		daemonDownURL				:	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_32bit.exe",
		macDaemonDownURL			:	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_Installer.pkg",
	//	ubuntu32DaemonDownURL		:	TouchEnNxConfig.path.base + "/nxKey/module/CrossEXService_32bit.deb",
	//	ubuntu64DaemonDownURL		:	TouchEnNxConfig.path.base + "/nxKey/module/CrossEXService_64bit.deb",
	//	fedora32DaemonDownURL		:	TouchEnNxConfig.path.base + "/nxKey/module/CrossEXService_32bit.rpm",
	//	fedora64DaemonDownURL		:	TouchEnNxConfig.path.base + "/nxKey/module/CrossEXService_64bit.rpm",
		exMacClient					:	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_Installer.pkg",
		exMacProtocolDownURL		: 	TouchEnNxConfig.path.base + "/nxKey/module/TouchEn_nxKey_Installer.pkg"
};

/** 키보드보안 E2E 를 사용하지 않을 경우 주석해제*/
//var TNK_SR = "";

/**	클라이언트 솔루션별 동작 설정*/
TouchEnNxConfig.solution={
		nxkey : {
				tekOption : {
					"pki": "TouchEnkeyEx",
				    "keyboardonly": "false",
				    "defaultenc": "false",
				    "verify": "1",
				    "defaultpaste": "true",
				    "iframename": "",
				    "usegetenc": "false",
				    "clearbufferonempty": "true",
				    "refreshsession": "true",
				    "improve": "true",
					"bstart": 0,
				    "setcallback": "false",
				    "usebspress": "false",
				    "ignoreprogress": "true",
				    "ignoreprogress2": "true",
				    "exformname": "",
				    "idbase": "false",
				    "allcrypt": "false",
					"browserinfo" : "",
					"cert" : "-----BEGIN CERTIFICATE-----MIIDRzCCAi+gAwIBAgIJAOYjCX4wgWLvMA0GCSqGSIb3DQEBCwUAMGcxCzAJBgNVBAYTAktSMR0wGwYDVQQKExRSYW9uU2VjdXJlIENvLiwgTHRkLjEaMBgGA1UECxMRUXVhbGl0eSBBc3N1cmFuY2UxHTAbBgNVBAMTFFJhb25TZWN1cmUgQ28uLCBMdGQuMB4XDTE1MDcyMDA3MjcxNFoXDTI1MDcxNzA3MjcxNFowQzELMAkGA1UEBhMCS1IxFjAUBgNVBAoTDWp0Y2hpbmFlLWJhbmsxHDAaBgNVBAMTE2p0Y2hpbmFlLWJhbmsuY28ua3IwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDpyFlvz8Mh+mbJvY/7dpTLv4JAtdwS52trSY23Ou13oD2K+cZKAyRotdanRl5zMUhNF7bwhwVDS+oLJBHPRjbS5ToZ4We/YUYkjW1dzVYIzr9mVeoMbB0ewVjOtEPh9OMj90jD2rXtZWfyTrDv+pdbfiJ4TQtFyEdGteR3HjKGDcgo7vt+s5kzCiL4j3R/jqVN8gMeFjtfyHjEN1DZQdDw1hNrhwU1kpMDypbyMILdpn30oPBa8mGobykLJP6RaFP45g3AZ2LMpKfXQX1Szxd9xOgiY4iHQNYxOWvvXjCOR77UI9g5AkVoPKPzZYsmTWaPrNY2afRurPzH5qQLaO5tAgMBAAGjGjAYMAkGA1UdEwQCMAAwCwYDVR0PBAQDAgXgMA0GCSqGSIb3DQEBCwUAA4IBAQBh14XTgjZl+pmjn9zbblpppKvfhEHoVr2UEbNJf7wDUc4jl87VBsAQDuMcuYp5S7ircgscywjyfrF6iqXePO+gt3QZj3s7XsE38fl29Dr6qn8v2jz+QHflWdPrbBSNelLqG9aCW9jWeO/L8OEqSbrUFtWgltKEu6/ZmABRuQ2nivMqefFmOYGAMFaXU6yiXHVTwyiwJw+Ypx3OeVUsp6ANo36oLZ6id0hpsdeb0GDUn2rwZE4mcdteqoyhy9nk6rq+lrRWfbJC4LmcLVT74iWYEkOcE1S/19Q6C5HslyMZjDZc3bqAcgNZXM31qf1epQ/5jXHebayvfMfatHktSeaG-----END CERTIFICATE-----",
					"srdk": TNK_SR,
					"generate_event": "false",
					"driverexcept": "0",
					"delayedck": "false",
					"shiftbypass": "true",
					"allowdup": "false",
					"enc2": "false",
				    "searchformname":"",
					"runtype": TouchEnNxConfig.runtype,
					"tk_isRunningSecurity" : "false", 
					"isAllowIdOverlap" : "true", //히든필드 중복오류 수정시 false설정 및 서버버전 v2.0.3.3 적용필요
					"defaultsecurityid" : "true",
					"newModule" : "true"
				}
		}
};