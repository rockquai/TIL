// 1. Tenon-ui 라이브러리 사용
// import React, { Component, createRef } from 'react';
// import { Heading } from '@tenon-io/tenon-ui';
// import './style.css';
// import KakaoTV_logo from './kakaoTvLogo';

// class App extends Component {
//   constructor(props) {
// 	super(props);
//     this.containerRef = createRef()
//     this._headings = []
//     this.state = {
//       visibleTagName: false
//     }
//   }

//   componentDidMount() {
//     this._headings = this.containerRef.current.querySelectorAll('h1,h2,h3,h4,h5,h6')
//   }

//   render() {
//     return (
//       <div ref={this.containerRef}>
//         <KakaoTV_logo />
//         <button className="toggle-button" onClick={() => this.toggleTagName()}>{this._toggleButtonText()}</button>

//         <Heading.H>kakako TV</Heading.H>
//         <Heading.LevelBoundary>
//         	<Heading.H>검색</Heading.H>

//           	<Heading.LevelBoundary>
// 				<Heading.H>kakako TV 홈 메뉴</Heading.H>
// 				<Heading.H>인기 PD 동영상</Heading.H>
// 				<Heading.H>카테고리 별 인기 동영상 슬롯</Heading.H>

// 				<Heading.LevelBoundary>
// 					<Heading.H>예능 최신 인기 동영상 바로가기</Heading.H>
// 					<Heading.H>드라마 최신 인기 동영상 바로가기</Heading.H>
					
// 					<Heading.LevelBoundary>
// 						<Heading.H>h5 - 1</Heading.H>
// 						<Heading.H>h5 - 2</Heading.H>
// 					</Heading.LevelBoundary>
// 				</Heading.LevelBoundary>
// 			</Heading.LevelBoundary>
//         </Heading.LevelBoundary>
//       </div>
//     )
//   }
//   toggleTagName() {
//     this.state.visibleTagName ? this._hideTagName() : this._showTagName()
//     this.setState({
//       visibleTagName: !this.state.visibleTagName
//     })
//   }
//   _toggleButtonText() {
//     return `Tag 이름 ${this.state.visibleTagName ? '감춤' : '보기'}`
//   }
//   _showTagName() {
//     this._headings.forEach((h) => {
//       h.setAttribute('data-heading-level', h.localName)
//     })
//   }
//   _hideTagName() {
//     this._headings.forEach((h) => {
//       h.removeAttribute('data-heading-level')
//     })
//   }
// }

// export default App;


// 2. Tenon-ui 라이브러리 + 히든 콘텐츠 컴포넌트 사용 
import React, { Component, createRef } from 'react';
import A11yHidden from './A11yHidden';
import { Heading } from '@tenon-io/tenon-ui';
import './style.css';
import styled from 'styled-components';
import KakaoTVLogo from './kakaoTvLogo';

const Button = styled.button`
	cursor: pointer;
	border: 2px solid rgba(255, 255, 255, 0.6);
	border-radius: 3px;
	margin-left: 3px;
	margin-right: 3px;
	padding: 0.6em 0.9em;
	background: transparent;
	color: #8d8d8d;
	font-size: 0.8rem;
	font-weight: 700;
	transition: all 0.25s ease-out;

	:hover,
	:focus {
		border-color: #fff;
	}
`;

class App extends Component {
  constructor(props) {
	super(props);
    this.containerRef = createRef()
    this._headings = []
    this.state = {
      visibleTagName: false
    }
  }

  componentDidMount() {
    this._headings = this.containerRef.current.querySelectorAll('h1,h2,h3,h4,h5,h6')
  }

  render() {
    return (
      <div ref={this.containerRef}>
        <KakaoTVLogo />

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

		<Button 
			type="button" 
			classNames="button-remove-lecturer"
		>
			버튼
		</Button>
      </div>
    )
  }
  toggleTagName() {
    this.state.visibleTagName ? this._hideTagName() : this._showTagName()
    this.setState({
      visibleTagName: !this.state.visibleTagName
    });
  }
  _toggleButtonText() {
    return `Tag 이름 ${this.state.visibleTagName ? '감춤' : '보기'}`;
  }
  _showTagName() {
    this._headings.forEach((h) => {
      h.setAttribute('data-heading-level', h.localName)
    });
  }
  _hideTagName() {
    this._headings.forEach((h) => {
      h.removeAttribute('data-heading-level')
    });
  }
}

export default App;
