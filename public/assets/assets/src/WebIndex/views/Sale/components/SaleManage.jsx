import React,  { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import '../css/index.scss';
import SaleManageRightTopContainer from './SaleManageRightTopContainer';
import SaleCustomerAnalyse from "./SaleCustomerAnalyse";
import SalePlan from "./SalePlan";
import * as saleManageAction from '../actions/saleManageAction';
import * as saleManageAjax from '../ajaxOperation/saleManageAjax';
import CreateSalePlan from './CreateSalePlan';


class SaleManage extends Component {
    constructor() {
        super();
        this.state = {
            showCreateSalePlan: false
        };
    }

    componentWillMount() {
        const { setSaleTimeType } = this.props;
        setSaleTimeType(0);
    }

    changeTab = (e) => {
        const　{ setSaleTab } = this.props;
        setSaleTab(e.target.getAttribute('value'));
    };

    showSalePlan = () => {
        const { cleanSaleDetail } = this.props;
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            form.resetFields();
            this.setState({ showCreateSalePlan: true });
        });
    };

    handleCancel = () => {
        this.setState({ showCreateSalePlan: false });
    };
    handleCreate = () => {
        const form = this.form;
        const { addSalePlan } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // setPhaseType(0);
            // setTime(0);
            // setCustomerType(0);
            // setCurrentPage(1);
            // addCustomer(values, phaseType, time, currentPage, customerType);
            addSalePlan(values);
            form.resetFields();
            this.setState({ showCreateSalePlan: false });
        });
    };
    saveFormRef = (form) => {
        this.form = form;
    };
    showSaleDetail = (id) => {
        const { fetchSaleDetail } = this.props;
        this.setState({
            showCreateSalePlan:true
        });
        fetchSaleDetail(id);

    };

    render() {
        const { saleTab, saleAnalyse, setSaleTimeType, saleTimeType, fetchSaleAnalyse, salePlan, fetchSalePlan, saleDetail } = this.props;
        return(
            <div className="saleManageContainer">
                <div className="saleManageLeft">
                    <div className="saleManageLeftTop">
                        销售管理
                    </div>
                    <div className="addSalePlan">
                        <Button type="primary" onClick={this.showSalePlan}>新增销售计划</Button>
                        <CreateSalePlan
                            ref={this.saveFormRef}
                            visible={this.state.showCreateSalePlan}
                            onCancel={this.handleCancel}
                            onCreate={this.handleCreate}
                            saleDetail={ saleDetail }
                            title="新建计划"
                            okText={saleDetail === undefined ? '创建' : '更新'}
                        />
                    </div>
                    <div className="saleManageLeftBottom">
                        <span value="0" className={`${saleTab == 0 ? 'current' : ''}`} onClick={this.changeTab}>客户数量统计</span>
                        <span value="1" className={`${saleTab == 1 ? 'current' : ''}`} onClick={this.changeTab}>销售计划</span>
                    </div>
                </div>
                <div className="saleManageRight">
                    <SaleManageRightTopContainer
                        setSaleTimeType={setSaleTimeType}
                        saleTimeType={saleTimeType}
                        fetchSaleAnalyse={fetchSaleAnalyse}
                        saleTab={saleTab}
                        fetchSalePlan={fetchSalePlan}
                    />
                    <div className="saleManageInfor">
                        {saleTab == 0 ?
                            <SaleCustomerAnalyse
                                saleAnalyse={saleAnalyse}
                                fetchSaleAnalyse={fetchSaleAnalyse}
                                setSaleTimeType={setSaleTimeType}
                            /> :
                            <SalePlan
                                salePlan={salePlan}
                                fetchSalePlan={fetchSalePlan}
                                setSaleTimeType={setSaleTimeType}
                                showPlanDetail={this.showSaleDetail}
                            />}
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        saleTab: state.saleManageReducer.saleTab,
        saleAnalyse: state.saleManageReducer.saleAnalyse,
        saleTimeType: state.saleManageReducer.saleTimeType,
        salePlan: state.saleManageReducer.salePlan,
        saleDetail:state.saleManageReducer.saleDetail
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSaleTab: (saleTab) => {
            dispatch(saleManageAction.setSaleTab(saleTab));
        },
        fetchSaleAnalyse: (timeType) => {
            dispatch(saleManageAjax.fetchSaleAnalyse(timeType));
        },
        setSaleTimeType: (saleTimeType) => {
            dispatch(saleManageAction.setSaleTimeType(saleTimeType));
        },
        fetchSalePlan: (timeType) => {
            dispatch(saleManageAjax.fetchSalePlan(timeType));
        },
        addSalePlan: (salePlanAdded) => {
            dispatch(saleManageAjax.addSalePlan(salePlanAdded));
        },
        fetchSaleDetail: (id) => {
            dispatch(saleManageAjax.fetchSaleDetail(id));
        },
        cleanSaleDetail:() => {
            dispatch(saleManageAction.cleanSaleDetail());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaleManage);