import { updateState } from './StatelessService';

export default class ValidationService {
    constructor(that) {
        this.this = that;
        this.updateState = updateState.bind(this.this)
    }

    validateInput = (element, schema) => {
        const { id, value } = element;

        if (!schema.length)
            this.updateState(id, { valid: true, errorMessage: '' });

        for (let i = 0; i < schema.length; i++) {
            const invalid = schema[i](value);

            if (!invalid) {
                this.updateState(id, { valid: true, errorMessage: '' });
            } else {
                this.updateState(id, { valid: false, errorMessage: invalid });
                return;
            }
        }
    };
}