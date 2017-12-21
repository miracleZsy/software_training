import React, { Component } from 'react';
import { Button, Input, Menu, Modal } from 'antd';
import StaffInfoCard from './StaffInfoCard';
import '../css/index.scss';

const Search = Input.Search;
const SubMenu = Menu.SubMenu;
const CardList = [1, 2, 3, 4, 5, 6, 7].map((ele) => 
    <StaffInfoCard key={ele} />
);

class Staff extends Component {
    render() {
        return (
            <div className="staffContainer">
                <div className="innerSideBar">
                    <div className="innerSideBarTitle">
                      员工管理
                    </div>
                    <Menu
                        onClick={this.handleClick}
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
                            <Button icon="plus" type="primary">添加员工</Button>
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
                        共有员工 2 名
                    </span>
                    <div className="cardList">
                        {CardList}
                    </div>
                </div>
            </div>
        );
    }
}

export default Staff;