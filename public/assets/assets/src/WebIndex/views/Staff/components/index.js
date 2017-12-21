import React, { Component } from 'react';
import { Button } from 'antd';
import '../css/index.scss';

class Staff extends Component {
    render() {
        return (
            <div className="staffContainer">
                <div className="innerSideBar">
                    <div className="innerSideBarTitle">
                      员工管理
                    </div>
                </div>
                <div className="staffContent">
                    <div className="contentTopPanel">
                        <Button icon="plus" type="primary">添加员工</Button>
                        <Button icon="plus" type="primary">批量导入员工</Button>
                        <div className="searchBar"></div>
                    </div>
                    <div></div>
                </div>
            </div>
        );
    }
}

export default Staff;