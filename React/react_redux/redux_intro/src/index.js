import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// ex1.
// const initNews = '공정하고 정의로운 뉴스';
// const reducer = (state, action) => {
// 	//...
// 	return state;
// };

// // const store = createStore(reducer(initNews)); // Expected the reducer to be a function. 함수로 반환해야 한다.
// const store = createStore(() => reducer(initNews));
// console.log('store: ', store); // store 객체 : dispatch, subscribe, getState, replaceReducer, Symbol(observable)
// console.log('store.getState(): ', store.getState());

// ex2.
// const initNews = '공정하고 정의로운 뉴스';

// // actionType.js
// const CHANGE_NEWS_TITLE = 'change_news_title';

// // action.js
// const changeNewsTitleAction = {
// 	type: CHANGE_NEWS_TITLE,
// 	payload : '행복한 뉴스'
// }

// const reducer = (state = initNews, action) => {
// 	// console.log(action);
// 	switch (action.type) {
// 		case 'CHANGE_NEWS_TITLE':
// 			state = action.payload
// 			break;	
// 		default:
// 			break;
// 	}	
// 	return state;
// };

// const store = createStore(reducer);
// console.log(store.getState()); // 공정하고 정의로운 뉴스

// window.setTimeout(() => {
// 	store.dispatch(changeNewsTitleAction);
// 	console.log(store.getState()); // 행복한 뉴스 => 상태값이 변경
// }, 3000);

// ex3. store 분리
// import store from './store';
// import { changeNewsTitleAction } from './store/actions'
// console.log(store.getState()); // 공정하고 정의로운 뉴스

// window.setTimeout(() => {
// 	store.dispatch(changeNewsTitleAction);
// 	console.log(store.getState()); // 행복한 뉴스 => 상태값이 변경
// }, 3000);

// ex4. 상태 업데이트 구독과 취소 - subscribe / unsubscribe
import store from './store';
import { changeNewsTitleAction } from './store/actions'

let count = 1;

function render() {
	console.log('store의 상태 업데이트', count);
	console.log('store의 상태: ', store.getState());
	if( count++ > 10) {
		console.log('구독 취소');
		unsubscribe();
	}
}

const unsubscribe = store.subscribe(render);

const rootEl = document.getElementById('root');

rootEl.addEventListener('click', () => {
	store.dispatch(changeNewsTitleAction)
});

ReactDOM.render(<App />, rootEl);