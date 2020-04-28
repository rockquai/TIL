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