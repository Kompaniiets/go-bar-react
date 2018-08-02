const AuthService = {
    isAuthenticated: false,
    authenticate(data) {
        this.isAuthenticated = true;
        localStorage.setItem('go-bar-user', JSON.stringify(data.data));
    },
    logout(cb) {
        this.isAuthenticated = false;
        localStorage.removeItem('go-bar-user');
        setTimeout(cb, 100)
    }
};

export default AuthService;