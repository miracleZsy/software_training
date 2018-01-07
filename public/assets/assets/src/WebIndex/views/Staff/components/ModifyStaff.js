import React, { Component } from 'react';
import { Form, Modal, Input, Icon, Button, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const ModifyStaff = Form.create()(
    (props) => {
        const {
            staff, visible, onCancel, onOk, form, okText, title, checkStaff
        } = props;
        const { getFieldDecorator, setFieldsValue } = form;
        return (
            <Modal
                visible={visible}
                title={title}
                okText={okText}
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
                                initialValue: staff.authority,
                            })(
                                <Select
                                    placeholder="选择员工权限"
                                >
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
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