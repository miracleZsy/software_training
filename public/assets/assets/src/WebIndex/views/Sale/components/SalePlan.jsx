import React, { Component } from 'react';
import '../css/index.scss';
import SaleAnalyseTable from '../components/SaleAnalyseTable';
import * as saleManageAjax from '../ajaxOperation/saleManageAjax';
import { connect } from 'react-redux';
import CreateSalePlan from './CreateSalePlan';
import { Popconfirm } from 'antd';

class SalePlan extends Component {

    constructor() {
        super();
        this.state = {
            showUpdateSalePlan: false,
            selectedKey: -1
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
    getCustomerArr = (customers) => {
        // console.log(customers);
        let customerArr = '[';
        customers.forEach((item, index) => {
            customerArr += item.key;
            if(index != customers.length - 1) {
                customerArr += ',';
            }
        });
        customerArr += ']';
        return customerArr;

    };

    handleCreate = () => {
        const form = this.form;
        const { updateSalePlan } = this.props;
        const { selectedKey } = this.state;
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
            let customersArr = this.getCustomerArr(values.customers);
            values.customers = customersArr;
            updateSalePlan(selectedKey, values);
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
            showUpdateSalePlan:true,
            selectedKey: id
        });
        fetchSaleDetail(id);
    };
    onDeleteSalePlan = (id) => {
        const { deleteSalePlan } = this.props;
        deleteSalePlan(id);
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
        }, {
            title: '操作',
            dataIndex: 'oper',
            render:(text, record) => (
                <span>
                    <Popconfirm title="确认删除?" cancelText="取消" okText="确定" onConfirm={() => {
                        this.onDeleteSalePlan(record.id);
                    }}>
                        <a href="#">删除计划</a>
                    </Popconfirm>
                </span>
            )
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
        },
        updateSalePlan: (id, salePlanUpdated) => {
            dispatch(saleManageAjax.updateSalePlan(id, salePlanUpdated));
        },
        deleteSalePlan: (id) => {
            dispatch(saleManageAjax.deleteSalePlan(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SalePlan);