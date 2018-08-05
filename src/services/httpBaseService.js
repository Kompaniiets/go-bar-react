import config from '../config';
import axios from 'axios';

const instance = axios.create({
    baseURL: `${config.url}${config.version}/`
});

instance.interceptors.request.use((conf) => {
    conf.headers = {
        'Authorization': JSON.parse(localStorage.getItem('go-bar-accessToken'))
    };

    return conf;
}, (err) => Promise.reject(err));

export default instance;
