# UI-UX-TEAM
https://kangtaehee.github.io/UI-UX-TEAM/
가이드
# JavaScript - [번역]11가지 극도로 유용한 JavaScript 팁
https://chaewonkong.github.io/posts/11-useful-js-tips.html

https://blog.naver.com/yshan1008/222205391849


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
