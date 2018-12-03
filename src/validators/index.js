import validator from 'validator';

export const required = (value) => {
    if (!value.toString().trim().length) return 'Required!';

    return false;
};

export const email = (value) => {
    if (!validator.isEmail(value)) return 'Invalid email!';

    return false;
};

export const name = (value) => {
    const name = new RegExp(/^([A-Za-zа-яА-Я-])+$/);
    if (!name.test(value)) return 'Invalid name!';

    return false;
};

export const max = (value, length) => {
    if (value.length > length) return `Max length is ${length}!`;

    return false;
};

export const min = (value, length) => {
    if (value.length < length) return `Min length is ${length}!`;

    return false;
};

export const password = (value) => {
    const password = new RegExp(/^(?=.*[A-Za-zа-яА-Я])(?=.*\d).{6,30}$/);
    if (!password.test(value.trim())) return 'Min: 6, max: 30, at least one digit!';

    return false;
};

export const phone = (value) => {
    const phone = new RegExp(/^\+?[1-9]\d{6,14}$/);
    if (!phone.test(value.trim())) return 'Incorrect phone number!';

    return false;
};

export const confirmPassword = (password, confirm) => {
    console.log('1111111111');
    return false;
};
