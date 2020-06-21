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