###### React Context

## [Context API](https://ko.reactjs.org/docs/context.html)
- 컨텍스트 생성	`React.createContext(value)`
- 컨텍스트 공급자 `<Context.Provider value={value}>`
- 컨텍스트 수요자 `<Context.Consumber>`

### 컨텍스트 생성
```js
// context > memberContext.js
import React from 'react';

export const memberContext = {
	memberList: [],
	removeMember: () => {},
};

export default React.createContext(memberContext); 
```

### 컨텍스트 공급자
```js
// App.js
//... 생략
import MemberContext from './context/MemberContext';

class App extends Component {
	// ... 생략
	render() {				
		const { memberList } = this.state;
		const { removeMember } = this;

		return (
			<Fragment>
				<MemberContext.Provider
					value={{
						memberList: memberList,
						removeMember: removeMember
					}}
				>
					<AppMain />
				</MemberContext.Provider>				
			</Fragment>
		)
	}
}
```

### 컨텍스트 수요자
```js
// MemberList.js
//... 생략 
import MemberContext from '../../context/MemberContext';

const MemberList = () => {	
	return (
		<ul>
			<MemberContext.Consumer>
				{
					({ memberList : {items}, removeMember }) => 
						items.map( (item) => 
							<MemberItem key={item.id} item={item} removeMember={removeMember} /> )
				}
			</MemberContext.Consumer>
		</ul>
	);
}
```

### 클래스 컴포넌트의 경우, static contextType 사용

```js
//... 생략 
import MemberContext from '../../context/MemberContext';

class MemberList extends Component {
	static contextType = MemberContext;	

    render() {
		const { memberList : {items}, removeMember } = this.context;

        return (
            <ul>
				{
					items.map( (item) => 
						<MemberItem key={item.id} item={item} removeMember={removeMember} /> )
				}
            </ul>
        );
    }
}
```