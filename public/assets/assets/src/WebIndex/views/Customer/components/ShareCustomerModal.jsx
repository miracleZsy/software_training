import React, { Component } from 'react';
import { Form, Modal, Select } from 'antd';
import jwt from 'jsonwebtoken';
import cookieUtil from '../../../../lib/cookieUtil';

const FormItem = Form.Item;
const Option = Select.Option;

const ShareCustomerModal = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, okText, title, form, staffData } = props;
        const { getFieldDecorator } = form;
        let myUuid = jwt.decode(cookieUtil.get('token')).uuid;
        // remove curren user
        const staffList = staffData.filter(item => item.uuid !== myUuid);
        return (
            <Modal
                width={300}
                visible={visible}
                title={title}
                okText={okText}
                onCancel={onCancel}
                onOk={onOk}
            >
                <Form layout="vertical">
                    <div>你想将此客户分享给哪位员工？</div>
                    <FormItem>
                        {getFieldDecorator('staff', {
                            rules: [{
                                required: true,
                                message: '请选择员工',
                            }]
                        })(
                            <Select
                                placeholder="选择员工"
                            >
                                {staffList.map((item) => (
                                    <Option key={item.uuid} value={item.uuid}>{item.name}</Option>
                                ))}
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);

export default ShareCustomerModal;