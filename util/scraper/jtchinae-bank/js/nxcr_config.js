/*
****************************************************
	NXCertRelay.js 수정내역 
****************************************************
| Version		 작성자		 수정일		 변경사항 
 ---------		-------		---------	----------
| v2.1.0.7		 임 동		2021.03.25  client 버전변경
| v2.1.0.6		 임 동		2020.05.14
| v2.1.0.5		 강남준		2020.02.12	
| v2.1.0.4		 강남준		2020.02.04	
| v2.1.0.3		 강남준		2019.03.06	
| v2.1.0.2		 강남준		2019.02.02	
| v2.1.0.1		 강남준		2018.06.19	
| v2.1.0.0		 강남준		2017.04.27	

****************************************************
 Copyright ⒞ RaonSecure Co., Ltd. 
****************************************************
*/

var nxCRConfig = {};

nxCRConfig.version = {
	
	    /** extension 버전 */
	extension :{
		exChromeExtVer		:	"1.0.1.15",
		exFirefoxExtVer		:	"1.0.2.5",
		exFirefoxJpmExtVer	:	"1.0.1.12",	
		exOperaExtVer		:	"1.0.1.14"
	},
	
		/** 인증서복사 설정 */
		exWinVer			:	"2.1.0.21",
		exWin64Ver			:	"2.1.0.21",
		exWinProtocolVer	:	"1.0.1.1243",
		daemonVer			: 	"1.0.2.9",
		macDaemonVer		: 	"1.0.1.7",
		linuxDaemonVer		: 	"1.0.0.1",
		
		exMacVer			:	"1.0.0.12",
		exMacProtocolVer	:	"1.0.1.1392",
		
		exLinuxVer			: 	"1.0.0.8",
		exUbuntu32Client	: 	"1.0.0.8",
		exUbuntu64Client	: 	"1.0.0.8",
		exFedora32Client	: 	"1.0.0.8",
		exFedora64Client	: 	"1.0.0.8",
		exLinuxProtocolVer	: 	"1.0.1.1101"
		

};

nxCRConfig.module = {
	
		extension	:{
		//마켓배포 실주소 exChromeExtDownURL 	: "https://chrome.google.com/webstore/detail/dncepekefegjiljlfbihljgogephdhph",
		exChromeExtDownURL	: "https://download.raonsecure.com/extension/chrome/chrome.html",
		exFirefoxExtDownURL	: TouchEnNxConfig.path.base + "/extension/touchenex_firefox.xpi",
		exFirefoxJpmExtDownURL	: TouchEnNxConfig.path.base + "/extension/jpm_touchenex_firefox.xpi",
		exOperaExtDownURL	: TouchEnNxConfig.path.base + "/extension/touchenex_opera.nex"
		},
	
	
		exWinClient				:	TouchEnNxConfig.path.base + "/nxCR/module/KSCertRelay_nx_Installer_32bit.exe",
		exWin64Client			:	TouchEnNxConfig.path.base + "/nxCR/module/KSCertRelay_nx_Installer_64bit.exe",
		daemonDownURL		:	TouchEnNxConfig.path.base + "/nxCR/module/KSCertRelay_nx_Installer_32bit.exe",
		macDaemonDownURL		:	TouchEnNxConfig.path.base + "/nxCR/module/module/KSCertRelay_nx_Installer.pkg",
		ubuntu32DaemonDownURL		:	TouchEnNxConfig.path.base + "/nxCR/module/KSCertRelay_nx_Installer_32bit.exe",
		ubuntu64DaemonDownURL		:	TouchEnNxConfig.path.base + "/nxCR/module/KSCertRelay_nx_Installer_32bit.exe",
		fedora32DaemonDownURL		:	TouchEnNxConfig.path.base + "/nxCR/module/KSCertRelay_nx_Installer_32bit.exe",
		fedora64DaemonDownURL		:	TouchEnNxConfig.path.base + "/nxCR/module/KSCertRelay_nx_Installer_32bit.exe",
		exMacClient 			: 	TouchEnNxConfig.path.base + "/nxCR/module/KSCertRelay_nx_Installer.pkg",
		exMacProtocolDownURL	: 	TouchEnNxConfig.path.base + "/nxCR/module/KSCertRelay_nx_Installer.pkg",
		exUbuntu32ProtocolDownURL	: 	TouchEnNxConfig.path.base + "/nxCR/module/KSCertRelay_nx_Installer_i386.deb",
		exUbuntu64ProtocolDownURL	: 	TouchEnNxConfig.path.base + "/nxCR/module/KSCertRelay_nx_Installer_amd64.deb",
		exFedora32ProtocolDownURL	: 	TouchEnNxConfig.path.base + "/nxCR/module/KSCertRelay_nx_Installer_i386.rpm",
		exFedora64ProtocolDownURL	: 	TouchEnNxConfig.path.base + "/nxCR/module/KSCertRelay_nx_Installer_x86_64.rpm"
};

