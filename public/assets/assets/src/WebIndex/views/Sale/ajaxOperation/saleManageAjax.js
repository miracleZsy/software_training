import axiosUtil from '../../../../lib/axiosUtil';
import * as saleManageAction from '../../Sale/actions/saleManageAction';

const fetchSaleAnalyseAddress = '/software_training/public/sale/customerManage';
const fetchSalePlanAddress = '/software_training/public/sale/plan/list';


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
