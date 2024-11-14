/**
 * 제작 : unpl 강태희
 * 제작일 : 2020-9-9
 * 문의 : ilovekth@nate.com
 * ver : 1.0
 */
function Utils() { }
Utils.prototype = {
    constructor: Utils,
    isElementInView: function (element, fullyInView) {
        if (!this.nodeSelect(element)) {
            return false
        }
        element = this.nodeSelect(element)
        var pageTop = window.scrollY || window.pageYOffset;
        var pageBottom = pageTop + window.innerHeight;
        // console.log(pageTop)
        var elementTop = element.offset().top;
        var elementBottom = elementTop + element.height();
        // console.log(fullyInView)
        // if(fullyInView == 'change'){
        // 	// return pageTop < elementTop && pageBottom > elementBottom;
        // 	// 페이지바텀이 화면의 10%보다 작고
        // 	// pageBottom - ($(window).height() * 10) / 100;
        // 	return elementTop <= pageTop + ($(window).height() * 10 / 100);
        // }
        if (fullyInView === true) {
            // console(pageTop < elementTop && pageBottom > elementBottom)
            // 가시화면 내에 대상이 있을때
            return pageTop < elementTop && pageBottom > elementBottom;
        } else if (typeof fullyInView == 'string' || typeof fullyInView == 'number') {
            // console.log(typeof fullyInView, fullyInView);
            // 화면으 중간 이상
            // console.log('harf')
            if (fullyInView == 'href') {
                return elementTop <= pageTop + window.innerHeight / 2;
            } else if (fullyInView >= 0) {
                // console.log(elementTop, pageTop + (window.innerHeight * fullyInView / 100));
                return elementTop <= pageTop + (window.innerHeight * fullyInView / 100);
            }
        } else {
            // 요소의 탑이 페이지 하단보다 작고
            // 요소의 바텀이 페이지 탑보다 크면
            // 즉 화면에 안보이는지 체크
            // Utils.isElementInView(target, false);
            return elementTop <= pageBottom && elementBottom >= pageTop;
        }
    },
    isElementHide: function (element, fullyInView, revise) {
        if ($(element).length == 0) return;
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();

        // 대상의 top이 화면에서 위로 사라질때
        if (fullyInView == 'tophide' && false == pageTop < elementTop) {
            return true;
        }
        if (fullyInView == 'bottomhide' && false == elementBottom + revise >= pageTop) {
            // elementBottom + revise >= pageTop;
            // console.log(elementBottom, pageTop);
            return true;
        }
        if (fullyInView === true) {
            // console(pageTop < elementTop && pageBottom > elementBottom)
            // 가시화면 내에 대상이 있을때
            return pageTop < elementTop && pageBottom > elementBottom;
        } else if (typeof fullyInView == 'string' || typeof fullyInView == 'number') {
            // console.log(typeof fullyInView, fullyInView);
            // 화면으 중간 이상
            // console.log('harf')
            if (fullyInView > 0) {
                // console.log(elementTop, pageTop + ($(window).height() * fullyInView / 100));
                return elementTop <= pageTop + ($(window).height() * fullyInView) / 100;
            }
        } else {
            // 요소의 탑이 페이지 하단보다 작고
            // 요소의 바텀이 페이지 탑보다 크면
            // 즉 화면에 안보이는지 체크
            // Utils.isElementInView(target, false);
            return elementTop <= pageBottom && elementBottom >= pageTop;
        }
    },
    nodeSelect: function (element) {
        if (element === undefined) return false;
        return typeof element == 'object' && element.length ? element : $(element).length ? $(element) : false;
        // ? $(element).length : 
        // if(){
        // 	return element;
        // }else{
        // 	return $(element)
        // }
    },
    /*
    element : node 요소 cssSeclector or jquery object
    fullyInView : 화면 비율 number
    */
    scrollshow: function (element) {
        var el = this.nodeSelect(element)
        if (this.isElementInView(el, 100)) {
            el.addClass('visible')
        }
    },
    /*
    * Function Name : popupW
    * Description   : 팝업창 띄운다
    * Parameters    : u - 주소, n - 이름, w - 넓이, h - 높이, s - 스크롤여부(yes, no), r - 창크기조절여부(yes, no), m - (1:일반, 2:위쪽모서리, 3:정중앙)
    */
    popupW: function (u, n, w, h, s, r, m) {
        var o;
        var lP = screen.availWidth;
        var tP = screen.availHeight;
        var p = "";
        if (s == undefined) s = "no";
        if (m == undefined) m = 1;
        if (m == 2) //- 위쪽모서리
            p = ",left=0,top=0";
        else if (m == 3) //- 정중앙
            p = ",left=" + ((lP - w) / 2) + ",top=" + ((tP - h) / 2);
        o = window.open(u, n, "status=yes,toolbar=no,location=no,scrollbars=" + s + ",resizable=" + r + ",width=" + w + ",height=" + h + p);
        o.focus();
    },
    rowspan: function (target, colIdx, sumTxt, isStats) {
        var $this = $(target);
        return $this.each(function () {
            var that;
            $('tr', this).each(function (row) {
                $(':eq(' + colIdx + ')', this).filter(':visible').each(function (col) {
                    if ($(this).html() == $(that).html() && ($(this).html() == sumTxt || !sumTxt)) { // 값이 '소계' 이면 rowspan 함.
                        rowspan = $(that).attr("rowspan") || 1;
                        rowspan = Number(rowspan) + 1;
                        $(that).attr("rowspan", rowspan);
                        // $(this).hide();
                        $(this).remove();
                        // do your action for the old cell here
                    } else {
                        that = this;
                    }
                    // set the that if not already set
                    that = (that == null) ? this : that;
                })
            })
        })
    },
    colspan: function (target, rowIdx, sumTxt) {
        return $(target).each(function () {
            var that;
            $('tr', this).filter(":eq(" + rowIdx + ")").each(function (row) {
                $(this).find('td').filter(':visible').each(function (col) {
                    if ($(this).html() == $(that).html() && $(that).html() == sumTxt) {
                        colspan = $(that).attr("colSpan") || 1;
                        colspan = Number(colspan) + 1;
                        $(that).attr("colSpan", colspan);
                        $(this).hide(); // .remove();
                    } else {
                        that = this;
                    }
                    // set the that if not already set
                    that = (that == null) ? this : that;
                })
            })
        })
    },
    quickmenu: function (target, top) {
        var quick_menu = this.nodeSelect(target)
        var quick_top = top != undefined ? top : 70;
        quick_menu.css({
            'top': $(window).height,
            'position': 'absolute'
        })
        quick_menu.animate({ "top": $(document).scrollTop() + quick_top + "px" }, 500);
        $(window).scroll(function () {
            quick_menu.stop();
            quick_menu.animate({ "top": $(document).scrollTop() + quick_top + "px" }, 1000);
        });
    },
    floatvertical: function (target, align) {
        // var items = $('.depth2');
        var items;
        align = align == undefined ? 'left' : 'right';
        if (typeof target == 'string') {
            items = $(target);
        } else {
            items = target;
        }
        items.each(function (index, element) {
            _this = $(this);
            var item;
            item = _this.find('.item');
            var sl = item.innerWidth();
            var h = 0;
            var x = 0;
            var y = 0;
            for (var index = 0; index < item.length; index++) {
                item.eq(index).innerHeight();
                h += item.eq(index).innerHeight();
                if (h <= _this.innerHeight()) {
                    y = h - item.eq(index).innerHeight();
                } else {
                    h = item.eq(index).innerHeight();
                    x += 1;
                    y = 0;
                }
                item.eq(index).css('position', 'absolute')
                if (align == 'left') {
                    item.eq(index).css({
                        top: y,
                        left: sl * x
                    })
                } else {
                    item.eq(index).css({
                        top: y,
                        right: sl * x
                    })
                }
            }
        })
    }
}
var Utils = new Utils();