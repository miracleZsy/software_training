import React, { Component } from 'react';
import '../css/index.scss';
import SaleAnalyseTable from '../components/SaleAnalyseTable';
import * as saleManageAjax from '../ajaxOperation/saleManageAjax';
import { connect } from 'react-redux';
import CreateSalePlan from './CreateSalePlan';

class SalePlan extends Component {

    constructor() {
        super();
        this.state = {
            showUpdateSalePlan: false
        };
    }

    componentWillMount() {
        const { fetchSalePlan, setSaleTimeType } = this.props;
        fetchSalePlan(0);
        setSaleTimeType(0);
    }

    handleCancel = () => {
        this.setState({ showUpdateSalePlan: false });
    };

    handleCreate = () => {
        const form = this.form;
        // const { addSalePlan } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // setPhaseType(0);
            // setTime(0);
            // setCustomerType(0);
            // setCurrentPage(1);
            // console.log(values.customers);
            // console.log(JSON.stringify(values.customers));
            // let customersArr = this.getCustomerArr(values.customers);
            // values.customers = customersArr;
            // console.log(values);
            // console.log(JSON.stringify(values));
            // addSalePlan(values);
            form.resetFields();
            this.setState({ showUpdateSalePlan: false });
        });
    };
    saveFormRef = (form) => {
        this.form = form;
    };

    showSalePlanDetail = (id) => {
        const { fetchSaleDetail } = this.props;
        this.setState({
            showUpdateSalePlan:true
        });
        fetchSaleDetail(id);
    };

    createAnalyseColumns = () => {
        const { showPlanDetail } = this.props;
        return  [{
            title: '标题',
            dataIndex: 'title',
            render:(text, record) => (
                <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        this.showSalePlanDetail(record.id);
                    }}
                >{record.title}</span>)
        }, {
            title: '创建时间',
            dataIndex: 'created_at',
        }, {
            title: '客户名称',
            dataIndex: 'customers',
            render:(text, record) => this.getCustomerShow(record.customers)
        }, {
            title: '执行时间',
            dataIndex: 'act_time',
        }];
    };
    getCustomerShow = (customers) => {
        let res = '';
        customers.forEach((item) => {
            res += item + ' ';
        });
        return(
            <span>{res}</span>
        );
    };
    render() {
        const { salePlan, saleDetail } = this.props;
        return(
            <div className="customerAnalyseTable">
                <SaleAnalyseTable
                    columnsData={this.createAnalyseColumns()}
                    salePlan={salePlan}
                    isPagination={true}
                />
                <CreateSalePlan
                    ref={this.saveFormRef}
                    visible={this.state.showUpdateSalePlan}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    title="修改计划"
                    okText="修改"
                    saleDetail={saleDetail}
                />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        saleDetail:state.saleManageReducer.saleDetail
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSaleDetail: (id) => {
            dispatch(saleManageAjax.fetchSaleDetail(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalePlan);