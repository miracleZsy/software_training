import React,  { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import '../css/index.scss';
import SaleManageRightTopContainer from './SaleManageRightTopContainer';
import SaleCustomerAnalyse from "./SaleCustomerAnalyse";
import SalePlan from "./SalePlan";
import * as saleManageAction from '../actions/saleManageAction';


class SaleManage extends Component {

    changeTab = (e) => {
        const　{ setSaleTab } = this.props;
        setSaleTab(e.target.getAttribute('value'));
    };
    render() {
        const { saleTab } = this.props;
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
                        <span value="0" className={`${saleTab == 0 ? 'current' : ''}`} onClick={this.changeTab}>客户数量统计</span>
                        <span value="1" className={`${saleTab == 1 ? 'current' : ''}`} onClick={this.changeTab}>销售计划</span>
                    </div>
                </div>
                <div className="saleManageRight">
                    <SaleManageRightTopContainer />
                    <div className="saleManageInfor">
                        {saleTab == 0 ? <SaleCustomerAnalyse /> : <SalePlan />}
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        saleTab: state.saleManageReducer.saleTab,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSaleTab: (saleTab) => {
            dispatch(saleManageAction.setSaleTab(saleTab));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaleManage);