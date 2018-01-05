import React, { Component } from 'react';
import { Button, Input, Menu, Modal, Pagination } from 'antd';
import StaffInfoCard from './StaffInfoCard';
import CreateStaff from './CreateStaff';
import StaffDetail from './StaffDetail';
import ModifyStaff from './ModifyStaff';
import { fetchStaff, createStaff, modifyStaff, deleteStaff } from '../api';
import { setActiveStaff } from '../actions';
import { connect } from 'react-redux';
import '../css/index.scss';

const Search = Input.Search;
const SubMenu = Menu.SubMenu;

class Staff extends Component {
    componentWillMount() {
        this.props.fetchStaff(1);
    }
    state = { visible: false, detailVisible: false, modifyVisible: false, };
    handleMenuClick = () => {

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
            this.props.modifyStaff({ ...value, uuid: this.props.activeStaff.uuid });
            this.setState({
                modifyVisible: false,
            });
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    handleModifyCancel = () => {
        this.setState({
            modifyVisible: false,
        });
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
    handleDeleteStaff = (id) => {
        this.props.deleteStaff(id);
    }
    render() {
        const { staffData, staffCount, activeStaff } = this.props;
        const { detailVisible } = this.state;
        return (
            <div className="staffContainer">
                <div className="innerSideBar">
                    <div className="innerSideBarTitle">
                      员工管理
                    </div>
                    <Menu
                        onClick={this.handleMenuClick}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"    
                    >
                        <SubMenu key="sub1" title={<span>组织架构</span>}>
                            <Menu.Item key="1">杭州阿里巴巴有限公司</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div className="staffContent">
                    <div className="contentTopPanel">
                        <div className="btn-group">
                            <Button icon="plus" type="primary" onClick={this.handleAddStaff}>添加员工</Button>
                            <Button icon="plus" type="primary">批量导入员工</Button>
                        </div>
                        <div className="searchBar">
                            <Search
                                placeholder="员工姓名/ID"
                                onSearch={value => console.log(value)}
                                style={{ width: 200 }}
                            />
                        </div>
                    </div>
                    <h2 style={{ margin: "5px 0" }}>杭州阿里巴巴有限公司</h2>
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
                        <Pagination style={{ float: "right" }} defaultCurrent={1} total={staffCount} />
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
                    staff={activeStaff}
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