((global = window) => {
	console.log('aaa');
	
	const movie = {
		name: '포레스트 검프',
		director: '로버트 저메키스',
		openning: '1994-10-15',
		link: 'http://movie.naver.com/movie/bi/mi/basic.nhn?code=17159'
	};

	global.movie = movie;

})();

((global = window, movie = window.movie) => {	
	console.log(movie); // {name: "포레스트 검프", director: "로버트 저메키스", openning: "1994-10-15", link: "http://movie.naver.com/movie/bi/mi/basic.nhn?code=17159"}

	// ES5 - 객체의 속성 할당
	// var name     = movie.name;
	// var director = movie.director;
	// var openning = movie.openning;
	// var link     = movie.link;

	// console.log('name:', name);
	// console.log('director:', director);
	// console.log('openning:', openning);
	// console.log('link:', link);

	// ES6 - 비구조화 할당
	// 비구조화 할당
	let {name, director, openning, link} = movie;
})();

// null => 첫번째 인지로 null를 전달하면 'global = window' => global값이 없으면 window로 인식
// movie => {name, director, openning, link}, 필용한 부분만 가져올 수 있다
((global = window, {name, director, openning, link}) => {
	console.log('name:', name);
	console.log('director:', director);
	console.log('openning:', openning);
	console.log('link:', link);
})(null, movie);

((global = window, { type, each }) => {	
	let t = Symbol('titan');
	let a = [t, t, t];	
	
	console.log(type(t)); // symbol
	
	each(a, (index, item) => {
		console.log(index, item);
	});

	/*
		0 Symbol(titan)
		1 Symbol(titan)
		2 Symbol(titan)
	*/	
})(null, jQuery); 

// { el, els, css, on } => 'y9' namespace에 종속되어 사용 가능
((global = window, { el, els, css, on }) => {	
	on(el('body'), 'click', e => css(e.target, 'background', 'tan' ));
})(null, y9);

// 매개변수 : y9.el을 $로 사용
((global = window, { el: $ , els: $$ , css: style, on: bind, each, width }) => {
	let {document : doc} = global;
	console.log(doc); // document

	bind($('body'), 'click', e => style(e.target, 'background', '#ff0' ));
})(window, y9);

// 배열
((global = window) => {
	const utensils = [
		'그물국자',
		'건지개',
		'스패튤라',
		'뒤집개',
		'국자',
		'포테이토 매셔',
	];

	// ES6 - 배열 utensils 비구조화 할당
	let [ skimmer, draining_spoon, spatula, turner ,ladle ,potato_masher ] = utensils;

	global.utensils = utensils;
})();

// IIFE 사용시, 배열 utensils 비구조화 할당
(([ skimmer, draining_spoon, spatula, turner ,ladle ,potato_masher ]) => {	
	console.log(draining_spoon); // 건지개
})(window.utensils);

// 배열 utensils 비구조화 할당 (필요한 데이터만 할당)
(([ , draining_spoon, , , ,potato_masher ]) => {
	console.log(draining_spoon); // 건지개
	console.log(potato_masher); // 포테이토 매셔
})(window.utensils);

((global = window) => {
	const people = [
		{
		  "gender": "female",
		  "name": "gina reynolds",
		  "email": "gina.reynolds@example.com",
		  "picture": "https://randomuser.me/api/portraits/thumb/women/35.jpg"
		}, {
		  "gender": "male",
		  "name": "leslie fisher",
		  "email": "leslie.fisher@example.com",
		  "picture": "https://randomuser.me/api/portraits/thumb/men/10.jpg"
		},
		{
		  "gender": "female",
		  "name": "brooke fuller",
		  "email": "brooke.fuller@example.com",
		  "picture": "https://randomuser.me/api/portraits/thumb/women/3.jpg"
		},
		{
		  "gender": "male",
		  "name": "کوروش کامروا",
		  "email": "کوروش.کامروا@example.com",
		  "picture": "https://randomuser.me/api/portraits/thumb/men/77.jpg"
		},
		{
		  "gender": "female",
		  "name": "judith gerlach",
		  "email": "judith.gerlach@example.com",
		  "picture": "https://randomuser.me/api/portraits/thumb/women/96.jpg"
		},
		{
		  "gender": "male",
		  "name": "hudson lewis",
		  "email": "hudson.lewis@example.com",
		  "picture": "https://randomuser.me/api/portraits/thumb/men/65.jpg"
		},
		{
		  "gender": "female",
		  "name": "alice french",
		  "email": "alice.french@example.com",
		  "picture": "https://randomuser.me/api/portraits/thumb/women/37.jpg"
		}
	];
	
	// 비구조화 할당 방식을 사용하여 콜백 함수 매개변수로 원하는 데이터만 받을 수 있음
	people.forEach(({name, email}) => {
		console.log(name, email);
	});

	// 비구조화 할당 방식을 사용하여 JSON 객체(배열)의 순서에 해당 하는 변수 설정
	let [, ,Brooke, , Judith] = people;

	function logEmail({email}) {
		console.log(email);
	}
	
	// 이메일 출력(변수 전달)
	logEmail(Brooke); // 'brooke.fuller@example.com'
	logEmail(Judith); // 'judith.gerlach@example.com'
})();