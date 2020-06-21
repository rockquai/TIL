// import React, { Fragment } from 'react';
// import { BrowserRouter as Router, Route, Link, Switch, NavLink, Redirect } from 'react-router-dom';
// import queryString from 'query-string';
// import './App.scss';

// const Home = () => {
// 	return <h1>Home</h1>;
// };

// const AboutRouter = (props) => {
// 	const search = props.location.search;
// 	return <h2>AboutRouter{search}</h2>;
// };

// const Nav = (props) => (
// 	<nav>
// 		<ul style={{ textAlign:'left' }}>
// 			<li>
// 				{/* aria-current={pageXOffset, step, location, date, time, true} */}
// 				<NavLink to="/" activeClassName="is-active" exact>홈</NavLink>
// 			</li>
// 			<li>
// 				<NavLink to="/about" activeClassName="is-active">라우터 소개</NavLink>
// 			</li>
// 			<li>
// 				<NavLink to="/products" activeClassName="is-active">제품 안내</NavLink>
// 			</li>
// 		</ul>
// 	</nav>
// );

// const PageNotFound = () => <h1>Page Not Found 404</h1>

// ----------------------------------------------------------------------------
// Link 컴포넌트
// const Nav = (props) => (
// 	<nav style={{ textAlign:'left' }}>
// 		<ul>
// 			<li>
// 				<Link to="/">홈</Link>
// 			</li>
// 			<li>
// 				{/* <Link to="/about?isExact=false">라우터 소개</Link> */}
// 				<Link
// 					innerRef={(node) => {
// 						console.log(node)					
// 						node.addEventListener('click', () => (node.style.color = 'red'))
// 					}}
// 					to={{
// 						pathname: '/about',
// 						search: '?isExact=fale',
// 						hash: 'hash-router',
// 						state: {
// 							isAuth: false,
// 						}
// 					}}
// 				>라우터 소개</Link>
// 			</li>
// 		</ul>
// 	</nav>
// );

// ----------------------------------------------------------------------------
// NavLink 컴포넌트
// const Nav = (props) => (
// 	<nav>
// 		<ul style={{ textAlign:'left' }}>
// 			<li>				
// 				{/* aria-current={pageXOffset, step, location, date, time, true} */}
// 				<NavLink to="/" activeClassName="is-active" exact>홈</NavLink>
// 			</li>
// 			<li>
// 				<NavLink to="/about" activeClassName="is-active">라우터 소개</NavLink>
// 			</li>
// 		</ul>
// 	</nav>
// );

// 방식1. component 렌더링
// const App = props => (
//     <Router>
// 		<div>
// 			<Route path="/" component={Home} exact />
// 			<Route path="/about" component={AboutRouter} exact />
// 		</div>
//     </Router>
// );

// 방식2. render 함수 렌더링
// const App = props => (
//     <Router>
// 		<div>
// 			<Route path="/" render={(props) => <h1>render 함수 이용 - Home</h1>} exact />
// 			<Route path="/about" render={(props) => <h2>render 함수 이용 - AboutRouter</h2>} exact />
// 		</div>
//     </Router>
// );

// 방식3. children 함수 렌더링
// function ListItemLink({ to, ...rest }) {
// 	return (
// 		<Route
// 			path={to}
// 			children={({ match }) => (
// 				<li className={match ? "active" : ""}>
// 					<Link to={to} {...rest} />
// 				</li>
// 			)}
// 		/>
// 	);
// }

// const App = () => {
// 	return (
// 		<Router>
// 			<ul>
// 				<ListItemLink to="/somewhere" />
// 				<ListItemLink to="/somewhere-else" />
// 			</ul>
// 		</Router>
// 	)
// }

// export default App;

// const App = props => (
//     <Router>
// 		<div className="App">
// 			<Route 
// 				path="/" 
// 				component={Home} 
// 				exact 
// 				strict
// 				sensitive
// 			/>
// 			<Route 
// 				path="/about" 
// 				component={AboutRouter} 
// 				exact 
// 			/>
// 			<Route
// 				path="*"
// 				render={() => <h1>Page Not Found 404</h1>}
// 			/>
// 		</div>
//     </Router>
// );

// Switch 컴포넌트
// const App = props => (
//     <Router>
// 		<div className="App">
			// <Switch>
			// 	<Route 
			// 		path="/" 
			// 		component={Home}
			// 		exact
			// 	/>
			// 	<Route 
			// 		path="/about" 
			// 		component={AboutRouter}
			// 	/>
			// 	<Route
			// 		path="*"
			// 		render={() => <h1>Page Not Found 404</h1>}
			// 	/>
			// </Switch>
// 		</div>
//     </Router>
// );

