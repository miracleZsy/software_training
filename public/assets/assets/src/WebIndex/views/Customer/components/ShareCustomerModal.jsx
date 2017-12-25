import React, { Component } from 'react';
import { Form, Modal, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const ShareCustomerModalModal = Form.create()(
    (props) => {
        const { visible, onCancel, onOk, okText, title, form } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                width="300"
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
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);

export default ShareCustomerModalModal;