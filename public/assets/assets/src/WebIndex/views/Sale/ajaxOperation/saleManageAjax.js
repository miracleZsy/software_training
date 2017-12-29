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


export const fetchSalePlan = (timeType, page ) => (dispatch) => axiosUtil('post', fetchSalePlanAddress, {
    time: timeType,
    page: page
})
    .then((value) => {
        if(value !== undefined) {
            dispatch(saleManageAction.setSalePlan(value.data));
            dispatch(saleManageAction.setSaleCount(value.count));
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
            fetchSalePlan(0, 1)(dispatch)
                .then(() => {
                    dispatch(saleManageAction.setSaleTimeType(0));
                    dispatch(saleManageAction.setSaleCurrentPage(0));
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

export const updateSalePlan = (id, salePlanCreated, saleTimeType, saleCurrentPage) => (dispatch) => axiosUtil('post', updateSalePlanAddress, {
    title: salePlanCreated.title,
    customerIds: salePlanCreated.customers,
    content: salePlanCreated.content,
    actTime: moment(salePlanCreated.executeTime).format('YYYY-MM-DD'),
    id: id
})
    .then((value) => {
        if(value !== 500) {
            fetchSalePlan(saleTimeType, saleCurrentPage)(dispatch)
                .then(() => {
                    message.info('修改成功!');
                });
        }else {
            message.info('修改失败!');
        }
    });

export const deleteSalePlan = (id, saleTimeType, saleCurrentPage) => (dispatch) => axiosUtil('post', deleteSalePlanAddress, {
    id:id
})
    .then((value) => {
        if(value !== 500) {
            fetchSalePlan(saleTimeType, saleCurrentPage)(dispatch)  //加分页后要动
                .then(() => {
                    message.info('删除成功!');
                });
        }else {
            message.info('删除失败!');
        }
    });