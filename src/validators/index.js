import validator from 'validator';

export const required = (value) => {
    if (!value.toString().trim().length) return 'Required!';

    return false;
};

export const email = (value) => {
    if (!validator.isEmail(value)) return 'Invalid email!';

    return false;
};

export const password = (value) => {
    const passw = new RegExp(/^(?=.*[A-Za-zа-яА-Я])(?=.*\d).{6,30}$/);

    if (!passw.test(value.trim())) return 'Min: 6, max: 30, at least one digit!';

    return false;
};

export const confirmPassword = (value) => {
    if (validator.isEmail(value)) {
        return 'Invalid email!';
    }
    return false;
};