//var keysharpnxBaseDir = "";
var ksloadflag = false;

//[간편인증서내보내기/가져오기] 관련 변수. 
//개발
//var g_ICRP_ServerIP = "interloan.jtchinae-bank.co.kr";
//운영
var g_ICRP_ServerIP = "loan.jtchinae-bank.co.kr";
var g_ICRP_ServerPort = "10500";
var g_ICRP_PwdCount = "3";
var g_ICRP_Function = "1";
var g_ICRP_BannerImgURL = "";		//QR코드인증서복사에서도 사용.	//QR코드인증서복사에서도 사용.
var g_ICRP_AutoFocus ="0";
var g_ICRP_PKCS12 ="0";
var g_ICRP_Language = "1";
var g_ICRP_RequiredAlg = "0";
var g_ICRP_Kmcertsupport= "0";
var g_ICRP_Keypro = "1";
var g_ICRP_Transkey_URL=""; //Transkey v4.6 적용 테스트 url "http://d.touchen.co.kr:8080/TranskeyWeb4.6.2/attribute/Transkey_crt.jsp";
var g_ICRP_Transkey_Size ="2"; //1 :Transkey v4.5 키패드 크기, 2 : Transkey v4.6 키패드크기
var g_ICRP_CodeSignVerify = "1";
var g_ICRP_FontSizeEditCtrl = "15";
var g_ICRP_FontSizeCnum = "40";
var g_ICRP_CertDN = "";

var g_ICRP_SelfSignedCert = "0";
var g_ICRP_PushIndex = "";

//간편복사 문구 관련 변수
//메인 타이틀 설정.
var g_ICRP_Main_TITLE="[간편인증서내보내기/가져오기]";
var g_ICRP_Main_TITLE_ENG="[Page input message] [Simple Certificate Export/Import]Main Title";

//설명 문구 설정. 인증서 내보내기 문구.
var g_CERTEXPORT_INTRO="인증서 내보내기 시작";
var g_CERTEXPORT_INTRO_ENG="[Page input message]  Start Certificate Export.\r\nSetStr_CERTEXPORT_INTRO";

//내보내기. 인증서 선택.
var g_CERTEXPORT_CERTSELECT_2="인증서가 선택되었습니다.\r\n비밀번호입력";
var g_CERTEXPORT_CERTSELECT_2_ENG="[Page input message]  Certificate is selected\r\nInput password.\r\nSetStr_CERTEXPORT_CERTSELECT_2";

//push 기능 내보내기. 인증서 선택.
var g_CERTEXPORT_CERTSELECT_3="인증서가 선택되었습니다";
var g_CERTEXPORT_CERTSELECT_3_ENG="[Page input message]  Certificate is selected\r\n SetStr_CERTEXPORT_CERTSELECT_3";

// 내보내기. 인증번호 입력.
var g_CERTEXPORT_INPUTCNUM_3="인증번호 입력";
var g_CERTEXPORT_INPUTCNUM_3_ENG="[Page input message]  Input Authentication Number.\r\nSetStr_CERTEXPORT_INPUTCNUM_3";

// 내보내기. 인증번호 입력.
var g_CERTEXPORT_SUC_4="인증서 내보내기 완료";
var g_CERTEXPORT_SUC_4_ENG="[Page input message]  SetStr_CERTEXPORT_SUC_4.\r\nSetStr_CERTEXPORT_SUC_4";

