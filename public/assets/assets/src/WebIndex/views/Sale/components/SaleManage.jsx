import React,  { Component } from 'react';
import { Button } from 'antd';
import '../css/index.scss';
import SaleManageRightTopContainer from './SaleManageRightTopContainer';
import SaleCustomerAnalyse from "./SaleCustomerAnalyse";

class SaleManage extends Component {
    render() {
        return(
            <div className="saleManageContainer">
                <div className="saleManageLeft">
                    <div className="saleManageLeftTop">
                        销售管理
                    </div>
                    <div className="addSalePlan">
                        <Button type="primary" onClick={this.showModal}>新增销售计划</Button>
                    </div>
                    <div className="saleManageLeftBottom">
                        <span value="0">客户数量统计</span>
                        <span value="1">客户活跃度统计</span>
                        <span value="2">客户创建记录统计</span>
                        {/*<span value="1" className={`${customerType == 1 ? 'current' : ''}`} onClick={this.changeCurrentCustomerType}>一般客户 ({simpleCustomerCount})</span>*/}
                        {/*<span value="2" className={`${customerType == 2 ? 'current' : ''}`} onClick={this.changeCurrentCustomerType}>意向客户 ({purposeCustomerCount})</span>*/}
                        {/*<span value="3"  className={`${customerType == 3 ? 'current' : ''}`} onClick={this.changeCurrentCustomerType}>已成交客户 ({finishCustomerCount})</span>*/}
                    </div>
                </div>
                <div className="saleManageRight">
                    <SaleManageRightTopContainer />
                    <div className="saleManageInfor">
                        {/*<CustomerTable />*/}
                        <SaleCustomerAnalyse />
                    </div>
                </div>
            </div>
        );
    }

}

export default SaleManage;