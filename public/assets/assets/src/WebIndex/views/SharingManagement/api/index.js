import axiosUtil from '../../../../lib/axiosUtil';
import { message } from 'antd';
import * as actions from '../actions';

const fetchSharedCustomerUrl = '/software_training/public/share/shareList';
const fetchReceivedCustomerUrl = '/software_training/public/share/sharedList';
const insertSharedCustomerUrl = '/software_training/public/share/insert';
const deleteSharedCustomerUrl = '/software_training/public/share/delete';

export const fetchSharedCustomer = (time = 0, page = 1) => (dispatch) => axiosUtil('post', fetchSharedCustomerUrl, {
    time,
    page, 
}).then((value) => {
    if (value !== undefined) {
        dispatch(actions.fetchSharedCustomer(value));
    }
});

export const fetchReceivedCustomer = (time = 0, page = 1) => (dispatch) => axiosUtil('post', fetchReceivedCustomerUrl, {
    time,
    page, 
}).then((value) => {
    if (value !== undefined) {
        dispatch(actions.fetchReceivedCustomer(value));
    }
});

export const insertSharedCustomer = (uuid_received, customer) => (dispatch) => axiosUtil('post', insertSharedCustomerUrl, {
    uuid_received,
    customer_id: customer.id, 
}).then((value) => {
    if (value === 500) {
        message.info('分享失败！');
    } else {
        dispatch(actions.insertSharedCustomer(customer));
        message.info('分享成功!');
    }
});

// Todo: 等待后端修改接口
export const deleteSharedCustomer = (id) => (dispatch) => axiosUtil('post', deleteSharedCustomerUrl, {
    id,
})
    .then((value) => {
        if(value === 403 || value === 500) {
            message.info('删除失败!');
        }else {
            dispatch(actions.deleteSharedCustomer(id));
            message.info('删除成功!');
        }
    });
