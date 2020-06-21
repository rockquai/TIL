# 뮤직 검색 서비스 (실습)

React를 학습 중인 분에게 질문을 받았습니다. 그(그녀)가 원하는 결과는 사용자가 노래 제목을 입력했을 때 
뮤직 테이블의 데이터가 필터링(Filtering) 되어 UI에 렌더링 되는 것입니다.

## 미션

`src/components/Music.js` 파일의 `handleKey` 메서드 로직 구현에 어려움을 겪은 것 같습니다.
이 문제를 어떻게 해결하실지 고민한 후, 적절한 해결 방안을 도출해보세요.

```js
class Music extends Component {
  state = {
    // 생략
  }

  handleKey = (msg) => {
    this.setState({
      music: this.state.music.filter((item) => {
        if (msg !== '') {
          // 노래명 검색필터부분 - 이겋게 하는게 맞는지는 모르겠지만 제가할수 있는 부분까지 넣어봤어요
        }
      }),
    });
  };

  render() {
    return (/* JSX 생략 */)
  }
}
```

## 힌트

이 문제를 풀면서 고민해 볼 포인트를 정리합니다.

- 참조와 복사의 개념
- 원본 보존의 법칙
- 상태 업데이트 콜백
- 성능 저하 방지