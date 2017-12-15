import React from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
const FormItem = Form.Item;

const CreateCustomer = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="新增客户"
                okText="Create"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="姓名">
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入姓名!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="性别">
                        {getFieldDecorator('sex')(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="来源">
                        {getFieldDecorator('source')(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="工作">
                        {getFieldDecorator('work')(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="客户类别">
                        {getFieldDecorator('customerType')(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="手机号码">
                        {getFieldDecorator('tel')(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="邮件">
                        {getFieldDecorator('email')(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="地址">
                        {getFieldDecorator('address')(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="生日">
                        {getFieldDecorator('birthday')(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="QQ">
                        {getFieldDecorator('qq')(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="备注">
                        {getFieldDecorator('remark')(<Input type="textarea" />)}
                    </FormItem>

                </Form>
            </Modal>
        );
    }
);

export default CreateCustomer;
