import axiosUtil from '../../../../lib/axiosUtil';
import { message } from 'antd';
import * as saleManageAction from '../../Sale/actions/saleManageAction';

const fetchSaleAnalyseAddress = '/software_training/public/sale/customerManage';


export const fetchSaleAnalyse = (timeType) => (dispatch) => axiosUtil('post', fetchSaleAnalyseAddress, {
    time: timeType
})
    .then((value) => {
        if(value !== undefined) {
            dispatch(saleManageAction.fetchSaleAnalyse(value));
            let timeChartArr = [];
            value.forEach(function (item) {
                timeChartArr.push(item.time);
            });
            dispatch(saleManageAction.setTimeChart(timeChartArr));
            let customerAmount = [];
            value.forEach(function (item) {
                customerAmount.push(item.amount);
            });
            dispatch(saleManageAction.setCustomerAmount(customerAmount));
        }
    });


