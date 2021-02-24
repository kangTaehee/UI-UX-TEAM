# UI-UX-TEAM
https://kangtaehee.github.io/UI-UX-TEAM/
가이드
# JavaScript - [번역]11가지 극도로 유용한 JavaScript 팁
https://chaewonkong.github.io/posts/11-useful-js-tips.html

https://blog.naver.com/yshan1008/222205391849

# css tip 
* https://webdevstudios.com/2019/12/03/10-sass-tips/ 
* 인수가 전달되지 않으면 불투명도를 위해 CSS에서 아무것도 컴파일되지 않지만 인수가 전달되면 CSS에서 컴파일됩니다. 
```scss
@mixin example($opacity: null) { 
  background-color: #333;
  color: white;
  opacity: $opacity; 
}
```
* 튜플을 여러개를 사용하는 리스트형 함수 사용 https://gist.github.com/jareware/4738651
```scss
$buttonConfig: 'save' 50px, 'cancel' 50px, 'help' 100px; // TODO: move to _settings.scss

@each $tuple in $buttonConfig {
    .button-#{nth($tuple, 1)} {
        width: nth($tuple, 2);
    }
}
```
* Variable arguments for functions/mixins `...` suffix
```scss
@mixin config-icon-colors($prefix, $colors...) {
    @each $i in $colors {
        .#{$prefix}#{nth($i, 1)} {
            color: nth($i, 2);
        }
    }
}
@include config-icon-colors('icon-',
    'save'   green,
    'cancel' gray,
    'delete' red
);
```
https://www.telerik.com/blogs/10-time-saving-css-tips-i-learned-the-hard-way-when-using-sass
```html
<a class=c-social-button>
 <span class=c-social-button--facebook>
   페이스북
 </span>
</a>
```
```scss
// 변수선언
$c: ".c-social-button";

#{$c} {
	border: none;
	border-radius: 4px;
	color: $white;
	user-select: none;
	cursor: pointer;
 
 // 자식 요소
 &--facebook {
		background: #3b5998;
	}

 //손자 이하 요소
 #{$c}__ico{
 ...
 }
}
```

# 사파리에서는 사용자 action에 의해서만 popup이 열린다
Could this be a popup blocker effect ?

Often, window.open calls are executed when they result of a direct action from a user.
For example:

The user click on a button which calls a function with the window.open => popup opens
The user click on a button which calls a function which calls another function with window.open => no popup
The page load and a window.open is called => no popup

Could this be something like that ?

모바일 웹 사이트 작업 중 page가 load되면 특정 조건에 따라 popup을 열려고 하는데 아이폰에서는 작동하지 않았다.
검색해봤더니 위와 같은 설명이..

사용자 클릭에 의해서 호출된 함수에서 window.open하면 열리지만, 사용자 클릭에 의해 호출된 함수에서 다른 함수를 호출해서 window.open을 한다거나 page load 시 window.open을 할 경우에는 사파리에서는 팝업 open 요청을 거부한단다.

IE나 파폭, 크롬에서는 작동한다.

User action이 있을 때 popup을 띄우는 것은 허용된다. ex) click 등
ajax 처리를 하는 경우에도 callback 함수 바깥에서 띄우면 된다.

## 안 되는 경우
```
// 클릭 이벤트 핸들러
function didClick() {
 $.ajax({
  url: "someurl.php",
  success: function() {
   window.open("popup.html"); // blocked
  }
 });
}
```
## 해결 방안
```
// 클릭 이벤트 핸들러
function didClick() {
 var result = false;
 $.ajax({
  url: "someurl.php",
  success: function() {
   result = true;
  }
 });
 
 if( result ) {
  window.open("popup.html"); // it will works
 }
}
```
