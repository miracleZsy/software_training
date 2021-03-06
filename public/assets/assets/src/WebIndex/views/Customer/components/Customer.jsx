import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/index.scss';
import * as customerAjax from '../ajaxOperation/customerAjax';
import CreateCustomer from './CreateCustomer';
import { Button, Select } from 'antd';
import CustomerRightTopContainer from "./CustomerRightTopContainer";
import CustomerTable from "./CustomerTable";
import * as phaseAndTimeAction from '../actions/phaseAndTimeAction';
import CustomerPermission from './CustomerPermission';
import cookieUtil from '../../../../lib/cookieUtil';
import jwt from 'jsonwebtoken';

class Customer extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            customerPermissionVisible: false,
        };
    }
    componentWillMount() {
        const { fetchCustomerTypeCount, setStaffUuid } = this.props;
        fetchCustomerTypeCount();
        if(jwt.decode(cookieUtil.get('token')) !== null) {
            let authority = jwt.decode(cookieUtil.get('token')).authority;
            setStaffUuid(jwt.decode(cookieUtil.get('token')).uuid);
            if(authority != null && parseInt(authority) <= 2) {
                this.setState({
                    customerPermissionVisible:true
                });
            }else {
                this.setState({
                    customerPermissionVisible:false
                });
            }
        }
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
        const { setCustomerType, fetchCustomer, phaseType, time, currentPage, customerType, setCurrentPage, staffUuid } = this.props;
        console.log(e.target.getAttribute('value'));
        setCustomerType(e.target.getAttribute('value'));
        setCurrentPage(1);
        fetchCustomer(phaseType, time, 1, e.target.getAttribute('value'), staffUuid);
    };
    render() {
        const { customerType, totalCustomerCount, simpleCustomerCount, purposeCustomerCount, finishCustomerCount, setStaffUuid } = this.props;
        const { customerPermissionVisible } = this.state;
        return (
            <div className="customerContainer">
                <div className="customerLeft">
                    <div className="customerPermission">
                        {
                            customerPermissionVisible === true ?
                                <CustomerPermission
                                    setStaffUuid={setStaffUuid}
                                /> : (null)
                        }
                    </div>
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
                            title="新增客户"
                            okText="创建"
                        />
                    </div>
                    <div className="customerLeftBottom">
                        <span value="0" className={`${customerType == 0 ? 'current' : ''}`} onClick={this.changeCurrentCustomerType}>全部 ({totalCustomerCount})</span>
                        <span value="1" className={`${customerType == 1 ? 'current' : ''}`} onClick={this.changeCurrentCustomerType}>一般客户 ({simpleCustomerCount})</span>
                        <span value="2" className={`${customerType == 2 ? 'current' : ''}`} onClick={this.changeCurrentCustomerType}>意向客户 ({purposeCustomerCount})</span>
                        <span value="3"  className={`${customerType == 3 ? 'current' : ''}`} onClick={this.changeCurrentCustomerType}>已成交客户 ({finishCustomerCount})</span>
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
        finishCustomerCount: state.customerTypeCountReducer.finishCustomerCount,
        sidebarClosed: state.hideSideReducer.sidebarClosed,
        staffUuid: state.phaseAndTimeReducer.staffUuid
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
        },
        fetchCustomerTypeCount:(staffUuid) => {
            dispatch(customerAjax.fetchCustomerTypeCount(staffUuid));
        },
        fetchCustomer: (phaseType, time, page, customerType, staffUuid) => {
            dispatch(customerAjax.fetchCustomer(phaseType, time, page, customerType, staffUuid));
        },
        setStaffUuid:(staffUuid) => {
            dispatch(phaseAndTimeAction.setStaffUuId(staffUuid));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Customer);
