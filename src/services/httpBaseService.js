import config from '../config';
import axios from 'axios';
import { Auth } from '../services/AuthService';

const instance = axios.create({
    baseURL: `${config.url}${config.version}/`
});

instance.interceptors.request.use((conf) => {
    conf.headers = {
        'Authorization': Auth.getProfile() ? Auth.getProfile().session.accessToken : '',
    };

    return conf;
}, (err) => Promise.reject(err));

instance.interceptors.response.use((response) => {
    return response.data
}, (err) => {
    if (typeof err.response.data === 'string')
        return Promise.reject(err.response);

    if (err.response.data.code === 403 && err.response.data.errors[0].key[1] === 400032) {
        Auth.logout();
        // window.location.reload(true);
        return Promise.reject();
    }

    return Promise.reject(err.response.data.errors[0].message);
});

export default instance;