// 가져오기. 시작.
var g_CERTIMPORT_INTRO_1="[인증서 가져오기]";
var g_CERTIMPORT_INTRO_1_ENG="[Page input message] [Certificate Import]\r\nSetStr_CERTIMPORT_INTRO_1";

var g_CERTIMPORT_CERTSELECT_2="[인증서 가져오기]\r\n인증서 선택";
var g_CERTIMPORT_CERTSELECT_2_ENG="[Page input message] [Certificate Import]\r\nSelect Certificate.\r\nSetStr_CERTIMPORT_CERTSELECT_2";

var g_CERTIMPORT_MAKECNUM_3="[인증서 가져오기]\r\n인증번호 생성";
var g_CERTIMPORT_MAKECNUM_3_ENG="[Page input message] [Certificate Import]\r\nAuthentication Number generation\r\nSetStr_CERTIMPORT_MAKECNUM_3";

var g_CERTIMPORT_WRONGCNUM="[인증서 가져오기]\r\n보내는 단말에서 인증번호를 입력하세요";
var g_CERTIMPORT_WRONGCNUM_ENG="[Page input message] [Certificate Import]\r\nPlease, input Authentication Number in the device.\r\nSetStr_CERTIMPORT_WRONGCNUM";

var g_CERTIMPORT_SUC="[인증서 가져오기]\r\n인증서 가져오기 완료";
var g_CERTIMPORT_SUC_ENG="[Page input message] [Certificate Import]\r\nsuccess import.\r\nSetStr_CERTIMPORT_SUC";


//QR복사 문구 설정
var g_QRCODE_Main_Name="[페이지입력문구] [QR인증서복사]메인타이틀";
var g_QRCODE_Main_Name_ENG="[Page input message] [QR]Main Title";

var g_QRCODE_DLG1_INTRO="[페이지입력문구] [QRcode 인증서복사]\r\nSetStr_QRCODE_DLG1_INTRO";
var g_QRCODE_DLG1_INTRO_ENG="[Page input message] [QR] \r\nSetStr_QRCODE_DLG1_INTRO";

var g_QRCODE_DLG1_CERTSELECT="[페이지입력문구] [QRcode 인증서복사]\r\n인증서가 선택되었습니다.\r\nSetStr_QRCODE_DLG1_CERTSELECT";
var g_QRCODE_DLG1_CERTSELECT_ENG="[Page input message] [QR] \r\nSetStr_QRCODE_DLG1_CERTSELECT";
var g_QRCODE_DLG2_INTRO="[페이지입력문구] [QRcode 인증서복사]\r\nSetStr_QRCODE_DLG2_INTRO";
var g_QRCODE_DLG2_INTRO_ENG="[Page input message] [QR] \r\nSetStr_QRCODE_DLG2_INTRO";
var g_QRCODE_DLG2_DISPLAYQRCODE="[페이지입력문구] [QRcode 인증서복사]\r\nQR코드가 생성되었습니다.\r\nSetStr_QRCODE_DLG2_DISPLAYQRCODE";
var g_QRCODE_DLG2_DISPLAYQRCODE_ENG="[Page input message] [QR] \r\nSetStr_QRCODE_DLG2_DISPLAYQRCODE";

var g_QRCODE_CERT_DEL_EXPLAIN="[페이지입력문구] [QRcode 인증서복사]\r\n인증서를 삭제합니다.";
var g_QRCODE_CERT_DEL_EXPLAIN_ENG="[Page input message] [QR] \r\nCertificate delete";
var g_QRCODE_CERT_DEL_CONFIRM_STR="[페이지입력문구] [QRcode 인증서복사]\r\n정말 인증서를 삭제 하시겠습니까?";
var g_QRCODE_CERT_DEL_CONFIRM_STR_ENG="[Page input message] [QR] \r\nCertificate delete";

var g_isCertDelete="1";
var g_SetCertDelete="[페이지입력문구]인증서 내보내기 후 인증서를 삭제하는게 안전합니다.";
var g_SetCertDelete_ENG="[Page input message]Delete Cert";

