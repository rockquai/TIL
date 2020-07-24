;((viewport) => {
	'use strict';

	// 뷰포트 스크롤 이벤트 핸들러 설정
	viewport.addEventListener('scroll', handleViewportParallax);

	/**
	 * 뷰포트 스크롤 이벤트 핸들러
	 * @param {EventObject} e 이벤트 객체
	 */
	function handleViewportParallax(e){
		// 뷰포트 스크롤 Y축 위치 추출
		const { pageYOffset: scrollY } = viewport;

		// 스크롤러 애니메이션 호출
		scrollerAnimation(scrollY);
	}

	// .scroller 요소(들) 수집 참조
	const scrollers = Array.from(document.querySelectorAll('.scroller'));
	
	// .fadeIn 요소(들) 수집 참조
	const fadeIns = Array.from(document.querySelectorAll('.fadeIn'));
	
	// .fadeOut 요소(들) 수집 참조
	const fadeOuts = Array.from(document.querySelectorAll('.fadeOut'));
  
	/**
	 * 스크롤러 애니메이션 함수
	 * @param {Number} scrollY 뷰포트 스크롤 Y축 위치
	 */
	const scrollerAnimation = scrollY => {
		// .scroller 요소(들) 순환 처리
		scrollers.forEach((scroller) => {
			// data-rate-x, data-rate-y 값 추출
			let { rateX, rateY } = scroller.dataset;
		
			// rateX, rateY 값 검사
			if (!rateX) { rateX = 0; }
			if (!rateY) { rateY = 0; }
		
			// scrollY 값을 곱해서 rateX, rateY 업데이트
			rateX *= scrollY;
			rateY *= scrollY;
		
			// .bubble-ball 별도 컨트롤
			if (scroller.classList.contains('bubble-ball')) {
				scroller.style.cssText = `
				transition: transform 0.6s ease-out;
				transform: translate(-50%, ${scrollY === 0 ? '-50%' : `${rateY}px` });
				`
				return;
			}
		
			// .spaceman 별도 컨트롤
			if (scroller.classList.contains('spaceman')) {
				scroller.style.cssText = `
				transition: transform 3s ease-out;
				transform: translateX(${scrollY === 0 ? '-50%' : `${rateX}px` }) translateY(${scrollY === 0 ? '-50%' : `${rateY}px` });
				`
				return;
			}
		
			// 스타일 업데이트 
			scroller.style.cssText = `
				transition: transform 0.6s ease;
				transform: translate(${rateX}px, ${rateY}px);
			`
		});
	
		// .fadeIn 요소(들) 순환 처리
		fadeIns.forEach((fadeIn) => {
			const {top, height} = fadeIn.getBoundingClientRect()
			fadeIn.style.opacity = scrollY / (top + height / 2);
		});
		
		// .fadeOut 요소(들) 순환 처리
		fadeOuts.forEach((fadeOut) => {
			const {top, height} = fadeOut.getBoundingClientRect()
			fadeOut.style.opacity = -scrollY / (top + height / 2) + 1;
		});		
	}
})(window);