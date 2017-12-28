import React, { Component } from 'react';
import { Modal, Form, Input, Row, Col, DatePicker, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import moment from 'moment';
import * as saleManageAjax from '../ajaxOperation/saleManageAjax';
import debounce from 'lodash.debounce';



class FormCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            children: [],
            ids:[]
        };
    }
    searchCustomer = (value) => {
        const { customerList } = this.props;
        if (value !== '') {
            saleManageAjax.fetchCustomerList(value)
                .then((res) => {
                    if (res !== 500 && res !== undefined) {
                        this.setState({
                            children: res
                        });
                    }
                });
        }
    };

    handleChange = (value) => {
        console.log(value);
    };
    fetchCustomer = (customers) => {
        let customer = [];
        if (customers !== undefined) {
            customers.forEach((item) => {
                customer.push({
                    key:item.id + "",
                    label:item.name
                });
            });
        }
        return customer;
    };
    render() {
        const { visible, onCancel, onCreate, form, okText, title, saleDetail } = this.props;
        const { getFieldDecorator } = form;
        const { children } = this.state;

        if(title == '修改计划') {
            getFieldDecorator('title', {
                initialValue:saleDetail !== undefined ? saleDetail['title'] : undefined,
            });
            getFieldDecorator('executeTime', {
                initialValue:saleDetail !== undefined ? moment(saleDetail['act_time']) : undefined,
            });
            getFieldDecorator('customers', {
                initialValue:saleDetail !== undefined ? this.fetchCustomer(saleDetail.customers) : undefined,
            });
            getFieldDecorator('content', {
                initialValue:saleDetail !== undefined ? saleDetail['content'] : '',
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
                style={{ top: 50 }}
            >
                <Form layout="vertical">
                    <FormItem label="标题">
                        {getFieldDecorator('title', {
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
                            rules: [{ required: true, message: '请选择客户!', type: 'array' }],
                        })(
                            <Select
                                mode="multiple"
                                size="large"
                                placeholder="请选择客户"
                                onChange={this.handleChange}
                                onSearch={debounce(this.searchCustomer, 800)}
                                style={{ width: '100%' }}
                                filterOption={false}
                                labelInValue
                            >
                                {JSON.stringify(saleDetail) !== {} && saleDetail !== undefined ? this.fetchCustomer(saleDetail.customers)
                                    .map((item) => <Option key={item.key} selected >{item.label}</Option> ) : (null)}
                                {children.map(d => <Option key={d.id}>{d.name}</Option>)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="内容">
                        {getFieldDecorator('content')(
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
