import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as customerAjax from '../ajaxOperation/customerAjax';
import '../css/index.scss';
import { Slider, Card } from 'antd';

const customerImg = 'assets/assets/public/img/logo.jpg';
const marks = {
    0: '新入库',
    25: '初步沟通',
    50: '立项分析',
    75: '方案制定',
    100: '合同签订',
};
class CustomerDetail extends Component {
    constructor() {
        super();
        this.state = {
            phaseValue : -1,
        };
    }
    formatter = (value) => {
        return `${value}%`;
    };
    getCurrentValue = (value) => {
        const { showDetailId, setCustomerPhase } = this.props;
        let phase;
        switch (value) {
        case 0:
            phase = 1;
            break;
        case 25:
            phase = 2;
            break;
        case 50:
            phase = 3;
            break;
        case 75:
            phase = 4;
            break;
        case 100:
            phase = 5;
            break;
        }
        this.setState({
            phaseValue: value
        });
        setCustomerPhase(showDetailId, phase);
    };
    getDefaultValue = (phase) => {
        switch (phase) {
        case 1:
            return 0;
        case 2:
            return 20;
        case 3:
            return 40;
        case 4:
            return 80;
        case 5:
            return 100;
        }
    };
    render() {
        let phaseLogChildren = [];
        const { customerDetail, phaseLog } = this.props;
        const { phaseValue } = this.state;
        const getDefaultValue = (phase) => {
            switch (phase) {
            case 1:
                return 0;
            case 2:
                return 20;
            case 3:
                return 40;
            case 4:
                return 80;
            case 5:
                return 100;
            }
        };
        phaseLog.forEach(function (item, index) {
            let title = '';
            switch (item.phase) {
            case 1:
                title = '新入库';
                break;
            case 2:
                title = '初步沟通';
                break;
            case 3:
                title = '立项分析';
                break;
            case 4:
                title = '方案制定';
                break;
            case 5:
                title = '合同签订';
                break;
            }
            phaseLogChildren.push(<Card title={title} key={index} extra={<span>{item['created_at']}</span>} style={{ width: 410, marginBottom: 10 }}>
                <p>{customerDetail.followName}将客户{customerDetail.name}标记为了{title}</p>
            </Card>);
        });
        let phase;
        if(customerDetail.phase !== undefined) {
            phase = customerDetail.phase;
        }
        return(
            <div className="customerDetailContainer">
                <div className="customerTopContainer">
                    <img src={customerDetail.pic_url === null ? customerImg : customerDetail.pic_url } className="customerImg" />
                    <div className="customerInfor">
                        <span className="customerName">{customerDetail.name} {customerDetail.sex}</span>
                        <span>工作：{customerDetail.work}</span>
                        <span className="followUpPerson">跟进人: {customerDetail.followName}</span>
                    </div>
                    <div className="customerInforRight">
                        <span>电话: {customerDetail.tel}</span>
                        <span>生日: {customerDetail.birthday}</span>
                        <span>qq: {customerDetail.QQ === '' ? '无' : customerDetail.QQ}</span>
                        <span>邮件: {customerDetail.email === '' ? '无' : customerDetail.email}</span>
                        <span>客户类型: {customerDetail.type}</span>
                        <span>来源: {customerDetail.origin === '' ? '无' : customerDetail.origin}</span>
                        <span>地址: {customerDetail.address === '' ? '无' : customerDetail.address}</span>
                    </div>
                </div>
                <div className="phaseTypeContainer">
                    <Slider
                        marks={marks}
                        step={null}
                        value={phaseValue === -1 ? (customerDetail.phase - 1) * 25 : phaseValue }
                        tipFormatter={this.formatter}
                        onChange={(value) => this.getCurrentValue(value)}
                    />
                </div>
                <div className="phaseDetail">
                    {phaseLogChildren}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        customerDetail: state.customerDetailReducer.customerDetail,
        phaseLog: state.customerDetailReducer.phaseLog
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCustomerDetail: (id) => {
            dispatch(customerAjax.fetchCustomerDetail(id));
        },
        setCustomerPhase: (id, phase) => {
            dispatch(customerAjax.setCustomerPhase(id, phase));
        },
        getPhaseLog: (id) => {
            dispatch(customerAjax.getPhaseLog(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail);