var certificate_target; //공인인증서팝업 초점 

$(document).ready(function() {
	//2020.11.10 웹접근성관련추가
	
	// 팝업일때에는 본문바로가기 붙지 않아야 함.
	if( $('.pop-wrap-header').length == 0 ) {
		$('body').prepend('<div class="skip_nav"><a href="#content">본문 바로가기</a></div>');
	}
	
	//팝업최상단위치
	$('body').prepend($('div.divpop_wrap'));
	
	$('#appl-step2-frame, #hidden_frame, iframe').load( function(){//대출신청서 본문바로가기삭제
        $(this.contentDocument).find('.skip_nav').remove();
        $(this.contentDocument).find('#content').focus();
    });
	
	//본문초점기본설정
	$('#content').attr('tabindex' , -1);
	$('.sub-inner').removeAttr('tabindex').removeAttr('id');
	$('.sub-container').removeAttr('tabindex').removeAttr('id');
	$('.sub-content').attr({'id' : 'content', 'tabindex' : -1}); 
	
	//퀵메뉴 하단풋터 위치변경
	$('.sub-quickmenu').insertAfter('.sub-footer');
		
	$('iframe[title="빈 컨텐츠"]').attr('tabindex' , -1);
	$('.pop-wrap-body.scroll').attr('tabindex' , 0); //핍업 스크롤
	
	$('.sub-maintitle a.btn-sitemap').attr({'id' : 'btn-sitemap', 'href' : '#gnbNavigation'});
	$('.gnbNavigation').attr('id', 'gnbNavigation');
	
	/* 웹 페이지 타이틀 */
	var pageTitle_arr = [];
	var location_title = $('.sub-nav-depth h2');
	var	finalTitle = 'JT친애저축은행 론'; 
	if (location_title.length > 0) {
		for (var i = 0; i < location_title.length; i++) {
			if( !location_title[i].innerText.trim() == '' ) {
				pageTitle_arr.push(location_title[i].innerText);	
			}
		}	
		pageTitle_arr.reverse();
		finalTitle = pageTitle_arr.join(' - ');
		// 프로세스 진행시
		if ($('.sub-step-nav').length > 0 ) {
			finalTitle = $('.sub-step-nav > ul:first-child li.active').text() + ' - ' + finalTitle;
		} 
		window.parent.document.title = finalTitle + '- JT친애저축은행 론'; 
		window.parent.document.body.children[0].setAttribute('title',document.title);//프레임의 타이틀속성 제공
	} else if ($('.pop-wrap').length > 0 ) {
		// 팝업일때,
			finalTitle  = $('.pop-wrap-header h1').text() + '(팝업) - JT친애저축은행 론';
			window.parent.document.title = finalTitle; 
			window.parent.document.body.children[0].setAttribute('title',document.title);//프레임의 타이틀속성 제공
	} else {
		window.parent.document.title = finalTitle; 
		window.parent.document.body.children[0].setAttribute('title',document.title);//프레임의 타이틀속성 제공
	}		

	/* 대출상품공시 햇살론 타이틀변경 */
	var sunloanTit = function(){
		var sunloanurl = '?productType=1&loanType=et'
		if ($(location).attr('search') == sunloanurl){
			$('.sub-maintitle h1').html("<a class='btn-back' href='javascript:history.back()'><span class='sr-only'>이전페이지</span></a>햇살론");
		} 
	}; sunloanTit();
		    
	
	// index.html = header.jsp
	//end 웹접근성관련추가
	
	var selectDC = function(element){
		var select = $(element).find('select');
		select.change(function(){
			var select_name = $(this).children("option:selected").text();
			$(this).siblings('label').text(select_name);
		});
		$(element).focusin(function(event) {
			$(this).css('outline', '1px dotted #000');
		});
		$(element).focusout(function(event) {
			$(this).css('outline', 'none');
		});
	};
	selectDC('.main-selectbox');//셀렉트 박스 option 값 변경 ex)selectDC('classname')
	selectDC('._select');
 
	/* 금융소비자 보호 */
	var financial = function(){
		var fiBox = $('.drop-financial');
		var fiBtn = $('.btn-financial');
	    $(fiBtn).click(function(){
	    	if(fiBox.is(":visible")){
	    		(fiBox).slideUp();
	    		fiBtn.children('a').attr('title','펼치기');
	    		fiBtn.find('img').css('transform','rotate(360deg)');
	    	}else{
	    		(fiBox).slideDown();
	    		fiBtn.children('a').attr('title','접기');
	    		fiBtn.find('img').css('transform','rotate(180deg)')
	    	}
	    });
	    $('#content').mouseover(function(){
    		$(fiBox).slideUp();
    	});
    }; financial();

 	var windowWidth = $(window).width();
    var resWeb={    		
    		isMobileWidth:function(){
    			windowWidth = $(window).width();
    			if(windowWidth > 780){
    				return false;
    			}
    			return true
    		},
    		
    		
    }   	
   
    // 최초 모바일 서브페이지일 경우
    if (resWeb.isMobileWidth() && $('.sub-container').length > 0) {//pageHeader 숨김
    	$('.page-header').hide();	    	
    }
    
    if (resWeb.isMobileWidth() && $('.sub-inner').length > 0) {//본문바로가기 위치변경
		$('.sub-content').removeAttr('id').removeAttr('tabindex');
		$('.sub-inner').attr({'id' : 'content', 'tabindex' : -1});    	
    }    
    
    if (resWeb.isMobileWidth() && $('.sub-container').length == 0) {//본문바로가기
    	$('div.container2').removeAttr('id');
    	$('div.container2').removeAttr('tabindex');
    	$('div.mobile-main').attr('id' , 'content');
    	$('div.mobile-main').attr('tabindex' , -1);
    }   
    if (resWeb.isMobileWidth() && $('table th').css('display') == 'block') {//제목셀의scope속성을제거
    	$('table th').removeAttr('scope');
    }; 
    if(resWeb.isMobileWidth()){//모바일에서표의제목셀이없을때, 표제목을삭제
    	if ($('table th').css('display')== 'none') {
    		$('caption').remove();
    	}
    }    
    
    var gnb=function(){
     	/* GNB */
    	var gnbTab  = $('.gnbNavigation');
        var gnbMenu = $('.gnb-list');
        var gnbLink = $('.gnb-list > ul > li');
        var subMenu = $('.fr-menu');
        var subLink = $('.fr-menu').find('.sub_menu');
        var menuBx = $('.nav_scroll');   
  /*      menuBx.data('idx', 0);*/

		
        
        //2depth메뉴 상세보기 이벤트
        /* 접근성 개선 */
    	       
          $('.nav_main > li > a').off("click").on("click",function (e) {
              var liObj = $(this).parent();
              if (this.getAttribute('href').indexOf('certificate') > 0) { 
        	      certificate_target = this; 
              }
              if (liObj.children(".nav_sub").is(':hidden') != true) {
                  liObj.removeClass('active');
                  liObj.children(".nav_sub").slideUp("fast");
	                  if ($(this).siblings().length > 0) {
	                      $(this).attr('title', '펼치기');  
	                  }
              } else {
                  $('.nav_main > li').removeClass('active');
                  $('.nav_sub').slideUp('fast');
                  if (liObj.children(".nav_sub").is(':hidden') == true) {
                      liObj.addClass('active');
                      liObj.children(".nav_sub").slideDown('fast');
	                  if ($(this).siblings().length > 0) {
	                      $(this).attr('title', '접기');  
	                  }
                  }
              }
              if(resWeb.isMobileWidth()) {
            	  // 2Depth가 있을 때에는 이벤트 기본동작 차단
            	  console.log($(this).siblings().length);
            	  if($(this).siblings().length > 0 ) {
            		 e.preventDefault(); 
            	 }
              }
          });
          var nowpage = 0;
          var posArr = [];
          var gap = 47;

          menuBx.scroll(function(e,i){
          	if(posArr.length==0){
          		var total=subMenu.find('.sub_menu').length;
          		var lastElemHeight =0;
          		var heightTemp =0;
                  subMenu.find('.sub_menu').each(function (idx) {
                  	//lastIndex의 헤더는 last-1엘리먼트+doublegap만큼만 추가하여 마지막스크롤에 active하게 작업
                  	if(idx===total-3){

                  		heightTemp= $(this).offset().top;
                  	}

                  	 if(idx===total-2){
                   		lastElemHeight= $(this).offset().top;
                   		gap=lastElemHeight/35;
                  		posArr.push(heightTemp+(gap*2.5));
                   	}else{
                     	 posArr.push($(this).offset().top);
                   	}

                  });
          	}
              var nowScroll = menuBx.scrollTop();
            //마이페이지 히든으로 인해 -1length
              for (var i = 0; i < posArr.length-1; i++) {
                  if (nowScroll + gap >= posArr[i] && nowScroll - gap <= posArr[i]) {
                  	nowpage = i;
                      gnbLink.eq(i).addClass('active').siblings().removeClass('active');
                  }
              }
          });


      	$(gnbLink).on("click",function(e){
      		
  	    	if(!resWeb.isMobileWidth()){
  	    		gnbLink.removeClass('active');
  	    		$(this).addClass('active');
  	    		
  	    		/* 접근성 개선 */
  	    		if(!subMenu.is(":hidden") || $(this).hasClass('active')){
  	    			$(subMenu).slideDown();
  	   	        }else{
  	   	            $(subMenu).slideUp();

  	   	        }
  	   	    }
  	    	//e.preventDefault();
          });
          /* 접근성 개선안 */
          gnbMenu.find('li a').off("click").on("click",function (e) {
          	if(resWeb.isMobileWidth()){
              	if(posArr.length==0){
              		var total=subMenu.find('.sub_menu').length;
              		var lastElemHeight =0;
                      subMenu.find('.sub_menu').each(function (idx) {
                      	if(idx===total-3){

                      		heightTemp= $(this).offset().top;
                      	}

                      	 if(idx===total-2){
                       		lastElemHeight= $(this).offset().top;
                       		gap=lastElemHeight/35;
                       		 posArr.push(heightTemp+(gap*2.5));
                       	}else{
                       		posArr.push($(this).offset().top);
                       	}

                      });
              	}
  	            var _this = $(this);
  	            gnbLink.removeClass('active');
  	            _this.parent('li').addClass('active');

  	            var _idx = _this.parent().index();
  	            menuBx.data('animate', true);
  	            menuBx.stop().animate({'scrollTop': menuBx.scrollTop() + subMenu.find('.sub_menu').eq(_idx).offset().top - (gap*0.95)}, {
  					easing: 'easeOutCirc',
  					duration: 300,
  					complete: function () {
  						menuBx.data('animate', false)
  					}
  				});
          	}else {
				/* PC 접근성 초점제어 */
				e.preventDefault();
				var target = $(this).attr('href');
				setTimeout(function () {
					$(target).focus();
				}, 300);
			}
				/* 접근성 개선(초점 제어) */

				gnbMenu.find('li a').removeAttr('title');
				$(this).attr('title', '선택됨');
				$('div.nav_scroll > ul > li').attr('aria-hidden' , 'true');
				$('div.nav_scroll > ul > li a').attr('tabindex' , '-1');
				$('div.nav_scroll > ul > li#lnb0' + ($(this).parent().index() + 1)).attr('aria-hidden' , 'false');
				$('div.nav_scroll > ul > li#lnb0' + ($(this).parent().index() + 1) + ' a').attr('tabindex' , '0');
          });

          /* Gnb 벗어났을 때, 메뉴 닫기(접근성) */
          $('.main-visual button, .btn-sitemap, .main-pop .main-visual-play').on('focus', function () {
          	$('div.fr-menu').css('display' , 'none');
          });

          $('#content').on("click",function(){
  	    	if(resWeb.isMobileWidth()){
  	    		$(subMenu).css('display', 'block');
  	   	    }else{
  	   	        $(subMenu).slideUp();
  	   	    }

          });


  	  $('#hide').on('click',function(){
  	    	gnbTab.hide();
  	    	$('.mask-gnb-mobile').fadeOut(500).removeClass('block');
  	    	/* 접근성 개선(초점제어) */
        	$('.page-header-top').attr('aria-hidden','false');
  	  });
  	  
  	  // 모바일에서 닫기버튼을 누르고, resize가 동작하였을 때 
  	  $(window).resize(function () {
  		 setTimeout(function () {
  			 console.log('resize');
  			 if(!resWeb.isMobileWidth()) {
  				 gnbTab.show();
  			 }
  		 }, 500)
  	  });
  /*        gnbLink.each(function(index) {
  			$(this).hover(function() {
  				$(this).addClass('active');
  				if ($(this).hasClass('active')) {
  					$(subLink).eq(index).addClass('subgnb-on');
  				}else{
  					$(subLink).removeClass('subgnb-on');
  				}
  			}, function() {
  				$(this).removeClass('active');
  				$(subLink).removeClass('subgnb-on');
  			});
  		});
  		subLink.each(function(index) {
  			$(this).hover(function() {
  				$(gnbLink).eq(index).addClass('active');
  			}, function() {
  				$(this).removeClass('subgnb-on');
  				$(gnbLink).removeClass('active');
  			});
  		});*/
	};  


        /* sitemap */
	    var sitemMap = function(e){
	        $('.btn-sitemap').off("click").on("click",function (e) {
	        	$('.html,body').addClass('overflow');          		    	       
		        if(resWeb.isMobileWidth()){
		        	$('.mask-gnb-mobile').fadeIn(500).addClass('block');
	            	$('.gnbNavigation, .fr-menu').show();
	            	$('.page-header').show();
	            	/* 접근성 개선(초점제어) */
	            	$('.page-header-top').attr('aria-hidden','true');
		        }else{
		        	$('.mask-gnb').fadeIn(500).addClass('block');
		            $('.sitemap-wrap').show();
		            $('.sitemap-wrap').focus();
		            return false;
		        }
	        });
	
	        $('.btn-nav-close a').off("click").on("click",function () {
		        if(resWeb.isMobileWidth()){
		        	$('.gnbNavigation').css("display","");
	                $('.mask-gnb-mobile').fadeOut(500).removeClass('block');
		            $('.html,body').removeClass('overflow');
		            $('.page-header-top').attr('aria-hidden','false');
		        }
	        });
	        $('.sitemap-btn-close a').off("click").on("click",function () {
	            $('.mask-gnb').fadeOut(500).removeClass('block');
	            $('.html,body').removeClass('overflow');
	            $('.sitemap-wrap').hide();
	        });
	        if(!resWeb.isMobileWidth()){
	        	$('.mask-gnb').click(function(){
	            	$(this).fadeOut(500).removeClass('block');
	            	$('.html,body').removeClass('overflow');
		            $('.sitemap-wrap').hide();
	            });
	        }
	
	    };
	    gnb();
	    sitemMap();

	    //친애앱다운로드 이동
	    $('.csbAppDown').on('click',function(){
	    	var url = device.getUrl('csb');	    	
	    	top.location.href = url;
	    });
	    //은행앱다운로드 이동
	    $('.bankAppDown').on('click',function(){
	    	var url = device.getUrl('bk');
	    	top.location.href = url;
	    });	    
	    // 1014 수정 시작
	var subBreamcromb = function(){
		var navDepth = $('.sub-nav-depth').find('h2');
		var navDepthList = $('.sub-nav-depth2').find('li');
		$('.sub-nav-depth').find('h2 a').attr('title','펼치기')
		function navOn(ele,time){
			//var navList = $(ele).find('li').length * $(ele).find('li').height();
			var sum=0;
			$(ele).find('li').each(function(){sum +=$(this).height();}); //.sub-nav-depth2 박스높이
			var navList = sum;
			$(ele).find('.sub-nav-icon').addClass('sub-nav-icon-on');
			$(ele).addClass('active');
			$(ele).find('h2 a').attr('title','접기')
			TweenLite.to($(ele).find('ul'), time, {visibility:'visible',height:navList,ease:Quart.easeInOut});
		}
		function navOff(ele,time){
			//var navList = $(ele).find('li').length * $(ele).find('li').height();
			$(ele).find('.sub-nav-icon').removeClass('sub-nav-icon-on');
			$(ele).removeClass('active');
			$(ele).find('h2 a').attr('title','펼치기')
			TweenLite.to($(ele).find('ul'), time, {visibility:'hidden',height:'0',ease:Quart.easeInOut});
		}
		// navDepth.click(function(event) {
		// 	return false;
		// });
		$('.sub-nav-depth').hover(function() {
			navOn($(this),0.5);
		}, function() {
			navOff($(this),0.5);
		})/*.focusin(function(event) {
			navOn($(this),0.5);
		}).focusout(function(event) {
			navOff($(this),0.5);
		});
		
		function subTrigger(){
			$('.sub-nav-depth3').trigger('mouseover');
			setTimeout(subTriggerOut,1500);
		}
		function subTriggerOut(){
			navOff($('.sub-nav-depth3'),0.3);
		}
		subTrigger();
		*/
		$('.sub-nav-depth h2 a').on('click',function(e){
			e.preventDefault();
			var sub_depth = $(this).parent().parent();
			if(sub_depth.hasClass('active')){
				navOff(sub_depth,0.5);
			}else{
				navOn(sub_depth,0.5);
			}
		});
	};
	subBreamcromb();
	//1014 수정 끝


	function scrollOffset(element){
		$('body,html').animate({scrollTop: $(element).offset().top},200,'easeInOutSine');
	}
	commonTab('.sub-tab');
	/*commonTab('.sub-tab-link');*/
	

	//서브 공통 하단 메뉴
	var sub_location_target;
	$('.sub-location-show').each(function(index) {
		var hiddenCont = $('.sub-footer-hidden');
		$(this).click(function(event) {
			sub_location_target=$(this).children('a');//웹접근성 초점
			hiddenCont.hide().eq(index).show();
			$('.sub-location-show').removeClass('on').eq(index).addClass('on');
			$('body,html').animate({scrollTop:$(document).height()},300,'easeInSine');
			return false;
		});
	});
	$('.sub-footer-right').find('.close').click(function(event) {
		$('.sub-footer-hidden').hide();
		$('.sub-location-show').removeClass('on');
		sub_location_target.focus();//웹접근성 초점
		return false;
	});

	//quickmenu top
	$('.sub-quickmenu-topbtn').click(function(event) {
		$('body,html').animate({scrollTop: 0},0);
	});
	var bodybg = function(){
		var docHeight = $(document).height();
		$("body").append("<div class='overlay'></div>");
		$(".overlay")
			.height(docHeight)
			.css({
				'opacity' : 0.4,
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'background-color': 'black',
				'width': '100%',
				'z-index': 50000
		});
	};
	var bodybg_main_mov = function(){
		var docHeight = $(document).height();
		$("body").append("<div class='overlay'></div>");
		$(".overlay")
			.height(docHeight)
			.css({
				'opacity' : 0.4,
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'background-color': 'black',
				'width': '100%',
				'z-index': 10005
		});
	};
	var todayProd = function(){
		var pos = 0;
		$('.today-product-list').each(function() {
			var scroll = $(this).find('.scroll');
			var listWrap = $(this).find("ul");
			var list = $(this).find('li.show');
			var leftBtn = $(this).find('.left-btn');
			var rightBtn = $(this).find('.right-btn');
			var li_width = 185;
			var totalWidth = list.width() * list.length;

			$('.today-prod-show').click(function(event) {
				$('.today-product').show();
				bodybg();
			});
			$('.today-product-close').click(function(event) {
				$(this).parent().hide();
				$('.overlay').remove();
				pos = 0;
				TweenLite.to(listWrap, 0.3, {left:pos, ease:Quart.easeInOut});
			});
			listWrap.width(totalWidth);
			rightBtn.click(function(e){
				if (pos >= totalWidth-scroll.width()) {
					return false;
				}
				pos += li_width *3;
				TweenLite.to(listWrap, 0.5, {left:pos *-1, ease:Quart.easeInOut});
				return false;
			});
			leftBtn.click(function(e){
				if (pos == 0) {
					return false;
				}
				pos -= li_width* 3;
				TweenLite.to(listWrap, 0.5, {left: pos *-1, ease:Quart.easeInOut});
				return false;
			});
		});
	};
	todayProd();

	

	$('.page-footer-blogList').on('click', function(){
		var list = $(this).find('li').length * 24;
		$(this).find('ul').css({
			top: (list + 12) * -1
		});
		$(this).find('ul').show();
	});
	$('body').click(function(e) {
		if (e.target.className == "page-footer-blogList") {
		} else {
			$('.page-footer-blogList').find('ul').hide();
		}
	});

	//우편번호
	$("input[name=post1]").each(function(index) {
		$(this).change(function() {
			$('.post-cont').hide().eq(index).show();
		});
	});

	//원더풀 상품 소개

		$('.prod-aside .prod-aside-list').first().find('a').attr('title','간편한도조회하기 펼치기');
		$('.prod-aside .prod-aside-list').last().find('a').attr('title','대출신청 페이지이동');
		$('.prod-aside .prod-aside-list').first().click(function(event) {
			$(this).next('.prod-slide').slideToggle(300,'easeInSine');
			$(this).toggleClass('active');
			if($(this).hasClass('active')){
				$(this).find('a').attr('title',$(this).find('h3').text()+'접기');
			}else{
				$(this).find('a').attr('title',$(this).find('h3').text()+'펼치기');
			}
			
			$('body,html').stop().animate({scrollTop:$(this).next('.prod-slide').offset().top},300,'easeInSine');
			return false;
		});

	//상품리스트 필터 1127 변경  시작
	$("#loan-all").click(function(){
		var chk = $(this).is(":checked");//.attr('checked');
		if(chk) {
			if($("#sc-all").is(":checked")) {
				$("input[name=prod-ft]").prop("disabled",true);
				$("input[name=prod-ft]").prop("checked",true);
			} else {
				$("input[name=prod-ft]").prop("disabled",false);
				$("input[name=prod-ft-all]").prop("disabled",false);
			}
		}
	});

	$("#loan-sort1").click(function(){
		var chk = $(this).is(":checked");//.attr('checked');
		if(chk) {
			if($("#sc-all").is(":checked")) {
				$("input[name=prod-ft]").prop("disabled",true);
				$("input[name=prod-ft]").prop("checked",true);
			} else {
				$("input[name=prod-ft]").prop("disabled",false);
				$("input[name=prod-ft-all]").prop("disabled",false);
			}
		}
	});

	$("#loan-sort2").click(function(){
		var chk = $(this).is(":checked");//.attr('checked');
		if(chk) {
			$("input[name=prod-ft]").prop("disabled",true);
			$("input[name=prod-ft-all]").prop("disabled",true);
			$("input[name=prod-ft]").prop("checked",false);
			$("input[name=prod-ft-all]").prop("checked",false);
		}
	});

	$("#loan-sort3").click(function(){
		var chk = $(this).is(":checked");//.attr('checked');
		if(chk) {
			$("input[name=prod-ft]").prop("disabled",true);
			$("input[name=prod-ft-all]").prop("disabled",true);
			$("input[name=prod-ft]").prop("checked",false);
			$("input[name=prod-ft-all]").prop("checked",false);
		}
	});

	$("#loan-sort4").click(function(){
		var chk = $(this).is(":checked");//.attr('checked');
		if(chk) {
			$("input[name=prod-ft]").prop("disabled",true);
			$("input[name=prod-ft-all]").prop("disabled",true);
			$("input[name=prod-ft]").prop("checked",false);
			$("input[name=prod-ft-all]").prop("checked",false);
		}
	});
	$("#loan-sort5").click(function(){
		var chk = $(this).is(":checked");//.attr('checked');
		if(chk) {
			$("input[name=prod-ft]").prop("disabled",true);
			$("input[name=prod-ft-all]").prop("disabled",true);
			$("input[name=prod-ft]").prop("checked",false);
			$("input[name=prod-ft-all]").prop("checked",false);
		}
	});
	$("#loan-sort6").click(function(){
		var chk = $(this).is(":checked");
		if(chk) {
			if($("#sc-all").is(":checked")) {
				$("input[name=prod-ft]").prop("disabled",true);
				$("input[name=prod-ft]").prop("checked",true);
			} else {
				$("input[name=prod-ft]").prop("disabled",false);
				$("input[name=prod-ft-all]").prop("disabled",false);
			}
		}
	});	

	$("#sc-all").click(function(){
		var chk = $(this).is(":checked");//.attr('checked');
		if(chk) {
			$("input[name=prod-ft]").prop("disabled",true);
			$("input[name=prod-ft]").prop("checked",true);
		}else {
			$("input[name=prod-ft]").prop("disabled",false);
			$("input[name=prod-ft]").prop("checked",false);
		}
	});

	var prodFilter = function(){ 
		$('.prodfilter-btn').click(function(event) {
			event.preventDefault();
			//var $lis = $('.loan-product').find('li');
			var $lis = $('.loan-product').find('li[data-category]');
			console.log($lis);
			if ($('.checkwrap').find('input').is(':checked')) {				
				$checked = $('input:checked');
				if ($checked.length) {
					var selector = '';
					var selector2 = '';
					var selector3 = '';
					var loanSort = ''; 
					
					if ($("#loan-all").is(':checked')) {
						if($("#sc-all").is(':checked')) {
							selector = "[data-category~='loan-all']";
						} else {
							$($checked).each(function(index, element){
								if(selector == '') {
									selector += "[data-category~='" + element.id + "']";
								} else {
									selector += ", [data-category~='" + element.id + "']";
									selector += ", [data-category~='" + element.id +"-crdt"+ "']";
									selector += ", [data-category~='" + element.id +"-mdir"+ "']";
								}
							});
						}
						selector = selector.replace("[data-category~='loan-all'], ", "");
						$lis.fadeOut(300,'easeInOutQuad').filter(selector).fadeIn(300,'easeInOutQuad');
					}
					
					else if($("#loan-sort1").is(':checked') || $("#loan-sort6").is(':checked')) {
						if($("#loan-sort1").is(':checked'))
							loanSort = 'loan-sort1';
						else loanSort = 'loan-sort6';
						if($("#sc-all").is(':checked')) {
							selector = "[data-category~='"+loanSort+"']";
							
						} else {
							$($checked).each(function(index, element){
								if(element.id.length <= 5){
									if(loanSort == 'loan-sort1')
										var loan = element.id+'-crdt';
									if(loanSort == 'loan-sort6')
										var loan = element.id+'-mdir';
								}
								else var loan = element.id;
								
								if(selector == '') {
									selector += "[data-category~='" + loan + "']";
								} else {
									selector += ", [data-category~='" + loan + "']";									
								}
							});
						}						
						selector2 = "[data-category~='loan-sort3']";
						
						if(loanSort == 'loan-sort1'){
							selector = selector.replace("[data-category~='loan-sort1'], ", "");
							selector3 = "[data-category~='loan-sort6']";
						}
						else if(loanSort == 'loan-sort6'){
							selector = selector.replace("[data-category~='loan-sort6'], ", "");
							selector3 = "[data-category~='loan-sort1']";
						}
						$lis.fadeOut(300,'easeInOutQuad').filter(selector).fadeIn(300,'easeInOutQuad');
						
						$lis.filter(selector2).fadeOut(300);
						$lis.filter(selector3).fadeOut(300);
					} else {
						$($checked).each(function(index, element){
							if(selector == '') {
								selector += "[data-category~='" + element.id + "']";
							} else {
								selector += ", [data-category~='" + element.id + "']";
							}
						});
						$lis.fadeOut(300,'easeInOutQuad').filter(selector).fadeIn(300,'easeInOutQuad');
					}
					return false;
				}
			} else {
				$lis.fadeIn(300,'easeInOutQuad');
			}
		});
	};
	prodFilter();

	var toggleFaq = function(){
		var allToggle = false;
		var faqBtn = $('.cust-site-btn');
		var allToggleBtn = $('.cust-faq-btn').find('a');
		if(faqBtn.parent().hasClass('active')){//초기설정
			faqBtn.attr('title','접기');
		}else{
			faqBtn.attr('title','펼치기');
		}
		faqBtn.click(function(event) {
			$(this).parent().next('dd').slideToggle(300,'easeInOutQuad');
			$(this).parent().toggleClass('active');
			if($(this).parent().hasClass('active')){
				$(this).attr('title','접기');
			}else{
				$(this).attr('title','펼치기');
			} // 웹접근성추가			
			return false;
		});

		allToggleBtn.click(function(event) {
			if(!allToggle){
				$(this).addClass('active');
				$('.cust-site').find('dd').slideDown(300,'easeInOutQuad');
				$('.cust-site').find('dt').addClass('active');
				allToggleBtn.find('span').text('모두닫기');
				faqBtn.attr('title','접기');
				allToggle = true;
			}else{
				$(this).removeClass('active');
				$('.cust-site').find('dd').slideUp(300,'easeInOutQuad');
				$('.cust-site').find('dt').removeClass('active');
				allToggleBtn.find('span').text('모두보기');
				faqBtn.attr('title','펼치기');
				allToggle = false;
			}
			return false;
		});
		if ($('.cust-board-paging').hasClass('_js-paging')) {
			$('._js-paging').jPages({
				containerID: "_faq-paging",
				callback    : function(pages){
					console.log(pages);
					allToggleBtn.removeClass('active');
					$('.cust-site').find('dd').slideUp(300,'easeInOutQuad');
					allToggle = false;
				}
			});
		} else{
			return;
		}
		// function ieFix(pages, items){
		// 	for(i = items.range.start; i <= items.range.end; i++){
		// 		var onFocus = $("#coverflow_section li:nth-child("+i+")");
		// 		onFocus.css({'opacity':1});
		// 	}
		// }
	};
	toggleFaq();
	var boardSelect = function(){
		var select_box = $('.board-select');
		var select_a = $('.select-list').find('a');
		$('.select-value').attr('title','검색카테고리 펼치기');
		$('.select-value').click(function(){
			if($(this).parent(select_box).hasClass('open')){
				$(this).attr('title','검색카테고리 펼치기');
			}else{
				$(this).attr('title','검색카테고리 접기');
			} // 웹접근성추가
			$(this).next('.select-list').slideToggle(300,'easeInOutSine').parent(select_box).toggleClass('open');
			return false;
		});

		select_a.click(function(){
			var select_value = $(this).html();
			$(this).parents('.select-list').slideUp(300,'easeInOutSine').prev('.select-value').html(select_value);
			return false;
		});
		select_box.focusin(function(event) {
			$(this).css('outline', '3px solid #eee');
		});
		select_box.focusout(function(event) {
			$(this).css('outline', 'none');
		});
	};
	boardSelect();

	// 체크카드 앵커
	var checkCard = function(){
		var anchor1 = $('.cust-card-anchor1');
		var anchor2 = $('.cust-card-anchor2');
		var anchor3 = $('.cust-card-anchor3');

		function posMove(pos){
			$('body,html').stop().animate({scrollTop:pos},300,'easeInSine');
		}
		anchor1.click(function(event) {
			var pos = $('.cust-card-info').offset().top;
			posMove(pos);
		/*	return false;*/
		});
		anchor2.click(function(event) {
			var pos = $('.cust-card-issue').offset().top;
			posMove(pos);
		/*	return false;*/
		});
		anchor3.click(function(event) {
			var pos = $('.cust-card-use').offset().top;
			posMove(pos);
	/*		return false;*/
		});
	};
	//checkCard();
	 function scrollAni(){//체크카드 혜택더보기
			var $body = $('body');
			var htmlWrap = $('html, body');
			$body.on('click', '.anchorPos li a', function (e) {//스크롤 애니메이션
				var offset = $($(this).attr('href')).offset();
				if(!resWeb.isMobileWidth()){
					var paddingTop = $(this).data('padding-top') || 0;
				}else{
					var paddingTop = $(this).data('padding-top') || 46;
				}
				if (!!offset) {
					htmlWrap.stop().animate({scrollTop: offset.top - paddingTop});
					//e.preventDefault();
				}
			});
		}scrollAni();//체크카드 혜택더보기	

	//대출계산기 레이어
	var serv_calc_target;
	$('.sub-table-form').find('.ico-zoom').click(function(event) {
		serv_calc_target = $(this);
		$('.serv-calc-layer').show();
		$('.serv-calc-layer').find('.serv-calc-close').attr('href' , '#' + serv_calc_target.attr('id'));
	});
	$('.sub-table-form').find('.ico-zoom-mobile').click(function(event) {
		serv_calc_target = $(this);
		$('.serv-calc-layer').show();
		$('.serv-calc-layer').find('.serv-calc-close').attr('href' , '#' + serv_calc_target.attr('id'));
	});
	$('.serv-calc-layer').find('.serv-calc-close').click(function(event) {
		$(this).parent().hide();
	});


	$('#main-agree').click(function(event) {
		if ($(this).is(':checked') && $(this).val() == 'o'){
			console.log('good');
		}else{
			console.log('bad');
		}
	});
	//인터넷 대출신청 스탭
	$('._appl-step').find('a').click(function(event) {
		scrollOffset('.appl-step2-frame');
		$('.sub-step-nav ul li').removeClass('active');
		$('.sub-step-nav .step2').addClass('active');
		return false;
	});


	//0204메인 동영상 url 수정
	var video = $('#video');
	var mainMovie = $('.main-ad-layer');
	 $('.main-advertising').click(function(event) {
	 	mainMovie.fadeIn(400,'easeInOutSine');
	 	video[0].src = "https://www.youtube.com/embed/Ygin531lfSA";
	 	$('html,body').animate({scrollTop: 100},200);
	 	bodybg_main_mov();
	 	$('#video_wrap').focus();
	 	return false;
	 });
	 $('.main-ad-close').click(function(event) {
	 	mainMovie.fadeOut(400,'easeInOutSine');
	 	video[0].src = "";
	 	$('.overlay').remove();
	 	$('.main-advertising > a').focus();
	 	return false;
	 });

	//0128 퀵메뉴 추가
	var quickMenu = function(){
		//variables
		var $window = $(window);
		var $container = $(".sub-quickmenu");
		var $main = $("#content");
		var window_min = 0;
		var window_max = 0;
		var threshold_offset = 50;

		function set_limits(){
			var max_move = ($main == null) ? 0 : $main.height() - $container.height();
			//var min_move = ($main == null) ? 0 : $main.offset().top;
			var min_move = ($main == null) ? 0 : $main.size() ? $main.offset().top : 0; 

			
			
			$container.attr("data-min", min_move).attr("data-max",max_move);
			window_min = min_move - threshold_offset;
			window_max = max_move + $container.height() + threshold_offset;
		}
		set_limits();

		function window_scroll(){
			if( $window.scrollTop() >= window_min && $window.scrollTop() < window_max ){
				set_limits();
				container_move();
			}
		}
		$window.bind("scroll", window_scroll);

		function container_move(){
			var wst = $window.scrollTop();
			if( wst >= $container.attr("data-min") && wst <= $container.attr("data-max") ){
				var margin_top = $window.scrollTop() - $container.attr("data-min");
				$container.stop().animate({top: margin_top},700,'easeOutQuad');

			}else if( wst <= $container.attr("data-min") ){
				$container.stop().animate({top: 0},700);
			}else if( wst > $container.attr("data-max") ){
				$container.stop().animate({top:  $container.attr("data-max")-$container.attr("data-min")+"px"},700);
			}
		}
		container_move();
	}
	quickMenu();
	
});

