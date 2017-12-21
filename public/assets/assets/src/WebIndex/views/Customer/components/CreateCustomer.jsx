import React from 'react';
import { Button, Modal, Form, Input, Row, Col, DatePicker, Select } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

const CreateCustomer = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, okText, title } = props;
        const { getFieldDecorator } = form;
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
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem label="姓名">
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入姓名!' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="性别">
                                {getFieldDecorator('sex', {
                                    rules: [{ required: true, message: '请选择性别!' }],
                                })(
                                    <Select
                                        placeholder="选择性别"
                                    >
                                        <Option value="男">男</Option>
                                        <Option value="女">女</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem label="生日">
                                {getFieldDecorator('birthday')(
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: 236 }} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="工作">
                                {getFieldDecorator('work')(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem label="客户类别">
                                {getFieldDecorator('customerType')(
                                    <Select
                                        placeholder="选择客户类别"
                                    >
                                        <Option value="一般客户">一般客户</Option>
                                        <Option value="意向客户">意向客户</Option>
                                        <Option value="已成交客户">已成交客户</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="手机号码">
                                {getFieldDecorator('tel')(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem label="邮件">
                                {getFieldDecorator('email', {
                                    rules: [{
                                        type: 'email', message: '请输入有效的邮箱地址',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="地址">
                                {getFieldDecorator('address')(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem label="来源">
                                {getFieldDecorator('source')(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="QQ">
                                {getFieldDecorator('qq')(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="备注">
                        {getFieldDecorator('remark')(<Input type="textarea" />)}
                    </FormItem>

                </Form>
            </Modal>
        );
    }
);

export default CreateCustomer;
