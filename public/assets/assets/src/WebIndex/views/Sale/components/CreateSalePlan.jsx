import React, { Component } from 'react';
import { Modal, Form, Input, Row, Col, DatePicker, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import * as saleManageAjax from '../ajaxOperation/saleManageAjax';
import debounce from 'lodash.debounce';



class FormCustomer extends Component {

    constructor() {
        super();
        this.state = {
            children: []
        };
    }
    searchCustomer = (value) => {
        const { customerList } = this.props;
        if (value !== '') {
            saleManageAjax.fetchCustomerList(value)
                .then((res) => {
                    if (res !== 500 && res !== undefined) {
                        let children = [];
                        res.forEach((item) => {
                            children.push(<Option key={item.id}>{item.name}</Option>);
                        });
                        this.setState({
                            children: res
                        });
                    }
                });
        }
    };

    handleChange = (value) => {
        console.log(`Selected: ${value}`);
    };
    render() {
        const { visible, onCancel, onCreate, form, okText, title } = this.props;
        const { getFieldDecorator } = form;
        const { children } = this.state;
        return (
            <Modal
                visible={visible}
                title={title}
                okText={okText}
                onCancel={onCancel}
                onOk={onCreate}
                cancelText="取消"
                style={{ top: 50 }}
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
                        {getFieldDecorator('executeTime', {
                            rules: [{ required: true, message: '请选择执行日期!' }],
                        })(
                            <DatePicker format="YYYY-MM-DD" style={{ width: 236 }} placeholder="请选择执行日期" />
                        )}
                    </FormItem>
                    <FormItem label="客户">
                        {getFieldDecorator('customers', {
                            rules: [{ required: true, message: '请选择客户!' }],
                        })(
                            <Select
                                mode="tags"
                                size="large"
                                placeholder="请选择客户"
                                onChange={this.handleChange}
                                onSearch={debounce(this.searchCustomer, 800)}
                                style={{ width: '100%' }}
                                filterOption={false}
                                labelInValue
                            >
                                {children.map(d => <Option key={d.id}>{d.name}</Option>)}
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
}


const CreateCustomer = Form.create()(FormCustomer);
export default CreateCustomer;
