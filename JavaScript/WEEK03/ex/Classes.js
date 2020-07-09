// ES5 - 프로토타입 기반 객체지항
(function(global){
	'use strict';

	// 생성자(Constructor) 함수
	function Dom() {
		console.log('Constructor 함수');
	}

	// 스태틱(Static) 메서드
	Dom.createEls = function(){}

	// 프로토타입(Prototype) 객체 : 인스턴스(Instance) 메서드
	Dom.prototype.init = function() {}
	Dom.prototype.bind = function() {}
})(window);

// ES6 - 클래스(Class) 문법
((global = window) => {
	// 생성자: class를 통해 개개체를 생성할 때 즉시 실행
	class Dom {
		constructor() {
			console.log('Constructor 함수');
		}
		// 스태틱(Static) 메서드 === 클래스 메서드 : 객체를 생성하지 않고 사용 가능. 클래스 속성와 같다	
		static createEls(){}

		// 인스턴스(Instance) 메서드
		// prototype.init	
		init(){}
		bind(){}
	}
})();

(function(global){
	'use strict';

	var _origin = '에티오피아'; // 비공개(Private) 멤버

	// 생성자(Constructor) 함수
	function Coffee(bean) {		
		this.bean = bean; // 공개(Public) 멤버
	}

	// 스태틱(Static) 메서드
	Coffee.origin = function() { return _origin; };

	// 프로토타입(Prototype) 객체 : 인스턴스(Instance) 메서드
	Coffee.prototype.parch = function(time) {};

})(window);

((global) => {
	'use strict';

	let _origin = '에티오피아'; // 비공개(Private) 멤버

	// 생성자(Constructor)
	class Coffee{
		constructor(bean){			
			this.bean = bean; // 공개(Public) 멤버
		}

		// 스태틱(Static) 메서드
		static origin(){
			return _origin 
		}

		// 프로토타입(Prototype) 객체 : 인스턴스(Instance) 메서드
		parch(time){ console.log(`${time}초 동안 말린다`);}
	}
	
	let arb = new Coffee('arabica');

	console.log(typeof Coffee); // function
	console.log(arb instanceof Coffee); // true
	console.log(arb.parch === Coffee.prototype.parch); // true

	console.log(arb) // {bean: "arabica"}
	console.log(arb.parch(3000)); // 3000초 동안 말린다
	console.log(Coffee.origin()); // 에티오피아
})(window);

((global) => {
	'use strict';

	class Coffee{
		constructor(bean, type){
			this.bean = bean; // 공개 데이터
			this._type = type; // 비공개 데이터 : 관례적 이름 규칙일 뿐, 데이터가 안전하게 보호되지 않는다.
		}		
	}

	let arb2 = new Coffee('아라비카', '로스팅');
	console.log(arb2.bean); // 아라비카

	console.log(arb2._type); // 로스팅 => 접근이 가능
	arb2._type = '더블샷'; // 새로운 값 
	console.log(arb2._type); // 더블샷
})(window);

// ---------------------------------------------------------
// [비공개 데이터 관리] Object.assign()
((global) => {
	'use strict';

	class Coffee {
		constructor(bean, type) {			
			// - 완전한 데이터 비공개 관리가 가능하나, 메모리 누수가 발생.
			// - this.bean, this.type 접근이 불가능
			Object.assign(this, {
				getBean() {
					return bean;
				},
				getType() {
					return type;
				}
			});
		}
	}

	window.Coffee = Coffee;	
})(window);

let ros = new Coffee('아라비카', '로스팅');
console.log(ros); // Coffee{getBean: ƒ, getType: ƒ}
console.log(ros.getBean()); // 아라비카
console.log(ros.getType()); // 로스팅

console.log(ros.bean); // undefined => 접근이 불가능
console.log(ros.type); // undefined => 접근이 불가능

