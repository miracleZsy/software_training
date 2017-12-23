import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/index.scss';
import * as customerAjax from '../ajaxOperation/customerAjax';
import CreateCustomer from './CreateCustomer';
import { Button } from 'antd';
import CustomerRightTopContainer from "./CustomerRightTopContainer";
import CustomerTable from "./CustomerTable";
import cookieUtil from '../../../../lib/cookieUtil';
import jwt from 'jsonwebtoken';
import * as phaseAndTimeAction from '../actions/phaseAndTimeAction';


class Customer extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
        };
    }
    componentWillMount() {
        // console.log(cookieUtil.get('token'));
        // console.log(jwt.decode(cookieUtil.get('token')));
        if(jwt.decode(cookieUtil.get('token')) === null) {
            // window.location.href = '/software_training/public/index#/login';
        }else {

        }
        // console.log(jwt.decode(cookieUtil.get('token')));
        // console.log(jwt.decode(cookieUtil.get('token')) === '');
    }
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleCreate = () => {
        const form = this.form;
        const { addCustomer, phaseType, time, currentPage, customerType, setPhaseType, setTime, setCustomerType, setCurrentPage } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // console.log('Received values of form: ', values);
            // console.log(moment(values.birthday).format('YYYY-MM-DD'));
            setPhaseType(0);
            setTime(0);
            setCustomerType(0);
            setCurrentPage(1);
            addCustomer(values, phaseType, time, currentPage, customerType);
            form.resetFields();
            this.setState({ visible: false });
        });
    };
    saveFormRef = (form) => {
        this.form = form;
    };
    changeCurrentCustomerType = (e) => {
        const { setCustomerType } = this.prop;
        setCustomerType(e.target.getAttribute('value'));
    };
    render() {
        const { customerType, totalCustomerCount, simpleCustomerCount, purposeCustomerCount, finishCustomerCount } = this.props;
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
                        <span value="0" className={`${customerType === 0 ? 'current' : ''}`} onClick={this.changeCurrentCustomerType}>全部 ({totalCustomerCount})</span>
                        <span value="1" className={`${customerType === 1 ? 'current' : ''}`} onClick={this.changeCurrentCustomerType}>一般客户 ({simpleCustomerCount})</span>
                        <span value="2" className={`${customerType === 2 ? 'current' : ''}`} onClick={this.changeCurrentCustomerType}>意向客户 ({purposeCustomerCount})</span>
                        <span value="3"  className={`${customerType === 3 ? 'current' : ''}`} onClick={this.changeCurrentCustomerType}>已成交客户 ({finishCustomerCount})</span>
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

const mapStateToProps = (state) => {
    return {
        phaseType: state.phaseAndTimeReducer.phaseType,
        time: state.phaseAndTimeReducer.time,
        currentPage:state.phaseAndTimeReducer.currentPage,
        customerType: state.phaseAndTimeReducer.customerType,
        totalCustomerCount: state.customerTypeCountReducer.totalCustomerCount,
        simpleCustomerCount:state.customerTypeCountReducer.simpleCustomerCount,
        purposeCustomerCount: state.customerTypeCountReducer.purposeCustomerCount,
        finishCustomerCount: state.customerTypeCountReducer.finishCustomerCount
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addCustomer: (customerCreated, phaseType, time, currentPage, customerType ) => {
            dispatch(customerAjax.addCustomer(customerCreated,  phaseType, time, currentPage, customerType ));
        },
        setPhaseType: (phaseType) => {
            dispatch(phaseAndTimeAction.setPhaseType(phaseType));
        },
        setTime: (time) => {
            dispatch(phaseAndTimeAction.setTime(time));
        },
        setCurrentPage: (currentPage) => {
            dispatch(phaseAndTimeAction.setCurrentPage(currentPage));
        },
        setCustomerType: (customerType) => {
            dispatch(phaseAndTimeAction.setCustomerType(customerType));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