//[QR코드인증서복사] 관련 변수
var g_QRServerSendCertURL   = "https://211.32.131.182:8600/QR_CERTMOVE/client/sendcert.jspx";
var g_QRServerMyCertURL     = "https://211.32.131.182:8600/QR_CERTMOVE/phone/mycert.jspx";
var g_QRServerAuthqueryURL = "https://211.32.131.182:8600/QR_CERTMOVE/client/checkcert.jspx";

var g_QR_TimerSecond = "120"; //시간 변경시 QR서버 설정파일에서 동일시간으로 변경 필요
var g_QR_TimerFlag = "1";
var g_QR_HttpVer = "0";

//[간편인증서내보내기/가져오기 및 QR코드인증서복사] 공통 변수
var g_PolicyConvertTable = "1"; // 인증서 용도별 표시이름 재정의 사용 여부

//[공통][간편인증서내보내기/가져오기]인증서 정책 설정 변수.
//셋팅 리얼:TRUE 테스트:FALSE
//var IsOnLine ='TRUE';
//var IsOnLine ='FALSE';
var IsOnLine ='ALL';

var policyoid_yessign = ":1.2.410.200005.1.1.1";		//범용개인
	policyoid_yessign += ":1.2.410.200005.1.1.2";		//금융기업
	policyoid_yessign += ":1.2.410.200005.1.1.4";		//은행-보험
	policyoid_yessign += ":1.2.410.200005.1.1.5"; 		//범용기업
	policyoid_yessign += ":1.2.410.200005.1.1.6.1"; 	//법인, 용도제한(기업뱅킹)
	policyoid_yessign += ":1.2.410.200005.1.1.6.8"; 	//이세로, 용도제한(세금계산서)
	
var policyoid_signkorea = ":1.2.410.200004.5.1.1.5";  	//범용개인
	policyoid_signkorea += ":1.2.410.200004.5.1.1.7";   //범용법인
	policyoid_signkorea += ":1.2.410.200004.5.1.1.9";   //개인, 용도제한

var policyoid_signgate = ":1.2.410.200004.5.2.1.1";		//범용기업
	policyoid_signgate += ":1.2.410.200004.5.2.1.2";	//범용개인
	policyoid_signgate += ":1.2.410.200004.5.2.1.7.1";	//은행-보험
	policyoid_signgate += ":1.2.410.200004.5.2.1.6.141";//보건복지용 법인
	policyoid_signgate += ":1.2.410.200004.5.2.1.5.141";//보건복지용 개인
	
var policyoid_crosscert = ":1.2.410.200004.5.4.1.1";	//범용개인
	policyoid_crosscert += ":1.2.410.200004.5.4.1.2"; 	//범용기업
	policyoid_crosscert += ":1.2.410.200004.5.4.1.101"; //은행-보험
	
var policyoid_tradesign = ":1.2.410.200012.1.1.1";		//범용개인
	policyoid_tradesign += ":1.2.410.200012.1.1.3";		//범용기업
	policyoid_tradesign += ":1.2.410.200012.1.1.101";	//은행-보험
	policyoid_tradesign += ":1.2.410.200012.5.21.1.11";

var policyoid_ncasign = ":1.2.410.200004.5.3.1.9";		//범용개인
	policyoid_ncasign += ":1.2.410.200004.5.3.1.2";		//범용기업

var policyoid_inipass = ":1.2.410.200004.5.5.1.1";		//범용개인
	policyoid_inipass += ":1.2.410.200004.5.5.1.2";		//범용기업
	policyoid_inipass += ":1.2.410.200004.5.5.1.3.1";	//용도제한,제휴기관용(개인)
	policyoid_inipass += ":1.2.410.200004.5.5.1.4.1";	//용도제한,제휴기관용(법인)
	policyoid_inipass += ":1.2.410.200004.5.5.1.4.2";	//용도제한,세금계산서(기업인)
	
var policyoid_nps = ":1.2.410.400001.1.2";			//국민연금
var accept_list = "";
// 금융결제원
var accept_list_real="yessignCA";
	accept_list_real+=policyoid_yessign;
	
	//2048
	accept_list_real+=",yessignCA Class 1";
	accept_list_real+=policyoid_yessign;
	//2048 new
	accept_list_real+=",yessignCA Class 2";
	accept_list_real+=policyoid_yessign;
	//20220704 CA인증서 추가
	accept_list_real+=",yessignCA Class 3";
	accept_list_real+=policyoid_yessign;

	// 증권전산원 인증서 수용 부분(코스콤)
	accept_list_real+=",SignKorea CA";
	accept_list_real+=policyoid_signkorea;
	
	accept_list_real+=",SignKorea CA2";
	accept_list_real+=policyoid_signkorea;
	
	accept_list_real+=",SignKorea CA3";
	accept_list_real+=policyoid_signkorea;
	//20220704 CA인증서 추가
	accept_list_real+=",SignKorea CA4";
	accept_list_real+=policyoid_signkorea;


	// 한국정보인증 인증서 수용 부분
	accept_list_real+=",signGATE CA2";
	accept_list_real+=policyoid_signgate;
	accept_list_real+=",signGATE CA4";
	accept_list_real+=policyoid_signgate;
	
	accept_list_real+=",signGATE CA5";
	accept_list_real+=policyoid_signgate;
	//20220704 CA인증서 추가
	accept_list_real+=",signGATE CA6";
	accept_list_real+=policyoid_signgate;

	// 한국전자인증 인증서 수용 부분
	accept_list_real+=",CrossCertCA2";
	accept_list_real+=policyoid_crosscert;
	
	accept_list_real+=",CrossCertCA3";
	accept_list_real+=policyoid_crosscert;
	//20220704 CA인증서 추가
	accept_list_real+=",CrossCertCA4";
	accept_list_real+=policyoid_crosscert;

	// 한국무역정보통신 인증서 수용 부분
	accept_list_real+=",TradeSignCA";
	accept_list_real+=policyoid_tradesign;
	
	accept_list_real+=",TradeSignCA2";
	accept_list_real+=policyoid_tradesign;
	
	accept_list_real+=",TradeSignCA3";
	accept_list_real+=policyoid_tradesign;
	//20220704 CA인증서 추가
	accept_list_real+=",TradeSignCA4";
	accept_list_real+=policyoid_tradesign;

	// 한국전산원 인증서 수용 부분
	accept_list_real+=",NCASignCA";
	accept_list_real+=policyoid_ncasign;

	//이니텍인증서 수용 부분
	accept_list_real+=",INIPASS CA";
	accept_list_real+=policyoid_inipass;
	accept_list_real+=",nps ca";
	accept_list_real+=policyoid_nps;
	
var accept_list_test="yessignCA-TEST";
	accept_list_test+=policyoid_yessign;
	
	//2010.08.05 추가 yhp
	accept_list_test+=",yessignCA-Test Class 0";
	accept_list_test+=policyoid_yessign;
	
	//2048
	accept_list_test+=",yessignCA-Test Class 1";
	accept_list_test+=policyoid_yessign;
	
	//2048 new 2015.12
	accept_list_test+=",yessignCA-Test Class 2";
	accept_list_test+=policyoid_yessign;
	
	accept_list_test+=",yessignCA-Test Class 4";
	accept_list_test+=policyoid_yessign;
	
	accept_list_test+=",SignGateFTCA CA";
	accept_list_test+=policyoid_signgate;
	
	accept_list_test+=",signGATE FTCA02";
	accept_list_test+=policyoid_signgate;
	
	accept_list_test+=",signGATE FTCA04";
	accept_list_test+=policyoid_signgate;

	accept_list_test+=",signGATE FTCA06";
	accept_list_test+=policyoid_signgate;
	
	accept_list_test+=",SignKorea Test CA";
	accept_list_test+=policyoid_signkorea;
	
	accept_list_test+=",SignKorea Test CA2";
	accept_list_test+=policyoid_signkorea;

		//2017.01.25 - 추가
	accept_list_test+=",SignKorea Test CA3";
	accept_list_test+=policyoid_signkorea;
	
	accept_list_test+=",SignKorea Test CA5";
	accept_list_test+=policyoid_signkorea;

	
	accept_list_test+=",CrossCertCA-Test2";
	accept_list_test+=policyoid_crosscert;
	
	accept_list_test+=",CrossCertTestCA2";
	accept_list_test+=policyoid_crosscert;
	
	accept_list_test+=",CrossCertTestCA5";
	accept_list_test+=policyoid_crosscert;
	
	accept_list_test+=",NCATESTSign";
	accept_list_test+=policyoid_ncasign;

	accept_list_test+=",INIPASS TEST CA 2";
	accept_list_test+=policyoid_inipass;
