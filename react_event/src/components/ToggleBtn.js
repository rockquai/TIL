// 방법1.
// import React, { Component } from 'react';

// class ToggleBtn extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { isToggleOn: true };

//         // 콜백에서 `this`가 작동하려면 이벤트 바인딩
//         this.handleClick = this.handleClick.bind(this);
//     }

//     handleClick() {
//         this.setState(state => ({
//             isToggleOn: !state.isToggleOn
//         }));
//     }

//     render() {
//         return (
//             <button onClick={this.handleClick}>
//                 {this.state.isToggleOn ? 'ON' : 'OFF'}
//             </button>
//         );
//     }
// }

// export default ToggleBtn;

// ========================================================
// 빙법2.
// import React, { Component } from 'react';

// class ToggleBtn extends Component {
//     state = { 
// 		isToggleOn: true 
// 	};

//     handleClick() {
//         this.setState(state => ({
//             isToggleOn: !state.isToggleOn
//         }));
//     }

//     render() {
//         return (
//             <button onClick={() => this.handleClick()}>
//                 {this.state.isToggleOn ? 'ON' : 'OFF'}
//             </button>
//         );
//     }
// }

// export default ToggleBtn;

// ========================================================
// 빙법3
import React, { Component } from 'react';

class ToggleBtn extends Component {
    state = { 
		isToggleOn: true 
	};

    handleClick = () => {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

export default ToggleBtn;

