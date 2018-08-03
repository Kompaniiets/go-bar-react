const AuthService = {
    isAuthenticated: false,
    authenticate(data) {
        this.isAuthenticated = true;
        localStorage.setItem('go-bar-user', JSON.stringify(data.data));
        localStorage.setItem('go-bar-accessToken', JSON.stringify(data.data.session.accessToken));
    },
    logout(cb) {
        this.isAuthenticated = false;
        localStorage.removeItem('go-bar-user');
        setTimeout(cb, 100)
    }
};

export default AuthService;