import React from 'react';
import { Modal, Form, Input, Row, Col, DatePicker, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const CreateCustomer = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, okText, title } = props;
        const { getFieldDecorator } = form;

        const children = [];
        for (let i = 10; i < 36; i++) {
            children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        }
        function handleChange(value) {
            console.log(`Selected: ${value}`);
        }

        return (
            <Modal
                visible={visible}
                title={title}
                okText={okText}
                onCancel={onCancel}
                onOk={onCreate}
                style={{ top: 30 }}
            >
                <Form layout="vertical">
                    <FormItem label="标题">
                        {getFieldDecorator('title', {
                            // initialValue:checkedCustomer !== undefined ? checkedCustomer['name'] : '',
                            rules: [{ required: true, message: '请输入标题!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem label="执行日期">
                        {getFieldDecorator('executeDate', {
                            rules: [{ required: true, message: '请选择执行日期!' }],
                        })(
                            <DatePicker format="YYYY-MM-DD" style={{ width: 236 }} placeholder="请选择执行日期" />
                        )}
                    </FormItem>
                    <FormItem label="客户">
                        {getFieldDecorator('customer', {
                            rules: [{ required: true, message: '请选择客户!' }],
                        })(
                            <Select
                                mode="tags"
                                size="large"
                                placeholder="请选择客户"
                                onChange={handleChange}
                                style={{ width: '100%' }}
                            >
                                {children}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="内容">
                        {getFieldDecorator('content', {
                            // initialValue:checkedCustomer !== undefined ? checkedCustomer['remark'] : '',
                        })(
                            <Input type="textarea" />
                        )}
                    </FormItem>

                </Form>
            </Modal>
        );
    }
);

export default CreateCustomer;
