// import React, { Fragment } from 'react';
// import queryString from 'query-string';

// const ProductDetail = ({ history, location, match }) => {
// 	const goProducts = () => {
// 		// console.log(props.history); push, replace, go, goBack,goForward... 
// 		history.push('/products');
// 	}

// 	const detailInfo = {
// 		notobook: '노트북 제품 설명....',
// 		phone: '폰 제품 설명...',
// 		keyboard: '키보드 제품 설명...'
// 	};

// 	// 첫번째 글자 대문자 변환
// 	const covertFirstLetterUppercase = (name) => {
// 		return name[0].toUpperCase() + name.slice(1);
// 	}

// 	// console.log(queryString.parse(location.search));
// 	const { icon, color } = queryString.parse(location.search);
// 	const { productName, year } = match.params;

// 	return (
// 		<Fragment>
// 			<h3 style={{color: `#${color}`}}>{covertFirstLetterUppercase(productName)}{year}</h3>
// 			<p>{detailInfo[productName]}</p>
// 			{/* 방법1. Link로 넣는 방식 */}
// 			{/* <Link to={{ pathname: '/products'}}>제품 안내 페이지로 이동</Link> */}

// 			{/* 방법2. props.history.push 사용 */}
// 			<button type="button" onClick={goProducts}>제품 안내 페이지로 이동</button>
// 		</Fragment>
// 	);
// };

// export default ProductDetail;

// ------------------------------------------------------------------------
import React, { Fragment } from 'react';
import queryString from 'query-string';

const ProductDetail = ({ history, location, match }) => {
	const detailInfo = {
		notobook: '노트북 제품 설명....',
		phone: '폰 제품 설명...',
		keyboard: '키보드 제품 설명...'
	};

	// 첫번째 글자 대문자 변환
	const covertFirstLetterUppercase = (name) => {
		return name[0].toUpperCase() + name.slice(1);
	}

	// console.log(queryString.parse(location.search));
	const { icon, color } = queryString.parse(location.search);
	const { productName, year } = match.params;

	return (
		<Fragment>
			<h3 style={{color: `#${color}`}}>{covertFirstLetterUppercase(productName)}{year}</h3>
			<p>{detailInfo[productName]}</p>
		</Fragment>
	);
};

export default ProductDetail;
