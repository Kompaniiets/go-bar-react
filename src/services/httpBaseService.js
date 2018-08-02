import config from '../config';
import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use((conf) => {
    conf.baseURL = `${config.url}${config.version}/`;
    conf.headers = {
        'Authorization': JSON.parse(localStorage.getItem('go-bar-user')).session.accessToken
    };

    return conf;
}, (err) => Promise.reject(err));

export default instance;
