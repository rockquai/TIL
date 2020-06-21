// import React from 'react';
// import MemberContext from '../../context/MemberContext';
// import MemberItem from '../MemberItem';

// const MemberList = () => {	
// 	return (
// 		<ul>
// 			<MemberContext.Consumer>
// 				{
// 					({ memberList : {items}, removeMember }) => 
// 						items.map( (item) => 
// 							<MemberItem key={item.id} item={item} removeMember={removeMember} /> )
// 				}
// 			</MemberContext.Consumer>
// 		</ul>
// 	);
// }

// export default MemberList;

// ----------------------------------------------------------------------------------------
// [static contextType 사용]
import React, { Component } from 'react';
import MemberContext from '../../context/MemberContext';
import MemberItem from '../MemberItem';

class MemberList extends Component {
	static contextType = MemberContext;	

    render() {
		const { memberList : {items}, removeMember } = this.context;

        return (
            <ul>
				{
					items.map( (item) => 
						<MemberItem key={item.id} item={item} removeMember={removeMember} /> )
				}
            </ul>
        );
    }
}

export default MemberList;