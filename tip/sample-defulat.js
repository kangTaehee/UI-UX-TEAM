/*
 * Function Name : popupW
 * Description   : 팝업창 띄운다
 * @param {*} u 주소
 * @param {*} n 이름
 * @param {*} w 넓이
 * @param {*} h 높이
 * @param {*} s 스크롤여부(yes, no)
 * @param {*} r 창크기조절여부(yes, no)
 * @param {*} m 1:일반, 2:위쪽모서리, 3:정중앙
 */
function popupW(u, n, w, h, s, r, m) {
	var o;
	var lP = screen.availWidth;
	var tP = screen.availHeight;
	var p  = "";

	if(s==undefined) s = "no";
	if(m==undefined) m = 1;

	if(m==2) //- 위쪽모서리
		p = ",left=0,top=0";
	else if(m==3) //- 정중앙
		p = ",left=" + ((lP - w) / 2) + ",top=" + ((tP - h) / 2);

	o = window.open(u,n,"status=yes,toolbar=no,location=no,scrollbars=" + s + ",resizable="+r+",width="+w+",height="+h + p);
	o.focus();
}
// datepicker 한국어 데이터
if(typeof $.fn.datepicker != "undefined"){
	!function(a){a.fn.datepicker.dates.ko={days:["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],daysShort:["일","월","화","수","목","금","토"],daysMin:["일","월","화","수","목","금","토"],months:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],monthsShort:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],today:"오늘",clear:"삭제",format:"yyyy-mm-dd",titleFormat:"yyyy년mm월",weekStart:0}}(jQuery);
}
var mobileagent = navigator.userAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || navigator.userAgent.match(/LG|SAMSUNG|Samsung/) != null ? true : false;

/**
 * 레이어 팝업
 * @trigger : event 요소 $(this)
 * @target : 대상 요소 .lpopwrap
 */
var currentfocus = null;
var lpop = {
	init : function(){
		$('.parent-close').on('click', function () {
			lpopClose()
			$(this).parent().parent().removeClass('active');
		});
		$("[data-jsopen]").on('click',function (e) { 
			e.preventDefault();
			var _this = $(this)
			lpopOpen(_this,'#'+_this.data().jsopen)
		});
	},
	open : function(target,trigger){
		$(target).addClass('active');
		$(target).attr('tabindex',0).focus()
		currentfocus = trigger;
		$('body').addClass('popupOpened');
	},
	close : function(target){
		$('body').removeClass('popupOpened');
		$(target).removeClass('active');
		if(currentfocus!==null) currentfocus.focus();
	}
}

var stage = {
	area : {},
	mobile : null,
	// 윈도우 스테이지 정보 업데이트
	update : function(){
		this.area = {top : (window.pageYOffset || document.documentElement.scrollTop) , width : window.innerWidth , height : window.innerHeight};
		this.mobile = window.innerWidth < page.lg ? true : false;
	},
	// 윈도우 스테이지 스크롤 시 정보 업데이트
	scroll : function(){
		this.update();
	},
	// 윈도우 스테이지 리사이징 시 정보 업데이트
	resize : function(){
		this.update();
	}
};
var page = {
	sm : 740 , // 반응형 사이즈 정의
	md : 1023, // 반응형 사이즈 정의
	lg : 1200, // 반응형 사이즈 정의
	header : null,
	gnb : $('#gnb'),
	gnb1Depth : $('#gnb').find('.depth1>a'),
	mobilegnb : $('#mobile-gnb'),
	mobilegnbclose : $('.mobile-gnb-close'),
	contents : null,
	init : function(){

	},
	// 윈도우 로드 완료 시 관련 데이타 재설정
	load : function(){
	},
	// 윈도우 리사이징 시 관련 데이타 재설정
	resize : function(){
	},
	// 윈도우 스크롤 시 관련 데이타 재설정
	scroll : function(){

	},

	// sns
	snsseting : function(){
		this.snsbtn.on('click',function(){
			var sns = $(this).data().type;
			var txt = document.title;
			var url = document.location.href;
			var o;
			var _url = encodeURIComponent(url);
			var _txt = encodeURIComponent(txt);
			switch (sns) {
				case 'facebook':
					o = {
						method: 'popup',
						url: 'http://www.facebook.com/sharer/sharer.php?u=' + _url
					};
					break;
				case 'twitter':
					o = {
						method: 'popup',
						url: 'http://twitter.com/intent/tweet?text=' + _txt + '&url=' + _url
					};
					break;
				case 'naverblog':
					o = {
						method: 'popup',
						url: 'https://share.naver.com/web/shareView.nhn?url=' + _url + '&title=' + _txt
					};
					break;
				case 'kakaostory':
					Kakao.Story.share({
						url: url,
						text: txt
					});
					break;
				case 'kakaotalk':
					// daumkey 글로벌 변수에서 키 설정 필요
					Kakao.init(daumkey); // 사용할 앱의 JavaScript 키를 설정
					Kakao.Link.sendDefault({
						objectType: 'feed',
						content: {
							title: '한국지역난방공사', // 콘텐츠의 타이틀
							description: title, // 콘텐츠 상세설명
							imageUrl: 'https://www.kdhc.co.kr//static/kdhc/img/common/logo.png', // 썸네일 이미지
							link: {
								mobileWebUrl: 'https://www.kdhc.co.kr/', // 모바일 카카오톡에서 사용하는 웹 링크 URL
								webUrl: 'https://www.kdhc.co.kr/', // PC버전 카카오톡에서 사용하는 웹 링크 URL
							},
						},
						social: {
							likeCount: 0, // LIKE 개수
							commentCount: 0, // 댓글 개수
							sharedCount: 0, // 공유 회수
						},
						buttons: [
							{
								title: '게시글 확인', // 버튼 제목
								link: {
									mobileWebUrl: 'https://www.kdhc.co.kr/', // 모바일 카카오톡에서 사용하는 웹 링크 URL
									webUrl: 'https://www.kdhc.co.kr/', // PC버전 카카오톡에서 사용하는 웹 링크 URL
								},
							},
						],
					});
					break;
				default:
					alert('지원하지 않는 SNS입니다.');
					return false;
			}
			switch (o.method) {
				case 'popup':
					window.open(o.url, 'pop', 'width=500, height=500');
					break;
			}
		})
	}
}

var formcontrol = {
	inputs : $('input:radio.d'),
	date ,
	number ,
	radio:function(){
		// 라디오 버튼 스타일 IE 대응
		this.inputs
			.each(function () {
				$(this).addClass('d')
				$(this).after('<i>')
				if($(this).next()[0].tagName != 'I')
				{}
			});
	}
}

/*===================================
@ init
===================================*/
$(function(){
	stage.resize();
	page.init();
	page.load();
	page.snsseting();
	page.formdesign();

	// content.init();
	/*===================================
	@ window load
	===================================*/
	$(window).on('load' , function () {
		stage.resize();
		// page.load();
		// content.load();
	});
	/*===================================
	@ window resize
	===================================*/
	$(window).on('resize' , function () {
		throttle(resizeDiv);
	});
	function resizeDiv(event){
		stage.resize();
		// page.resize();
		// content.resize();
	}
	function throttle(method, scope) {
		clearTimeout(method.tId);
		method.tId= setTimeout(function(){
			method.call(scope);
		}, 50);
	}
	/*===================================
	@ window scroll
	===================================*/
	$(window).on('scroll' , function () {
		stage.scroll();
		page.scroll();
		// content.scroll();
	});
});