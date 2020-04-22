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