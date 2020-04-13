###### React Handling Events

## 이벤트 처리하기(https://ko.reactjs.org/docs/handling-events.html)
- React 엘리먼트에서 이벤트를 처리하는 방식은 DOM 엘리먼트에서 이벤트를 처리하는 방식과 매우 유사
- React의 이벤트는 소문자 대신 `캐멀 케이스(camelCase)`를 사용
- JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러를 전달
- React에서는 `return false;`를 해도 기본 동작을 방지할 수 없다. 반드시 `preventDefault`를 명시적으로 호출

### DOM 요소 이벤트 핸들링
: HTML 요소의 표준 이벤트 속성 값으로 함수를 연결

```jsx
<button type="button" onclick="toggleBtn()">토글 버튼</button>
```

### React 요소 이벤트 핸들링
: JSX에선 camelCase 이벤트 속성 이름에 {} 안에 함수 이름을 연결

```jsx
<button type="button" onclick={toggleBtn}>토글 버튼</button>
```

### 브라우저 기본 동작 차단
: 이벤트 속성에 연결된 이벤트 리스너(함수)에 전달된 이벤트 객체의 preventDefault() 메서드를 사용

```js
function ActionLink() {
	function handleClick(e) {
		e.preventDefault();
		console.log('The link was clicked.');
	}

	return (
		<a href="#" onClick={handleClick}>Click me</a>
	);
}
```
---
### 클래스 컴포넌트 this 참조 변경

#### [방법1] bind(this)
- this.handleClick을 바인딩하지 않고 onClick에 전달하였다면, 함수가 실제 호출될 때 `this는 undefined` => `this.handleClick = this.handleClick.bind(this);`

```js
class ToggleBtn extends Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };

        // 콜백에서 `this`가 작동하려면 이벤트 바인딩
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}
```

#### [방법2] bind를 호출하는 것이 불편하다면, 콜백에 화살표 함수를 사용
- `this`가 handleClick 내에서 바인딩
- 이 문법의 문제점은 ToggleBtn이 렌더링될 때마다 다른 콜백이 생성이 되며, 콜백이 하위 컴포넌트에 props로서 전달된다면 그 컴포넌트들은 추가로 다시 렌더링을 수행이 된다. 생성자 안에서 바인딩하거나 클래스 필드 문법을 사용하는 것을 권장

```js
class ToggleBtn extends Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };
    }

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={() => this.handleClick()}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}
```

#### [방법3] bind를 호출하는 것이 불편하다면, 클래스 필드 문법 사용
```js
class ToggleBtn extends Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };
    }

    handleClick = () => {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}
```
---
## 컴포넌트 통신
### 부모 -> 자식 메서드 전달하여 `삭제 버튼` 구현하기 `props <--> callback`
- 부모 컴포넌트의 메서드를 자식 컴포넌트에 전달하면 자식 컴포넌트는 전달 받은 메서드를 실행(callback)해 부모 컴포넌트의 상태를 변경
- 컴포넌트 구조: App(부모)에 메서드를 MemberItem(자식)에게 전달(중간에 MemberList 컴포넌트를 통해서 전달) `App.js <-> MemberList.js <-> MemberItem.js` 

```js
// App.js (부모)
class App extends Component {
	// ...생략

	removeMember = (removeId) => {		
		const filterMember = this.state.memberList.filter(
			member => member.id !== removeId
		);

		this.setState({
			memberList: filterMember
		});
	};

	render() {				
		const { memberList } = this.state;
		const { removeMember } = this;

		return (
			<div className="area_member">
				<MemberList 
					members={memberList}
					handleRemoveMember={removeMember}
				/>	
			</div>
		)
	}
}
```

```js
// MemberList.js
class MemberList extends Component {
	render() {
		const { members, handleRemoveMember } = this.props;
		return (			
			<ul>
				{
					members.map((item) => (
						<MemberItem 
							key={item.id}
							id={item.id}
							name={item.name}
							age={item.age}
							job={item.job}
							image={item.image}
							link={item.link}
							width={item.width}
							height={item.height}
							handleRemoveMember={handleRemoveMember}
						/>
					))
				}
			</ul>
		);
	}
}
```

```js
// MemberItem.js
const MemberItem = ({ id, name, age, job, image, link, width, height, handleRemoveMember }) => {
	return (
		<Li>
			<A href={link} target="_blank" rel="noreferrer noopener">
				<Figure>
					<img 
						src={image}
						width={width}
						height={height}
						alt=""
					/>
					<figcaption>
						이름: {name} | 나이: {age} | 직업: {job}
					</figcaption>
				</Figure>
			</A>			
			<Button type="button" onClick={() => handleRemoveMember(id)}>삭제</Button>
		</Li>
	);
};
```
