import axios from 'axios';

const axiosUtil = (method, url, data = {}, timeout = 8000) => {
    return axios({
        url: url,
        timeout: timeout,
        method: method
    })
        .then((response) => {
            return (response.data);
        })
        .catch((error) => {
            throw error;
        });
};
export default axiosUtil;