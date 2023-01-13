/*
var touchenexBaseDir = "/TouchEn";

document.write("<script type='text/javascript' charset='utf-8' src='" + touchenexBaseDir + "/nxFirewall/js/TouchEnNxFirewall_Install.js'></script>");
document.write("<script type='text/javascript' charset='utf-8' src='" + touchenexBaseDir + "/cmn/exproto.js'></script>");
document.write("<script type='text/javascript' charset='utf-8' src='" + touchenexBaseDir + "/nxFirewall/js/TouchEnNxFirewall_Interface.js'></script>");

*/

var loadflag = false;

function exLoading(){	
	TOUCHENEX_CHECK.check([touchennxfwInfo], "exLoadingCallback");
}

function exLoadingCallback(check){
	exlog("exLoadingCallback", check);
	if(check.status){
		TOUCHENEX_LOADING("exModuleInit");
	} else {
		//alert("프로그램 설치가 필요합니다.\n" + JSON.stringify(check) + "\n다운로드 버튼을 클릭하여 설치를 진행하세요.");
		alert("개인PC방화벽 보안프로그램 설치가 필요합니다.\n[확인]을 선택하시면 설치페이지로 연결됩니다.");
		location.href = touchennxfwInfo.tkInstallpage;
		/*if(TOUCHENEX_UTIL.typeExtension()){
			TOUCHENEX_INSTALL.download("nxfirewall","extension");
		}else{
			TOUCHENEX_INSTALL.download("nxfirewall","client");
		}*/
	}
}

function exModuleInit(result){
	if(result){
		touchennxfwInterface.CustomEX("Key_Start","tefw://" + downBasePath + "/TouchEn/nxFw/TEFW_CONF.ini");
	} else {
		alert("초기화에 실패하였습니다.");
	}
} 

function tefwInstallMove(){
	location.href = touchennxfwInfo.tkInstallpage;	
}

function tefwInstallDownload(){
	TOUCHENEX_INSTALL.download("nxfirewall","client");	
}

function tefwextensionInstall() {
	if(TOUCHENEX_UTIL.isChrome() || TOUCHENEX_UTIL.isFirefox() || TOUCHENEX_UTIL.isOpera()){
		TOUCHENEX_INSTALL.download("nxfirewall","extension");	
	}
}

function tefwCheckMove(){
	TOUCHENEX_CHECK.check([touchennxfwInfo], "tefwCheckMoveCallback");
}

function tefwCheckMoveCallback(check) {
    try {
        currStatus = check;
        if (currStatus.status) {
            location.href = touchennxfwInfo.tkMainpage;
        } 
    } catch (e) {}
}