//약관상세보기
function goPopupView(seq, checkSeeMoreVal, gubun, id) {

	if(typeof seq == "number") seq = String(seq);

	var url = "/archives/archives_detail.do?archivesSeq=" + seq;
	
	if(seq == 'bs2ChkMore') url = "/loan/pop_bs2ChkMore.do";
	else if(seq.indexOf("pop_identify_comfirm") > -1) url = "/popup/pop_identify_comfirm.do?archivesSeq="+seq;
	else if(seq.indexOf("pop_kakaotalk") > -1) url = "/popup/pop_identify_comfirm.do?archivesSeq="+seq;

	if(checkSeeMoreVal != undefined && checkSeeMoreVal != "" && checkSeeMoreVal.length > 0){
		url += "&checkSeeMoreVal=" + checkSeeMoreVal;
		if((pageGubun == "Y") && gubun != undefined && gubun != "" && gubun.length > 0)
			url += "&gubun=" + gubun;
		if(id != undefined && id != "" && id.length > 0)
			url += "&id=" + id;
	}
	var pHeight = "589px";
	if (navigator.userAgent.indexOf('Safari') != -1) pHeight = "529px";
	window.open(url, 'agreeV', 'width=750px, height=' + pHeight + ', top=0, left=0, scrollbars=no');
}

	var swipers;
	//텍스트 append시 slideChange되는 현상(onchange기반)->중복이벤트 방지용
	var isChanged=false;
	var slideInterface ={
			param : {
				idx :'',
				prodType:'',
				link:[],
			},
			init:function(prodType){
		  	    swipers = new Swiper('.swiper-container', {
		    	      slidesPerView: 1,
		    	      loop:false,
		    	      navigation: {
		    	        nextEl: '.btn-next',
		    	        prevEl: '.btn-prev',
		    	      },
		    	});  
		   		swipers.on('slideChange',function(){
			  			slideInterface.param.idx = swipers.realIndex;			  			
			  			slideInterface.callDataWithAjax(slideInterface.param.idx);
			  			slideInterface.subTitleChange(prodType,slideInterface.param.idx);
		  		});  	
		   		this.param.prodType=prodType;
		   		this.setLink(prodType);
		   		this.moveSlide(prodType);
			},
			callDataWithAjax:function(index){
				var linker = slideInterface.getPageLink(index);	
				var subs =linker.substring(linker.indexOf('?'),linker.indexOf('&')).replace('?productType=',''); 
				
		  			$.ajax({
		  				 type:'get' 
		  				,url:linker
		  				,success:function(data){	
			  				var subData = $(data).find('.slide-contents');		  						
			  				$('.swiper-slide').empty();	
			  				if(slideInterface.param.prodType>=50 && slideInterface.param.prodType <= 56 || slideInterface.param.prodType == 58){
			  					//TODO - 예금슬라이드 적용수정
			  					//예금슬라이드는 -1만큼 적게적용됨.
			  	  				$('.swiper-slide:nth-child('+(index+2)+')').append(subData);	
			  				}else{
			  	  				$('.swiper-slide:nth-child('+(index+1)+')').append(subData);	
			  				}				
			  				swipers.update();	
			  				setTimeout(function(){
				  				commonTab('.sub-tab');
				  				commonTab('.sub-tab-link');
			  				}, 200);
			  				todayCookie('todayProd',subs);
		  				}
		  				,error:function(){
		  					alert('상품 조회에 실패하였습니다.');
		  				}
		  			});
			},
			setLink:function(prodType){
				var eqIdx =0;
				if(prodType>=50 && prodType <= 56 || prodType == 58){
					eqIdx = 2;
				}
				$('.nav_main:eq('+eqIdx+')').find('a').each(function(index,item){
					var aText = $(this).attr('href');					
					if(aText!=undefined){
						if(aText.indexOf('productType')>-1){
							slideInterface.param.link.push(aText);
						}
					}			
				});
			},
			moveSlide:function(productType){
				 $.each(slideInterface.param.link,function(pageIndex,item){	
					 	//slide 동적생성
						$('.swiper-wrapper').append('<div class="swiper-slide"></div>');
						var name = 'productType='+productType;
						var subs =item.substring(item.indexOf('?'),item.indexOf('&')).replace('?productType=',''); 
						if($.trim(subs)==$.trim(productType)){
							swipers.update();
							swipers.slideTo(pageIndex,50,function(){
							});
							if(pageIndex=='0'||pageIndex=='1'){
								//need to slide change
								slideInterface.callDataWithAjax(pageIndex);	  
							}

						}		
						
					
				});
			},
			getPageLink:function(index){  	
		  		return slideInterface.param.link[index];
		  	},
		  	subTitleChange:function(type,linkIdx){
				var typeName ='loan';
				if(type >= 50 && type <= 56 || type == 58){
					typeName = 'deposit';
				}
				var subIdx=0;
				//$('.page-tab li').eq(0).children('a').attr('title', '선택됨');
		  		$('.page-tab li').removeClass('active');
		  		if(typeName=='loan'){
		  			if(linkIdx<3){
		  				subIdx = 0;
		  			}else if(linkIdx==6){
		  				subIdx=2;
		  			}else if(linkIdx>6){
		  				//TODO
		  				return false;
		  			}else{
		  				subIdx=1;
		  			}
		  		}else{
		  			if(linkIdx<3){
		  				subIdx = 0;
		  			}else if(linkIdx<6){
		  				subIdx=1;
		  			}
		  		}
		  		$('.page-tab li').eq(subIdx).addClass('active').find('a').attr('title', '선택됨');
			  	
		  	}
			
	}
	//디바이스 체크 및 스토어 이동함수
    var device = {
    		isMobile:function(){
    			var filter='win16|win32|win64|mac|macintel';
    			if(navigator.platform){
    				if(0>filter.indexOf(navigator.platform.toLowerCase())){
    					return true;
    				}else{
    					return false;
    				}
    			}
    		},
    		isIphone : function(){ 
                var uAgent = navigator.userAgent.toLowerCase();
                var mobilePhones = new Array('iphone', 'ipad', 'ipod');
                var isIphone = false;                
                for(i=0;i<mobilePhones.length;i++){
                    if (uAgent.indexOf(mobilePhones[i]) != -1) {          
                    	isIphone=true; 
                    }
           
                }
                return isIphone;
    		},
    		storeUrl:{
    			bkIphone:'https://itunes.apple.com/kr/app/id1469002262?mt=8',
    			bkAndroid:'http://play.google.com/store/apps/details?id=kr.or.sbbank.plus',
    			csbIphone:'https://tuney.kr/AfbRR4',
    			csbAndroid:'https://tuney.kr/AfezNA'  			
    		},
    		getUrl : function(prefix){
    			var urlName;
    			var urlProp; 
    			if(this.isIphone()){
    				urlProp=prefix+'Iphone'
    				urlName = this.storeUrl[urlProp];
    			}else{
    				urlProp = prefix+'Android';
    				urlName = this.storeUrl[urlProp];
    			}    	    			
    			if(this.storeUrl.hasOwnProperty(urlProp)){
    				return urlName;
    			}else{
    				alert('해당링크가 활성화되지 않았습니다. 다시 시도해주세요.');
    			}
    		
    		}
    }
	var modal = {
			data:{
				name:''
			},
			open:function(id){ 
				//jquery모달;  			
			    $('#'+id).bPopup();
			    this.data.name=id;
			    this.init();
			},
			init:function(){
			    $('#layer_frame').css("width","100%");
			    $('#layer_frame').css("height","500px");
			    setTimeout(function(){
			    	clearDim();
			    }, 2500);
			    this.resize();
			},
			resize:function(){
				$('.modal-contents').resize(function(){
					var width = $('.modal-conents').width();
					var height = $('.modal-conents').height();
					
					alert(width+","+height);
					$('#layer_frame').css("width",width);
					$('#layer_frame').css("height",height);
				});
			},
			close:function(id){
				$('#'+id).bPopup().close();
			}
	}
	
	// Tab
	var commonTab = function(tab){
			var $tab = $(tab);
			var nojs = true;
			$tab.each(function() {
				var $tabnav = $(this).find('.sub-tab-nav').find('li');
				var $tabcont = $(this).find('.sub-tab-cont');
				$tabcont.hide();
				$tabcont.eq(0).show();
				$tabnav.eq(0).children('a').attr('title', '선택됨');
				$tabnav.click(function(event) {
					var index = $(this).index();
					$tabnav.removeClass('on').eq(index).addClass('on');
					/* 접근성 개선 */
					$tabnav.children('a').removeAttr('title');
					$tabnav.eq(index).children('a').attr('title', '선택됨');
					$tabcont.hide().eq(index).show();
					return false;
				});
			});
	};
	var _aceCounterGcd ="";
	if(!device.isMobile()){
		//pc
		_aceCounterGcd="AH5A40217264742";
	}else{
		_aceCounterGcd="AS2A40217264745";
	}
	function isChromeSecureTestEnabling(){
		//보안 솔루션 크롬모바일테스트 가능여부 /  가능 => true 불가능 => false 처리
		var status=false;
		return status;
	}
	
	var urlCode =function(){
		//웹1 모바일0
		
		try{
			if(hasWebUrl =='true')return 1;
			else	return 0
		}catch(err){
			return 0;
		}
	}();
	//공통파라미터 작성함수 , prefix = C_
	var commonInterface={
			 param:{}
			,init:function(f){
				this.param.form=f;
				this.setParam('C_URL','url');
				this.setParam('C_URL_CD',urlCode);
				this.setParam('C_TESTER','3');
				//this.debug();
			},setParam:function(k,v){
				var input = $('<input>')
							.attr({
								 type:'hidden'
								,id  :k
								,name:k
								,value:v})
							.appendTo(this.param.form);	
							
			},debug:function(){				
				var list = $('input[name*="C_"');
				list.each(function(idx,item){
					console.log(idx+","+$(item).val());
				});
			}
			
	}
	//공통 암호화 및 Submit처리 함수 
	function commonSendForm(formElem){
			//commonInterface.init(formElem);
	       if(!device.isMobile()){    
	    	  // alert('PC여부'+!device.isMobile()+'EncData 생성여부(touchEnKey'+TK_makeEncData(formElem));
	    	 
	    	   if(TK_makeEncData(formElem)){
	    		   setDim();
					AnySign.XecureSubmit(formElem);
				}else{	
					//크롬모바일테스트
		            if(isChromeSecureTestEnabling()){
		            	//submit 불가능하게 막아야됨
			    	   	if($(':input[data-tk-kbdType]')!=undefined&&$(':input[data-tk-kbdType]').length>0){
				    	   	 mtk.fillEncData();		
			    	   	}
			    	   	setDim();
						formElem.submit();
		            }else{
		            	alert('TouchEnKey 보안 솔루션이 정상적으로 작동되지 않았습니다.\n 설치 여부 및 모듈을 확인해주세요.');
		            }  
				}	    	
	       }else{	    	   
	    	   	if($(':input[data-tk-kbdType]')!=undefined&&$(':input[data-tk-kbdType]').length>0){
		    	   	 mtk.fillEncData();		
	    	   	}
	    	   	setDim();
				 formElem.submit();
	       }
	}
	
	//딤세팅
	function setDim(){
	       if(typeof smsWin=== typeof undefined||smsWin==''){
	    	   if(parent&&parent!=this){
	    		   if($('form[name="frm_appl2"]').length>0){
		    		   setTimeout(function(){
			    		   $('#content',parent.document).find('.mask').show();
			    		   $('#content',parent.document).find('.loading-bar').show();	
		    		   }, 250);  
	    		   }else{
		    		   setTimeout(function(){
			    		   $('#content').find('.mask').show();
			    		   $('#content').find('.loading-bar').show();	
		    		   }, 250);  
	    		   }
	    	   }
	       }
	}
	
	//딤해제
	function clearDim(){
	       $('.mask').hide();
	       $('.loading-bar').hide();
	}
	function clearSmsWin(){
	       smsWin ='';
	}
	//숫자만 입력
	function regChkNum(obj){
	    var exp = new RegExp('^[0-9]*$');
	    var val = obj.value;
	    val=val.replace('\.', '');
	    if(val!=''){
	        if(!exp.test(val)){
	        	alert("숫자만 입력이 가능합니다.");
	            obj.value = "";
	        }
	    }
	}
	
	//모바일기기 전화함수
	function callToTel(url){
		url = url.replace("-","");
		if(device.isMobile()){
			top.location.href="tel:"+url;	
		}
	}
	
	var creatMsg_crtLineStr = "--------------------------------------------------\n";
	var creatMsg_crtLastChkStr01 = " ※ JT친애저축은행 약관에 동의하고 인증 하였습니다.";
	var creatMsg_crtLastChkStr02 = " ※ 본인인증 하시겠습니까?";
	
	function creatMsg_custCrtInfo(custNm, regi1, regi2, crtWay){
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var hr = now.getHours();
		var mn = now.getMinutes();
		var sc = now.getSeconds();
		var signMthd = "인증서";
		if(crtWay == "1") signMthd = "휴대폰인증";
		
		return "[신청인정보]\n"
				+ " * 이름: " + custNm + "\n"
				+ " * 주민번호: " + regi1 + "-" + regi2.substring(0, 1) + "******\n"
				+ " * 인증일시: " + year + "년 " + month + "월 " + date + "일 " + hr + ":" + mn + ":" + sc + "\n"
				+ " * 인증방법: " + signMthd + "\n"
				+ creatMsg_crtLineStr
				+ "[약관동의내역]" + "\n";
	}
	
	function creatMsg_mpTscoAgree(num){
		var msg = "(Y) " + num + ".본인인증서비스이용 약관동의\n"
				 + "(Y) " + ++num + ".고유식별정보처리 동의\n"
				 + "(Y) " + ++num + ".이동통신사이용 약관동의\n"
				 + "(Y) " + ++num + ".개인정보이용 동의\n";
		if(isKtOrLg()) msg += "(Y) " + ++num + ".개인정보 제3자 제공 동의\n";
		return msg;
	}
	
	function creatMsg_ownershipOfHouse(num){
		return "(Y) "+ num + ".개인(신용)정보 수집·이용 동의여부(주택소유확인시스템)\n"
			+ "(Y) "+ ++num + ".고유식별정보 수집·이용 동의여부(주택소유확인시스템)\n"
			+ "(Y) "+ ++num + ".개인(신용)정보 제공·조회 동의여부(주택소유확인시스템)\n"
			+ "(Y) "+ ++num + ".고유식별정보 제공·조회 동의여부(주택소유확인시스템)\n";
	}
	
	function extractionNumber(msg){ /* 동의항목 "(Y) 1.*" 형식 문자열 max 넘버 추출 */
		return Number(msg.substring((Number(msg.lastIndexOf(") "))+2), msg.lastIndexOf(".")));
	}
	
