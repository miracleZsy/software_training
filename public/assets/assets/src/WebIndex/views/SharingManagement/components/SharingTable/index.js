import React, { Component } from 'react';
import { Table, Icon, Divider, Popconfirm } from 'antd';

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
            dataIndex: 'share_time',
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
        const { data } = this.props;
        const dataSource = data.map((item) => (
            {
                key: item.id,
                name: item.name,
                share_time: item.share_time,
                tel: item.tel,
            }
        ));
        return (
            <Table dataSource={dataSource} columns={this.createColumns()} />
        );
    }
}

export default SharingTable;