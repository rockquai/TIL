;(function DEMO(viewport) {
	'use strict';
  
	// 뷰포트 스크롤 이벤트 핸들러 설정
	viewport.addEventListener('scroll', handleViewportParallax);	
	function makeArray(likeArray) { return [].slice.call(likeArray); }
	
	/**
	 * 뷰포트 스크롤 이벤트 핸들러
	 * @param {EventObject} e 이벤트 객체
	 */
	function handleViewportParallax(e) {
	  // 뷰포트 스크롤 Y축 위치 추출	  
	  var scrollY = viewport.pageYOffset;
  
	  // 스크롤러 애니메이션 호출
	  scrollerAnimation(scrollY)
	}

	// .scroller 요소(들) 수집 참조		
	var scrollers = makeArray(document.querySelectorAll('.scroller'));
	
	// .fadeIn 요소(들) 수집 참조	
	var fadeIns = makeArray(document.querySelectorAll('.fadeIn'));
	
	// .fadeOut 요소(들) 수집 참조	
	var fadeOuts = makeArray(document.querySelectorAll('.fadeOut'));
  
	/**
	 * 스크롤러 애니메이션 함수
	 * @param {Number} scrollY 뷰포트 스크롤 Y축 위치
	 */
	function scrollerAnimation(scrollY) {
		// .scroller 요소(들) 순환 처리
		scrollers.forEach(function(scroller) {			
			// IE 호환 : getAttribute
			var rateX = scroller.getAttribute('data-rate-x');
			var rateY = scroller.getAttribute('data-rate-y');			

			// rateX, rateY 값 검사
			if (!rateX) { rateX = 0 }
			if (!rateY) { rateY = 0 }

			// scrollY 값을 곱해서 rateX, rateY 업데이트
			rateX *= scrollY
			rateY *= scrollY

			// .bubble-ball 별도 컨트롤
			if (scroller.classList.contains('bubble-ball')) {
				scroller.style.cssText = 'transition:transform 0.6s ease-out;transform: translate(-50%, ' + (scrollY === 0 ? '-50%' : rateY + 'px') + ');';
				return;
			}

			// .spaceman 별도 컨트롤
			if (scroller.classList.contains('spaceman')) {
				scroller.style.cssText = scroller.style.cssText = 'transition: transform 3s ease-out;transform: translateX(' + (scrollY === 0 ? '-50%' : rateX + 'px') + ') translateY(' + (scrollY === 0 ? '-50%' : rateY + 'px') + ');';
				return;
			}

			// 스타일 업데이트
			scroller.style.cssText = "transition: transform 0.6s ease;transform: translate(" + rateX + "px, " + rateY + "px);";
		})
	
		// .fadeIn 요소(들) 순환 처리
		fadeIns.forEach(function(fadeIn){
			var top = fadeIn.getBoundingClientRect().top;
			var height = fadeIn.getBoundingClientRect().height;

			fadeIn.style.opacity = scrollY / (top + height / 2);
		});
		
		// .fadeOut 요소(들) 순환 처리
		fadeOuts.forEach(function(fadeOut) {
			var top = fadeOut.getBoundingClientRect().top;
			var height = fadeOut.getBoundingClientRect().height;

			fadeOut.style.opacity = -scrollY / (top + height / 2) + 1;
		})	  
	}
})(window)