import React from 'react';
import MemberContext from '../../context/MemberContext';
import MemberItem from '../MemberItem';

const MemberList = () => {	
	return (
		<ul>
			<MemberContext.Consumer>
				{
					({ memberList : {items}, removeMember }) => 
						items.map( (item) => 
							<MemberItem key={item.id} item={item} removeMember={removeMember} /> )
				}
			</MemberContext.Consumer>
		</ul>
	);
}

export default MemberList;