import React, { Component, Fragment } from 'react';
import AppMain from './components/AppMain';
import MemberContext from './context/MemberContext';
import { memberList } from './api/memberDB.json';

class App extends Component {
	state = {
		memberList
	};

	removeMember = (removeId) => {
		const filterMember = this.state.memberList.filter(
			member => member.id !== removeId			
		);
		
		this.setState({
			memberList: filterMember
		});
	};

	render() {				
		const { memberList } = this.state;
		const { removeMember } = this;

		return (
			<Fragment>
				<MemberContext.Provider
					value={{
						memberList: memberList,
						removeMember: removeMember
					}}
				>
					<AppMain />
				</MemberContext.Provider>				
			</Fragment>
		)
	}
}

export default App;