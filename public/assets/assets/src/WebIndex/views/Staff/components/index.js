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
            </div>
        );
    }
}

export default Staff;