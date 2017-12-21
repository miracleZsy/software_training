import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as customerAjax from '../ajaxOperation/customerAjax';
import { Table, Popconfirm } from 'antd';
import CreateCustomer from "./CreateCustomer";

const data = [];
for (let i = 0; i < 20; i++) {
    data.push({
        key: i,
        index: i,
        staff_code: `s00000${i}`,
        username: 'shuxiaotai',
        department: '技术部',
        education: '大学',
        major: '软件工程',
        age: 21,
        address: '浙江省杭州市拱墅区丰登街56号',
        role: '管理员',
        email: '760684681@qq.com',
        is_check: '已审核'
    });
}
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
        // fetchCustomer();
    }
    onDeleteCustomer = (key, index) => {
        const { deleteCustomer } = this.props;
        // deleteCustomer(key, index);
    };
    onUpdateCustomer = (key, index) => {
        // const { deleteCustomer } = this.props;
        this.setState({ visible: true });
        console.log(key);
        console.log(index);
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
            dataIndex: 'username',
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
                        this.onDeleteCustomer(record.key, record.index);
                    }}>
                        <a href="#">删除用户</a>
                    </Popconfirm>
                    <span style={{ paddingLeft: 10, paddingRight: 10, color: '#108ee9', cursor: 'pointer' }} onClick={() => {
                        this.onUpdateCustomer(record.key, record.index);
                    }} >修改用户</span>
                    <Popconfirm title="确认共享?" onConfirm={() => {
                        this.onShareCustomer(record.key, record.index);
                    }}>
                        <a href="#">共享用户</a>
                    </Popconfirm>
                </span>
            )
        }];
    };

    render() {
        const { customerData } = this.props;
        return (
            <div>
                <Table columns={this.createColumns()} dataSource={data} pagination={pagination} />
                <CreateCustomer
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    title="修改用户"
                    okText="修改"
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        customerData: state.customerReducer.customerData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCustomer: () => {
            dispatch(customerAjax.fetchCustomer());
        },
        deleteCustomer: (key, index) => {
            dispatch(customerAjax.deleteCustomer(key, index));
        }
    };
};

export default CustomerTable;