import axiosUtil from '../../../../lib/axiosUtil';
import { message } from 'antd';
import * as actions from '../actions';

const fetchStaffUrl = '/software_training/public/user/list';

export const fetchStaff = (page = 1) => (dispatch) => axiosUtil('post', fetchStaffUrl, {
    page, 
}).then((value) => {
    if (value !== undefined) {
        dispatch(actions.fetchStaff(value.user));
        dispatch(actions.setStaffCount(value.count));
    }
});