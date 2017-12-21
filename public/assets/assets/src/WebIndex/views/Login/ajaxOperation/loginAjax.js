import axiosUtil from '../../../../lib/axiosUtil';

const loginAddress = '/software_training/public/login';
export const login = ({ username, password, captcha }) => axiosUtil('post', loginAddress, {
    username: username,
    password: password,
    code : captcha
});

