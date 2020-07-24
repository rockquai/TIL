##### TIL - JavaScript

## Parallax Animation

### `뷰포트 스크롤 이벤트 핸들러` 
- `handleViewportParallax` 함수를 화살표 함수로 만들어서 할 경우 `Uncaught ReferenceError: Cannot access 'handleViewportParallax' before initialization` 발생!

```js
function handleViewportParallax(e){
	// 뷰포트 스크롤 Y축 위치 추출
	const { pageYOffset: scrollY } = viewport;

	// 스크롤러 애니메이션 호출
	scrollerAnimation(scrollY);
}
```
```js
const handleViewportParallax = e => {
	// 뷰포트 스크롤 Y축 위치 추출
	const { pageYOffset: scrollY } = viewport;

	// 스크롤러 애니메이션 호출
	scrollerAnimation(scrollY);
}
```

### DOM 수집 & `data-*` 속성 추출
- `Array.from()` IE에서 지원이 되지 않아 `makeArray` 헬퍼 함수 사용
- IE 호환 `getAttribute` 사용

```js
// .scroller 요소(들) 수집 참조
const scrollers = Array.from(document.querySelectorAll('.scroller'));
// .fadeIn 요소(들) 수집 참조
const fadeIns = Array.from(document.querySelectorAll('.fadeIn'));
// .fadeOut 요소(들) 수집 참조
const fadeOuts = Array.from(document.querySelectorAll('.fadeOut'));
```
```js
function makeArray(likeArray) { return [].slice.call(likeArray); }

// .scroller 요소(들) 수집 참조		
var scrollers = makeArray(document.querySelectorAll('.scroller'));
// .fadeIn 요소(들) 수집 참조	
var fadeIns = makeArray(document.querySelectorAll('.fadeIn'));
// .fadeOut 요소(들) 수집 참조	
var fadeOuts = makeArray(document.querySelectorAll('.fadeOut'));
```

```js
// ES6
const scrollerAnimation = scrollY => {
	scrollers.forEach((scroller) => {		
		let { rateX, rateY } = scroller.dataset;
	}
}
```
```js
// ES5
function scrollerAnimation(scrollY) {
	//...
	scrollers.forEach(function(scroller) {
		var rateX = scroller.getAttribute('data-rate-x');
		var rateY = scroller.getAttribute('data-rate-y');
	}
	//...
}
```
### style
- ES6 : 백틱 기호(`, backtick 또는 backquote), 보간법(${}, string interpolation)

```js
// ES5
scroller.style.cssText = "transition: transform 0.6s ease;transform: translate(" + rateX + "px, " + rateY + "px);";
```
```js
// ES6
scroller.style.cssText = `
	transition: transform 0.6s ease;
	transform: translate(${rateX}px, ${rateY}px);
`
```