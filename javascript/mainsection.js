// 휠 컨트롤
var mainSection = $('#wrap,#section2,#section3,#section4,#footer');
var whellTimer;
var timer;
var lastScrollTop = 0;
var scrollDiection;
var currentMainSection = 0;
var mainSectionLength = mainSection.length;
var delta = 150;
var ismobile = false;
var inMotion = false

if (window.innerWidth < 1200) {
    ismobile = true;
}
$(window).resize(function () {
    if (window.innerWidth < 1200) {
        ismobile = true;
    } else {
        ismobile = false;
    }
});
var mainSectionMoveing = function (direction) {
    console.log("🚀 ~ file: mainsection.js:22 ~ mainSectionMoveing ~ mainSectionMoveing:", mainSectionMoveing)
    mainSection.each(function (index) {
        if ($(this).offset().top > $(window).scrollTop() && Utils.isElementInView($(this), 50)) {
            currentMainSection = index;
        }
    });
    if (direction == 'down' && currentMainSection < mainSection.length - 1) {
        currentMainSection++;
    } else if (direction == 'up' && currentMainSection > 0) {
        currentMainSection--;
    }
    if (currentMainSection < mainSection.length) {
        $('html, body')
            .stop()
            .animate(
                { scrollTop: mainSection.eq(currentMainSection).offset().top },
                {
                    duration: 650,
                    complete: function () {
                        // $(_sectionTarget).focus();
                        inMotion = false
                        console.log('?')
                    },
                }
            );
    } else {
        inMotion = false
    }
};
var resizeDone = function () {
    for (var index = 1; index <= mainSection.length; index++) {
        var element = mainSection[index - 1];
        target = element;
        if (scrollDiection == 'down') {
            isElementInView = Utils.isElementInView(target, 80);
            // console.log(Utils.isElementInView(target, 80),target)
        } else {
            // scoll up
            isElementInView = Utils.isElementInView(target, 20);
            // console.log(isElementInView,' 엘스 타입 ')
        }
        // 섹션이 변경됨.
        // if(index==14){index == 14;}else if(index==)
        if (isElementInView) {
            // console.log(index,' => 섹션')
            currentMainSection = index - 1;
            //window['s' + index].play();
        } else {
            // window['s'+(index)].reverse()
        }
    }
    sectionNavSetup()
};
function sectionNavSetup() {
    if (currentMainSection > 0) {
        // $('#section2 .section2-set .section2-set__list .item').addClass('animated');
        $('.section-nav').addClass('section-nav--color')
    } else {
        $('.section-nav').removeClass('section-nav--color')
    }
}
function scrollDiectionCheck(e) {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    // if(Math.abs(lastScrollTop - st) <= 5)
    // return;
    if (st >= lastScrollTop) {
        // downscroll code
        scrollDiection = 'down';
    } else {
        // upscroll code
        scrollDiection = 'up';
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    var delta = 150;
    clearTimeout(timer);
    timer = setTimeout(resizeDone, delta);
}
$('#wrap').on('wheel', function (event) {
    // 휠 제외 조건
    //if ($(event.target).hasClass('.gnb-sub-nav')) 		{return}
    //if ($(event.target).parents('.gnb-sub-nav').length)	{return}

    if ($(event.target).hasClass('total-menu')) return;
    if ($(event.target).parents('.total-menu').length) return;

    // if ($(event.target).parents('.total-nav').length) return;
    // if ($(event.target).hasClass('total-nav')) return;

    // if ($(event.target).parents('.fsite').length) return;
    // if ($(event.target).parents('.listy').length) return;
    // if ($(event.target).parents('.gnb-sub-nav').length) return;

    // if ($(event.target).parents('.section1-ad__all__list').length) return;
    // if ($(event.target).hasClass('section1-ad__all__list')) return;

    // if ($(event.target).hasClass('gnb-sub-nav')) return;
    if (!ismobile && $(window).height() > 900) {
        event.preventDefault();

        if (inMotion === false) {
            clearTimeout(whellTimer);
            inMotion = true
            console.log("🚀 ~ file: mainsection.js:124 ~ inMotion:", inMotion)
            whellTimer = setTimeout(function () {
                mainSectionMoveing(event.originalEvent.deltaY > 0 ? 'down' : 'up');
            }, 150);
        }
    } else {
    }
});



$(function () {
    // 섹션 네비게이션 휠처리
    var prevHtmlClassName = null;
    $(window).on('scroll', function (event) {
        scrollDiectionCheck(event);
        var sectionNavItemIndex;
        mainSection.each(function (index, element) {
            if (Utils.isElementInView($(this), 50)) {
                sectionNavItemIndex = index;
            }
        });
        $('.section-nav a').removeClass('active').removeAttr('title').eq(sectionNavItemIndex).addClass('active').attr('title', '선택 됨');
        cname = 'section_' + sectionNavItemIndex;
        if ($('html').hasClass(cname) == false) {
            if (prevHtmlClassName != null) {
                $('html').removeClass(prevHtmlClassName);
            }
            $('html').addClass(cname);
            prevHtmlClassName = 'section_' + sectionNavItemIndex;
        }
        if (Utils.isElementInView('#footer', 99)) {
            $('body').addClass('custom-nav--stiky');
        } else {
            $('body').removeClass('custom-nav--stiky');
        }
        // console.log(currentMainSection)

    });
    // 섹션 메뉴 이동
    var _sectionTarget
    $('.section-nav a').each(function (index) {
        $(this).on('click', function (event) {
            event.preventDefault();
            _sectionTarget = $(this).attr('href')
            inMotion = true
            $('html, body')
                .stop()
                .animate(
                    { scrollTop: mainSection.eq(index).offset().top },
                    {
                        duration: 650,
                        complete: function () {
                            $(_sectionTarget).focus();
                            inMotion = false
                        },
                    }
                );
        });
    });
    // 페이지 새로고침 처리
    setTimeout(function () {
        // mainSection.each(function (index, element) {
        //     if ($(this).offset().top >= $(window).scrollTop() && Utils.isElementInView($(this), 50)) {
        //         currentMainSection = index;
        //     }
        // });
        if (currentMainSection == 1) {
            // 특정 섹션이 보일때 처리
            // $('#section2 .section2-set .section2-set__list .item').addClass('animated');
        }
    }, 1000);
});

$(function () {
    // 페이지 새로고침 처리
    setTimeout(function () {
        mainSection.each(function (index, element) {
            if ($(this).offset().top >= $(window).scrollTop() && Utils.isElementInView($(this), 50)) {
                currentMainSection = index;
            }
        });
        sectionNavSetup()
    }, 1000);
});

// stiky 키보드 접근성
$('.section2 button:first').on('focus', function () {
    $('html, body')
        .stop()
        .animate({ scrollTop: mainSection.eq(1).offset().top }, 650);
});
$('.section3 a:first').on('focus', function () {
    $('html, body')
        .stop()
        .animate({ scrollTop: mainSection.eq(2).offset().top }, 650);
});
$('.section4 a:first').on('focus', function () {
    $('html, body')
        .stop()
        .animate({ scrollTop: mainSection.eq(3).offset().top }, 650);
});

