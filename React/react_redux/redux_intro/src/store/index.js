// ex1.
// import { createStore }  from 'redux';
// import { newsReducer } from './reducers'

// export default createStore(newsReducer);

// ex2. redux 동작 원리 - createStore 함수 만들기
// createStore
// ㄴ createStore(reduces) => store {}
// ㄴ store { getState, subscribe, dispatch }

import { newsReducer } from './reducers';

const createStore = (reducer) => {
	let state; // 외부에서 접근 불가능한 데이터 
	let listeners = []; // 등록된(구독된) 리스너(함수) 보관하는 리스트(배열)

	// getState: 데이터 반환 메서드
	const getState = () => state; //데이터 반환

	// subscribe: 구독(업데이트 실행 함수 연결) 메서드
	const subscribe = (listener) => {
		listeners.push(listener); // 구독 메서드
		return (removeListener) => {
			// 구독 취소(업데이트 연결 함수 제거) 함수 반환
			listeners = listeners.filter((listener) => listener !== removeListener);
		}
	}

	// dispatch: 알림, 업데이트 요청 메서드
	// action : type, payload
	const dispatch = (action) => {
		// 역할1. state 업데이트
		state = reducer(state, action);

		// 역할2. listeners의 모든 listener를 실행
		listeners.forEach((listener) => listener());
	}	

	// store 객체 반환
	return {
		getState, 
		subscribe, 
		dispatch
	}
}

export default createStore(newsReducer);