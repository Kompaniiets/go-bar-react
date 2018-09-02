import API from './httpBaseService';

export default class HttpService {
    static get(endpoint, queryParams = {}) {
        return API.get(endpoint, {
            params: queryParams,
        });
    }

    static post(endpoint, data, headers = {}) {
        return API.post(endpoint, data, {
            headers
        });
    }

    static patch(endpoint, data, headers = {}) {
        return API.patch(endpoint, data, {
            headers
        });
    }
}