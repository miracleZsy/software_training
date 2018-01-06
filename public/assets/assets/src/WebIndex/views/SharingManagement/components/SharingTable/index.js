import React, { Component } from 'react';
import { Table, Icon, Divider, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import CustomerDetail from '../../../Customer/components/CustomerDetail';
import { fetchCustomerDetail, getPhaseLog } from '../../../Customer/ajaxOperation/customerAjax';
import moment from 'moment';

class SharingTable extends Component {
    state = {
        showDetail: false,
        showDetailId: -1,
    }
    onDeleteCustomer = (shareId, type) => {
        this.props.handleOnDelete(shareId, type);
    };

    showCustomerDetail = (customerId) => {
        this.setState({
            showDetail: true,
            showDetailId: customerId,
        });
        this.props.fetchCustomerDetail(customerId);
        this.props.getPhaseLog(customerId);
    };
    cancelShowDetail = () => {
        this.setState({
            showDetail: false,
        });
    }
    createColumns = () => {
        return [{
            title: '客户名称',
            dataIndex: 'name',
            render: (text, record) => (
                <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        this.showCustomerDetail(record.customerId);
                    }}
                >{record.name}</span>
            )
        },
        {
            title: this.props.sharingType == 0 ? '接收人' : '共享人',
            dataIndex: 'username',
        }, 
        {
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
                        cancelText="取消"
                        onConfirm={() => { this.onDeleteCustomer(record.key, this.props.sharingType); }}>
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
                key: item.shareId,
                name: item.name,
                username: item.username,
                share_time: item.share_time,
                tel: item.tel,
                customerId: item.customerId,
            }
        ));
        const pageination = {
            defaultCurrent: 1,
            total: count,
        };
        return (
            <div>
                <Table dataSource={dataSource} columns={this.createColumns()} pagination={pageination} />
                <CustomerDetail
                    type="share"
                    showDetailId={this.state.showDetailId}
                    showDetail={this.state.showDetail}
                    cancelShowDetail={this.cancelShowDetail}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        customerDetail: state.customerDetailReducer.customerDetail,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCustomerDetail:(id) => {
            dispatch(fetchCustomerDetail(id));
        },
        getPhaseLog: (id) => {
            dispatch(getPhaseLog(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharingTable);