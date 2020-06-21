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