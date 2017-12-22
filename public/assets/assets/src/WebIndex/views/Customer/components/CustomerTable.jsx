import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as customerAjax from '../ajaxOperation/customerAjax';
import * as customerAction from '../actions/customerAction';
import { Table, Popconfirm } from 'antd';
import CreateCustomer from "./CreateCustomer";

const pagination = {
    defaultPageSize: 6
};

class CustomerTable extends Component {
    constructor() {
        super();
        this.state = {
            visible: false
        };
    }

    componentWillMount() {
        const { fetchCustomer } = this.props;
        fetchCustomer();
    }
    onDeleteCustomer = (id, index) => {
        const { deleteCustomer } = this.props;
        // console.log(id);
        // console.log(index);id
        deleteCustomer(id, index);
    };
    onUpdateCustomer = (id, index) => {
        const { customerData, getCheckedCustomer } = this.props;
        this.setState({ visible: true });
        // console.log(customerData);
        // console.log(id);
        // console.log(index);
        console.log(customerData.slice(index, index + 1)[0]); //对象
        getCheckedCustomer(customerData.slice(index, index + 1)[0]);
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
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
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
                        this.onDeleteCustomer(record.id, record.index);
                    }}>
                        <a href="#">删除用户</a>
                    </Popconfirm>
                    <span style={{ paddingLeft: 10, paddingRight: 10, color: '#108ee9', cursor: 'pointer' }} onClick={() => {
                        this.onUpdateCustomer(record.id, record.index);
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

    render() {
        const { customerData, checkedCustomer } = this.props;
        {
            customerData.forEach(function (item, index) {
                item.index = index;
            });
        }
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
        checkedCustomer: state.customerReducer.checkedCustomer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCustomer: () => {
            dispatch(customerAjax.fetchCustomer());
        },
        deleteCustomer: (key, index) => {
            dispatch(customerAjax.deleteCustomer(key, index));
        },
        getCheckedCustomer: (checkedCustomer) => {
            dispatch(customerAction.getCheckedCustomer(checkedCustomer));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTable);