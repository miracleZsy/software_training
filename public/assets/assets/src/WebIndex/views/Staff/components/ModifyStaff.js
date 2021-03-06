import React, { Component } from 'react';
import { Form, Modal, Input, Icon, Button, Select } from 'antd';
import store from '../../../store';
import isBoss from '../../../../lib/isBoss';
import cookieUtil from '../../../../lib/cookieUtil';
import jwt from 'jsonwebtoken';

const authorityList = store.getState().staffReducer.authorityList;
const FormItem = Form.Item;
const Option = Select.Option;

const ModifyStaff = Form.create()(
    (props) => {
        const {
            visible, onCancel, onOk, form, okText, title, checkStaff
        } = props;
        const { getFieldDecorator, setFieldsValue } = form;
        const staff = store.getState().staffReducer.activeStaff;
        return (
            <Modal
                visible={visible}
                title={title}
                okText={okText}
                cancelText="取消"
                onCancel={onCancel}
                onOk={onOk}
                style={{ top: 0 }}
            >
                <Form layout="vertical">
                    <FormItem label="用户名">
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名' }],
                            initialValue: staff.username,
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="员工用户名" />
                        )}
                    </FormItem>
                    <FormItem label="姓名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入姓名' }],
                            initialValue: staff.name,
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="员工姓名" />
                        )}
                    </FormItem>
                    <FormItem label="权限">
                        {
                            getFieldDecorator('authority', {
                                rules: [{ required: true, message: '请选择权限' }],
                                initialValue: authorityList[Number(staff.authority) - 1]
                            })(
                                <Select
                                    placeholder="选择员工权限"
                                    disabled={staff.authority == jwt.decode(cookieUtil.get('token')).authority}
                                >
                                    <Option value="销售总监">销售总监</Option>
                                    <Option value="普通销售">普通销售</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);


export default ModifyStaff;