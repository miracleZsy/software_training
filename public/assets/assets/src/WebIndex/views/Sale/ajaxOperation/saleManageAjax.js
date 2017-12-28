import axiosUtil from '../../../../lib/axiosUtil';
import * as saleManageAction from '../../Sale/actions/saleManageAction';
import { message } from 'antd';
import moment from 'moment';

const fetchSaleAnalyseAddress = '/software_training/public/sale/customerManage';
const fetchSalePlanAddress = '/software_training/public/sale/plan/list';
const addSalePlanAddress = '/software_training/public/sale/plan/insert';
const fetchCustomerListAddress = '/software_training/public/customer/getMyCustomers';
const fetchPlanDetailAddress = '/software_training/public/sale/plan/select';
const updateSalePlanAddress = '/software_training/public/sale/plan/update';
const deleteSalePlanAddress = '/software_training/public/sale/plan/delete';

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
    customerIds: salePlanAdded.customers,
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

export const fetchSaleDetail = (id) => (dispatch) => axiosUtil('post', fetchPlanDetailAddress, {
    id:id
})
    .then((value) => {
        if (value !== 500) {
            dispatch(saleManageAction.setSaleDetail(value));
        }else {
            message.info('获取失败');
        }
    });

export const updateSalePlan = (id, salePlanCreated) => (dispatch) => axiosUtil('post', updateSalePlanAddress, {
    title: salePlanCreated.title,
    customerIds: salePlanCreated.customers,
    content: salePlanCreated.content,
    actTime: moment(salePlanCreated.executeTime).format('YYYY-MM-DD'),
    id: id
})
    .then((value) => {
        if(value !== 500) {
            fetchSalePlan(0)(dispatch)
                .then(() => {
                    message.info('修改成功!');
                });
        }else {
            message.info('修改失败!');
        }
    });

export const deleteSalePlan = (id) => (dispatch) => axiosUtil('post', deleteSalePlanAddress, {
    id:id
})
    .then((value) => {
        if(value !== 500) {
            fetchSalePlan(0)(dispatch)  //加分页后要动
                .then(() => {
                    message.info('删除成功!');
                });
        }else {
            message.info('删除失败!');
        }
    });