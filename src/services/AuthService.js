import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

export const Auth = {
    loggedIn,
    logout,
    setToken,
    getProfile,
};

export let isAuth = false;

function loggedIn() {
    const token = getToken();
    const session = getSession();
    return !!token && !isTokenExpired(session)
}

function setToken(data) {
    localStorage.setItem('go-bar-user', JSON.stringify(data));
    localStorage.setItem('go-bar-session', JSON.stringify(data.session));
    localStorage.setItem('go-bar-accessToken', JSON.stringify(data.session.accessToken));
    isAuth = true;
}

function getProfile() {
    return localStorage.getItem('go-bar-user')
}

function logout() {
    localStorage.removeItem('go-bar-user');
    localStorage.removeItem('go-bar-session');
    localStorage.removeItem('go-bar-accessToken');
    isAuth = false;
    history.push('/login');
}

function getToken() {
    return localStorage.getItem('go-bar-accessToken')
}

function getSession() {
    return localStorage.getItem('go-bar-session')
}

function isTokenExpired(session) {
    return JSON.parse(session) && JSON.parse(session).expiresAt < Date.now();
}
