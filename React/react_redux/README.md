###### React Redux 

## Redux의 3원칙
- 애플리케이션 상태는 모두 한 곳에서 집중 관리. (동기화 필요 ✘) =>  `store` 관리
- 상태는 `불변(읽기 전용) 데이터`이며, 오직 액션(action) 만이 상태 교체를 요청. (예측 가능)
- 리듀서(함수)를 통해 상태의 최종 값만 설정. (단순화)

## Redux 아키텍처
- 스토어(store)
- 상태(state)
- 액션(action)
- 리듀서(reducer)
- 서브스크립션(subscription)
- 뷰(컴포넌트)

---
### 스토어(store)
- 애플리케이션에 연결 되어 상태를 관리하여 중앙 지휘 하는 역할
- 애플리케이션의 상태를 나타내는 많은 key:value 쌍으로 구성된 정보를 가진 하나의 큰 JavaScript 객체
- 스토어는 하나만 존재
- `Redux.createStore()` 메서드를 사용하여 스토어 생성하여 store methods를 사용 가능
	- `.getState()` 상태를 가져 옴
	- `.dispach()` 액션 호출
	- `.subscribe()` 상태의 변경을 컴포넌트에 감지. 구독
	- `.replaceReducer()` 리듀서 교체

```js
import { createStore } from 'redux';

const reducer = (state, action) => {
	// ...
}

// Redux 스토어 생성
const store = createStore(reducer);
console.log(store); // store 객체 : dispatch, subscribe, getState, replaceReducer, Symbol(observable)
```
---
### 상태(state)
- Redux 스토어에서 관리하는 상태 데이터
- 일반적으로 state 또는 initState 이름으로 설정
- 상태는 리듀서(함수)의 첫번째 인자로 전달 됨
- 상태 트리(state tree)는 `불변 상태(Immutable State) 순수한 상태`
- `store.getState()` 메서드 사용하여 상태 정보값을 가져올 수 있다

```js
import { createStore } from 'redux';

const initNews = '공정하고 정의로운 뉴스';

const reducer = (state, action) => {
	//...
	return state;
};

const store = createStore(reducer(initNews)); // Expected the reducer to be a function.
const store = createStore(() => reducer(initNews));
console.log(store.getState());
```
---
### 액션(action)
- 상태 변경을 설명하는 정보
— type, payload 속성을 가진 객체

```js
const initNews = '공정하고 정의로운 뉴스';

// actionType.js - 상수값으로 처리
const CHANGE_NEWS_TITLE = 'change_news_title';

// action.js 
const changeNewsTitleAction = {
	type: CHANGE_NEWS_TITLE,
	payload : '행복한 뉴스'
}

const reducer = (state = initNews, action) => {
	// console.log(action);
	switch (action.type) {
		case 'CHANGE_NEWS_TITLE':
			state = action.payload
			break;	
		default:
			break;
	}	
	return state;
};

const store = createStore(reducer);
console.log(store.getState()); // 공정하고 정의로운 뉴스

window.setTimeout(() => {
	store.dispatch(changeNewsTitleAction);
	console.log(store.getState()); // 행복한 뉴스 => 상태값이 변경
}, 3000);
```
---
### 리듀서(reducer)
- 애플리케이션 상태를 교체하는 함수
- `액션 타입 분석 -> 이전상태(prevState)를 새로운 상태(state)로 교체 -> 다음 상태 변환`
- `순수한 함수` 반환값이 전달 인자값에만 의존하는 함수 (예측 가능)
	- 순수함을 잃어버리면 사이트 이펙트 발생
	- 전달 받은 매개변수 state, action의 변형을 주면 안된다
	- API호출, 비동기 호출, 라우팅을 변경하면 안된다
	- 반드시 반환값은 `새로운 상태(state)`

---
### Redux 스토어 모듈 관리

#### 액션 타입
```js
// store > actions > actionTypes.js
export const CHANGE_NEWS_TITLE = 'CHANGE_NEWS_TITLE';
```

### 액션 타입과 페이로드 값
```js
// store > actions > index.js
import { CHANGE_NEWS_TITLE } from './actionTypes';

export const changeNewsTitleAction = {
	type: CHANGE_NEWS_TITLE,
	payload : '행복한 뉴스'
};
```

### 리듀서
```js
// store > reducers > index.js
import { CHANGE_NEWS_TITLE } from '../actions/actionTypes';

const initNews = '공정하고 정의로운 뉴스';

// reducer
export const newsReducer = (state = initNews, action) => {
	// console.log(action);
	switch (action.type) {
		case CHANGE_NEWS_TITLE:
			state = action.payload
			break;	
		default:
			break;
	}	
	return state;
};
```

### 리듀서 생성
```js
// store > index.js
import { createStore }  from 'redux';
import { newsReducer } from './reducers'

export default createStore(newsReducer);
```

### 스토어 값 불러오기
```js
// index.js
import store from './store';

console.log(store.getState());
```
---
## 상태 업데이트 구독과 취소 — store.subscribe() 메서드
- 상태 변경을 구독(subscribe, 감지) 하여 상태가 업데이트 되면 등록된 리스너(listener)를 실행
- `.subscribe()` 메서드는 구독을 취소할 수 있는 `unscribe 함수를 반환`

```js
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
```
---
## To Do List 리듀서 함수

### 타입 선언
```js
// store > actions > actionTypes.js
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const RESET_TODO = 'RESET_TODO';
export const REPLACE_TODO = 'REPLACE_TODO';
```

### todosReducer
```js
// store > reducers > todosReducer.js
import { 
	ADD_TODO,
	REMOVE_TODO,
	RESET_TODO,
	REPLACE_TODO 
} from '../actions/actionTypes';

// 초기값
export const initState = [
	'Redux 라이브러리 설치',
	'Redux 아키텍처 이해'
];

// 리듀서
export const todosReducer = (state = initState, { type, todo }) => {
	switch (type) {
		case ADD_TODO :
			// 값 추가
			state = [...state, todo]
			break;
		case REMOVE_TODO :
			// 해당 일치하는 값을 제거
			// state = state.splice(index, 1); => 현재 state값을 변형하면 안된다.
			// state.filter()를 사용하여 새로운 state값을 반환
			state.filter(item => item !== todo);
			break;
		case RESET_TODO :
			state = initState;
			break;
		case REPLACE_TODO :
			state = state.map(item => {
				if(item === todo.item) {
					// todo = { item, replaceItem } 객체
					return todo.replaceItem
				}
			})
			break;
		default:
			console.warn('일치하는 액션 타입이 존재하지 않습니다')
			break;
	}
	return state	
}
```
---
## todosReducer 유닛 테스트
### ADD_TODO
```js
// todosReducer.js
export const todosReducer = (state = initState, { type, todo }) => {
	switch (type) {
		case ADD_TODO :
			// 값 추가
			state = [...state, todo]
			break;			
}
```
```js
// todosReducer.test.js 유닛 테스트
it('todoReducer함수의 ADD_TODO 액션은 올바르게 작동하는가?', () => {
	const addTodoTestValue = '액션과 액션 타입 활용'; // 추가 대상

	const addTodoTest = todosReducer(todos, { 
		type: ADD_TODO, 
		todo: addTodoTestValue 
	});
	expect(addTodoTest).toEqual([
		...todos, 
		addTodoTestValue
	]);
});
```
---
### REMOVE_TODO
```js
// todosReducer.js
export const todosReducer = (state = initState, { type, todo }) => {
	switch (type) {
		case REMOVE_TODO :
			state = state.filter((item) => item !== todo);
			break;			
}
```
```js
// todosReducer.test.js 유닛 테스트
it('todoReducer함수의 REMOVE_TODO 액션은 올바르게 작동하는가?', () => {
	const removeTodoTestValue = 'Redux 라이브러리 설치'; // 기존 대상 제거

	const removeTodoTest = todosReducer(todos, { 
		type: REMOVE_TODO, 
		todo: removeTodoTestValue 
	});
	expect(removeTodoTest).toEqual(
		todos.filter((todo) => todo !== removeTodoTestValue)
	);
});
```
---
### RESET_TODO
```js
// todosReducer.js
export const todosReducer = (state = initState, { type, todo }) => {
	switch (type) {
		case RESET_TODO :
			state = initState;
			break;
}
```
```js
// todosReducer.test.js 유닛 테스트
it('todoReducer함수의 RESET_TODO 액션은 올바르게 작동하는가?', () => {
	const resetTodoTest = todosReducer(todos, { 
		type: RESET_TODO
	});
	expect(resetTodoTest).toEqual(todos);
});
```
---
### REPLACE_TODO
```js
// todosReducer.js
export const todosReducer = (state = initState, { type, todo }) => {
	switch (type) {
		case REPLACE_TODO :
			state = state.map((item) => {
				if(item === todo.item) {					
					return todo.replaceItem;
				}
				return item;
			});
			break;			
}
```
```js
// todosReducer.test.js 유닛 테스트
it('todoReducer함수의 REPLACE_TODO 액션은 올바르게 작동하는가?', () => {
	const replaceTodoTestValue = { 
		item: 'Redux 아키텍처 이해', 
		replaceItem: 'Redux 아키텍처 설명'
	};

	const replaceTodoTest = todosReducer(todos, { 
		type: REPLACE_TODO,
		todo: replaceTodoTestValue
	});
	expect(replaceTodoTest).toEqual([
		'Redux 라이브러리 설치',
		'Redux 아키텍처 설명'
	]);
});
```
--- 
## Redux 작동 원리
- createStore(reduces) => store {}
- store 객체 반환 : `getState(데이터 반환 메서드), subscribe(구독 메서드), dispatch(알림, 업데이트 요청 메서드)`

```js
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
```
---
## React + Redux = Counter

### 액션, 초기값, 리듀서
```js
// store > counter.js
// 액션 타입 선언
const INCREASE_COUNT = 'INCREASE_COUNT';
const DECREASE_COUNT = 'DECREASE_COUNT';

// 액션 생성 함수
export const increment = () => ({ type: INCREASE_COUNT });
export const decrement = () => ({ type: DECREASE_COUNT });

// 초기값 
const initialState = {
    counter: 0,
};

// 리듀서
export default function counter(prevState = initialState, action) {
    switch (action.type) {		
        case INCREASE_COUNT :
            return {
                ...prevState,
                counter : prevState.counter + 1
            };
        case DECREASE_COUNT : 
            return {
                ...prevState,
                counter : prevState.counter - 1
            };
        default:
            return prevState;
    }
}
```

### 루트 리듀서
-  `combineReducers()` 사용해서 다수의 리듀서를 묶음

```js
// store > index.js
import { combineReducers } from 'redux';
import counter from './counter';

export default combineReducers({
    counter
});
```

### Container Components
- [HOC] Connect 컴포넌트
	- `mapStateToProps` - 컴포넌트에 스토어의 state를 매핑
	- `mapDispatchToProps` - 컴포넌트에 dispatch 매핑
	- `mergeProps` - 컴포넌트에 매핑 될 props를 결정 (기본 값: {...ownProps, ...stateProps, ...dispatchProps})
	- `options` - 설정 옵션

```js
// containers > ConterContainer.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';

class ConterContainer extends Component {
    onIncreasement = () => {
        this.props.onIncreasement();
    }
    onDecreasement = () => {
        this.props.onDecreasement();
    }

    render() {
        const { onIncreasement, onDecreasement } = this;
        const { counter } = this.props;

        return (
            <Counter
				counter={counter}
                onIncrement={onIncreasement} 
                onDecrement={onDecreasement} 
            />
        )
    }
}

// Redux 스토어 state를 컴포넌트 props로 매핑 
const mapStateToProps = state => ({
	counter: state.counter.counter
});

// 액션을 리듀스에 전달하는 dispatch를 컴포넌트 props로 매핑
const mapDispatchToProps = dispatch => ({
	onIncreasement: () => { dispatch({ type: 'INCREASE_COUNT' }) },
	onDecreasement: () => { dispatch({ type: 'DECREASE_COUNT' }) },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConterContainer);
```

### UI - Presentational Components
```js
const Counter = ({ counter, onIncrement, onDecrement }) => {
	return (
		<div className="counter-app">
			<output>{counter}</output>
			<button
				type="button"
				className="button-increment"
				onClick={onIncrement}>
				+
			</button>
			<button
				type="button"
				className="button-decrement"
				onClick={onDecrement}>
				-
			</button>
		</div>
	);
};
```
### Provider + Redux Devtools
- `Provider`는 포함된 모든 하위(자식, 자손) 컴포넌트에 Redux 스토어(store)를 제공하는 컴포넌트
	- 스토어에 접근해 상태 변경을 요청(dispatch)하거나, 구독(subscription)된 상태가 업데이트 되면 다시 렌더링
- `Redux Devtools` Redux를 디버깅

```js
// ... 생략
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
```