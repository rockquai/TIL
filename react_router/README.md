###### React Router
## React Router
- Route 컴포넌트 종류
	- BrowserRouter & HashRouter 컴포넌트
	- Switch 컴포넌트
	- Link 컴포넌트
	- NavLink 컴포넌트
	- Redirect 컴포넌트
- 중첩된 라우터
- 보호된 라우팅
---
## [React Router 라이브러리](https://reacttraining.com/react-router/)
- React Router를 사용하면 React로 만든 앱에 라우팅 기능을 제공하여 SPA를 제작 가능
- React 개발 방식에 React Router 라이브러리를 접목하면 모든 라우팅 기능을 구현
- 웹 뿐만 아니라 네이티브 앱 개발에서도 React Native와 함께 React Router를 사용

### React Router 설치
```sh
$ npm i react-router-dom
```

### BrowserRouter & HashRouter 컴포넌트
- `<BrowserRouter>` <App> 랩핑 => Router.Provider 통해서  `{history, location, match, staticContext}` value값 사용 가능

```js
//... 생략
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById("reactApp")
);
```

```js
// 별칭(alias) 설정 가능
import { BrowserRouter as Router } from 'react-router-dom';
```

#### [BrowserRouter](https://reacttraining.com/react-router/web/api/BrowserRouter) : HTML5 History API를 사용해 URL과 UI를 매칭

```js
import { BrowserRouter as Router } from 'react-router-dom'
```

#### [HashRouter](https://reacttraining.com/react-router/web/api/HashRouter) : URL 해시(#, window.location.hash)를 사용하여 URL과 UI를 매칭 => 예) `http://localhost:3000/#/kakaogame` 표시

```js
import { HashRouter as Router } from 'react-router-dom'
```

#### hashType
- hashbang : `http://localhost:3000/#!/`
- noslash : `http://localhost:3000/#`
- slash : `http://localhost:3000/#/`

---
### React Router 컴포넌트 종류
- `<BrowserRouter> 또는 <HashRouter>` : 라우터(Router) 컴포넌트
- `<Route> / <Switch>` :	라우트 경로(Route Path) 매처(matcher) 컴포넌트
- `<Link> / <NavLink> / <Redirect>` : 라우트를 변경하는 내비게이션(Navigation) 컴포넌트

### Route 컴포넌트
- component 렌더링
- render 함수 렌더링
- children 함수 렌더링

#### [component 렌더링](https://reacttraining.com/react-router/web/api/Route/component)
```js
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from 'Home';
import AboutRouter from 'AboutRouter';

// 방식1
const App = props => (
    <Router>
		<div>
			<Route path="/" component={Home} exact />
			<Route path="/about" component={AboutRouter} exact />
		</div>
    </Router>
);

// 방식2
const App = props => (
    <Router>
		<div>
			<Route path="/" exact>
				<Home>
			</Route>
			<Route path="/about" exact>
				<AboutRouter />
			</Route>
		</div>
    </Router>
);
```

#### [render 함수 렌더링](https://reacttraining.com/react-router/web/api/Route/render-func)
```js
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = props => (
    <Router>
		<div>
			<Route path="/" render={(props) => <h1>render 함수 이용 - Home</h1>} exact />
			<Route path="/about" render={(props) => <h2>render 함수 이용 - AboutRouter</h2>} exact />
		</div>
    </Router>
);
```

