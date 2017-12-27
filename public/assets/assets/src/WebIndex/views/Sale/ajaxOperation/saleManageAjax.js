import axiosUtil from '../../../../lib/axiosUtil';
import * as saleManageAction from '../../Sale/actions/saleManageAction';
import { message } from 'antd';
import moment from 'moment';

const fetchSaleAnalyseAddress = '/software_training/public/sale/customerManage';
const fetchSalePlanAddress = '/software_training/public/sale/plan/list';
const addSalePlanAddress = '/software_training/public/sale/plan/insert';
const fetchCustomerListAddress = '/software_training/public/customer/getMyCustomers';

export const fetchSaleAnalyse = (timeType) => (dispatch) => axiosUtil('post', fetchSaleAnalyseAddress, {
    time: timeType
})
    .then((value) => {
        if(value !== undefined) {
            dispatch(saleManageAction.fetchSaleAnalyse(value));
        }
    });


export const fetchSalePlan = (timeType) => (dispatch) => axiosUtil('post', fetchSalePlanAddress, {
    time: timeType
})
    .then((value) => {
        if(value !== undefined) {
            dispatch(saleManageAction.setSalePlan(value));
        }
    });

export const addSalePlan = (salePlanAdded) => (dispatch) => axiosUtil('post', addSalePlanAddress, {
    title: salePlanAdded.title,
    customerIds: salePlanAdded.customers[0],
    content: salePlanAdded.content,
    actTime: moment(salePlanAdded.executeTime).format('YYYY-MM-DD')
})
    .then((value) => {
        if(value !== 500) {
            fetchSalePlan(0)(dispatch)
                .then(() => {
                    message.info('添加成功!');
                });
        }else {
            message.info('添加失败!');
        }
    });

export const fetchCustomerList = (hint)  => axiosUtil('post', fetchCustomerListAddress, {
    hint: hint
});