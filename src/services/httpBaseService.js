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

instance.interceptors.response.use((response) => {
    return response.data;
}, (err) => Promise.reject(err.response.data.errors[0].message));

export default instance;
