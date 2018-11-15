import config from '../config';
import axios from 'axios';
import { Auth } from '../services/AuthService';
import Error from '../services/ErrorHandler';

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
        Error(err.response.data.code, err.response.data.errors[0]);

    if (err.response.data.code === 403 && err.response.data.errors[0].key[1] === 400032) {
        Auth.logout();
        // window.location.reload(true);
        Error(err.response.data.code, err.response.data.errors[0]);
    }

    Error(err.response.data.code, err.response.data.errors[0]);
    return Promise.reject();
});

export default instance;
