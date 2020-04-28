import React, { Fragment } from 'react';
import auth from './auth';

const Admin = ({ history }) => {	
	function handleLogOut() {
		auth.logOut();
		history.push('/');
	}

	return (
		<Fragment>
			<h1>괸리자 페이지는 인증 된 사용자만 볼 수 있습니다!</h1>
			<button type="button" onClick={handleLogOut}>관리자 로그아웃</button>
		</Fragment>
	)
}

export default Admin;