import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

export const Auth = {
    loggedIn,
    logout,
    setStorage,
    getProfile,
};

function loggedIn() {
    return (!!getProfile() && !!getSession()) ? (!!getToken() && !isTokenExpired(getSession())) : false;
}

function setStorage(data) {
    localStorage.setItem('go-bar-user', JSON.stringify(data));
}

function getProfile() {
    return JSON.parse(localStorage.getItem('go-bar-user'));
}

function logout() {
    localStorage.removeItem('go-bar-user');
    history.push('/login');
}

function getToken() {
    return getProfile().session.accessToken;
}

function getSession() {
    return getProfile().session;
}

function isTokenExpired(session) {
    return session && session.expiresAt < Date.now();
}

