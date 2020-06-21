import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Nav.scss';

const Nav = (props) => (
	<nav>
		<ul style={{ textAlign:'left' }}>
			<li>
				{/* aria-current={pageXOffset, step, location, date, time, true} */}
				<NavLink to="/" activeClassName="is-active" exact>홈</NavLink>
			</li>
			<li>
				<NavLink to="/about?sort=name" activeClassName="is-active">라우터 소개</NavLink>
			</li>
			<li>
				<NavLink to="/products" activeClassName="is-active">제품 안내</NavLink>
			</li>
			<li>
				<NavLink to="/admin" activeClassName="is-active">관리자</NavLink>
			</li>
		</ul>
	</nav>
);

export default Nav;