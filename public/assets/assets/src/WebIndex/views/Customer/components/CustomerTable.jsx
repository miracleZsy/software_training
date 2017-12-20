import React, { Component } from 'react';
import { Table } from 'antd';

const columns = [{
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
    render:() => (
        <span>
            <a href="#">删除客户</a>
            <a href="#" style={{ paddingLeft: 10, paddingRight: 10 }}>修改客户</a>
            <a href="#">分享客户</a>
        </span>
    )
}];

const data = [];
for (let i = 0; i < 20; i++) {
    data.push({
        key: i,
        username: `Edward King ${i}`,
        created_at: 32,
        tel: `London, Park Lane no. ${i}`,
    });
}

const pagination = {
    defaultPageSize: 6
};

class CustomerTable extends Component {
    constructor() {
        super();
        this.state = {
            selectedRowKeys: []
        };
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
        };
        return (
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={pagination} />
        );
    }
}

export default CustomerTable;