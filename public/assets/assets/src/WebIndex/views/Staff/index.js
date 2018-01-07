import React, { Component } from 'react';
import { Button, Input, Menu, Modal, Pagination } from 'antd';
import StaffInfoCard from './components/StaffInfoCard';
import CreateStaff from './components/CreateStaff';
import StaffDetail from './components/StaffDetail';
import ModifyStaff from './components/ModifyStaff';
import { fetchStaff, createStaff, modifyStaff, deleteStaff } from './ajaxOperations';
import { setActiveStaff } from './actions';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import cookieUtil from '../../../lib/cookieUtil';
import './css/index.scss';

const Search = Input.Search;
const SubMenu = Menu.SubMenu;

class Staff extends Component {
    state = { visible: false, detailVisible: false, modifyVisible: false };
    componentWillMount() {
        this.props.fetchStaff(1);
    }
    handleOnPageChange = (page, pageSize) => {
        this.props.fetchStaff(page);
    }
    handleAddStaff = () => {
        this.setState({
            visible: true,
        });
    }
    handleCreate = () => {
        const staffForm = this.staffForm;
        staffForm.validateFields((err, value) => {
            if(err) return;
            console.log('staffFrom', value);
            this.props.createStaff(value);
            this.setState({
                visible: false,
            });
        });
    }
    handleModify = () => {
        const modifyForm = this.modifyForm;
        modifyForm.validateFields((err, value) => {
            if (err) return;
            value.authority = this.props.authorityList.indexOf(value.authority) + 1;
            this.props.modifyStaff({ ...value, uuid: this.props.activeStaff.uuid });
            this.setState({
                modifyVisible: false,
            });
            modifyForm.resetFields();
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    handleModifyCancel = () => {
        const modifyForm = this.modifyForm;
        this.setState({
            modifyVisible: false,
        });
        modifyForm.resetFields();
    }
    handleStaffModalOpen = (staff) => {
        this.props.setActiveStaff(staff);
        this.setState({
            detailVisible: true,
        });
    }
    handleModifyModalOpen = (staff) => {
        this.props.setActiveStaff(staff);
        this.setState({
            modifyVisible: true,
        });
    } 
    handleStaffModalClose = () => {
        this.setState({
            detailVisible: false,
        });
    }
    handleDeleteStaff = (uuid) => {
        this.props.deleteStaff(uuid);
    }
    render() {
        const { staffData, staffCount, activeStaff } = this.props;
        const { detailVisible } = this.state;
        const { companyName } = jwt.decode(cookieUtil.get('token'));
        return (
            <div className="staffContainer">
                <div className="staffContent">
                    <div className="contentTopPanel">
                        <div className="btn-group">
                            <Button icon="plus" type="primary" onClick={this.handleAddStaff}>添加员工</Button>
                        </div>
                    </div>
                    <h2 style={{ margin: "5px 0" }}>{ companyName }</h2>
                    <span style={{ display: "block", fontSize: "1.05rem" }}>
                        共有员工 { staffCount } 名
                    </span>
                    <div className="cardList">
                        {staffData.map((item) => (
                            <StaffInfoCard
                                key={item.uuid}
                                staff={item}
                                openStaffModal={this.handleStaffModalOpen}
                                openModifyModal={this.handleModifyModalOpen}
                                deleteStaff={this.handleDeleteStaff}
                            />
                        ))}
                    </div>
                    <div className="staffFooter" style={{ marginTop: "1rem" }}>
                        <Pagination
                            onChange={this.handleOnPageChange}
                            style={{ float: "right" }}
                            defaultCurrent={1}
                            total={staffCount} />
                    </div>
                </div>
                <CreateStaff
                    ref={(staffForm) => {
                        this.staffForm = staffForm;
                    }}
                    visible={this.state.visible}
                    title="添加员工"
                    okText="创建"
                    onCreate={this.handleCreate}
                    onCancel={this.handleCancel}
                />
                <ModifyStaff
                    ref={(form) => {
                        this.modifyForm = form;
                    }}
                    visible={this.state.modifyVisible}
                    title="修改员工信息"
                    okText="修改"
                    onOk={this.handleModify}
                    onCancel={this.handleModifyCancel}
                />
                <StaffDetail
                    visible={detailVisible}
                    staff={activeStaff}
                    title="员工信息"
                    onCancel={this.handleStaffModalClose}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        staffData: state.staffReducer.staffData,
        staffCount: state.staffReducer.staffCount,
        activeStaff: state.staffReducer.activeStaff,
        authorityList: state.staffReducer.authorityList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStaff: (page) => {
            dispatch(fetchStaff(page));
        },
        createStaff: (staff) => {
            dispatch(createStaff(staff));
        },
        setActiveStaff:(staff) => {
            dispatch(setActiveStaff(staff));
        },
        modifyStaff: (staff) => {
            dispatch(modifyStaff(staff));
        },
        deleteStaff: (uuid) => {
            dispatch(deleteStaff(uuid));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Staff);