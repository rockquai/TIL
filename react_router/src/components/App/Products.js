// import React, { Fragment } from 'react';
// import { Link, Route } from 'react-router-dom';
// import ProductDetail from './ProductDetail';

// const Products = (props) => {	
// 	return (
// 		<Fragment>
// 			<h2>제품 리스트</h2>
// 			<ul>
// 				<li>
// 					<Link to="/products/notobook/2020?icon='iconimg'&color=1249bf">노트북</Link>
// 				</li>
// 				<li>
// 					<Link to="/products/phone/2020?icon='iconimg'&color=ff008c">스마트폰</Link>
// 				</li>
// 				<li>
// 					<Link to="/products/keyboard/2020?icon='iconimg'&color=00aef7">키보드</Link>
// 				</li>
// 			</ul>

// 			<div className="nestedConent">
// 				<h3>중첩된 라우터</h3>
// 				<p>제품을 선택해 주세요</p>
// 				<Route path="/products/:productName/:year?" component={ProductDetail} />
// 			</div>
// 		</Fragment>
// 	);
// };

// export default Products;

// ------------------------------------------------------------------------------------
// props.match.url값으로 동적 처리
import React, { Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import ProductDetail from './ProductDetail';

const Products = ({ match }) => {	
	const { url } = match;

	return (
		<Fragment>
			<h2>제품 안내</h2>
			<ul>
				<li>
					<Link to={`${url}/notobook/2020?icon='iconimg'&color=1249bf`}>노트북</Link>
				</li>
				<li>
					<Link to={`${url}/phone/2020?icon='iconimg'&color=ff008c`}>스마트폰</Link>
				</li>
				<li>
					<Link to={`${url}/keyboard/2020?icon='iconimg'&color=00aef7`}>키보드</Link>
				</li>
			</ul>

			<div className="nestedConent">
				<h3>중첩된 라우터</h3>
				<p>제품을 선택해 주세요</p>
				<Route path={`${url}/:productName/:year?`} component={ProductDetail} />
			</div>
		</Fragment>
	);
};

export default Products;