#### [children 함수 렌더링](https://reacttraining.com/react-router/web/api/Route/children-func)
```js
function ListItemLink({ to, ...rest }) {
	return (
		<Route
			path={to}
			children={({ match }) => (
				<li className={match ? "active" : ""}>
					<Link to={to} {...rest} />
				</li>
			)}
		/>
	);
}

const App = () => {
	return (
		<Router>
			<ul>
				<ListItemLink to="/somewhere" />
				<ListItemLink to="/somewhere-else" />
			</ul>
		</Router>
	)
}
```
---
### Route 컴포넌트의 Props
- [match](https://reacttraining.com/react-router/web/api/match)
	- Route의 path에 정의한 것과 매칭된 정보 가지고 있음	

- [location](https://reacttraining.com/react-router/web/api/location)
	- 브라우저의 window.location 와 유사
	- url의 query 정보를 search라는 프로퍼티에 가지고 있다

- [history](https://reacttraining.com/react-router/web/api/history)
	- 브라우저의 window.history 와 유사
	- location 이 포함

- [정확한 라우팅 설정 `exact`](https://reacttraining.com/react-router/web/api/Route/exact-bool)
	- `exact` 속성을 추가해 정확(exact)하게 패스가 일치할 때만 표시되도록 설정

- [엄격한 경로 구분 설정 `strict`](https://reacttraining.com/react-router/web/api/Route/strict-bool)
	- `strict` 속성이 설정된 경우, 현재 URL과 일치하는지 여부를 결정

- [대소문자 구분 설정 `sesitive`](https://reacttraining.com/react-router/web/api/Route/sensitive-bool)
	- 경로(path) 이름의 대소문자를 민감하게 구분하고자 한다면 `sesitive` 속성을 추가

---
### [Switch 컴포넌트](https://reacttraining.com/react-router/web/api/Switch)
: `<Route>` 또는 `<Redirect>` 중 URL이 매칭되는 라우트를 한 개를 렌더링

```js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = props => (
    <Router>
		<div className="App">
			<Switch>
				<Route 
					path="/" 
					component={Home}
					exact
				/>
				<Route 
					path="/about" 
					component={AboutRouter}
				/>
				<Route
					path="*"
					render={() => <h1>Page Not Found 404</h1>}
				/>
			</Switch>
		</div>
    </Router>
);
```
---
### [Link 컴포넌트](https://reacttraining.com/react-router/web/api/Link)
: 애플리케이션을 탐색하는 기능을 제공, to 속성 값으로 경로(path) 문자 값 또는 객체를 설정

#### to 객체(object) 설정
- `pathname` : 링크 경로 문자열
- `search` : 쿼리 매개변수 문자열
- `hash` : URL 해시(#) 문자열
- `state` : 상태 설정

```js
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const AboutRouter = (props) => {
	const search = props.location.search;
	return <h2>component 이용 - AboutRouter{search}</h2>;
}

const Nav = (props) => (
	<nav>
		<ul style={{ textAlign:'left' }}>
			<li>
				<Link to="/">홈</Link>
			</li>
			<li>
				{/* <Link to="/about?isExact=false">라우터 소개</Link> */}
				<Link
					innerRef={(node) => {
						console.log(node)					
						node.addEventListener('click', () => (node.style.color = 'red'))
					}}
					to={{
						pathname: '/about',
						search: '?isExact=fale',
						hash: 'hash-router',
						state: {
							isAuth: false,
						}
					}}
				>라우터 소개</Link>
			</li>
		</ul>
	</nav>
);

const App = props => (
    <Router>
		<div className="App">
			<Nav />
			<Switch>
				<Route 
					path="/" 
					component={Home}
					exact
				/>
				<Route 
					path="/about" 
					component={AboutRouter}
				/>
				<Route
					path="*"
					render={() => <h1>Page Not Found 404</h1>}
				/>
			</Switch>
		</div>
    </Router>
);
```
---
### [NavLink 컴포넌트](https://reacttraining.com/react-router/web/api/NavLink)
- NavLink를 사용하면 활성화 된 상태 `클래스 active가 자동`으로 설정
- 사용자 정의 클래스 지정 가능  `activeClassName="is-active"`

```js
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from 'react-router-dom';

const Nav = (props) => (
	<nav>
		<ul style={{ textAlign:'left' }}>
			<li>
				{/* aria-current={pageXOffset, step, location, date, time, true} */}
				<NavLink to="/" activeClassName="is-active" exact>홈</NavLink>
			</li>
			<li>
				<NavLink to="/about" activeClassName="is-active">라우터 소개</NavLink>
			</li>
		</ul>
	</nav>
);
```

```html
<ul style="text-align: left;">
	<li>
		<a aria-current="page" class="active" href="/">홈</a>
	</li>
	<li>
		<a href="/about">라우터 소개</a>
	</li>
</ul>
```

#### [isActive: func](https://reacttraining.com/react-router/web/api/NavLink/isactive-func)
- `eventID`가 홀수인 경우에만 활성화 (짝수일경우 비활성화)

```js
<NavLink
	to="/events/123"
	isActive={(match, location) => {
		if (!match) return false;
		const eventID = parseInt(match.params.eventID);
		return !isNaN(eventID) && eventID % 2 === 1;
	}}
>
  Event 123
</NavLink>
```

#### [aria-current: string](https://reacttraining.com/react-router/web/api/NavLink/aria-current-string)
: 활성 링크에서 사용되는 `aria-current 속성의 값`

- `page` : 기본값
- `step` : 특정 프로세스의 단계 표시기 내에 링크를 표시하는 데 사용
- `location` : 플로우 차트의 현재 구성 요소로 시각적으로 강조 표시된 이미지를 표시하는 데 사용
- `date` : 달력 내에서 현재 날짜를 나타내는 데 사용
- `time` : 시간표 내에서 현재 시간을 나타내는 데 사용
- `true` : NavLink가 활성화되어 있는지 표시하는 데 사용
- aria-current (state) : [WAI-ARIA 1.1 specifications](https://www.w3.org/TR/wai-aria-1.1/#aria-current)

---

### [Redirect 컴포넌트](https://reacttraining.com/react-router/web/api/Redirect)
- 말 그대로 특정 URL로 리디렉션(redirection) 처리합
	- Route 컴포넌트 props 전달
	- Route 컴포넌트 매개변수(옵션 포함), 쿼리 스트링

```js
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const App = (props) => (
    <Router>
		<div className="App">
			<Switch>								
				<Route 
					path="/page-not-found" 
					component={PageNotFound}
				/>
				<Redirect
					to="page-not-found"
				/>
				{/* 객체로 설정 */}
				<Redirect
					to={{
						pathname: '/page-not-found',
						search: '?redirection=true'
					}}
				/>
			</Switch>
		</div>
    </Router>
);
```
#### Route 컴포넌트 props 전달 & Route 컴포넌트 매개변수(옵션 포함), 쿼리 스트링
- `{...props}`를 통해서 history, location, match 정보를 받을 수 있다
- `path="/product/:productName/:year?"` 선택적 파라미터
- `props.history.push('/products')` 제품 리스트로 이동
- 쿼리 스트링 처리 라이브러리 `query-string` =>  `queryString.parse(location.search)`

```js
const Products = (props) => {	
	return (
		<ul>
			<li>
				<NavLink to="/product/notobook/2020?icon='iconimg'&color=1249bf">노트북</NavLink>
			</li>
			<li>
				<NavLink to="/product/phone/2020?icon='iconimg'&color=ff008c">스마트폰</NavLink>
			</li>
			<li>
				<NavLink to="/product/keyboard/2020?icon='iconimg'&color=00aef7">키보드</NavLink>
			</li>
		</ul>
	);
};

const ProductDetail = ({ history, location, match }) => {
	const goProducts = () => {
		// console.log(props.history); push, replace, go, goBack,goForward... 
		history.push('/products');
	}

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
			<h1 style={{color: `#${color}`}}>{covertFirstLetterUppercase(productName)}{year}</h1>
			<p>{detailInfo[productName]}</p>
			{/* 방법1. Link로 넣는 방식 */}
			{/* <Link to={{ pathname: '/products'}}>제품 안내 페이지로 이동</Link> */}

			{/* 방법2. props.history.push 사용 */}
			<button type="button" onClick={goProducts}>제품 안내 페이지로 이동</button>
		</Fragment>
	);
};

const App = (props) => (
    <Router>
		<div className="App">
			<Switch>				
				<Route 
					path="/products" 
					component={(props) => <Products sortBy="newest"  {...props} /> }
				/>
				<Route 
					path="/product/:productName/:year?" 
					component={ProductDetail}
				/>
			</Switch>
		</div>
    </Router>
```
---
## [중첩된 라우터](https://reacttraining.com/react-router/web/example/nesting)
- 컴포넌트 분리

```js
// ... 생략
import Nav from './Nav';
import Home from './Home';
import AboutRouter from './AboutRouter';
import Products from './Products';
import PageNotFound from './PageNotFound';

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
				<Route 
					path="/" 
					component={Home}
					exact
				/>
				<Route 
					path="/page-not-found" 
					component={PageNotFound}
				/>


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
```

```js
// Products.js
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
```
```js
// ProductDetail.js
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
```
---
## 보호된 라우팅
- 인증(예: 로그인 등)된 사용자만 특정 경로로 라우팅 할 수 있도록 설정

### 인증
```js
// auth.js
class Auth {
	isAuth = false;

	logIn() {
		this.isAuth = true
	}

	logOut(){
		this.isAuth = false
	}
	
	getAuth() {
		return this.isAuth;
	}
}

export default new Auth();
```
### 보호된 라우트
```js
// ProtectedRoute.js
// ... 생략
const ProtectedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route 
			{...rest} 
			render={
				(props) => auth.getAuth() 
				? ( <Component {...props} /> ) 
				: ( <Redirect 
						to={{
							pathname: '/login',
							state: {
								from: props.location
							}
						}}
				/>)
			}
		/>
	);
}
```
### 라우트 설정
```js
// App.js
<Router>
  <Switch>
    <ProtectedRoute path="/admin" component={AdminDashboard} />    
  </Switch>
</Router>
```
### 로그인
```js
// Login.js
// ... 생략
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
```