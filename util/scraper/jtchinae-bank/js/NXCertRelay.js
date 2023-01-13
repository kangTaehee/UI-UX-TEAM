
/*
****************************************************
	NXCertRelay.js 수정내역 
****************************************************
| Version		 작성자		 수정일		 변경사항 
 ---------		-------		---------	----------	
| v2.1.0.9       임 동     	2020.05.14 
| v2.1.0.8       강남준     	2019.03.06
| v2.1.0.7       강남준     	2019.02.02
| v2.1.0.6       강남준     	2017.04.28
| v2.1.0.5       강남준		2017.01.31	 
| v2.1.0.4       강남준		2016.12.21
| v2.1.0.3       강남준		2016.10.27
| v2.1.0.2 		 강남준		2016.10.19
| v2.1.0.1		 강남준		2016.10.06	

****************************************************
 Copyright ⒞ RaonSecure Co., Ltd. 
****************************************************
*/



//###################  Browser check ########################//
//////////////////////////////////////
// TODO EX plugin - Web
//////////////////////////////////////

if (!window.console)
	console = {log : function(msg) {}};

function KS_loading() {
	exlog("==============loading================");
	try {
		if(!ksloadflag){
			TOUCHENEX_CHECK.check([keysharpnxInfo] , "KS_loading_callback");
			ksloadflag=true;
		}
	} catch (e) {
		exlog("KS_loading fail", "exception : " +e);
	}
}
function KS_loading_callback(check) {
	exlog("KS_loading_callback", check);
	try {
        currStatus = check;
        if (currStatus.status) {
            keysharpnxInfo.ksInstalled = currStatus.status;
            TOUCHENEX_LOADING("KS_loadingCallback");
        } else {
        	KS_notInstall(currStatus);
        }
    } catch (e) {
		exlog("KS_loading_callback fail", "exception : " +e);
	}
}

function KS_loadingCallback(check) {
//console.log("==============KS_loadingCallback================");	
}

function KS_extensionInstall() {
	if(TOUCHENEX_UTIL.isChrome() || TOUCHENEX_UTIL.isFirefox() || TOUCHENEX_UTIL.isOpera()){
		KS_extensiondownload();
	}
}

function KS_extensiondownload() {
    TOUCHENEX_INSTALL.download('nxwirelesscert', 'extension');
}

function KS_installPage() {
    if (typeof Keysharp_installpage == "undefined") {
     	location.href = TouchEnNxConfig.installPage.nxcr;
		 
    }
	
}

function KS_isInstallcheck() {
    try {
        KS_installCheck('KS_installCheckCallback');
    } catch (e) {
		exlog("KS_isInstallcheck fail", "exception : " +e);
	}
}

function KS_installCheck(callback) {
    try {
        TOUCHENEX_CHECK.check([keysharpnxInfo], callback);
  	} catch (e) {
		exlog("KS_isInstallcheck callback fail", "exception : " +e);
	}
}

function KS_installCheckCallback(check) {
    try {
        currStatus = check;
        if (currStatus.status) {
            keysharpnxInfo.isInstalled = currStatus.status;
            if (typeof Keysharp_installpage != "undefined") {
                KS_moveMainPage();
            }
        } else {
            KS_notInstall(currStatus); 
        }
    } catch (e) {
		exlog("KS_installCheckCallback fail", "exception : " +e);
	}
}

function KS_moveMainPage() {
    location.href = keysharpnxInfo.ksMainpage;
}

function KS_notInstall(currStatus) {
	try {
        if (!currStatus.status) {
			keysharpnxInfo.ksInstalled = currStatus.status;
            if (typeof Keysharp_installpage == "undefined") {
            	KS_installPage();
            } else {
                if (!currStatus.info[0].isInstalled) {
                    if (!currStatus.info[0].extension) {
                        if (TOUCHENEX_UTIL.isChrome() || TOUCHENEX_UTIL.isFirefox() || (TOUCHENEX_UTIL.isOpera())) {
                            ////KS_extensiondownload();
                            keysharpnxInfo.exInstalled = false;
                        }
                    }//test
                    else{
                    	keysharpnxInfo.exInstalled = true;
                    }

                    if (!currStatus.info[0].client || !currStatus.info[0].EX) {
                       //Keysharpnx_download();
                        keysharpnxInfo.clInstalled = false;
                    }//test
                    else{
                    	keysharpnxInfo.clInstalled = true;
                    }
                } else {
                    if (typeof Keysharp_installpage != "undefined") {
                        KS_moveMainPage();
                    }
                }
            }
        } else {
            keysharpnxInfo.isInstalled = currStatus.status;
            if (typeof Keysharp_installpage != "undefined") {
                KS_moveMainPage();
            }
        }
    } catch (e) {
		exlog("KS_notInstall fail", "exception : " +e);
	}
}
function KS_download(ostype) {
	if( (TOUCHENEX_UTIL.isWin() || TOUCHENEX_UTIL.isMac()) && (TouchEnNxConfig.runtype == "onlydaemon" || TouchEnNxConfig.runtype == "mainextension"))
	{
		TOUCHENEX_INSTALL.download('nxwirelesscert', 'daemon');
	}
	else
	{
		if(typeof ostype != "undefined")
		{
			var bit = TOUCHENEX_UTIL.getOSInfo().bit;			
			ostype = ostype.concat(bit);
		}
		TOUCHENEX_INSTALL.download('nxwirelesscert', 'client', ostype);
	}
}


