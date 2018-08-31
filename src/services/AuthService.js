import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

export default class AuthService {
    loggedIn() {
        const token = this.getToken();
        const session = this.getSession();
        return !!token && !this.isTokenExpired(session)
    }

    setToken(data) {
        localStorage.setItem('go-bar-user', JSON.stringify(data));
        localStorage.setItem('go-bar-session', JSON.stringify(data.session));
        localStorage.setItem('go-bar-accessToken', JSON.stringify(data.session.accessToken));
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
        history.push('/login');
    }
}
