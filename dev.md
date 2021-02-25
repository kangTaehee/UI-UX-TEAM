# 폼 요소에 제공되는 중복된 아이디
* ID는 Global 속성으로서 문서내에서 단 한번만 제공 되어야 합니다.
* 아이디 중복은 콘솔로그에 에러나 경고를 제공 하지 않기때문에 유의하여 작성하여야 합니다.

## 폼의 아이디를 제공하는경우는
* label for 속성과 매칭
* 특정 이벤트 바인딩 ex) 사용자 입력도구를 통한 상호작용, 키보드 엔터, 마우스 오버 등
* 유효성검사
### 유의점
* `form`값을 전달하기 위해선 name값이면 충분
* 의미없이 `name`속성과 동일하게 `id`를 제공할 필요없음
* 브라우저는 첫번째 `id`속성만 인식함

# `<form>` `onsubmit` 속성 부제
* `onsubmit`을 제공함 으로서 form의 submit 발생시 해당 스크립트를 실행할 수 있습니다.
* 입력폼(`type=text')에서 엔터키를 활용 하여 `submit` event를 발생 시킬수 있습니다.
* 전송 버튼에 바인딩된 스크립트 대신 엔터키를 활용한 submit 전송시 해당 스크립트 호출이 가능합니다.
* 올바른 예
```javascript
function formAction(){
  if(false){
    alert('err');
    return false;
  }
}
```
```html
<form action='/urls/...' onsubmit='return formAction()'>
  <input type=text>
  <input type=submit value=submit>
</form>
```
## 활용
```javascript
function fnsubmit(_this){
  if(_this.type.value == 'edit'){
    _this.action=_this.editAction.value;
  }
}
```
```html
<form action='#abc' onsubmit="return fnsubmit(this)">
<input type=hidden name=type value=edit>
<input type=hidden name=editAction value='http://naver.com'>
<input type=text name=keyword>
</form>
```
* 하나의 폼에서 `<input type=hidden name=type value=edit>` 속성값에 따라 `form`의 `action` 대상을 지정 할 수 있다.
* 전송버튼을 제공 하지 않아도 기능을 수행할 수도 있다.(※ 권장하지 않는다. UI/UX 측면에서 올바르지 못하다(UI는 직관적이어야 한다). 예를들어 엔터기가 없는 환경에서는 서비스를 이용할 수 없다. 가상 입력도구를 활용하는 환경구성 키오스크 등)
