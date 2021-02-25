# 재미있는 기사
* `@supports`를 활용한 종횡비 https://css-tricks.com/aspect-ratio-boxes/
```html
<div style="--aspect-ratio:815/419;">
</div>

<div style="--aspect-ratio:16/9;">
</div>

<!-- even single value -->
<div style="--aspect-ratio:1.4;">
</div>
```
```scss
[style*="--aspect-ratio"] > :first-child {
  width: 100%;
}
[style*="--aspect-ratio"] > img {  
  height: auto;
} 
@supports (--custom:property) {
  [style*="--aspect-ratio"] {
    position: relative;
  }
  [style*="--aspect-ratio"]::before {
    content: "";
    display: block;
    padding-bottom: calc(100% / (var(--aspect-ratio)));
  }  
  [style*="--aspect-ratio"] > :first-child {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }  
}
```
* [automic css에 대한 고찰 CSS-in-JS](https://css-tricks.com/on-auto-generated-atomic-css)
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
