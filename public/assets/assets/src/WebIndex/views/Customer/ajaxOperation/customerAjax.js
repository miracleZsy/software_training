import axiosUtil from '../../../../lib/axiosUtil';
import { message } from 'antd';
import * as customerAction from '../../Customer/actions/customerAction';
import moment from 'moment';

const fetchCustomerAddress = '/software_training/public/customer/list';
const deleteCustomerAddress = '/software_training/public/customer/delete';
const addCustomerAddress = '/software_training/public/customer/insert';
const getCheckedCustomerAddress = '/software_training/public/customer/select';
const updateCustomerAddress = '/software_training/public/customer/update';

export const fetchCustomer = (type = 0, time = 0, page = 0) => (dispatch) => axiosUtil('post', fetchCustomerAddress, {
    type: type,
    time: time,
    page: page
})
    .then((value) => {
        dispatch(customerAction.fetchCustomer(value.customer));
        dispatch(customerAction.getCustomerTotalCount(value.count));
    });

export const addCustomer = (customerCreated) => (dispatch) => axiosUtil('post', addCustomerAddress, {
    name: customerCreated.name,
    tel: customerCreated.tel,
    work: customerCreated.work,
    remark: customerCreated.remark,
    email: customerCreated.email,
    address: customerCreated.address,
    origin: customerCreated.origin,
    QQ: customerCreated.QQ,
    birthday: moment(customerCreated.birthday).format('YYYY-MM-DD'),
    sex: customerCreated.sex,
    type: customerCreated.type
}).then((value) => {
    if(value === 500) {
        message.info('创建失败!');
    }else {
        fetchCustomer()(dispatch)
            .then((value) => {
                message.info('创建成功!');
            });
    }
});

export const deleteCustomer = (key, index) => (dispatch) => axiosUtil('post', deleteCustomerAddress, {
    id: key
})
    .then((value) => {
        if(value === 403 || value === 500) {
            message.info('删除失败!');
        }else {
            fetchCustomer()(dispatch)
                .then((value) => {
                    message.info('删除成功!');
                });
            // dispatch(customerAction.deleteCustomer(index));
            // message.info('删除成功!');
        }
    });

export const getCheckedCustomer = (id) => (dispatch) => axiosUtil('post', getCheckedCustomerAddress, {
    id: id
})
    .then((value) => {
        dispatch(customerAction.getCheckedCustomer(value));
    });


export const updateCustomer = (id, customerUpdated) => (dispatch) => axiosUtil('post', updateCustomerAddress, {
    id: id,
    name: customerUpdated.name,
    tel: customerUpdated.tel,
    work: customerUpdated.work,
    remark: customerUpdated.remark,
    email: customerUpdated.email,
    address: customerUpdated.address,
    origin: customerUpdated.origin,
    QQ: customerUpdated.QQ,
    birthday: moment(customerUpdated.birthday).format('YYYY-MM-DD'),
    sex: customerUpdated.sex,
    type: customerUpdated.type
}).then((value) => {
    if(value === 500 || value === 403) {
        message.info('修改失败!');
    }else {
        fetchCustomer()(dispatch)
            .then((value) => {
                message.info('修改成功!');
            });
    }
});