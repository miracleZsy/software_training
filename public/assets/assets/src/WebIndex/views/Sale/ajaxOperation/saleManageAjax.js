import axiosUtil from '../../../../lib/axiosUtil';
import { message } from 'antd';
import * as saleManageAction from '../../Sale/actions/saleManageAction';

const fetchSaleAnalyseAddress = '/software_training/public/sale/customerManage';


export const fetchSaleAnalyse = (timeType) => (dispatch) => axiosUtil('post', fetchSaleAnalyseAddress, {
    timeType: timeType
})
    .then((value) => {
        if(value !== undefined) {
            dispatch(saleManageAction.fetchSaleAnalyse(value));
        }
    });


