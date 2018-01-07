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
        return message.info('创建失败！');
    } else if(value === 403) {
        return message.info('创建失败，无权限！');
    } else if(value === 405) {
        return message.info('修改失败，用户名被占用！');
    } else {
        dispatch(actions.createStaff({
            uuid: value,
            username,
            password,
            authority,
            name,
        }));
        return message.info('创建成功！');
    }
});

export const modifyStaff = ({ uuid, username, authority, name }) => (dispatch) => axiosUtil('post', modifyStaffUrl, {
    uuid,
    username,
    authority,
    name,
}).then((value) => {
    if (value === 500) {
        return message.info('修改失败!');
    } else if(value === 403) {
        return message.info('修改失败，无权限！');
    } else if(value === 405) {
        return message.info('修改失败，用户名被占用！');
    } else {
        dispatch(actions.modifyStaff({
            uuid,
            username,
            authority,
            name,
        }));
        return message.info('修改成功！');
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