//////////////////////////////간편 인증서 복사 관련 문구.
function SetExplainStr() {
	//메인 타이틀 설정. 
	KSCertRelayNXInterface.KS_SetStr_ICRP_MAIN_TITLE([g_ICRP_Main_TITLE]);






	KSCertRelayNXInterface.KS_SetStr_ICRP_MAIN_TITLE_ENG([g_ICRP_Main_TITLE_ENG]);
	
	//설명 문구 설정. 인증서 내보내기 문구. 
	KSCertRelayNXInterface.KS_SetStr_CERTEXPORT_INTRO([g_CERTEXPORT_INTRO]);
	KSCertRelayNXInterface.KS_SetStr_CERTEXPORT_INTRO_ENG([g_CERTEXPORT_INTRO_ENG]);
	
	//내보내기. 인증서 선택.
	KSCertRelayNXInterface.KS_SetStr_CERTEXPORT_CERTSELECT_2([g_CERTEXPORT_CERTSELECT_2]);
	KSCertRelayNXInterface.KS_SetStr_CERTEXPORT_CERTSELECT_2_ENG([g_CERTEXPORT_CERTSELECT_2_ENG]);
	
	//내보내기. 인증서 선택. push기능
	KSCertRelayNXInterface.KS_SetStr_CERTEXPORT_CERTSELECT_3([g_CERTEXPORT_CERTSELECT_3]);
	KSCertRelayNXInterface.KS_SetStr_CERTEXPORT_CERTSELECT_3_ENG([g_CERTEXPORT_CERTSELECT_3_ENG]);
	
	// 내보내기. 인증번호 입력.	
	KSCertRelayNXInterface.KS_SetStr_CERTEXPORT_INPUTCNUM_3([g_CERTEXPORT_INPUTCNUM_3]);
	KSCertRelayNXInterface.KS_SetStr_CERTEXPORT_INPUTCNUM_3_ENG([g_CERTEXPORT_INPUTCNUM_3_ENG]);
	
	// 내보내기. 내보내기 완료 문구.
	KSCertRelayNXInterface.KS_SetStr_CERTEXPORT_SUC_4([g_CERTEXPORT_SUC_4]);
	KSCertRelayNXInterface.KS_SetStr_CERTEXPORT_SUC_4_ENG([g_CERTEXPORT_SUC_4_ENG]);
		
	// 가져오기. 시작.
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_INTRO_1([g_CERTIMPORT_INTRO_1]);
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_INTRO_1_ENG([g_CERTIMPORT_INTRO_1_ENG]);
	
	// 가져오기. 인증서 선택.
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_CERTSELECT_2([g_CERTIMPORT_CERTSELECT_2]);
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_CERTSELECT_2_ENG([g_CERTIMPORT_CERTSELECT_2_ENG]);
	
	// 가져오기. 인증번호 생성.
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_MAKECNUM_3([g_CERTIMPORT_MAKECNUM_3]);
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_MAKECNUM_3_ENG([g_CERTIMPORT_MAKECNUM_3_ENG]);
	
	// 가져오기. 인증번호가 존재하지 않을 경우. (인증서를 내보내는 쪽에서 인증번호를 입력하지 않았을 경우)
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_WRONGCNUM([g_CERTIMPORT_WRONGCNUM]);
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_WRONGCNUM_ENG([g_CERTIMPORT_WRONGCNUM_ENG]);
	
	// 가져오기. 가져오기완료.
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_SUC([g_CERTIMPORT_SUC]);
	KSCertRelayNXInterface.KS_SetStr_CERTIMPORT_SUC_ENG([g_CERTIMPORT_SUC_ENG]);
}

