import React, { Component } from 'react';
import { Button, Menu, Tag } from 'antd';
import SharingTable from './components/SharingTable';
import { setSharingTime, setCurrentPage, setSharingType } from './actions';
import { fetchSharedCustomer, fetchReceivedCustomer } from './api';
import { connect } from 'react-redux';
import './style.scss';

const { CheckableTag } = Tag;

class SharingManagement extends Component {
    componentWillMount() {
        this.props.fetchSharedCustomer(0, 1);
        this.props.fetchReceivedCustomer(0, 1);
    }
    handleSideBarClick = ({ key }) => {
        this.props.setSharingType(key);
        // fetch
    }
    render() {
        const { setSharingTime, sharingTime, sharingType, sharedCustomerData, receivedCustomerData } = this.props;
        return (
            <div className="sharingContainer">
                <div className="innerSideBar">
                    <div className="innerSideBarTitle">
                        共享管理
                    </div>
                    <div className="sharingSideBarBottom">
                        <Menu
                            onClick={this.handleSideBarClick}
                            defaultSelectedKeys={['0']}
                            mode="inline"
                        >
                            <Menu.Item key="0">我共享的客户</Menu.Item>
                            <Menu.Item key="1">共享给我的客户</Menu.Item>
                        </Menu>
                    </div>
                </div>
                <div className="sharingContent">

                    <div className="contentTable">
                        { sharingType == 0 && <SharingTable data={sharedCustomerData} /> }
                        { sharingType == 1 && <SharingTable data={receivedCustomerData} /> }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ sharingManagementReducer }) => {
    return {
        sharingTime: sharingManagementReducer.time,
        currentPage: sharingManagementReducer.currentPage,
        sharingType: sharingManagementReducer.sharingType,
        sharedCustomerData: sharingManagementReducer.sharedCustomerData,
        receivedCustomerData: sharingManagementReducer.receivedCustomerData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSharingTime: (time) => {
            dispatch(setSharingTime(time));
        },
        setCurrentPage: (page) => {
            dispatch(setCurrentPage(page));
        },
        setSharingType: (type) => {
            dispatch(setSharingType(type));
        },
        fetchSharedCustomer:(time, currentPage) => {
            dispatch(fetchSharedCustomer(time, currentPage));
        },
        fetchReceivedCustomer:(time, currentPage) => {
            dispatch(fetchReceivedCustomer(time, currentPage));
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SharingManagement);