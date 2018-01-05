import React, { Component } from 'react';
import { Button, Input, Menu, Modal, Pagination } from 'antd';
import StaffInfoCard from './StaffInfoCard';
import CreateStaff from './CreateStaff';
import '../css/index.scss';
import { fetchStaff } from '../api';
import { connect } from 'react-redux';

const Search = Input.Search;
const SubMenu = Menu.SubMenu;
// const CardList = [1, 2, 3, 4, 5, 6, 7].map((ele) => 
//     <StaffInfoCard key={ele} />
// );

class Staff extends Component {
    componentWillMount() {
        this.props.fetchStaff(1);
    }
    state = { visible: false };
    handleMenuClick = () => {

    }
    handleAddStaff = () => {
        this.setState({
            visible: true,
        });
    }
    handleCreate = () => {}
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    render() {
        const { staffData, staffCount } = this.props;
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
                            <StaffInfoCard key={item.uuid} {...item} />
                        ))}
                    </div>
                    <div className="staffFooter" style={{ marginTop: "1rem" }}>
                        <Pagination style={{ float: "right" }} defaultCurrent={1} total={staffCount} />
                    </div>
                </div>
                <CreateStaff
                    visible={this.state.visible}
                    title="添加员工"
                    okText="创建"
                    onCreate={this.handleCreate}
                    onCancel={this.handleCancel}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        staffData: state.staffReducer.staffData,
        staffCount: state.staffReducer.staffCount,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStaff: (page) => {
            dispatch(fetchStaff(page));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Staff);