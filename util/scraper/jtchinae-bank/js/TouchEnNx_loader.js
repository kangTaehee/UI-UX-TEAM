/****************************************************											
TouchEnNx_loader.js
****************************************************
| Version     작성자        수정일        변경사항 
 ---------  -------  -----------  ----------    
| v1.0.0.11    임 동    2020.11.27   '공인' 명칭삭제 및 변경(인증서프로그램)
| v1.0.0.10   강남준    2019.06.11
| v1.0.0.9    강남준    2019.04.01
| v1.0.0.8    강남준    2019.03.06
| v1.0.0.7    강남준    2018.11.19
| v1.0.0.6    강남준    2018.05.14
| v1.0.0.5    강남준    2018.02.09
| v1.0.0.4    허혜림    2018.01.09
| v1.0.0.3    허혜림    2018.01.03      
| v1.0.0.2    허혜림    2017.12.26      
| v1.0.0.1    백서린    2017.01.20      최초

****************************************************
 Copyright ⒞ RaonSecure Co., Ltd.
 * 본 코드에 대한 모든 권한은 (주)라온시큐어 있으며 동의없이 사용/배포/가공할 수 없습니다.
****************************************************
**/

var TouchEnNx = {
		flag		: false,
		useModule	: "",
		success	:	function(result){
			TouchEnNx.processingbar(false);
			if(result.isvm == "true"){
				//가상화 환경 일 경우
			}
			//20171222 제로데이 Mac모듈 메시지 콜 수정
			if (result.result == "true" || result.success == "true") {
				try{
					if(typeof touchennxfwInfo == "object" && TouchEnNxConfig.use.nxfw){
						if(TOUCHENEX_UTIL.isMac()){
							touchennxfwInterface.CustomEX2("Key_Start",touchennxfwparams_mac);
						}else{
							touchennxfwInterface.CustomEX2("Key_Start",touchennxfwparams);
						}
					}
					if(typeof touchennxwebInfo == "object" && TouchEnNxConfig.use.nxweb){
						if(TOUCHENEX_UTIL.isMac()){
							touchennxwebInterface.CustomEX2("Key_Start",touchennxwebparams_mac); 
						}else{
							touchennxwebInterface.CustomEX2("Key_Start",touchennxwebparams);
						}
					}
					if(typeof keysharpbizInfo == "object" && TouchEnNxConfig.use.ksbiz && TouchEnNxConfig.onload){
						if(typeof KSBizConfig == "object") KSBizConfig.isloaded = true;
						if(typeof KeySharpBiz == "object") KeySharpBiz.init();											 
					}					
				}catch(e){
					exlog("_TouchEnNx","TouchEnNx result not true");
				}
			}
		},
		TK_getUrlParameter : function(name) {
		    var value = "";
		    try {
		        var url = document.location.href;
		        var idx = url.indexOf("?");
		        var params = "&"+url.substring(idx+1);
		        idx = params.indexOf("&" + name + "=");
		        if (idx >= 0) value = params.substring(idx+name.length+2);
		        idx = value.indexOf("&");
		        if (idx >= 0) value = value.substring(0, idx);
		        value = decodeURIComponent(value);
		    } catch(err) {
					exlog("_TouchEnNx", "TK_getUrlParameter() exception");
			}
		    return value;
		},
		processingbar	:	function(tmps){
			if(!TouchEnNxConfig.processingbar.use) return;
			if(tmps){
				if(document.body){
					if(document.getElementById("tk_overtopDiv")!=null) return true;
					var div = document.createElement("div");
					div.setAttribute("id", "tk_overtopDiv");
					document.body.appendChild(div);
					var processingbar = '<div id="tk_overdiv" style="z-index:999997;position:fixed; width:100%; height:100%; top:0px; left:0px; background-color: #000000; opacity: 0.3; filter: alpha(opacity=30);">';
					processingbar += '<div style="z-index:9999998;position:fixed;top:50%; height:100%;width:100%;">';
					processingbar += '<div style="margin: 0 auto; padding: 5px; width:150px; vertical-align:middle; font-weight:bold; text-align: center; border-radius:5px;">';
					processingbar += '<img src="'+ TouchEnNxConfig.processingbar.path +'" style="vertical-align:middle"/>';
					processingbar += '</div>';
					processingbar += '</div>';
					processingbar += '</div>';
					document.getElementById("tk_overtopDiv").innerHTML = processingbar;
				}
			}else{
				if(document.getElementById("tk_overtopDiv")!=null)
					document.body.removeChild(document.getElementById("tk_overtopDiv"));
			}
		},
		init : function(){
			if(!device.isMobile()){

				var loadmodule = [];
				if(TouchEnNxConfig.use.nxkey && useTouchEnnxKey){
					if(typeof touchenexInfo != "object")	alert("include TouchEnNxKey javascript");
					if(typeof loadmodule[0] != "object")	loadmodule[0] = touchenexInfo;
					else	loadmodule[loadmodule.length] = touchenexInfo;
				}
				if(TouchEnNxConfig.use.nxcr && nxCR_SupportCheck()){
					if(typeof keysharpnxInfo != "object")	alert("include nxcr javascript");
					if(typeof loadmodule[0] != "object")	loadmodule[0] = keysharpnxInfo;
					else	loadmodule[loadmodule.length] = keysharpnxInfo;
				}
				if(TouchEnNxConfig.use.nxweb){
					if(typeof touchennxwebInfo != "object")	alert("include nxweb javascript");
					if(typeof loadmodule[0] != "object")	loadmodule[0] = touchennxwebInfo;
					else	loadmodule[loadmodule.length] = touchennxwebInfo;
				}
				if(TouchEnNxConfig.use.nxfw && !TOUCHENEX_UTIL.isLinux()){
					if(typeof touchennxfwInfo != "object")	alert("include nxfw javascript");
					if(typeof loadmodule[0] != "object")	loadmodule[0] = touchennxfwInfo;
					else	loadmodule[loadmodule.length] = touchennxfwInfo;
				}
				if(TouchEnNxConfig.use.ksbiz && KSbiz_SupportCheck()){
					if(typeof keysharpbizInfo != "object")	alert("include ksbiz javascript");
					if(typeof loadmodule[0] != "object")	loadmodule[0] = keysharpbizInfo;
					else	loadmodule[loadmodule.length] = keysharpbizInfo;
				}
				//var moduleArrary = TouchEnNx.useModule;								  
				var moduleArrary = loadmodule;
				if ((typeof TouchEnKey_installpage != "string" && typeof Keysharp_installpage != "string") && moduleArrary.length > 0 && !TouchEnNx.flag){ // 설치페이지가 아닐 경우 모듈 동작
					TouchEnNx.processingbar(true);
					TouchEnNx.flag = true;
					TOUCHENEX_CHECK.check(moduleArrary, function(currStatus){
						if (currStatus.status) {
							TOUCHENEX_LOADING(function(ready){
								if(TouchEnNxConfig.use.nxkey){
									TK_LoadingCallback(ready);
					            }else{
					            	TouchEnNx.success({success : "true"}); // nxkey 미사용일때 
					            }
			            	});
				        } else {
							var unInstall ="";
				        	/** 솔루션 미설치 일 때 설치 페이지 이동*/
							for(i=0; i< loadmodule.length; i++){
								if(!currStatus.info[i].isInstalled){
									unInstall = Checkmodule(currStatus.info[i].name);
								}
							}
							//20180205  키보드보안 선택설치시 사용
							if(unInstall == "키보드보안" && !TouchEnNxConfig.forcedinstall.nxkey){
								// moduleArrary 배열에 nxKey 제거 후,nxFw/nxWeb 제품들 포함하여 재호출
								/* 2018.02.08 LSH
								 * 1) 방화벽만 구동.
								 *    exLoading(); --> /nxFw/js/TouchEnNxFirewall.js
								 * 2) 웹보안만 구동.
								 *    exLoading(); --> /nxWeb/js/TouchEnNxWeb.js
								 * 3) 인증서 복사만 구동
								 *    KS_loading(); --> /nxCR/js/NXCertRelay.js
								 * 4) 키보드보안을 제외한, 나머지 모듈구동
								 * 	  TouchEnNxConfig.use.nxkey = false;
								 * 	  TouchEnNx.init(); --> loadmodule 배열에서 nxkey만 제외한 후, 재구동       
								 */
								TouchEnNxConfig.use.nxkey = false;
								TouchEnNx.flag = false;
								TouchEnNx.init();
								// 가상키보드 호출					  
							} else {
								alert("안전한 사용을 위해 " + unInstall + " 프로그램(라온시큐어) 설치페이지로 이동합니다.");
								location.href = TouchEnNxConfig.installPage.tos;
							}
						}
					});
				}
			
			}
		}
};

var RSecure_Loading = function(){
	
};

if(typeof jQuery =="function"){
	jQuery(function(){	
		if(TouchEnNxConfig.onload){
			 TouchEnNx.init();
		}
	});
} else {
	if(TouchEnNxConfig.onload){
		if(window.addEventListener){
			window.addEventListener('load', function(){
				TouchEnNx.init();
			});
		} else if(window.attachEvent){
			window.attachEvent('onload', function(){
				TouchEnNx.init();
			});
		}
	}
}

function Checkmodule(name){
	if(name.indexOf("TOUCHENEX")>-1){
		name = "키보드보안";
	}else if(name.indexOf("KeySharpNX")>-1){
		name = "인증서 복사";
	}else if(name.indexOf("TouchEnnxWEB")>-1){
		name = "웹화면보안";
	}else if(name.indexOf("TouchEnnxFW")>-1){
		name = "온라인 방화벽";
	}else if (name.indexOf("KSBIZ")>-1){
		name ="인증서";
	}else{
		return;								   				 
	}
	return name;
}