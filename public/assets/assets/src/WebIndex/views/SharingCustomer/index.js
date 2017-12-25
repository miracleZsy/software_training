import React, { Component } from 'react';

class SharingCustomer extends Component {
    render() {
        return (
            <div className="sharingContainer">
                <div className="innerSideBar">
                    <div className="innerSideBarTitle">
                      贡献管理
                    </div>
                </div>
                <div className="sharingContent">
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

export default SharingCustomer;