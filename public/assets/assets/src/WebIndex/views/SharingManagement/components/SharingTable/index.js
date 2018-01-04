import React, { Component } from 'react';
import { Table, Icon, Divider, Popconfirm } from 'antd';
import moment from 'moment';

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
            filters: [
                { text: '今天', value: 0 },
                { text: '昨天', value: 1 },
                { text: '最近七天', value: 7 },
                { text: '最近30天', value: 30 },
            ],
            filterMultiple: false,
            onFilter: (value, record) => {
                const dateTime = record.share_time.split(' ')[0];
                const targetTime = moment().subtract(value, "days").format("YYYY-MM-DD");
                return moment(dateTime).isBetween(targetTime, moment().format("YYYY-MM-DD"), null, '[]');
            },
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
        const { data, count } = this.props;
        const dataSource = data.map((item) => (
            {
                key: item.share_time,
                name: item.name,
                share_time: item.share_time,
                tel: item.tel,
            }
        ));
        const pageination = {
            defaultCurrent: 1,
            total: count,
        };
        // Todo：set total number
        return (
            <Table dataSource={dataSource} columns={this.createColumns()} pagination={pageination} />
        );
    }
}

export default SharingTable;