var accept_list_range = "";
var accept_list_issuer_range = "";
	accept_list_issuer_range += "INIPASS";
	accept_list_issuer_range += ",yessignCA Class 2";

var accept_list_oid_range = ":1.2.410.200005.1";
	accept_list_oid_range += ":1.2.410.200004.5"
	accept_list_oid_range += ":1.2.410.200004.7"

	accept_list_range = accept_list_issuer_range + accept_list_oid_range;
	
if(IsOnLine == 'TRUE'){
	//리얼 인증서
	accept_list = accept_list_real;
}else if(IsOnLine == 'FALSE'){
	//테스트 인증서
	accept_list = accept_list_test;
}else if(IsOnLine == 'ALL'){
	accept_list = accept_list_real + "," + accept_list_test;
}

//////////////////////////////인증서 oid 및 용도 매핑함수
function nxCR_PolicyConvertTableAdd()
{
	//SetPolicyConvertTableAdd('1.2.410.200005.1.1.6.1', '용도이름테스트', 'UsageNameTest');
	SetPolicyConvertTableAdd('1.2.410.200005.1.1.4', '홍길동용', 'HongGilDong');
	
}


//###################  Browser check ########################//
//////////////////////////////////////
// TODO EX plugin - Web
//////////////////////////////////////

if (!window.console)
	console = {log : function(msg) {}};



function LoadMain() {
	if(nxCR_SupportCheck())
	{
		exlog("LoadMain");
		SetRelayServer();
		SetBannerImg();
		//SetFunction();
		SetExplainStr();
		SetDisplayOID();
		//SetDisplayOIDRange();
		SetPwdCount();
		//SetPKCS12();
		//SetAutoFocus();
		//SetLanguage();
		//SetKmcertsupport();
		//SetRequiredAlg();
		//SetKeypro();
		//nxCR_SetTranskey();
		//SetCodeSignVerify();
		//SetCertDN();
		//SetFontSizeEditCtrl();
		//SetFontSizeCnum();
		//SetCertDelete();
		//SetPolicyConvertTable();
		//SetSelfSignedCert();
		SetPushIndex();
		KSCertRelayNXInterface.KS_LoadMain(["NONE" , "NONE"]);
	}
	else
	{
		//안내페이지 이동시 사용
		//location.href = TouchEnNxConfig.installPage.nxcr;
	}
}

function LoadMainQR() {
	if(nxCR_SupportCheck())
	{
		SetBannerImg();
		SetServerSendCert_QR();
		SetServerMyCert_QR();
		SetQRTimer();
		SetDisplayOID();
		//SetDisplayOIDRange();
		SetExplainStr_QR();
		//SetKmcertsupport();
		//SetLanguage();
		//SetHttpVer_QR();
		//SetKeypro();
		//nxCR_SetTranskey();
		//SetPKCS12();
		//SetCodeSignVerify();
		//SetCertDelete();
		//SetPolicyConvertTable();
		KSCertRelayNXInterface.KS_LoadMainQR(["NONE" , "NONE"]);
	}
	else
	{
		//안내페이지 이동시 사용
		//location.href = TouchEnNxConfig.installPage.nxcr;
	}
}

// [[ START READ PUSH INDEX ]]  PushIndex ('p' query parameter) 읽기

if (document.addEventListener) {
	// Mozilla, Opera, Webkit 
    document.addEventListener("DOMContentLoaded", function () {
        document.removeEventListener("DOMContentLoaded", arguments.callee, false);
        domReady();
    }, false);
} else if (document.attachEvent) {
	// Internet Explorer
    document.attachEvent("onreadystatechange", function () {
        if (document.readyState === "complete") {
            document.detachEvent("onreadystatechange", arguments.callee);
            domReady();
        }
    });
}

function domReady() {
    name = 'p';
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    g_ICRP_PushIndex = decodeURIComponent(results[2].replace(/\+/g, ' ')).replace(/</g, '').replace(/>/g, '');
}

// [[ END READ PUSH INDEX ]] 