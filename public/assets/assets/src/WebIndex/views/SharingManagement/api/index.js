import axiosUtil from '../../../../lib/axiosUtil';
import { message } from 'antd';
import * as actions from '../actions';

const fetchSharedCustomerUrl = '/software_training/public/share/sharedList';

// Todo
export const fetchSharedCustomer = (time = 0, page = 1) => (dispatch) => axiosUtil('get', fetchSharedCustomerUrl, {
    time,   
    page, 
}).then((value) => {
    if (value !== undefined) {
        dispatch(actions.fetchSharedCustomer(value.customer));
    }
});

// Todo
export const deleteSharedCustomer = () =>  {
    
};
