import React, { Component } from 'react';
import List from './List';
import './Music.css';
const musicDB = 'https://euid-cbd68.firebaseio.com/music.json';

class Music extends Component {
	state = {
		music: [],
		keyword: ''
	};

	fetchData = async () => {		
		try {
			const response = await fetch(musicDB);
			const { music } = await response.json();
			this.setState({
				music
			});			
		} catch({message}) {
			console.error(message);
		}
	};

	componentDidMount() {
		this.fetchData();		
	};

	handleChange = e => {
		this.setState({
			keyword : e.target.value
		});
	};

	render() {
	const { music, keyword } = this.state;
	const { handleChange } = this;
	const filteredTitle = music.filter(info => info.title.indexOf(keyword) !== -1);

	return (
      <div className="Music">
        <h1>지니뮤직</h1>
		
		<input 
            placeholder="검색할 노래명 입력하세요" 
            onChange={handleChange}
            value={keyword}
        />

		<hr />
		<List data={filteredTitle} />		
      </div>
    );
  }
}

export default Music;