import BaseHttpService from './httpBaseService';
import CONSTANTS from './../constants';

export default class HttpService extends BaseHttpService {
    static httpGet(endpoint, queryParams = {}) {
        return super.http(CONSTANTS.HTTP_REQUEST.GET, endpoint, {}, queryParams, {});
    }

    static httpPost(endpoint, body, headers = {}) {
        console.log(CONSTANTS.HTTP_REQUEST.POST);
        return super.http(CONSTANTS.HTTP_REQUEST.POST, endpoint, body, {}, headers);
    }
}