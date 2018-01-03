import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as customerAjax from '../ajaxOperation/customerAjax';
import * as phaseAndTimeAction from '../actions/phaseAndTimeAction';
import { Table, Popconfirm, Modal } from 'antd';
import CreateCustomer from "./CreateCustomer";
import CustomerDetail from "./CustomerDetail";
import ShareCustomerModal from './ShareCustomerModal';

class CustomerTable extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            selectedKey: -1,
            showDetailId: -1,
            showDetail: false,
            showSharing: false,
            showSharingRecord: null,
        };
    }

    componentWillMount() {
        const { fetchCustomer, phaseType, time, currentPage, customerType } = this.props;
        fetchCustomer(phaseType, time, currentPage, customerType);
    }
    onDeleteCustomer = (id) => {
        const { deleteCustomer,  phaseType, time, currentPage, customerType } = this.props;
        deleteCustomer(id, phaseType, time, currentPage, customerType);
    };
    onUpdateCustomer = (id) => {
        const { getCheckedCustomer } = this.props;
        const form = this.form;
        this.setState({ visible: true });
        getCheckedCustomer(id);
        this.setState({
            selectedKey: id
        });
        form.resetFields();
    };
    onShareCustomer = (record) => {
        this.setState({
            showSharingRecord: record,
            showSharing: true,
        });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleCreate = () => {
        const form = this.form;
        const { updateCustomer, phaseType, time, currentPage, customerType } = this.props;
        const { selectedKey } = this.state;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            updateCustomer(selectedKey, values, phaseType, time, currentPage, customerType);
            form.resetFields();
            this.setState({ visible: false });
        });
    };
    handleSharing = () => {
        const customer = this.state.showSharingRecord;
        const sharingForm = this.sharingForm;
        sharingForm.validateFields((err, value) => {
            if(err) return;
            console.log(value);
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    };
    showCustomerDetail = (id) => {
        const { fetchCustomerDetail, getPhaseLog } = this.props;
        this.setState({
            showDetail: true,
            showDetailId: id
        });
        fetchCustomerDetail(id);
        getPhaseLog(id);
    };
    cancelShowDetail = () => {
        this.setState({
            showDetail: false
        });
    };
    cancelShowSharing = () => {
        this.setState({
            showSharing: false
        });
    }
    createColumns = () => {
        return  [{
            title: '客户名称',
            dataIndex: 'name',
            render:(text, record) => (
                <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        this.showCustomerDetail(record.id);
                    }}
                >{record.name}</span>
            )
        }, {
            title: '创建时间',
            dataIndex: 'created_at',
        }, {
            title: '联系方式',
            dataIndex: 'tel',
        }, {
            title: '操作',
            dataIndex: 'oper',
            render:(text, record) => (
                <span>
                    <Popconfirm title="确认删除?" cancelText="取消" okText="确定" onConfirm={() => {
                        this.onDeleteCustomer(record.id);
                    }}>
                        <a href="#">删除用户</a>
                    </Popconfirm>
                    <span style={{ paddingLeft: 10, paddingRight: 10, color: '#108ee9', cursor: 'pointer' }} onClick={() => {
                        this.onUpdateCustomer(record.id);
                    }} >修改用户</span>
                    <Popconfirm title="确认共享?" cancelText="取消" okText="确定" onConfirm={() => {
                        this.onShareCustomer(record.id, record.index);
                    }}>
                        <a href="#">共享用户</a>
                    </Popconfirm>
                </span>
            )
        }];
    };

    getCurrentPage = (page) => {
        const { fetchCustomer, phaseType, time, setCurrentPage, customerType } = this.props;
        setCurrentPage(page);
        fetchCustomer(phaseType, time, page, customerType);
        console.log(page);
    };

    render() {
        const { customerData, checkedCustomer, customerTotalCount, currentPage } = this.props;
        {
            customerData.forEach(function (item, index) {
                item.index = index;
            });
        }
        const pagination = {
            defaultPageSize: 10,
            total: customerTotalCount,
            onChange: (page) => this.getCurrentPage(page),
            current: currentPage,
        };

        const { visible, showDetail, showDetailId, showSharing, showSharingRecord } = this.state;
        return (
            <div>
                <Table
                    rowKey="id"
                    columns={this.createColumns()}
                    dataSource={customerData}
                    pagination={pagination}
                />
                <CreateCustomer
                    ref={this.saveFormRef}
                    visible={visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    title="修改用户"
                    okText="修改"
                    checkedCustomer={checkedCustomer}
                />
                <CustomerDetail
                    showDetailId={showDetailId}
                    showDetail={showDetail}
                    cancelShowDetail={this.cancelShowDetail}
                />
                <ShareCustomerModal
                    ref={(sharingForm) => { this.sharingForm = sharingForm; }}
                    visible={showSharing}
                    title="共享客户"
                    okText="共享"
                    record={showSharingRecord}
                    onCancel={this.cancelShowSharing}
                    onOk={this.handleSharing}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        customerData: state.customerReducer.customerData,
        checkedCustomer: state.customerReducer.checkedCustomer,
        customerTotalCount: state.customerReducer.customerTotalCount,
        phaseType: state.phaseAndTimeReducer.phaseType,
        time: state.phaseAndTimeReducer.time,
        currentPage:state.phaseAndTimeReducer.currentPage,
        customerType: state.phaseAndTimeReducer.customerType
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCustomer: (phaseType, time, page, customerType) => {
            dispatch(customerAjax.fetchCustomer(phaseType, time, page, customerType));
        },
        deleteCustomer: (key, phaseType, time, currentPage, customerType) => {
            dispatch(customerAjax.deleteCustomer(key, phaseType, time, currentPage, customerType));
        },
        getCheckedCustomer: (id) => {
            dispatch(customerAjax.getCheckedCustomer(id));
        },
        updateCustomer: (id, customerUpdated, phaseType, time, currentPage, customerType) => {
            dispatch(customerAjax.updateCustomer(id, customerUpdated, phaseType, time, currentPage, customerType));
        },
        setCurrentPage: (currentPage) => {
            dispatch(phaseAndTimeAction.setCurrentPage(currentPage));
        },
        fetchCustomerTypeCount:() => {
            dispatch(customerAjax.fetchCustomerTypeCount());
        },
        fetchCustomerDetail: (id) => {
            dispatch(customerAjax.fetchCustomerDetail(id));
        },
        getPhaseLog: (id) => {
            dispatch(customerAjax.getPhaseLog(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTable);