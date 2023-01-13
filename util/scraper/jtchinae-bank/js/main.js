$(document).ready(function() {

	(function($){
		$.fn.rolling = function(options){

			var defaults = {
				navID : null,
				contentID : null,
				easing : Sine.easeInOut,
				effect : false,
				settime : 3000,
				autoplay: false,
				complete : null
			};

			var option = $.extend(defaults,options);

			return this.each(function() {
				var navID = $(this).find(option.navID);
				var contentID = $(this).find(option.contentID);
				var stindex = 0;
				var playBtn = $(this).find('.main-visual-play');
				var playToggle = false;
				var auto = null;
				var timer = null;
				var autoplay = option.autoplay;

				navID.each(function(mainVisualIndex) {
					$(this).click(function(event) {
						stindex = mainVisualIndex;
						visualRoll(mainVisualIndex);
						stopRoll();
						navID.children('a').removeAttr('title');
						$(this).children('a').attr('title','선택됨');
						return false;
					});
				});
				if(option.effect == false){
					contentID.css({
						display: 'none',
						visibility: 'visible'
					});
					contentID.eq(0).show();
				}
				if ($.isFunction( option.complete ) ) {
					option.complete.call( this );
				}
				if(autoplay){
					goplay();
					auto = true;
				}
				function goplay(){
					timer =  setInterval(function(){
						stindex++;
						if(stindex == navID.length){
							stindex = 0;
						}
						visualRoll(stindex);
					},option.settime);
				}
				function visualRoll(mainVisualIndex){
					if (option.effect) {
						TweenLite.to(contentID, 1, {autoAlpha: 0, ease:option.easing});
						TweenLite.to(contentID.eq(mainVisualIndex), 1, {autoAlpha: 1, ease:option.easing});
					} else{
						contentID.hide().eq(mainVisualIndex).show();
					}
					navID.removeClass('main-visual-nav-on').eq(mainVisualIndex).addClass('main-visual-nav-on');
				}
				function stopRoll() {
					clearInterval(timer);
					//setTimeout(goplay);
					if (!playToggle) {
						playBtn.addClass('active');
						clearInterval(timer);
						auto = false;
						playToggle=true;
					}
				}
				playBtn.click(function(event) {
					if (!playToggle) {
						$(this).addClass('active');
						$(this).children('span').text('재생');
						clearInterval(timer);
						auto = false;
						playToggle=true;
					} else{
						$(this).removeClass('active');
						$(this).children('span').text('정지');
						goplay();
						auto = true;
						playToggle=false;
					}
					return false;
				});
			});
		};
	})(jQuery);
	$('.container').insertBefore('.divpop_wrap');	
	$('.main-visual').rolling({
		navID : $('.main-visual-nav').find('li'),
		contentID : $('.main-visual-content').find('li'),
		easing : Quad.easeInOut,
		effect : true,
		settime : 5000,
		autoplay:true
	});
	$('.main-pop').rolling({
		navID : $('.main-pop-list').find('li'),
		contentID : $('.main-pop-cont').find('li'),
		easing : Sine.easeInOut,
		effect : false,
		settime : 5000,
		autoplay:true
	});
	// mainRoll('.main-visual-nav','.main-visual-content',5000,'effect',true);
	// mainRoll('.main-pop-list','.main-pop-cont',3000,null,true);

	if (!readCookie('mainlayerpop')&&$(window).width()>780) {
		$('.main-pop').show();
	};
	$('#closeleft').click(function(event) {
		if ($('#poptoday').is(':checked') == true) {
			createCookie('mainlayerpop', true, 1);
		}
		$('.main-pop').remove();
		$('.main-visual-nav1').children('button').focus();
	});
	$('#mainlayerclose').click(function(event) {
		$('.main-pop').remove();
		$('.main-visual-nav1').children('button').focus();
	});

	if (document.cookie.indexOf("mainlayer2") < 0) {
		setTimeout(function(){
			$('.main-layerpopup').show();
		},300);
	}else{
		$('.main-layerpopup').hide();
	}
	$('.layerToday').click(function(event) {
		createCookie_Today('mainlayer2','', 1)
		$('.main-layerpopup').hide();
		return false
	});
	$('.layerTodayClose').click(function(event) {
		$('.main-layerpopup').hide();
		return false;
	});

	var imgSwap = function(){
		var swapImg = $('._imgSwap');

		swapImg.hover(function() {
			TweenLite.to($(this).find('span'), 0.25, {width: '131px',ease:Quad.easeInOut});
		}, function() {
			TweenLite.to($(this).find('span'), 0.25, {width: 0,ease:Quad.easeInOut});
		});
	};
	imgSwap();
	$('.main-sidemenu').find('li').hover(function() {
		TweenLite.to($(this).find('span'), 0.25, {height: '56px',ease:Quad.easeInOut});
	}, function() {
		TweenLite.to($(this).find('span'), 0.25, {height: 0,ease:Quad.easeInOut});
	});
	$('.main-counsel-kakao').find('button').hover(function() {
		TweenLite.to($(this).find('span'), 0.25, {width: '30px',ease:Quad.easeInOut});
		if(navigator.appVersion.indexOf("Trident/4.")!=-1){
			$('.main-counsel-info').show();
		}else{
			$('.main-counsel-info').addClass('active');
			$(this).attr('title','카카오톡 상담 툴팁 접기')
		}

	}, function() {
		TweenLite.to($(this).find('span'), 0.25, {width: '0',ease:Quad.easeInOut});
		if(navigator.appVersion.indexOf("Trident/4.")!=-1){
			$('.main-counsel-info').hide();
		}else{
			$('.main-counsel-info').removeClass('active');
			$(this).attr('title','카카오톡 상담 툴팁 펼치기');
		}

	});
	$('.main-counsel-kakao').find('button').on('click',function() {//웹접근성 추가
		if($('.main-counsel-info').hasClass('active')===true){
			TweenLite.to($(this).find('span'), 0.25, {width: '0',ease:Quad.easeInOut});
			$('.main-counsel-info').removeClass('active');
			$(this).attr('title','카카오톡 상담 툴팁 펼치기');
		}else{
			TweenLite.to($(this).find('span'), 0.25, {width: '30px',ease:Quad.easeInOut});
			$('.main-counsel-info').addClass('active');
			$(this).attr('title','카카오톡 상담 툴팁 접기');	
		}
	});
	$('.main-counsel-kakao button').focusout(function() {
		TweenLite.to($(this).find('span'), 0.25, {width: '0',ease:Quad.easeInOut});
		$('.main-counsel-info').removeClass('active');
		$(this).attr('title','카카오톡 상담 툴팁 펼치기');

	});

	//divpop
	var d_now = new Date();
	var d_start1 = new Date(2022, 10, 19, 23, 20, 0, 0); // (year, month(0-11), day(1-31), hours(0-23), minutes(0-59), seconds(0-59), milliseconds)
	var d_end1  = new Date(2022, 10, 20, 00, 30, 0, 0);
	var d_start2 = new Date(2021, 11, 06, 00, 0, 0, 0);
	var d_end2  = new Date(2023, 11, 31, 23, 59, 0, 0); // 품의 21-122 버전91 담당자 종료시점 확인 

	/* 모바일접속시 popup 체크 */
	$(window).resize(function () {
		if($(window).width() < 780) {
			setTimeout(function(){
				$('.divpop2').show();
				$('.divpop1').show();

			},0);
		} else {
			$('.divpop2').hide();
			$('.divpop1').hide();

		}
	});

	//divpop1
	if ( d_start1.getTime() <= d_now.getTime() && d_now.getTime() < d_end1.getTime() )
	{
		if (document.cookie.indexOf("eventlayer1") < 0) {
			if($(window).width() < 780) {
				setTimeout(function(){
					$('.divpop1').show();
				},0);
			} else {
				$('.divpop1').hide();
			}
		}else{
			$('.divpop1').hide();
		}
	}else {
		$('.divpop1').hide();
	}
	$('.divpop1 .todayEvent').click(function(event) {
		createCookie_Today('eventlayer1','', 1)
		$('.divpop1').hide();
		return false
	});
	$('.divpop1 .closeEvent').click(function(event) {
		$('.divpop1').hide();
		return false;
	});

	//divpop2
	if ( d_start2.getTime() <= d_now.getTime() && d_now.getTime() < d_end2.getTime() )
	{
		if (document.cookie.indexOf("eventlayer2") < 0) {
			if($(window).width() < 780) {
				setTimeout(function(){
					$('.divpop2').show();
				},0);
			} else {
				$('.divpop2').hide();
			}
		}else{
			$('.divpop2').hide();
		}
	}else {
		$('.divpop2').hide();
	}
	$('.divpop2 .todayEvent').click(function(event) {
		createCookie_Today('eventlayer2','', 1)
		$('.divpop2').hide();
		return false
	});
	$('.divpop2 .closeEvent').click(function(event) {
		$('.divpop2').hide();
		return false;
	});

    $('.goEvent').on('click',function(){
    	var url = device.getUrl('csb');
    	top.location.href = url;
	});
  //end divpop


	var txt20220825163252 = "";
	txt20220825163252 = txt20220825163252 +"<div class='sr-only'>";
	txt20220825163252 = txt20220825163252 +"<h3>소비자 경보 2022-07호</h3>";
	txt20220825163252 = txt20220825163252 +"<strong>금융감독원</strong>";
	txt20220825163252 = txt20220825163252 +"<p>소비자경보 - 병원과 브로커의 불법 제안의 현혹되어 보험사기에 연루되지 않도록 주의하세요!</p>";
	txt20220825163252 = txt20220825163252 +"<p>소비자경보주의발령</p>";
	txt20220825163252 = txt20220825163252 +"<p>* 이미지 클릭 시 해당게시판으로 이동하여 상세내용(첨부파일) 다운로드 가능합니다.</p>";
	txt20220825163252 = txt20220825163252 +"</div>";
	$("img[src$='20220825163252.jpg']").after(txt20220825163252);	
	
	var txt20220610160650 = "";
	txt20220610160650 = txt20220610160650 +"<div class='sr-only'>";
	txt20220610160650 = txt20220610160650 +"<h3>소비자 경보 2022-07호</h3>";
	txt20220610160650 = txt20220610160650 +"<strong>금융감독원</strong>";
	txt20220610160650 = txt20220610160650 +"<p>소비자경보 - 대학생·청년층,사기성 작업대출 피해 주의하세요</p>";
	txt20220610160650 = txt20220610160650 +"<p>* 이미지 클릭 시 해당게시판으로 이동하여 상세내용(첨부파일) 다운로드 가능합니다.</p>";
	txt20220610160650 = txt20220610160650 +"</div>";
	$("img[src$='20220610160650.jpg']").after(txt20220610160650);		
        
	var txt20220114152444 = "";
	txt20220114152444 = txt20220114152444 +"<div class='sr-only'>";
	txt20220114152444 = txt20220114152444 +"<h3>금융소비자 경보 2022-02호</h3>";
	txt20220114152444 = txt20220114152444 +"<strong>휴대폰 번호로 발신하는 JT친애저축은행 사칭 문자주의!</strong>";
	txt20220114152444 = txt20220114152444 +"<p>JT친애저축은행은 예시와 같은 내용으로 문자 발송을 절대 하지 않습니다!!!</p>";
	txt20220114152444 = txt20220114152444 +"<p>휴대폰으로 문자를 수신한 경우 절대 발신번호로 연락하지 마시고 해당문자를 바로 삭제하세요.</p>";
	txt20220114152444 = txt20220114152444 +"<p>보이스피싱 또는 금융사기의 피해를 입을 수 있습니다.</p>";
	txt20220114152444 = txt20220114152444 +"<p>본 내용과 관련하여 유사한 문자 수신시 당행의 고객서비스센터(1599-0060)로 연락하여 주시기 바랍니다.</p>";
	txt20220114152444 = txt20220114152444 +"</div>";
	$("img[src$='20220114152444.jpg']").after(txt20220114152444);

	var txt20220114152330 = "";
	txt20220114152330 = txt20220114152330 +"<div class='sr-only'>";
	txt20220114152330 = txt20220114152330 +"<h3>금융소비자 경보 2022-01호</h3>";
	txt20220114152330 = txt20220114152330 +"<strong>여신금융법(가칭) 위반 협박 보이스피싱에 주의!</strong>";
	txt20220114152330 = txt20220114152330 +"<p>보이스피싱 수법</p>";
	txt20220114152330 = txt20220114152330 +"<p>전화 가로채기 앱 WARNING!</p>";
	txt20220114152330 = txt20220114152330 +"<p>사기범 1(B사 직원사칭)이 피해자(A사 대출고객)를 타사 저금리 대환대출을 유도하여 피해자를 현혹</p>";
	txt20220114152330 = txt20220114152330 +"<p>사기범 1(B사 직원사칭)과 사기범2(A사 직원사칭)는 정보를 공유함.</p>";
	txt20220114152330 = txt20220114152330 +"<p>사기범 2가 피해자에게 6개월 이내 타사 대환은 '여신금융법' 위반 협박한다.</p>";
	txt20220114152330 = txt20220114152330 +"<p>피해자는 사기범2에게 개인명의 대포통장 또는 현금수령으로 대출금을 편취</p>";
	txt20220114152330 = txt20220114152330 +"<p>본 내용과 관련하여 유사한 상황 발생 시 당행의 고객서비스센터(1599-0060)로 연락하여 주시기 바랍니다.</p>";
	txt20220114152330 = txt20220114152330 +"<p>JT친애저축은행</p>";
	txt20220114152330 = txt20220114152330 +"</div>";
	$("img[src$='20220114152330.jpg']").after(txt20220114152330);

	var txt20210115100557 = "";
	txt20210115100557 = txt20210115100557 +"<div class='sr-only'>";
	txt20210115100557 = txt20210115100557 +"<h3>금융소비자 경보 2021-01호</h3>";
	txt20210115100557 = txt20210115100557 +"<strong>JT친애저축은행을 사칭한 불법 대출영업 전화 주의!</strong>";
	txt20210115100557 = txt20210115100557 +"<p>최근 당행을 사칭하는 불법 대출영업 전화가 빈번하게 발생하여 현재 당행과 거래중인 고객님 또는 금융소비자의 피해가 발생하고 있습니다.</p>";
	txt20210115100557 = txt20210115100557 +"<p>아래의 전화번호로 불법 대출영업 전화를 수신 할 경우, 금융사기 및 보이스피싱 등 금융피해가 발생할 수 있으니 절대 받지 마시고, 수신거부 또는 후스콜 등록 등을 통해 또다른 피해가 발생하지 않도록 주의하여 주시기 바랍니다.</p>";
	txt20210115100557 = txt20210115100557 +"<p>02로 시작하고 중간번호는 3014,6575,2083,3494,2088,2092 등이며, 뒤의 네자리는 인터넷 전화로 얼마든지 변경,조작 가능하오니 이점 유의하여 주시기바랍니다.</p>";
	txt20210115100557 = txt20210115100557 +"<p>당행은 대출신청 시에만 전화를 드리고 있으며, 대출신청 시 대표번호 1599-0060으로 전화를 드리고 있으니 이점 유의하여 주시기 바랍니다.</p>";
	txt20210115100557 = txt20210115100557 +"<p>문의사항은 금융소비자보호부(02-2173-9298,9299)로 연락 바랍니다.</p>";
	txt20210115100557 = txt20210115100557 +"</div>";
	$("img[src$='20210115100557.jpg']").after(txt20210115100557);

	var txt20211208141238 ="";
	txt20200403103942 = txt20211208141238 +"<div class='sr-only'>";
	txt20200403103942 = txt20211208141238 +"	<p>JumpTogether JT친애저축은행 - 고객의 가장 가까운곳에서!고객의 가장먼저 힘이 되는 빠른 금융 서비스!</p>";
	txt20200403103942 = txt20211208141238 +"</div>";
	$("img[src$='20211208141238.jpg']").after(txt20211208141238);

	var txt20201109132839 ="";
	txt20201109132839 = txt20201109132839 +"<div class='sr-only'>";
	txt20201109132839 = txt20201109132839 +"	<p>고객의 일상을 더욱 행복하게 JT친애저축은행 멤버십 - JT친애저축은행 멤버십 마이페이지</p>";
	txt20201109132839 = txt20201109132839 +"</div>";
	$("img[src$='20201109132839.png']").after(txt20201109132839);



});

function createCookie_Today( name, value, expiredays ) {
	var todayDate = new Date();
	todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);
	if ( todayDate > new Date() ) {
		expiredays = expiredays - 1;
	}
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}