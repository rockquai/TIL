import React, { Fragment } from 'react';
import auth from './auth';

const Login = ({ history }) => {
	function handleLogin() {
		// 로그인(인증)		
		auth.logIn();
		history.push('./admin');
	}

	return (
		<Fragment>
			<h1>괸리자 페이지 로그인</h1>
			<button type="button" onClick={handleLogin}>관리자 로그인</button>
		</Fragment>
	);
}

export default Login;