function SetExplainStr_QR() {
	//메인 타이틀 설정. 
	KSCertRelayNXInterface.KS_SetStr_QRCODE_Main_Name([g_QRCODE_Main_Name]);
	KSCertRelayNXInterface.KS_SetStr_QRCODE_Main_Name_ENG([g_QRCODE_Main_Name_ENG]);

	KSCertRelayNXInterface.KS_SetStr_QRCODE_DLG1_INTRO([g_QRCODE_DLG1_INTRO]);
	KSCertRelayNXInterface.KS_SetStr_QRCODE_DLG1_INTRO_ENG([g_QRCODE_DLG1_INTRO_ENG]);

	KSCertRelayNXInterface.KS_SetStr_QRCODE_DLG1_CERTSELECT([g_QRCODE_DLG1_CERTSELECT]);
	KSCertRelayNXInterface.KS_SetStr_QRCODE_DLG1_CERTSELECT_ENG([g_QRCODE_DLG1_CERTSELECT_ENG]);
	
	KSCertRelayNXInterface.KS_SetStr_QRCODE_DLG2_INTRO([g_QRCODE_DLG2_INTRO]);
	KSCertRelayNXInterface.KS_SetStr_QRCODE_DLG2_INTRO_ENG([g_QRCODE_DLG2_INTRO_ENG]);
	KSCertRelayNXInterface.KS_SetStr_QRCODE_DLG2_DISPLAYQRCODE([g_QRCODE_DLG2_DISPLAYQRCODE]);
	KSCertRelayNXInterface.KS_SetStr_QRCODE_DLG2_DISPLAYQRCODE_ENG([g_QRCODE_DLG2_DISPLAYQRCODE_ENG]);
	
	KSCertRelayNXInterface.KS_SetStr_QRCODE_CERT_DEL_EXPLAIN([g_QRCODE_CERT_DEL_EXPLAIN]);
	KSCertRelayNXInterface.KS_SetStr_QRCODE_CERT_DEL_EXPLAIN_ENG([g_QRCODE_CERT_DEL_EXPLAIN_ENG]);
	
	KSCertRelayNXInterface.KS_SetStr_QRCODE_CERT_DEL_CONFIRM_STR([g_QRCODE_CERT_DEL_CONFIRM_STR]);
	KSCertRelayNXInterface.KS_SetStr_QRCODE_CERT_DEL_CONFIRM_STR_ENG([g_QRCODE_CERT_DEL_CONFIRM_STR_ENG]);
}

function SetRelayServer() {
	KSCertRelayNXInterface.KS_SetRelayServer([g_ICRP_ServerIP , g_ICRP_ServerIP , g_ICRP_ServerPort]);
}

function SetFunction() {
	KSCertRelayNXInterface.KS_SetFunction([g_ICRP_Function]);
}

function SetDisplayOID() {
	KSCertRelayNXInterface.KS_SetDisplayOID([accept_list]);
}

function SetDisplayOIDRange() {
	KSCertRelayNXInterface.KS_SetDisplayOIDRange([accept_list_range]);
}

function SetBannerImg() {
	KSCertRelayNXInterface.KS_SetBannerImg([g_ICRP_BannerImgURL]);
}

function SetPwdCount() {
	KSCertRelayNXInterface.KS_SetPwdCount([g_ICRP_PwdCount]);
}

function SetPKCS12() {
	KSCertRelayNXInterface.KS_SetPKCS12([g_ICRP_PKCS12]);
}

function SetAutoFocus() {
	KSCertRelayNXInterface.KS_SetAutoFocus([g_ICRP_AutoFocus]);
}

function SetLanguage() {
	KSCertRelayNXInterface.KS_SetLanguage([g_ICRP_Language]);
}

function SetKmcertsupport() {
	KSCertRelayNXInterface.KS_SetKmcertsupport([g_ICRP_Kmcertsupport]);
}

function SetRequiredAlg(){	
	KSCertRelayNXInterface.KS_SetRequiredAlg([g_ICRP_RequiredAlg]);
}

function SetKeypro(){
	KSCertRelayNXInterface.KS_SetKeypro([g_ICRP_Keypro]);
}

function nxCR_SetTranskey(){
	KSCertRelayNXInterface.KS_nxCR_SetTranskey([g_ICRP_Transkey_URL,g_ICRP_Transkey_Size]);
}

function SetCodeSignVerify(){	
	KSCertRelayNXInterface.KS_SetCodeSignVerify([g_ICRP_CodeSignVerify ]);
}

function SetCertDN() {
	KSCertRelayNXInterface.KS_SetCertDN([g_ICRP_CertDN]);
}

