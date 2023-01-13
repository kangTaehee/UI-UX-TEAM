var certificate_target; //�����������˾� ���� 

$(document).ready(function() {
	//2020.11.10 �����ټ������߰�
	
	// �˾��϶����� �����ٷΰ��� ���� �ʾƾ� ��.
	if( $('.pop-wrap-header').length == 0 ) {
		$('body').prepend('<div class="skip_nav"><a href="#content">���� �ٷΰ���</a></div>');
	}
	
	//�˾��ֻ����ġ
	$('body').prepend($('div.divpop_wrap'));
	
	$('#appl-step2-frame, #hidden_frame, iframe').load( function(){//�����û�� �����ٷΰ������
        $(this.contentDocument).find('.skip_nav').remove();
        $(this.contentDocument).find('#content').focus();
    });
	
	//���������⺻����
	$('#content').attr('tabindex' , -1);
	$('.sub-inner').removeAttr('tabindex').removeAttr('id');
	$('.sub-container').removeAttr('tabindex').removeAttr('id');
	$('.sub-content').attr({'id' : 'content', 'tabindex' : -1}); 
	
	//���޴� �ϴ�ǲ�� ��ġ����
	$('.sub-quickmenu').insertAfter('.sub-footer');
		
	$('iframe[title="�� ������"]').attr('tabindex' , -1);
	$('.pop-wrap-body.scroll').attr('tabindex' , 0); //�̾� ��ũ��
	
	$('.sub-maintitle a.btn-sitemap').attr({'id' : 'btn-sitemap', 'href' : '#gnbNavigation'});
	$('.gnbNavigation').attr('id', 'gnbNavigation');
	
	/* �� ������ Ÿ��Ʋ */
	var pageTitle_arr = [];
	var location_title = $('.sub-nav-depth h2');
	var	finalTitle = 'JTģ���������� ��'; 
	if (location_title.length > 0) {
		for (var i = 0; i < location_title.length; i++) {
			if( !location_title[i].innerText.trim() == '' ) {
				pageTitle_arr.push(location_title[i].innerText);	
			}
		}	
		pageTitle_arr.reverse();
		finalTitle = pageTitle_arr.join(' - ');
		// ���μ��� �����
		if ($('.sub-step-nav').length > 0 ) {
			finalTitle = $('.sub-step-nav > ul:first-child li.active').text() + ' - ' + finalTitle;
		} 
		window.parent.document.title = finalTitle + '- JTģ���������� ��'; 
		window.parent.document.body.children[0].setAttribute('title',document.title);//�������� Ÿ��Ʋ�Ӽ� ����
	} else if ($('.pop-wrap').length > 0 ) {
		// �˾��϶�,
			finalTitle  = $('.pop-wrap-header h1').text() + '(�˾�) - JTģ���������� ��';
			window.parent.document.title = finalTitle; 
			window.parent.document.body.children[0].setAttribute('title',document.title);//�������� Ÿ��Ʋ�Ӽ� ����
	} else {
		window.parent.document.title = finalTitle; 
		window.parent.document.body.children[0].setAttribute('title',document.title);//�������� Ÿ��Ʋ�Ӽ� ����
	}		

	/* �����ǰ���� �޻�� Ÿ��Ʋ���� */
	var sunloanTit = function(){
		var sunloanurl = '?productType=1&loanType=et'
		if ($(location).attr('search') == sunloanurl){
			$('.sub-maintitle h1').html("<a class='btn-back' href='javascript:history.back()'><span class='sr-only'>����������</span></a>�޻��");
		} 
	}; sunloanTit();
		    
	
	// index.html = header.jsp
	//end �����ټ������߰�
	
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
	selectDC('.main-selectbox');//����Ʈ �ڽ� option �� ���� ex)selectDC('classname')
	selectDC('._select');
 
	/* �����Һ��� ��ȣ */
	var financial = function(){
		var fiBox = $('.drop-financial');
		var fiBtn = $('.btn-financial');
	    $(fiBtn).click(function(){
	    	if(fiBox.is(":visible")){
	    		(fiBox).slideUp();
	    		fiBtn.children('a').attr('title','��ġ��');
	    		fiBtn.find('img').css('transform','rotate(360deg)');
	    	}else{
	    		(fiBox).slideDown();
	    		fiBtn.children('a').attr('title','����');
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
   
    // ���� ����� ������������ ���
    if (resWeb.isMobileWidth() && $('.sub-container').length > 0) {//pageHeader ����
    	$('.page-header').hide();	    	
    }
    
    if (resWeb.isMobileWidth() && $('.sub-inner').length > 0) {//�����ٷΰ��� ��ġ����
		$('.sub-content').removeAttr('id').removeAttr('tabindex');
		$('.sub-inner').attr({'id' : 'content', 'tabindex' : -1});    	
    }    
    
    if (resWeb.isMobileWidth() && $('.sub-container').length == 0) {//�����ٷΰ���
    	$('div.container2').removeAttr('id');
    	$('div.container2').removeAttr('tabindex');
    	$('div.mobile-main').attr('id' , 'content');
    	$('div.mobile-main').attr('tabindex' , -1);
    }   
    if (resWeb.isMobileWidth() && $('table th').css('display') == 'block') {//������scope�Ӽ�������
    	$('table th').removeAttr('scope');
    }; 
    if(resWeb.isMobileWidth()){//����Ͽ���ǥ�������̾�����, ǥ����������
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

		
        
        //2depth�޴� �󼼺��� �̺�Ʈ
        /* ���ټ� ���� */
    	       
          $('.nav_main > li > a').off("click").on("click",function (e) {
              var liObj = $(this).parent();
              if (this.getAttribute('href').indexOf('certificate') > 0) { 
        	      certificate_target = this; 
              }
              if (liObj.children(".nav_sub").is(':hidden') != true) {
                  liObj.removeClass('active');
                  liObj.children(".nav_sub").slideUp("fast");
	                  if ($(this).siblings().length > 0) {
	                      $(this).attr('title', '��ġ��');  
	                  }
              } else {
                  $('.nav_main > li').removeClass('active');
                  $('.nav_sub').slideUp('fast');
                  if (liObj.children(".nav_sub").is(':hidden') == true) {
                      liObj.addClass('active');
                      liObj.children(".nav_sub").slideDown('fast');
	                  if ($(this).siblings().length > 0) {
	                      $(this).attr('title', '����');  
	                  }
                  }
              }
              if(resWeb.isMobileWidth()) {
            	  // 2Depth�� ���� ������ �̺�Ʈ �⺻���� ����
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
                  	//lastIndex�� ����� last-1������Ʈ+doublegap��ŭ�� �߰��Ͽ� ��������ũ�ѿ� active�ϰ� �۾�
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
            //���������� �������� ���� -1length
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
  	    		
  	    		/* ���ټ� ���� */
  	    		if(!subMenu.is(":hidden") || $(this).hasClass('active')){
  	    			$(subMenu).slideDown();
  	   	        }else{
  	   	            $(subMenu).slideUp();

  	   	        }
  	   	    }
  	    	//e.preventDefault();
          });
          /* ���ټ� ������ */
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
				/* PC ���ټ� �������� */
				e.preventDefault();
				var target = $(this).attr('href');
				setTimeout(function () {
					$(target).focus();
				}, 300);
			}
				/* ���ټ� ����(���� ����) */

				gnbMenu.find('li a').removeAttr('title');
				$(this).attr('title', '���õ�');
				$('div.nav_scroll > ul > li').attr('aria-hidden' , 'true');
				$('div.nav_scroll > ul > li a').attr('tabindex' , '-1');
				$('div.nav_scroll > ul > li#lnb0' + ($(this).parent().index() + 1)).attr('aria-hidden' , 'false');
				$('div.nav_scroll > ul > li#lnb0' + ($(this).parent().index() + 1) + ' a').attr('tabindex' , '0');
          });

          /* Gnb ����� ��, �޴� �ݱ�(���ټ�) */
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
  	    	/* ���ټ� ����(��������) */
        	$('.page-header-top').attr('aria-hidden','false');
  	  });
  	  
  	  // ����Ͽ��� �ݱ��ư�� ������, resize�� �����Ͽ��� �� 
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
	            	/* ���ټ� ����(��������) */
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

	    //ģ�־۴ٿ�ε� �̵�
	    $('.csbAppDown').on('click',function(){
	    	var url = device.getUrl('csb');	    	
	    	top.location.href = url;
	    });
	    //����۴ٿ�ε� �̵�
	    $('.bankAppDown').on('click',function(){
	    	var url = device.getUrl('bk');
	    	top.location.href = url;
	    });	    
	    // 1014 ���� ����
	var subBreamcromb = function(){
		var navDepth = $('.sub-nav-depth').find('h2');
		var navDepthList = $('.sub-nav-depth2').find('li');
		$('.sub-nav-depth').find('h2 a').attr('title','��ġ��')
		function navOn(ele,time){
			//var navList = $(ele).find('li').length * $(ele).find('li').height();
			var sum=0;
			$(ele).find('li').each(function(){sum +=$(this).height();}); //.sub-nav-depth2 �ڽ�����
			var navList = sum;
			$(ele).find('.sub-nav-icon').addClass('sub-nav-icon-on');
			$(ele).addClass('active');
			$(ele).find('h2 a').attr('title','����')
			TweenLite.to($(ele).find('ul'), time, {visibility:'visible',height:navList,ease:Quart.easeInOut});
		}
		function navOff(ele,time){
			//var navList = $(ele).find('li').length * $(ele).find('li').height();
			$(ele).find('.sub-nav-icon').removeClass('sub-nav-icon-on');
			$(ele).removeClass('active');
			$(ele).find('h2 a').attr('title','��ġ��')
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
	//1014 ���� ��


	function scrollOffset(element){
		$('body,html').animate({scrollTop: $(element).offset().top},200,'easeInOutSine');
	}
	commonTab('.sub-tab');
	/*commonTab('.sub-tab-link');*/
	

	//���� ���� �ϴ� �޴�
	var sub_location_target;
	$('.sub-location-show').each(function(index) {
		var hiddenCont = $('.sub-footer-hidden');
		$(this).click(function(event) {
			sub_location_target=$(this).children('a');//�����ټ� ����
			hiddenCont.hide().eq(index).show();
			$('.sub-location-show').removeClass('on').eq(index).addClass('on');
			$('body,html').animate({scrollTop:$(document).height()},300,'easeInSine');
			return false;
		});
	});
	$('.sub-footer-right').find('.close').click(function(event) {
		$('.sub-footer-hidden').hide();
		$('.sub-location-show').removeClass('on');
		sub_location_target.focus();//�����ټ� ����
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

	//�����ȣ
	$("input[name=post1]").each(function(index) {
		$(this).change(function() {
			$('.post-cont').hide().eq(index).show();
		});
	});

	//����Ǯ ��ǰ �Ұ�

		$('.prod-aside .prod-aside-list').first().find('a').attr('title','�����ѵ���ȸ�ϱ� ��ġ��');
		$('.prod-aside .prod-aside-list').last().find('a').attr('title','�����û �������̵�');
		$('.prod-aside .prod-aside-list').first().click(function(event) {
			$(this).next('.prod-slide').slideToggle(300,'easeInSine');
			$(this).toggleClass('active');
			if($(this).hasClass('active')){
				$(this).find('a').attr('title',$(this).find('h3').text()+'����');
			}else{
				$(this).find('a').attr('title',$(this).find('h3').text()+'��ġ��');
			}
			
			$('body,html').stop().animate({scrollTop:$(this).next('.prod-slide').offset().top},300,'easeInSine');
			return false;
		});

	//��ǰ����Ʈ ���� 1127 ����  ����
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
		if(faqBtn.parent().hasClass('active')){//�ʱ⼳��
			faqBtn.attr('title','����');
		}else{
			faqBtn.attr('title','��ġ��');
		}
		faqBtn.click(function(event) {
			$(this).parent().next('dd').slideToggle(300,'easeInOutQuad');
			$(this).parent().toggleClass('active');
			if($(this).parent().hasClass('active')){
				$(this).attr('title','����');
			}else{
				$(this).attr('title','��ġ��');
			} // �����ټ��߰�			
			return false;
		});

		allToggleBtn.click(function(event) {
			if(!allToggle){
				$(this).addClass('active');
				$('.cust-site').find('dd').slideDown(300,'easeInOutQuad');
				$('.cust-site').find('dt').addClass('active');
				allToggleBtn.find('span').text('��δݱ�');
				faqBtn.attr('title','����');
				allToggle = true;
			}else{
				$(this).removeClass('active');
				$('.cust-site').find('dd').slideUp(300,'easeInOutQuad');
				$('.cust-site').find('dt').removeClass('active');
				allToggleBtn.find('span').text('��κ���');
				faqBtn.attr('title','��ġ��');
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
		$('.select-value').attr('title','�˻�ī�װ� ��ġ��');
		$('.select-value').click(function(){
			if($(this).parent(select_box).hasClass('open')){
				$(this).attr('title','�˻�ī�װ� ��ġ��');
			}else{
				$(this).attr('title','�˻�ī�װ� ����');
			} // �����ټ��߰�
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

	// üũī�� ��Ŀ
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
	 function scrollAni(){//üũī�� ���ô�����
			var $body = $('body');
			var htmlWrap = $('html, body');
			$body.on('click', '.anchorPos li a', function (e) {//��ũ�� �ִϸ��̼�
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
		}scrollAni();//üũī�� ���ô�����	

	//������� ���̾�
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
	//���ͳ� �����û ����
	$('._appl-step').find('a').click(function(event) {
		scrollOffset('.appl-step2-frame');
		$('.sub-step-nav ul li').removeClass('active');
		$('.sub-step-nav .step2').addClass('active');
		return false;
	});


	//0204���� ������ url ����
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

	//0128 ���޴� �߰�
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

//����󼼺���
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
	//�ؽ�Ʈ append�� slideChange�Ǵ� ����(onchange���)->�ߺ��̺�Ʈ ������
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
			  					//TODO - ���ݽ����̵� �������
			  					//���ݽ����̵�� -1��ŭ ���������.
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
		  					alert('��ǰ ��ȸ�� �����Ͽ����ϴ�.');
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
					 	//slide ��������
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
				//$('.page-tab li').eq(0).children('a').attr('title', '���õ�');
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
		  		$('.page-tab li').eq(subIdx).addClass('active').find('a').attr('title', '���õ�');
			  	
		  	}
			
	}
	//����̽� üũ �� ����� �̵��Լ�
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
    				alert('�ش縵ũ�� Ȱ��ȭ���� �ʾҽ��ϴ�. �ٽ� �õ����ּ���.');
    			}
    		
    		}
    }
	var modal = {
			data:{
				name:''
			},
			open:function(id){ 
				//jquery���;  			
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
				$tabnav.eq(0).children('a').attr('title', '���õ�');
				$tabnav.click(function(event) {
					var index = $(this).index();
					$tabnav.removeClass('on').eq(index).addClass('on');
					/* ���ټ� ���� */
					$tabnav.children('a').removeAttr('title');
					$tabnav.eq(index).children('a').attr('title', '���õ�');
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
		//���� �ַ�� ũ�Ҹ�����׽�Ʈ ���ɿ��� /  ���� => true �Ұ��� => false ó��
		var status=false;
		return status;
	}
	
	var urlCode =function(){
		//��1 �����0
		
		try{
			if(hasWebUrl =='true')return 1;
			else	return 0
		}catch(err){
			return 0;
		}
	}();
	//�����Ķ���� �ۼ��Լ� , prefix = C_
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
	//���� ��ȣȭ �� Submitó�� �Լ� 
	function commonSendForm(formElem){
			//commonInterface.init(formElem);
	       if(!device.isMobile()){    
	    	  // alert('PC����'+!device.isMobile()+'EncData ��������(touchEnKey'+TK_makeEncData(formElem));
	    	 
	    	   if(TK_makeEncData(formElem)){
	    		   setDim();
					AnySign.XecureSubmit(formElem);
				}else{	
					//ũ�Ҹ�����׽�Ʈ
		            if(isChromeSecureTestEnabling()){
		            	//submit �Ұ����ϰ� ���ƾߵ�
			    	   	if($(':input[data-tk-kbdType]')!=undefined&&$(':input[data-tk-kbdType]').length>0){
				    	   	 mtk.fillEncData();		
			    	   	}
			    	   	setDim();
						formElem.submit();
		            }else{
		            	alert('TouchEnKey ���� �ַ���� ���������� �۵����� �ʾҽ��ϴ�.\n ��ġ ���� �� ����� Ȯ�����ּ���.');
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
	
	//������
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
	
	//������
	function clearDim(){
	       $('.mask').hide();
	       $('.loading-bar').hide();
	}
	function clearSmsWin(){
	       smsWin ='';
	}
	//���ڸ� �Է�
	function regChkNum(obj){
	    var exp = new RegExp('^[0-9]*$');
	    var val = obj.value;
	    val=val.replace('\.', '');
	    if(val!=''){
	        if(!exp.test(val)){
	        	alert("���ڸ� �Է��� �����մϴ�.");
	            obj.value = "";
	        }
	    }
	}
	
	//����ϱ�� ��ȭ�Լ�
	function callToTel(url){
		url = url.replace("-","");
		if(device.isMobile()){
			top.location.href="tel:"+url;	
		}
	}
	
	var creatMsg_crtLineStr = "--------------------------------------------------\n";
	var creatMsg_crtLastChkStr01 = " �� JTģ���������� ����� �����ϰ� ���� �Ͽ����ϴ�.";
	var creatMsg_crtLastChkStr02 = " �� �������� �Ͻðڽ��ϱ�?";
	
	function creatMsg_custCrtInfo(custNm, regi1, regi2, crtWay){
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var hr = now.getHours();
		var mn = now.getMinutes();
		var sc = now.getSeconds();
		var signMthd = "������";
		if(crtWay == "1") signMthd = "�޴�������";
		
		return "[��û������]\n"
				+ " * �̸�: " + custNm + "\n"
				+ " * �ֹι�ȣ: " + regi1 + "-" + regi2.substring(0, 1) + "******\n"
				+ " * �����Ͻ�: " + year + "�� " + month + "�� " + date + "�� " + hr + ":" + mn + ":" + sc + "\n"
				+ " * �������: " + signMthd + "\n"
				+ creatMsg_crtLineStr
				+ "[������ǳ���]" + "\n";
	}
	
	function creatMsg_mpTscoAgree(num){
		var msg = "(Y) " + num + ".�������������̿� �������\n"
				 + "(Y) " + ++num + ".�����ĺ�����ó�� ����\n"
				 + "(Y) " + ++num + ".�̵���Ż��̿� �������\n"
				 + "(Y) " + ++num + ".���������̿� ����\n";
		if(isKtOrLg()) msg += "(Y) " + ++num + ".�������� ��3�� ���� ����\n";
		return msg;
	}
	
	function creatMsg_ownershipOfHouse(num){
		return "(Y) "+ num + ".����(�ſ�)���� �������̿� ���ǿ���(���ü���Ȯ�νý���)\n"
			+ "(Y) "+ ++num + ".�����ĺ����� �������̿� ���ǿ���(���ü���Ȯ�νý���)\n"
			+ "(Y) "+ ++num + ".����(�ſ�)���� ��������ȸ ���ǿ���(���ü���Ȯ�νý���)\n"
			+ "(Y) "+ ++num + ".�����ĺ����� ��������ȸ ���ǿ���(���ü���Ȯ�νý���)\n";
	}
	
	function extractionNumber(msg){ /* �����׸� "(Y) 1.*" ���� ���ڿ� max �ѹ� ���� */
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
				alert("�����ϼž߸� (����)�ŷ������� ���� �� ������ �����մϴ�.");
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
	if(text.indexOf("[�ʼ�]") > -1)
		text = text.substring(text.indexOf("[�ʼ�]")+4).trim();
	else if(text.indexOf("��") > -1)
		text = text.substring(text.indexOf("��")+1).trim();
	alert(text+" �ڼ������� ���� Ȯ�� �ٶ��ϴ�.");
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
		alert("�����ϼž߸� ID/��й�ȣã�Ⱑ �����մϴ�.");
		rdObj.checked = false;
	}
}