var pageGubun = "";
$(function(){
	$("fieldset[id^='required_check_']").find("label").click(function(){
		if(pageGubun == "Y" || pageGubun == "N"){
			if($(this).is("[for$='_1']")){
				if($(this).prev().prop("disabled")){
					var checkSeeMoreVal = $(this).parent().parent().prop("id");
					if(checkSeeMoreVal.indexOf("required_check_") > -1){
						if(pageGubun == "Y"){
							var ord = headerObj($(this)).find("a").attr("data-ord");
							goPopupView(ord, checkSeeMoreVal, 'agr', $(this).prev().prop("id"));
						}else if(pageGubun == "N"){
							chkDetail(headerObj($(this)));
						}
					}
				}
			}else if($(this).is("[for$='_2']")){
				alert("동의하셔야만 (금융)거래관계의 설정 및 유지가 가능합니다.");
				$(this).siblings(":radio").prop("checked", false);
				$(this).siblings(":radio").focus();
				return false;
			}
		}
	});
	
	$("a").click(function(){
		if($(this).data("chksmval") != undefined
			&& $(this).data("chksmval").indexOf("required_check_") > -1)
			goPopupView($(this).data("ord"), $(this).data("chksmval"), 'chk');
	});
	
	$("select[data-gubun=tscoDv]").change(function(){
		if($("select[data-gubun=tscoDv] option:selected").val() == "6"
			|| $("select[data-gubun=tscoDv] option:selected").val() == "7"){
			$("#ktLgAgr").css("display", "block");
		}else{
			$("#ktLgAgr").css("display", "none");
		}
	});
	
});

function headerObj(obj){
	var id = obj.parent().parent().prop("id");
	var no = id.substring(id.length-2);
	obj = obj.parent().parent().parent();
	if(no == "01") obj = obj.prev();
	else if(no == "02") obj = obj.prev().prev();
	else if(no == "03") obj = obj.prev().prev().prev();
	else if(no == "04") obj = obj.prev().prev().prev().prev();
	return obj;
}

function chkDetail(obj){
	var text = obj.find("h3").text();
	obj.find("h3").siblings('a').focus();
	if(text.indexOf("[필수]") > -1)
		text = text.substring(text.indexOf("[필수]")+4).trim();
	else if(text.indexOf("※") > -1)
		text = text.substring(text.indexOf("※")+1).trim();
	alert(text+" 자세히보기 내용 확인 바랍니다.");
}

function init_disabled(){
	$("fieldset[id^='required_check_']").children().find(":radio").prop("disabled", true);
}

function fieldsetMaxNoId(){
	var maxNoId = $("fieldset[id^='required_check_']:last").prop("id");
	return maxNoId.substring(0,  maxNoId.lastIndexOf("_")+3);
}

function loanAttrRmv(checkSeeMoreVal, gubun, id){
	if(pageGubun == "Y"){
		if(gubun == "allChk"){
			$("fieldset[id^="+checkSeeMoreVal+"]").find(":radio").each(function(){
				$(this).prop("disabled", false);
				if($(this).is("[id$=1]")) $(this).prop("checked", true);
			});
			if(!$("fieldset[id^='required_check_']").find(":radio").prop("disabled"))
				$(":checkbox[id='agree8']").prop("checked", true);
		}else if(gubun == "chk"){
			$("fieldset[id^="+checkSeeMoreVal+"]").find(":radio").removeAttr("disabled");
			$("fieldset[id^="+checkSeeMoreVal+"]").find(":radio").prop("checked", true);
		}else if(gubun == "agr"){
			var test = checkSeeMoreVal.substring(0, checkSeeMoreVal.lastIndexOf("_")+3);
			$("fieldset[id^="+checkSeeMoreVal.substring(0, checkSeeMoreVal.lastIndexOf("_")+3)+"]").find(":radio").removeAttr("disabled");
			$("#"+id).prop("checked", true);
		}
	}else{
		$("fieldset[id^="+checkSeeMoreVal+"]").find(":radio").removeAttr("disabled");
	}
}

function allChkAgree() {
	var obj = $("#agree8");
	var childrenTag;
	var flag = true;
	$("fieldset[id^='required_check_']").each(function(){
		childrenTag = $(this).children().children();
		if(childrenTag.prop("disabled")){
			$(obj).prop("checked", false);
			if(pageGubun == "Y"){
				var ord = headerObj(childrenTag).find("a").data("ord");
				var checkSeeMoreVal = headerObj(childrenTag).find("a").data("chksmval");
				goPopupView(ord, checkSeeMoreVal, 'allChk');
				flag = false;
				return false;
			}else{
				chkDetail(headerObj(childrenTag));
				flag = false;
				return false;
			}
		}
	});
	if($(obj).prop("checked")){
		$(".sub-agree :radio[id$=1]").not("[data-exept=Y]").prop("checked", true);
		$(".sub-agree :radio[id$=2]").not("[data-exept=Y]").prop("checked", false);
	}
	else if(flag){
		$(".sub-agree :radio").prop("checked", false);
	}
}

function isKtOrLg(){
	var tscoDv1 = $("select[data-gubun=tscoDv] option:selected").val();
	var tscoDv2 = ($("#ktLgAgr").css("display") != "none") && ($("#ktLgAgr #mobAgr5_1").prop("checked"));
	if(tscoDv1 == "6" || tscoDv1 == "7" || tscoDv2){
		return true;
	}else return false;
}

function chkMbsRadioVal(_obj) {
	var rdObj = _obj;
	if (rdObj.checked && rdObj.value != "Y") {
		alert("동의하셔야만 ID/비밀번호찾기가 가능합니다.");
		rdObj.checked = false;
	}
}