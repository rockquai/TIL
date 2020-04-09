import React, { Component } from 'react';
import MemberWrap from './components/MemberWrap';
import ToggleBtn from './components/ToggleBtn';

class App extends Component {
	state = {
		memberList : [
			{
				id: 0,
				name : '펭수',
				age: 11,
				job: 'EBS 유튜브 크리에이터 & 수퍼 스타',
				image: 'https://search4.kakaocdn.net/argon/0x200_85_hr/24J5WpS0iAh',
				link: 'https://www.daum.net/',
				width: '326',
				height: '178'
			},
			{
				id: 1,
				name : '김명중',
				age: 63,
				job: 'EBS 사장',
				image: 'https://search2.kakaocdn.net/argon/0x200_85_hr/2ll5tR6FuP3',
				link: 'https://www.daum.net/',
				width: '326',
				height: '178'
			},
			{
				id: 2,
				name : '물범',
				age: 11,
				job: '펭수 친구',
				image: 'https://search2.kakaocdn.net/argon/0x200_85_hr/cqsU8V0rS9',
				link: 'https://www.daum.net/',
				width: '328',
				height: '186'
			},
			{
				id: 3,
				name : '뽀로로',
				age: '모름',
				job: '펭수 라이벌',
				image: 'https://search1.kakaocdn.net/argon/0x200_85_hr/3LfNWwz9ih2',
				link: 'https://www.daum.net/',
				width: '328',
				height: '200'
			}
		]
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
			<div className="area_member">
				<MemberWrap 
					members={memberList}
					handleRemoveMember={removeMember}
				/>

				<hr />
				<strong>bind(this) 참조</strong>
				<ToggleBtn />			
			</div>
		)
	}
}

export default App;