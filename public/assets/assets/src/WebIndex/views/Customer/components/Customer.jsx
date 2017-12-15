import React, { Component } from 'react';
import '../css/index.scss';
import CreateCustomer from './CreateCustomer';
import { Button } from 'antd';
class Customer extends Component {
    constructor() {
        super();
        this.state = {
            visible: false
        };
    }
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };
    saveFormRef = (form) => {
        this.form = form;
    };
    render() {
        return (
            <div className="customerContainer">
                <div className="customerLeft">
                    <div className="customerLeftTop">
                        我的客户
                    </div>
                    <div className="addCustomer">
                        <Button type="primary" onClick={this.showModal}>新增客户</Button>
                        <CreateCustomer
                            ref={this.saveFormRef}
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            onCreate={this.handleCreate}
                        />
                    </div>
                    <div className="customerLeftBottom">
                        <span>全部</span>
                        <span>一般客户</span>
                        <span>意向客户</span>
                        <span>已成交客户</span>
                    </div>
                </div>
                <div className="customerRight">

                </div>
            </div>
        );
    }
}

export default Customer;
