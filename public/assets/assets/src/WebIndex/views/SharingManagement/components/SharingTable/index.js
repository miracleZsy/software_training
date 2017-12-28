import React, { Component } from 'react';
import { Table, Icon, Divider, Popconfirm } from 'antd';

const data = [{
    key: '1',
    name: 'harry potter',
    sharing_at: 'John Brown',
    tel: 32,
}, {
    key: '2',
    name: 'harry potter',
    sharing_at: 'John Brown',
    tel: 32,
}, {
    key: '3',
    name: 'harry potter',
    sharing_at: 'John Brown',
    tel: 32,
}];

class SharingTable extends Component {
    onDeleteCustomer = () => {};
    createColumns = () => {
        return [{
            title: '客户名称',
            dataIndex: 'name',
            render: (text, record) => (
                <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        this.showCustomerDatil(record.id);
                    }}
                >{record.name}</span>
            )
        }, {
            title: '共享时间',
            dataIndex: 'sharing_at',
        }, {
            title: '联系方式',
            dataIndex: 'tel',
        }, {
            title: '操作',
            dataIndex: 'oper',
            render:(text, record) => (
                <span>
                    <Popconfirm 
                        title="确认删除？"
                        onConfirm={() => { this.onDeleteCustomer(record.id); }}>
                        <a href="#">删除共享</a>
                    </Popconfirm>
                </span>
            )
        }];
    }
    render() {
        return (
            <Table dataSource={data} columns={this.createColumns()} />
        );
    }
}

export default SharingTable;