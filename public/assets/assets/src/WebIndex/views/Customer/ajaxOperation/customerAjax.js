import axiosUtil from '../../../../lib/axiosUtil';
import { message } from 'antd';
import * as customerAction from '../../Customer/actions/customerAction';

const fetchCustomerAddress = '/software_training/public/customer/list';
const deleteCustomerAddress = '/software_training/public/customer/delete';
const addCustomerAddress = '/software_training/public/customer/insert';

export const fetchCustomer = () => (dispatch) => axiosUtil('post', fetchCustomerAddress, {})
    .then((value) => {
        dispatch(customerAction.fetchCustomer(value));
    });

export const addCustomer = (customerCreated) => (dispatch) => axiosUtil('post', addCustomerAddress, {

}).then((value) => {
    if(value === 500) {
        message.info('创建失败!');
    }else {
        message.info('创建成功!');

        // dispatch(userAction.insertUser(userTotalCreated));
    }
});


export const deleteCustomer = (key, index) => (dispatch) => axiosUtil('post', deleteCustomerAddress, {
    id: key
})
    .then((value) => {
        dispatch(customerAction.deleteCustomer(index));
    });

