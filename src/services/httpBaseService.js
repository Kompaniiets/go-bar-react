import config from '../config';

export default class HttpBaseService {
    static http(method, endpoint, body, params, headers = {}) {
        const url = new URL(`${config.url}${config.version}/${endpoint}`);

        if (Object.keys(params).length) {
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        }

        return fetch(url, {
            method: method,
            headers: headers,
            mode: 'cors',
            body: body,
            params: params
        });
    }
}