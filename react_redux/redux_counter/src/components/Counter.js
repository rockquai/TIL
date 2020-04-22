import React from 'react';
import './Counter.css';

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

export default Counter;

