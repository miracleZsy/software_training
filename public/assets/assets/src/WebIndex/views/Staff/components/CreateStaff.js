import React, { Component } from 'react';
import { Form, Modal, Input, Icon, Button, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const CreateStaff = Form.create()(
    (props) => {
        const {
            visible, onCancel, onCreate, form, okText, title, checkStaff
        } = props;
        const { getFieldDecorator, setFieldsValue } = form;
        return (
            <Modal
                visible={visible}
                title={title}
                okText={okText}
                onCancel={onCancel}
                onOk={onCreate}
                style={{ top: 0 }}
            >
                <Form layout="vertical">
                    <FormItem label="用户名">
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="员工用户名" />
                        )}
                    </FormItem>
                    <FormItem label="姓名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入姓名' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="员工姓名" />
                        )}
                    </FormItem>
                    <FormItem label="密码">
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }],
                        })(
                            <Input type="password" prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />
                        )}
                    </FormItem>
                    <FormItem label="权限">
                        {
                            getFieldDecorator('authority', {
                                rules: [{ required: true, message: '请选择权限' }],
                            })(
                                <Select
                                    placeholder="选择员工权限"
                                >
                                    <Option value="2">销售总监</Option>
                                    <Option value="3">普通销售</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);


export default CreateStaff;