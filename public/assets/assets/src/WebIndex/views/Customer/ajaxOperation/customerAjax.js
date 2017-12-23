import axiosUtil from '../../../../lib/axiosUtil';
import { message } from 'antd';
import * as customerAction from '../../Customer/actions/customerAction';
import * as customerTypeCountAction from '../../Customer/actions/customerTypeCountAction';
import moment from 'moment';

const fetchCustomerAddress = '/software_training/public/customer/list';
const deleteCustomerAddress = '/software_training/public/customer/delete';
const addCustomerAddress = '/software_training/public/customer/insert';
const getCheckedCustomerAddress = '/software_training/public/customer/select';
const updateCustomerAddress = '/software_training/public/customer/update';
const fetchCustomerTypeCountAddress = '/software_training/public/customer/count';

export const fetchCustomer = (phaseType = 0, time = 0, page = 1, customerType = 0) => (dispatch) => axiosUtil('post', fetchCustomerAddress, {
    phase: phaseType,
    type: customerType,
    time: time,
    page: page
})
    .then((value) => {
        if(value !== undefined) {
            dispatch(customerAction.fetchCustomer(value.customer));
            dispatch(customerAction.getCustomerTotalCount(value.count));
        }
    });

export const addCustomer = (customerCreated, phaseType, time, currentPage, customerType ) => (dispatch) => axiosUtil('post', addCustomerAddress, {
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
        fetchCustomer(0, 0, 1, 0)(dispatch)
            .then((value) => {
                fetchCustomerTypeCount()(dispatch)
                    .then(() => {
                        message.info('创建成功!');
                    });
            });
    }
});

export const deleteCustomer = (key, phaseType, time, currentPage, customerType) => (dispatch) => axiosUtil('post', deleteCustomerAddress, {
    id: key
})
    .then((value) => {
        if(value === 403 || value === 500) {
            message.info('删除失败!');
        }else {
            fetchCustomer(phaseType, time, currentPage, customerType)(dispatch)
                .then((value) => {
                    fetchCustomerTypeCount()(dispatch)
                        .then(() => {
                            message.info('删除成功!');
                        });
                });
        }
    });

export const getCheckedCustomer = (id) => (dispatch) => axiosUtil('post', getCheckedCustomerAddress, {
    id: id
})
    .then((value) => {
        dispatch(customerAction.getCheckedCustomer(value));
    });


export const updateCustomer = (id, customerUpdated, phaseType, time, currentPage, customerType) => (dispatch) => axiosUtil('post', updateCustomerAddress, {
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
        fetchCustomer(phaseType, time, currentPage, customerType)(dispatch)
            .then((value) => {
                fetchCustomerTypeCount()(dispatch)
                    .then(() => {
                        message.info('修改成功!');
                    });
            });
    }
});

export const fetchCustomerTypeCount = () => (dispatch) => axiosUtil('post', fetchCustomerTypeCountAddress, {})
    .then((value) => {
        if(value !== undefined) {
            dispatch(customerTypeCountAction.setTotalCustomerCount(value.amount));
            dispatch(customerTypeCountAction.setSimpleCustomerCount(value['1']));
            dispatch(customerTypeCountAction.setPurposeCustomerCount(value['2']));
            dispatch(customerTypeCountAction.setFinishCustomerCount(value['3']));
        }
    });