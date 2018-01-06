import React, { Component } from 'react';
import { Modal } from 'antd';
import store from '../../../../store';
import './style.css';

const authorityList = store.getState().staffReducer.authorityList;

const StaffDetail = ({ visible, title, onCancel, staff }) => (
    <div>
        <Modal
            title={title}
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            <div className="staffDetailContainer">
                <div className="staffAvatar">
                    <img src={staff.pic_url} alt="staff avatar" />
                </div>
                <div className="staffInfoo">
                    <p>姓名：{staff.name}</p>
                    <p>用户名：{staff.username}</p>
                    <p>权限：{authorityList[Number(staff.authority) - 1]}</p>
                </div>
            </div>
        </Modal>
    </div>
);

export default StaffDetail;