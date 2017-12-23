import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as customerAjax from '../ajaxOperation/customerAjax';
import * as phaseAndTimeAction from '../actions/phaseAndTimeAction';
import { Table, Popconfirm } from 'antd';
import CreateCustomer from "./CreateCustomer";


class CustomerTable extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            selectedKey: -1
        };
    }

    componentWillMount() {
        const { fetchCustomer, phaseType, time, currentPage, customerType } = this.props;
        fetchCustomer(phaseType, time, currentPage, customerType);
    }
    onDeleteCustomer = (id) => {
        const { deleteCustomer,  phaseType, time, currentPage, customerType } = this.props;
        console.log('delete');
        console.log(phaseType);
        console.log(time);
        console.log(currentPage);
        console.log(customerType);
        deleteCustomer(id, phaseType, time, currentPage, customerType);
    };
    onUpdateCustomer = (id) => {
        const { getCheckedCustomer } = this.props;
        this.setState({ visible: true });
        getCheckedCustomer(id);
        this.setState({
            selectedKey: id
        });
        // console.log(customerData.slice(index, index + 1)[0]); //对象
    };
    onShareCustomer = (key, index) => {
        // const { deleteUser } = this.props;
        // console.log('delete');
        // deleteUser(key, index);
        // console.log(key);
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
            // console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };
    saveFormRef = (form) => {
        this.form = form;
    };
    createColumns = () => {
        return  [{
            title: '客户名称',
            dataIndex: 'name',
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
                    <Popconfirm title="确认删除?" onConfirm={() => {
                        this.onDeleteCustomer(record.id);
                    }}>
                        <a href="#">删除用户</a>
                    </Popconfirm>
                    <span style={{ paddingLeft: 10, paddingRight: 10, color: '#108ee9', cursor: 'pointer' }} onClick={() => {
                        this.onUpdateCustomer(record.id);
                    }} >修改用户</span>
                    <Popconfirm title="确认共享?" onConfirm={() => {
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
            // console.log(customerTotalCount);
        }
        const pagination = {
            defaultPageSize: 6,
            total: customerTotalCount,
            onChange: (page) => this.getCurrentPage(page),
            current: currentPage,
        };

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
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    title="修改用户"
                    okText="修改"
                    checkedCustomer={checkedCustomer}
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTable);