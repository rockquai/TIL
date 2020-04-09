import React, { Component } from 'react';
import MemberItem from './MemberItem';

class MemberWrap extends Component {
	render() {
		const { members, handleRemoveMember } = this.props;
		return (			
			<ul>
				{
					members.map((item) => (
						<MemberItem 
							key={item.id}
							id={item.id}
							name={item.name}
							age={item.age}
							job={item.job}
							image={item.image}
							link={item.link}
							width={item.width}
							height={item.height}
							handleRemoveMember={handleRemoveMember}
						/>
					))
				}
			</ul>
		);
	}
}

export default MemberWrap;