function SetCertDelete() {

	KSCertRelayNXInterface.KS_SetCertDelete([g_isCertDelete,g_SetCertDelete]);
	KSCertRelayNXInterface.KS_SetCertDelete_ENG([g_isCertDelete,g_SetCertDelete_ENG]);
}

function SetFontSizeEditCtrl(){	
	KSCertRelayNXInterface.KS_SetFontSizeEditCtrl([g_ICRP_FontSizeEditCtrl]);
}

function SetFontSizeCnum(){	
	KSCertRelayNXInterface.KS_SetFontSizeCnum([g_ICRP_FontSizeCnum]);
}
function SetServerSendCert_QR() {
	KSCertRelayNXInterface.KS_SetServerSendCert_QR([g_QRServerSendCertURL]);
}

function SetServerMyCert_QR() {
	KSCertRelayNXInterface.KS_SetServerMyCert_QR([g_QRServerMyCertURL]);
}

function SetQRTimer() {
	KSCertRelayNXInterface.KS_SetQRTimer([g_QR_TimerSecond, g_QR_TimerFlag]);
	KSCertRelayNXInterface.KS_SetServerAuthQuery_QR([g_QRServerAuthqueryURL]);
}

function SetHttpVer_QR() {
	KSCertRelayNXInterface.KS_SetHttpVer_QR([g_QR_HttpVer]);
}

function SetPolicyConvertTable() {
	KSCertRelayNXInterface.KS_SetStr_POLICY_CONVERT_TABLE_STR([g_PolicyConvertTable]);
	nxCR_PolicyConvertTableAdd();
}

function SetPolicyConvertTableAdd(oid, kor, eng) {
	KSCertRelayNXInterface.KS_SetStr_POLICY_CONVERT_TABLE_ADD([oid, kor, eng]);
}

function SetSelfSignedCert() {
	KSCertRelayNXInterface.KS_SetSelfSignedCert([g_ICRP_SelfSignedCert]);
}

function SetPushIndex() {
	KSCertRelayNXInterface.KS_SetPushIndex([g_ICRP_PushIndex]);
}

function nxCR_SupportCheck()
{

	try{
		if(TOUCHENEX_UTIL.chkOS(TOUCHENEX_UTIL.getOSInfo(), keysharpnxInfo.reqSpec.OS))
		{
			if(TOUCHENEX_UTIL.isWin()){
				if(TOUCHENEX_UTIL.isIE() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.MSIE)) return true;
				else if(TOUCHENEX_UTIL.isChrome() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.CHROME)) return true;
				else if(TOUCHENEX_UTIL.isFirefox() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.FIREFOX)) return true;
				else if(TOUCHENEX_UTIL.isOpera() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.OPERA)) return true;
				else if(TOUCHENEX_UTIL.isSafari() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.SAFARI_WIN)) return true;
				else if(TOUCHENEX_UTIL.isEdge()) return true;
				else
				{
					alert("현재 사용중인 브라우저는 최신버전이 아닙니다. 최신버전으로 업데이트 후 이용부탁드립니다.");
					return false;
				}
			}
			else if(TOUCHENEX_UTIL.isMac()){
				if(TOUCHENEX_UTIL.isChrome() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.CHROME)) return true;
				else if(TOUCHENEX_UTIL.isFirefox() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.FIREFOX)) return true;
				else if(TOUCHENEX_UTIL.isOpera() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.OPERA)) return true;
				else if(TOUCHENEX_UTIL.isSafari() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.SAFARI_MAC)) return true;
				else
				{
					alert("현재 사용중인 브라우저는 최신버전이 아닙니다. 최신버전으로 업데이트 후 이용부탁드립니다.");
					return false;
				}
			}
			else if (TOUCHENEX_UTIL.isLinux()) {
				if(TOUCHENEX_UTIL.isChrome() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.CHROME)) return true;
				else if(TOUCHENEX_UTIL.isFirefox() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.FIREFOX)) return true;
				else if(TOUCHENEX_UTIL.isOpera() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.OPERA)) return true;
				else if(TOUCHENEX_UTIL.isSafari() && parseInt(TOUCHENEX_UTIL.getBrowserVer()) >= parseInt(keysharpnxInfo.reqSpec.Browser.SAFARI_MAC)) return true;
				else
				{
					alert("현재 사용중인 브라우저는 최신버전이 아닙니다. 최신버전으로 업데이트 후 이용부탁드립니다.");
					return false;
				}
				
			}
		}else  {
			alert(" 현재 미지원 운영체제에서 사용중입니다. Windows 환경에서 이용부탁드립니다.");
			return false;
		}
	}catch(e){
		alert ("미지원환경입니다.")
		return false;
	}
}