// ---------------------------------------------------------
// [비공개 데이터 관리] 심볼 + 게터/세터
((global) => {
	'use strict';

	// 심볼
	let _bean = Symbol('bean');
	  
	class Coffee {
		constructor(bean) {
			// - 기본적으로 데이터 안전이 보장되나, 완전히 보호 되지는 않음.
			// - Reflect.ownKeys()로 확인이 가능하기 때문. 
			this[_bean] = bean; // 고유성이 있는 불변데이터 [_bean] 변수 설정, 왜부에서 전달받은 'bean'을 데이터 보관 가능 => 외부 접근 불가능
		}
		get pea() { 
			return this[_bean];
		}
		set pea(new_bean) {
			this[_bean] = new_bean;
		}
	}

	window.Coffee = Coffee;
})(window);
let ross = new Coffee('rostring');
console.log(ross); // {Symbol(bean): "rostring"}
// console.log(ross[_bean]); // 접근 불가능
// console.log(ross[Symbol(bean)]); // 접근 불가능
console.log(ross.pea); // rostring	

// ---------------------------------------------------------
// [비공개 데이터 관리] 위크맵 활용(WeakMap)
((global) => {
	'use strict';
	
	let _bean = new WeakMap();
		
	class Coffee {
		constructor(bean) {
			// 완벽한 보호가 가능함. 다만, 코드가 우아하지 않음.
			_bean.set(this, bean);
		}

		get pea() { 
			return _bean.get(this);
		}

		set pea(new_pea) {
			_bean.set(this, new_pea);
		}
	}

	window.Coffee = Coffee;	
})(window);

let ts = new Coffee('tasting');
console.log(ts.pea); // tasting
ts.pea = 'delicious';
console.log(ts.pea); // delicious

let aa = new Coffee('alpha');
console.log(aa.pea); // alpha
let bb = new Coffee('beta');
console.log(bb.pea); // beta
console.log(aa.pea); // alpha => 

// ---------------------------------------------------------
// [비공개 데이터 관리] IIFE을 이용하여 영역내에서만 접근 가능 지역 변수  + getter(), setter()
((global) => {
	'use strict';
	
	let _bean = null; // 비공개 관리 변수 선언
		
	class Coffee {
		constructor(bean) {
			_bean = bean; // 비공개 변수에 데이터 값 할당		
		}

		get pea() { 
			return _bean;
		}

		set pea(new_pea) {
			_bean = new_pea;
		}
	}

	window.Coffee = Coffee;
})(window);

let tts = new Coffee('tasting');
console.log(tts.pea); // tasting
tts.pea = '테이스팅';
console.log(tts.pea); // 테이스팅
// console.log(_bean); // Classes.js:211 Uncaught ReferenceError: _bean is not defined

// 문제! 
let a = new Coffee('alpha');
console.log(a.pea); // alpha
let b = new Coffee('beta');
console.log(b.pea); // beta
console.log(a.pea); // beta => 문제! b객체값이 교체가 된다

// ---------------------------------------------------------
// ES5 - 프로토타입 기반 상속 VS ES6 - 클래스 기반 상속
((global) => {
	'use strict';

	class Coffee {
		constructor(bean) { this.bean = bean; }
		parch(time){ console.log(`${time}만큼 ${this.bean}을 볶다`); }
	}
	
	// Latte 클래스 (Coffee 클래스 상속)
	class Latte extends Coffee {
		constructor(bean, milk) {
			super(bean);
			this.milk = milk;
		}
		// 메서드 오버라이드
		parch(hour) {
			super.parch(hour/2);
			console.log(`${hour/4}시간 만큼 ${this.milk}를 넣고 끓인다`);
		}
	}
	
	console.log(Object.getPrototypeOf(Latte) === Coffee); // true
	console.log(Latte.__proto__ === Coffee); // true
})(window);

console.clear();

// ---------------------------------------------------------
// Object.setPrototypeOf() 메서드를 사용한 객체 상속
// 일반 객체의 능력 상속
((global) => {
	'use strict';

	// Espresso 객체(클래스 아님)
	const Espresso = {
		mix() { console.log('믹스(Mix)'); }
	}
	
	// CafeMocha 클래스
	class CafeMocha {
		constructor(bean, milk, chocolate) {}
	}
	
	Object.setPrototypeOf(CafeMocha.prototype, Espresso); // (일반 객체)Espresso객체의 능력을 CafeMocha.prototype에 상속
	
	// CafeMocha 객체 생성 후,
	let cm = new CafeMocha();
	// Expresso 객체로 부터 상속받은 mix() 메서드 사용 가능
	cm.mix();
})(window);