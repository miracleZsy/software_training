import axiosUtil from '../../../../lib/axiosUtil';
import { message } from 'antd';
import * as actions from '../actions';

const fetchStaffUrl = '/software_training/public/user/list';
const createStaffUrl = '/software_training/public/user/insert';
const modifyStaffUrl = '/software_training/public/user/update';
const deleteStaffUrl = '/software_training/public/user/delete';

export const fetchStaff = (page = 1) => (dispatch) => axiosUtil('post', fetchStaffUrl, {
    page, 
}).then((value) => {
    if (value !== undefined) {
        dispatch(actions.fetchStaff(value.user));
        dispatch(actions.setStaffCount(value.count));
    }
});

export const createStaff = ({ username, password, authority, name }) => (dispatch) => axiosUtil('post', createStaffUrl, {
    username,
    password,
    authority,
    name,
}).then((value) => {
    if (value === 500) {
        message.info('创建失败！');
    } else if(value === 403) {
        message.info('创建失败，无权限！');
    } else if(value === 405) {
        message.info('修改失败，用户名被占用！');
    } else {
        dispatch(actions.createStaff({
            id: value,
            username,
            password,
            authority,
            name,
        }));
        message.info('创建成功！');
    }
});

export const modifyStaff = ({ uuid, username, password, authority, name }) => (dispatch) => axiosUtil('post', modifyStaffUrl, {
    uuid,
    username,
    password, 
    authority,
    name,
}).then((value) => {
    if (value === 500) {
        message.info('修改失败!');
    } else if(value === 403) {
        message.info('修改失败，无权限！');
    } else if(value === 405) {
        message.info('修改失败，用户名被占用！');
    } else {
        dispatch(actions.modifyStaff({
            uuid,
            username,
            password,
            authority,
            name,
        }));
        message.info('修改成功！');
    }
});

export const deleteStaff = (uuid) =>  (dispatch) => axiosUtil('post', deleteStaffUrl, {
    uuid,
}).then((value) => {
    if (value === 403 || value === 500) {
        message.info('删除失败!');
    } else {
        dispatch(actions.deleteStaff(uuid));
        message.info('删除成功!');
    }
});
