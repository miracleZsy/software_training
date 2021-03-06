import axiosUtil from '../../../../lib/axiosUtil';
import { message } from 'antd';
import * as customerAction from '../../Customer/actions/customerAction';
import * as customerTypeCountAction from '../../Customer/actions/customerTypeCountAction';
import * as customerDetailAction from '../../Customer/actions/customerDetailAction';
import moment from 'moment';

message.config({
    top: 300,
    duration: 0.5,
});

const fetchCustomerAddress = '/software_training/public/customer/list';
const deleteCustomerAddress = '/software_training/public/customer/delete';
const addCustomerAddress = '/software_training/public/customer/insert';
const getCheckedCustomerAddress = '/software_training/public/customer/select';
const updateCustomerAddress = '/software_training/public/customer/update';
const fetchCustomerTypeCountAddress = '/software_training/public/customer/count';
const fetchCustomerDetailAddress = '/software_training/public/customer/select';
const setCustomerPhaseAddress = '/software_training/public/customer/changePhase';
const getPhaseLogAddress = '/software_training/public/customer/getPhaseLog';
const fetchStaffInCustomerListAddress = '/software_training/public/user/hint';

export const fetchCustomer = (phaseType = 0, time = 0, page = 1, customerType = 0, staffUuid = '') => (dispatch) => axiosUtil('post', fetchCustomerAddress, {
    phase: phaseType,
    type: customerType,
    time: time,
    page: page,
    uuid: staffUuid
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
        fetchCustomer(0, 0, 1, 0, '')(dispatch)
            .then((value) => {
                fetchCustomerTypeCount()(dispatch)
                    .then(() => {
                        message.info('创建成功!');
                    });
            });
    }
});

export const deleteCustomer = (key, phaseType, time, currentPage, customerType, StaffUuid) => (dispatch) => axiosUtil('post', deleteCustomerAddress, {
    id: key
})
    .then((value) => {
        if(value === 403 || value === 500) {
            message.info('删除失败!');
        }else {
            fetchCustomer(phaseType, time, currentPage, customerType, StaffUuid)(dispatch)
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


export const updateCustomer = (id, customerUpdated, phaseType, time, currentPage, customerType, StaffUuid) => (dispatch) => axiosUtil('post', updateCustomerAddress, {
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
        fetchCustomer(phaseType, time, currentPage, customerType, StaffUuid)(dispatch)
            .then((value) => {
                fetchCustomerTypeCount()(dispatch)
                    .then(() => {
                        message.info('修改成功!');
                    });
            });
    }
});

export const fetchCustomerTypeCount = (staffUuid = '') => (dispatch) => axiosUtil('post', fetchCustomerTypeCountAddress, {
    uuid: staffUuid
})
    .then((value) => {
        if(value !== undefined) {
            const simpleCustomerCount = value['1'] === undefined ? '0' : value['1'];
            const purposeCustomerCount = value['2'] === undefined ? '0' : value['2'];
            const finishCustomerCount = value['3'] === undefined ? '0' : value['3'];
            dispatch(customerTypeCountAction.setTotalCustomerCount(value.amount));
            dispatch(customerTypeCountAction.setSimpleCustomerCount(simpleCustomerCount));
            dispatch(customerTypeCountAction.setPurposeCustomerCount(purposeCustomerCount));
            dispatch(customerTypeCountAction.setFinishCustomerCount(finishCustomerCount));
        }
    });

export const fetchCustomerDetail = (id) => (dispatch) => axiosUtil('post', fetchCustomerDetailAddress, {
    id: id,
})
    .then((value) => {
        if(value !== undefined) {
            dispatch(customerDetailAction.fetchCustomerDetail(value));
            dispatch(customerDetailAction.setSlideValue((value.phase - 1) * 25));
        }
    });


export const setCustomerPhase = (id, phase) => (dispatch) => axiosUtil('post', setCustomerPhaseAddress, {
    id: id,
    phase: phase
})
    .then((value) => {
        if(value === 500 || value === 403) {
            message.info('修改阶段失败!');
        }else {
            getPhaseLog(id)(dispatch)
                .then((value) => {
                    message.info('修改阶段成功!');
                });
        }
    });

export const getPhaseLog = (id) => (dispatch) => axiosUtil('post', getPhaseLogAddress, {
    customerId: id
})
    .then((value) => {
        dispatch(customerDetailAction.fetchPhaseLog(value));
    });

export const fetchStaffInCustomerList = (hint)  => axiosUtil('post', fetchStaffInCustomerListAddress, {
    hint: hint
});