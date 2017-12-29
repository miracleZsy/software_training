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
                    return 403;  //用户名或密码错误  //客户不存在  //修改没有权限
                case 409:
                    return 409;  //验证码错误
                case 500:
                    return 500;
                case 401:
                    window.location.href = '/software_training/public/index';
                }

            }
        })
        .catch((error) => {
            throw error;
        });
};
export default axiosUtil;