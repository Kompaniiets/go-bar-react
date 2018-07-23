export default class HttpService {
    static httpGet(endpoint) {
        return fetch(`http://localhost:4500/api/v1/${endpoint}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        });
    }
}