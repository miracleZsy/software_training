import axiosUtil from '../../../../lib/axiosUtil';
import { message } from 'antd';
import * as saleManageAction from '../../Sale/actions/saleManageAction';
import * as customerTypeCountAction from '../../Customer/actions/customerTypeCountAction';
import * as customerDetailAction from '../../Customer/actions/customerDetailAction';
import moment from 'moment';

const fetchSaleAnalyseAddress = '/software_training/public/sale/customerManage';


export const fetchSaleAnalyse = (start, end) => (dispatch) => axiosUtil('post', fetchSaleAnalyseAddress, {
    start: start,
    end: end
})
    .then((value) => {
        if(value !== undefined) {
            // dispatch(saleManageAction.(value);
        }
    });


