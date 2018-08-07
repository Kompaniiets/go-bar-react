export default class AuthService {
    loggedIn() {
        const token = this.getToken();
        const session = this.getSession();
        return !!token && !this.isTokenExpired(session)
    }

    setToken(data) {
        localStorage.setItem('go-bar-user', JSON.stringify(data.data));
        localStorage.setItem('go-bar-session', JSON.stringify(data.data.session));
        localStorage.setItem('go-bar-accessToken', JSON.stringify(data.data.session.accessToken));
    }

    getToken() {
        return localStorage.getItem('go-bar-accessToken')
    }

    getSession() {
        return localStorage.getItem('go-bar-session')
    }

    getProfile() {
        return localStorage.getItem('go-bar-user')
    }

    isTokenExpired(session) {
        return JSON.parse(session) && JSON.parse(session).expiresAt < Date.now();
    }

    logout() {
        localStorage.removeItem('go-bar-user');
        localStorage.removeItem('go-bar-session');
        localStorage.removeItem('go-bar-accessToken');
    }
}

// const AuthService = {
//     isAuthenticated: false,
//     authenticate(data) {
//         this.isAuthenticated = true;
//         localStorage.setItem('go-bar-user', JSON.stringify(data.data));
//         localStorage.setItem('go-bar-accessToken', JSON.stringify(data.data.session.accessToken));
//     },
//     logout(cb) {
//         this.isAuthenticated = false;
//         localStorage.removeItem('go-bar-user');
//         setTimeout(cb, 100)
//     }
// };
//
// export default AuthService;