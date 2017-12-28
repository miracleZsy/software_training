import React, { Component } from 'react';
import { Button, Menu, Tag } from 'antd';
import SharingTable from './components/SharingTable';
import TimeTags from './components/TimeTags';
import { setSharingTime, setCurrentPage, setSharingType } from './actions';
import './style.scss';

const { CheckableTag } = Tag;

class SharingManagement extends Component {
    handleSideBarClick = ({ key }) => {
        this.props.setSharingType(key);
        // fetch
    }
    render() {
        const { setSharingTime, sharingTime } = this.props;
        return (
            <div className="sharingContainer">
                <div className="innerSideBar">
                    <div className="innerSideBarTitle">
                        共享管理
                    </div>
                    <div className="sharingSideBarBottom">
                        <Menu
                            onClick={this.handleSideBarClick}
                            defaultSelectedKeys={['1']}
                            mode="inline"
                        >
                            <Menu.Item key="sharing">我共享的客户</Menu.Item>
                            <Menu.Item key="received">共享给我的客户</Menu.Item>
                        </Menu>
                    </div>
                </div>
                <div className="sharingContent">
                    <div className="contentTopPanel">
                        <TimeTags setSharingTime={setSharingTime} sharingTime={sharingTime} />
                    </div>
                    <div className="contentTable">
                        <SharingTable />
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
        }
    };
};


export default SharingManagement;