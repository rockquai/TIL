import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose } from 'redux';
import rootReducer from './store';
import { Provider } from 'react-redux';
import App from './App';

// 인헨서(Enhancers)를 활용해 Redux DevTools를 설정
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);