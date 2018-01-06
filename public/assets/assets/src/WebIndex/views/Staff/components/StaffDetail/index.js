import React, { Component } from 'react';
import { Modal } from 'antd';
import './style.css';

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
                    <img src="http://o6ljw8wcq.bkt.clouddn.com/logo.jpg" alt="" />
                </div>
                <div className="staffInfoo">
                    <p>姓名：{staff.name}</p>
                    <p>用户名：{staff.username}</p>
                    <p>权限：{staff.authority}</p>
                </div>
            </div>
        </Modal>
    </div>
);

export default StaffDetail;