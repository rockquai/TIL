###### React 접근성

## [AOA - React App 접근성 개선 동영상](https://www.youtube.com/playlist?list=PLtaz5vK7MbK2DcZZEd1oGLrZsIDlUc9gm)
1. 헤딩 레벨(Heading Level)
2. 히든 콘텐츠(Hidden Contents)
3. 버튼 컴포넌트(Button Component)
4. React-axe 패키지 모듈을 활용한 접근성 자동 검사

---

### 1. 헤딩 레벨(Heading Level) 
- 스크린 리더 사용에게 탐색의 편리를 제공
- 검색엔진 최적화(SEO)항상에 도움이 된다

#### tota11y 접근성 검사 도구(an accessibility visualization toolkit)
	- [tota11y Chrome 확장 프로그램](https://chrome.google.com/webstore/detail/tota11y-plugin-from-khan/oedofneiplgibimfkccchnimiadcmhpe)
	: 웹 사이트에 보이지 제목까지 포함해서 제목에 대한 구성을 한눈에 검토하고 확인 가능한 시각화 가능한 확장 프로그램

#### [Tenon-ui 라이브러리](https://www.tenon-ui.info) : 제목에 대한 흐름을 도와주는 라이브러리
```sh
# 설치
$ npm install @tenon-io/tenon-ui # or yarn add @tenon-io/tenon-ui
```

#### [The Heading component 사용법](https://www.tenon-ui.info/headings)
	- 헤딩 제목을 `Heading.H` 사용
	- 내부 하위에 대한 제목을 `Heading.LevelBoundary` 사용
	- `<Heading.LevelBoundary levelOverride={3}>` 레벨을 직접 넣을 수 있다

```js
<Heading.H>I will be an h1</Heading.H>
<Heading.LevelBoundary>
    <Heading.H>
        I will be an h2
    </Heading.H>
    <Heading.LevelBoundary>
        <Heading.H>
            I will be an h3
        </Heading.H>
    </Heading.LevelBoundary>
    <Heading.H>
        I will be an h2
    </Heading.H>
</Heading.LevelBoundary>
```

#### 레벨 바운더리 내부 자동 헤딩 레벨 적용
```js
import { Heading } from '@tenon-io/tenon-ui'; // Tenon-ui 라이브러리 불러오기

// ... 생략
<Heading.H>kakako TV</Heading.H> {/* h1 */} 
<Heading.LevelBoundary>
	<Heading.H>검색</Heading.H> {/* h2 */}

	<Heading.LevelBoundary>
		<Heading.H>kakako TV 홈 메뉴</Heading.H> {/* h3 */}
		<Heading.H>인기 PD 동영상</Heading.H> {/* h3 */}
		<Heading.H>카테고리 별 인기 동영상 슬롯</Heading.H> {/* h3 */}

		<Heading.LevelBoundary>
			<Heading.H>예능 최신 인기 동영상 바로가기</Heading.H> {/* h4 */}
			<Heading.H>드라마 최신 인기 동영상 바로가기</Heading.H> {/* h4 */}
		</Heading.LevelBoundary>			
	</Heading.LevelBoundary>
</Heading.LevelBoundary>
```

---

### 2. 히든 콘텐츠(Hidden Contents)
- 화면에 보이진 않더라도, 읽혀야 되는 콘텐츠는 `올바른 감춤 처리` 되어야 한다
- `올바른 감춤 처리`는 스크린 리더 사용자에게 탐색에 용이한 정보를 제공
- React 사용자는 `A11yHidden 컴포넌트`활용하여 처리하는 것이 용이

#### 잘못된 vs 올바른 '히든 콘텐츠' 처리
- `잘못된 처리 방법` 스크린 리더가 주어진 내용 정보를 전혀 읽을 수 없다. 
```html
<div style="display:none"> ... </div>
<div style="visibility:hidden"> ... </div>
<div hidden> ... </div>
```

- `올바른 '히든 콘텐츠' 처리` CSS속성을 이용해서 처리 해야 한다
```css
.a11y-hidden {
	position: absolute;
	clip: rect(0 0 0 0);
	width: 1px;
	height: 1px;
	overflow: hidden;
	margin: -1px;
	border: 0;
	padding: 0;
	white-space: nowrap;
}
```

```js
const App = (props) => (
  <>
    <h1>kakako TV</h1>
    <h2 className="a11y-hidden">검색</h2> {/* CSS속성을 이용해서 스크린 리더가 접근이 가능 */}
    <h3 className="a11y-hidden">kakako TV 홈 메뉴</h3> {/* CSS속성을 이용해서 스크린 리더가 접근이 가능 */}
    <h3>인기 PD 동영상</h3>
    <h3 className="a11y-hidden">카테고리 별 인기 동영상 슬롯</h3> {/* CSS속성을 이용해서 스크린 리더가 접근이 가능 */}
    <h4>예능 최신 인기 동영상 바로가기</h4>
    <h4>드라마 최신 인기 동영상 바로가기</h4>
  </>
)
```
---
#### 히든 콘텐츠 컴포넌트 활용

- 히든 콘텐츠 컴포넌트 `A11yHidden.js` 생성
```js
import React, { Component } from "react";

const styles = {
    position: "absolute",
    clip: "rect(0 0 0 0)",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    margin: "-1px",
    border: 0,
    padding: 0,
    whiteSapce: "nowrap"
};

class A11yHidden extends Component {
    state = { isFocus: false };

    changeStateFocused = () => {
        this.setState({ isFocus: true });
    };

    changeStateBlured = () => {
        this.setState({ isFocus: false });
    };

    render() {
        let attrs = {};
        for (let [key, value] of Object.entries(this.props)) {
            if (key === "tag" || key === "focusable") {
                continue;
            }
            attrs[key] = value;
        }
        const { tag, focusable } = this.props;
        const { isFocus } = this.state;
        const Tag = tag || "span";
        return (
            <Tag
                style={!focusable ? styles : isFocus ? null : styles}
                {...attrs}
                onFocus={focusable && this.changeStateFocused}
                onBlur={focusable && this.changeStateBlured}
            />
        );
    }
}

export default A11yHidden;
```

- 히든 콘텐츠 컴포넌트 응용
```js
<!-- span 요소로 처리 -->
<A11yHidden> ... </A11yHidden>

<!-- a 요소, href 속성 설정 -->
<A11yHidden tag="a" href="#target"> ... </A11yHidden>

<!-- button 요소, 포커스 상태가 되면 화면에 표시 / 블러 상태가 되면 다시 화면에서 감춤 -->
<A11yHidden tag="button" focusable> ... </A11yHidden>

<!-- button 요소, 포커스 상태에서 화면에 표시 될 버튼을 스타일링 -->
<A11yHidden tag="button" focusable className="button"> ... </A11yHidden>
```

- `App.js`
```js
import A11yHidden from './A11yHidden'; // 히든 콘텐츠 컴포넌트 불러오기

// ... 생략

// 포커스가 될때 버튼아 화면에 표시
<A11yHidden 
	tag="button"
	focusable
	className="toggle-button" 
	onClick={() => this.toggleTagName()}
>
	{this._toggleButtonText()}
</A11yHidden>

<Heading.H>kakako TV</Heading.H>
<Heading.LevelBoundary>
	<A11yHidden tag="h2">검색</A11yHidden>

	<Heading.LevelBoundary>
		<A11yHidden tag="h3">kakako TV 홈 메뉴</A11yHidden>
		<Heading.H>인기 PD 동영상</Heading.H>
		<A11yHidden tag="h3">카테고리 별 인기 동영상 슬롯</A11yHidden>

		<Heading.LevelBoundary>
			<Heading.H>예능 최신 인기 동영상 바로가기</Heading.H>
			<Heading.H>드라마 최신 인기 동영상 바로가기</Heading.H>					
		</Heading.LevelBoundary>
	</Heading.LevelBoundary>
</Heading.LevelBoundary>
```
---
### 3. 버튼 컴포넌트(Button Component)
- 마우스가 없이 키보드로 접근이 가능해야 하며 클릭, 포커싱 기능 동작 수행할 수 있어야 한다
- 버튼에 해당되는 UI 컴포넌트는 `<button>` 요소를 사용해야 한다
- `<button>` 요소는 키보드 포커스 가능한 요소이며, 키 이벤트를 사용할 수 있다
- `<div>, <span>, <img>`와 같은 요소를 사용해 버튼 처럼 꾸미는 것은 좋지 않으며, 링크, 버튼의 각 역할을 바로 알고 구분해 사용해야 한다

#### `<a>` VS `<button>`
- 스크린 리더에서 '링크'로 콘텐츠를 읽은 이유는 <a> 요소로 마크업이 구성되었기 때문
```html
<a href="#none" class="btn btn_v2 btn_left">이전보기</a>
<a href="#none" class="btn btn_v2 btn_right">다음보기</a>
<a href="#none" class="btn btn_v2 btn_play">롤링플레이버튼</a>
```

- 링크를 버튼 모양으로 꾸미는 대신, 버튼 요소를 사용해 의미적, 접근적으로 개선
```html
<button type="button" class="btn btn_v2 btn_left">이전 보기</button>
<button type="button" class="btn btn_v2 btn_right">다음 보기</button>
<button type="button" class="btn btn_v2 btn_play">롤링 플레이</button>
```
---
### React-axe 패키지 모듈을 활용한 접근성 자동 검사
- [접근성 자동 검사 (React-axe)](https://github.com/dequelabs/axe-core): React 앱의 모든 페이지 접근성을 자동으로 검사하여 개발자에게 실시간 피드백을 전달

```sh
$ npm i react-axe # React-axe 라이브러리 설치
```

- 엔트리 파일(index.js) 설정
```js
import axe from 'react-axe';

if (process.env.NODE_ENV !== 'production') {
  axe(React, ReactDOM, 1000)
}
```

- React-axe 체크 메시지

```js
const Button = styled.button`	
	border: 2px solid rgba(255, 255, 255, 0.6);
	border-radius: 3px;
	margin-left: 3px;
	margin-right: 3px;
	padding: 0.6em 0.9em;
	background: transparent;
	color: #fff;
	font-size: 0.8rem;
	font-weight: 700;
	transition: all 0.25s ease-out;
	cursor: pointer;

	:hover,
	:focus {
		border-color: #fff;
	}
`;

<Button type="button" classNames="button-remove-lecturer">버튼</Button>
```

`serious: Elements must have sufficient color contrast 
Fix any of the following:
Element has insufficient color contrast of 2.69 (foreground color: #8d8d8d, background color: #ffea31, font size: 9.6pt (12.8px), font weight: bold). Expected contrast ratio of 4.5:1`

`serious: 요소의 색상 대비가 충분히 식별 가능해야 합니다. 
2.69 요소의 색상 대비가 충분하지 않습니다. (foreground color: #8d8d8d, background color: #ffea31, font size: 9.6pt (12.8px), font weight: bold).
4.5:1 예상 대비 비율`