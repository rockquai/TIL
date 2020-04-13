import React from 'react';

export const memberContext = {
	memberList: [],
	removeMember: () => {},
};

export default React.createContext(memberContext); 