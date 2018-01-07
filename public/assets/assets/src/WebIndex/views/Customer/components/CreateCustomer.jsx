import React from 'react';
import { Button, Modal, Form, Input, Row, Col, DatePicker, Select } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

const CreateCustomer = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form, okText, title, checkedCustomer } = props;
        const { getFieldDecorator, setFieldsValue } = form;

        if(title === '修改客户') {
            getFieldDecorator('birthday', {
                initialValue: checkedCustomer !== undefined ? moment(checkedCustomer['birthday']) : moment(),
            });
            getFieldDecorator('sex', {
                initialValue:checkedCustomer !== undefined ? (checkedCustomer['sex']) : '请选择性别',
            });
            getFieldDecorator('type', {
                initialValue:checkedCustomer !== undefined ? checkedCustomer['type'] : '请选择客户类型',
            });
        }
        return (
            <Modal
                visible={visible}
                title={title}
                okText={okText}
                onCancel={onCancel}
                onOk={onCreate}
                cancelText="取消"
                style={{ top: 15 }}
            >
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem label="姓名">
                                {getFieldDecorator('name', {
                                    initialValue:checkedCustomer !== undefined ? checkedCustomer['name'] : '',
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
                                        placeholder="请选择性别"
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
                                {getFieldDecorator('birthday', {
                                    rules: [{ required: true, message: '请选择生日!' }],
                                })(
                                    <DatePicker format="YYYY-MM-DD" style={{ width: 236 }} placeholder="请选择生日" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="工作">
                                {getFieldDecorator('work', {
                                    initialValue:checkedCustomer !== undefined ? checkedCustomer['work'] : '',
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem label="客户类别">
                                {getFieldDecorator('type', {
                                    rules: [{ required: true, message: '请选择客户类别!' }],
                                })(
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
                                {getFieldDecorator('tel', {
                                    initialValue:checkedCustomer !== undefined ? checkedCustomer['tel'] : '',
                                    rules: [
                                        { required: true, message: '请输入正确的手机号!', pattern: new RegExp('^1[3,4,5,7,8]\\d{9}$') }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem label="邮件">
                                {getFieldDecorator('email', {
                                    initialValue:checkedCustomer !== undefined ? checkedCustomer['email'] : '',
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
                                {getFieldDecorator('address', {
                                    initialValue:checkedCustomer !== undefined ? checkedCustomer['address'] : '',
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem label="来源">
                                {getFieldDecorator('origin', {
                                    initialValue:checkedCustomer !== undefined ? checkedCustomer['origin'] : '',
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="QQ">
                                {getFieldDecorator('QQ', {
                                    initialValue:checkedCustomer !== undefined ? checkedCustomer['QQ'] : '',
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="备注">
                        {getFieldDecorator('remark', {
                            initialValue:checkedCustomer !== undefined ? checkedCustomer['remark'] : '',
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
