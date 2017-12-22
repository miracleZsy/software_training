import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/index.scss';
import * as customerAjax from '../ajaxOperation/customerAjax';
import CreateCustomer from './CreateCustomer';
import { Button } from 'antd';
import CustomerRightTopContainer from "./CustomerRightTopContainer";
import CustomerTable from "./CustomerTable";
import cookieUtil from '../../../../lib/cookieUtil';

class Customer extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
        };
    }
    componentWillMount() {
        // console.log(cookieUtil.get('token'));
    }
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleCreate = () => {
        const form = this.form;
        const { addCustomer } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // console.log('Received values of form: ', values);
            // console.log(moment(values.birthday).format('YYYY-MM-DD'));
            addCustomer(values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };
    saveFormRef = (form) => {
        this.form = form;
    };
    getContent = (e) => {
        // console.log(e.target.innerHTML);
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
                            title="新增用户"
                            okText="创建"
                        />
                    </div>
                    <div className="customerLeftBottom">
                        <span onClick={this.getContent}>全部</span>
                        <span>一般客户</span>
                        <span>意向客户</span>
                        <span>已成交客户</span>
                    </div>
                </div>
                <div className="customerRight">
                    <CustomerRightTopContainer />
                    <div className="customerInforTable">
                        <CustomerTable />
                    </div>
                </div>
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         customerData: state.customerReducer.customerData,
//     };
// };

const mapDispatchToProps = (dispatch) => {
    return {
        addCustomer: (customerCreated) => {
            dispatch(customerAjax.addCustomer(customerCreated));
        },
    };
};
export default connect(null, mapDispatchToProps)(Customer);
