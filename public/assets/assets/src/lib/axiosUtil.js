import axios from 'axios';
import qs from 'qs';

const axiosUtil = (method, url, data = {}, timeout = 8000) => {
    return axios({
        url: url,
        timeout: timeout,
        data: qs.stringify(data),
        method: method,
    })
        .then((response) => {
            const code = Number(response.data.code);
            if (code) {
                switch (code) {
                case 200:
                    return response.data.data;
                case 403:
                    return 403;  //用户名或密码错误
                case 409:
                    return 409;  //验证码错误
                }
            }
        })
        .catch((error) => {
            throw error;
        });
};
export default axiosUtil;