// const App = props => (
//     <Router>
// 		<div className="App">
// 			<Nav />
// 			<Switch>
// 				<Route 
// 					path="/" 
// 					component={Home}
// 					exact
// 				/>
// 				<Route 
// 					path="/about" 
// 					component={AboutRouter}
// 				/>
// 				<Route
// 					path="*"
// 					render={() => <h1>Page Not Found 404</h1>}
// 				/>
// 			</Switch>
// 		</div>
//     </Router>
// );

// export default App;

// ----------------------------------------------------------------------------
// Redirect 컴포넌트
// const App = (props) => (
//     <Router>
// 		<div className="App">
// 			<Nav />

// 			<Switch>
// 				<Route 
// 					path="/" 
// 					component={Home}
// 					exact
// 				/>
// 				<Route 
// 					path="/about" 
// 					component={AboutRouter}
// 				/>
// 				<Route 
// 					path="/page-not-found" 
// 					component={PageNotFound}
// 				/>

// 				<Redirect
// 					from="/home"
// 					to="/"
// 				/>
// 				<Redirect
// 					from="/router"
// 					to="/about"
// 				/>
// 				{/* <Redirect
// 					to="page-not-found"
// 				/> */}
// 				{/* 객체로 설정 */}
// 				<Redirect
// 					to={{
// 						pathname: '/page-not-found',
// 						search: '?redirection=true'
// 					}}
// 				/>
// 			</Switch>
// 		</div>
//     </Router>
// );

// export default App;

// ---------------------------------------------------------------------
// Route 컴포넌트 props 전달 & Route 컴포넌트 매개변수(옵션 포함), 쿼리 스트링
// const Products = (props) => {	
// 	return (
// 		<ul>
// 			<li>
// 				<NavLink to="/product/notobook/2020?icon='iconimg'&color=1249bf">노트북</NavLink>
// 			</li>
// 			<li>
// 				<NavLink to="/product/phone/2020?icon='iconimg'&color=ff008c">스마트폰</NavLink>
// 			</li>
// 			<li>
// 				<NavLink to="/product/keyboard/2020?icon='iconimg'&color=00aef7">키보드</NavLink>
// 			</li>
// 		</ul>
// 	);
// };

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
// 			<h1 style={{color: `#${color}`}}>{covertFirstLetterUppercase(productName)}{year}</h1>
// 			<p>{detailInfo[productName]}</p>
// 			{/* 방법1. Link로 넣는 방식 */}
// 			{/* <Link to={{ pathname: '/products'}}>제품 안내 페이지로 이동</Link> */}

// 			{/* 방법2. props.history.push 사용 */}
// 			<button type="button" onClick={goProducts}>제품 안내 페이지로 이동</button>
// 		</Fragment>
// 	);
// };

// const App = (props) => (
//     <Router>
// 		<div className="App">
// 			<Nav />

// 			<Switch>
// 				<Route 
// 					path="/" 
// 					component={Home}
// 					exact
// 				/>
// 				<Route 
// 					path="/about" 
// 					component={AboutRouter}
// 				/>
// 				<Route 
// 					path="/page-not-found" 
// 					component={PageNotFound}
// 				/>
// 				<Route 
// 					path="/products" 
// 					component={(props) => <Products sortBy="newest" {...props} /> }
// 				/>
// 				<Route 
// 					path="/product/:productName/:year?" 
// 					component={ProductDetail}
// 				/>


// 				<Redirect
// 					from="/home"
// 					to="/"
// 				/>
// 				<Redirect
// 					from="/router"
// 					to="/about"
// 				/>
// 				<Redirect
// 					to="page-not-found"
// 				/>
// 			</Switch>
// 		</div>
//     </Router>
// );

// export default App;

// ---------------------------------------------------------------------
// 중첩된 라우터
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';

import Nav from './Nav';
import Home from './Home';
import AboutRouter from './AboutRouter';
import Products from './Products';
// import ProductDetail from './ProductDetail';
import ProtectedRoute from './ProtectedRoute';
import PageNotFound from './PageNotFound';
import Admin from './Admin';

const App = (props) => (
    <Router>
		<div className="App" style={{ margin: 40, textAlign: 'left' }}>
			<Nav />

			<Switch>				
				<Route 
					path="/about" 
					component={AboutRouter}
				/>			
				<Route 
					path="/products" 
					component={Products}
				/>
				{/* <Route 
					path="/product/:productName/:year?" 
					component={ProductDetail}
				/> */}
				<Route 
					path="/" 
					component={Home}
					exact
				/>
				<Route 
					path="/page-not-found" 
					component={PageNotFound}
				/>

				<ProtectedRoute path="/admin" component={Admin} />

				<Redirect
					from="/home"
					to="/"
				/>
				<Redirect
					from="/router"
					to="/about"
				/>
				<Redirect
					to="page-not-found"
				/>
			</Switch>
		</div>
    </Router>
);

export default App;