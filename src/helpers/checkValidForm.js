import { WarningHandler } from '../services/ResponseHandler';

export default (state) => {
    const submitObj = {};

    for (let key in state) {
        if (state[key].hasOwnProperty('valid') && state[key].valid === false) {
            WarningHandler('Some input has invalid value!');
            return false;
        }

        if (state[key].hasOwnProperty('value')) {
            submitObj[key] = state[key].value;
        }
    }

    return submitObj;
}