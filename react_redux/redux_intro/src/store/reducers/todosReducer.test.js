import { 
	ADD_TODO,
	REMOVE_TODO,
	RESET_TODO,
	REPLACE_TODO 
} from '../actions/actionTypes';

import { initState as todos, todosReducer } from './todosReducer';

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

it('todoReducer함수의 RESET_TODO 액션은 올바르게 작동하는가?', () => {
	const resetTodoTest = todosReducer(todos, { 
		type: RESET_TODO
	});
	expect(resetTodoTest).toEqual(todos);
});

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