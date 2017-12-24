import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as customerAjax from '../ajaxOperation/customerAjax';
import '../css/index.scss';
import { Slider, Card } from 'antd';

const customerImg = 'assets/assets/public/img/logo.jpg';
const marks = {
    0: '新入库',
    20: '初步沟通',
    40: '立项分析',
    80: '方案制定',
    100: '合同签订',
};
class CustomerDetail extends Component {

    componentWillMount() {
        const { showDetailId } = this.props;
        // console.log(showDetailId);

    }
    formatter = (value) => {
        return `${value}%`;
    };
    getCurrentValue = (value) => {
        console.log(value);
    };
    render() {
        let roleChildren = [];
        {
            const roleData = [
                {
                    key:1,
                    name: 'suxoao'
                },
                {
                    key:2,
                    name: 'ssss'
                }
            ];
            roleData.forEach(function (item) {
                roleChildren.push(<Card title={item.name} key={item.key} extra={<span>2017-02-01</span>} style={{ width: 410, marginBottom: 10 }}>
                    <p>{item.name}</p>
                </Card>);
            });
        }
        const { customerDetail } = this.props;
        const customerImg = 'public/img/logo.jpg';
        return(
            <div className="customerDetailContainer">
                <div className="customerTopContainer">
                    <img src={customerDetail.pic_url === null ? customerImg : customerDetail.pic_url } className="customerImg" />
                    <div className="customerInfor">
                        <span className="customerName">{customerDetail.name} {customerDetail.work}</span>
                        <span>女</span>
                        <span className="followUpPerson">跟进人: zhouqianyu</span>
                    </div>
                    <div className="customerInfor">
                        <span className="customerTel">电话: {customerDetail.tel}</span>
                        <span>生日: {customerDetail.birthday}</span>
                        <span>qq: {customerDetail.QQ}</span>
                        <span>邮件: {customerDetail.email}</span>
                        <span>客户类型: {customerDetail.type}</span>
                        <span>来源: {customerDetail.origin}</span>
                        <span>地址: {customerDetail.address}</span>
                    </div>
                </div>
                <div className="phaseTypeContainer">
                    <Slider
                        marks={marks}
                        step={null}
                        defaultValue={0}
                        tipFormatter={this.formatter}
                        onChange={(value) => this.getCurrentValue(value)}
                    />
                </div>
                <div className="phaseDetail">
                    {roleChildren}
                </div>
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
        fetchCustomerDetail: (id) => {
            dispatch(customerAjax.fetchCustomerDetail(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail);