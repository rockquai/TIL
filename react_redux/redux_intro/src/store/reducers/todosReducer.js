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
			state = state.filter((item) => item !== todo);
			break;
		case RESET_TODO :
			state = initState;
			break;
		case REPLACE_TODO :
			state = state.map((item) => {
				if(item === todo.item) {
					// todo = { item, replaceItem } 객체
					return todo.replaceItem;
				}
				return item;
			});
			break;
		default:
			console.warn('일치하는 액션 타입이 존재하지 않습니다')
			break;
	}
	return state	
}