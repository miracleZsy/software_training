import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as customerAjax from '../ajaxOperation/customerAjax';
import * as customerDetailAction from '../actions/customerDetailAction';
import '../css/index.scss';
import { Slider, Card, Modal } from 'antd';

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
    }
    formatter = (value) => {
        return `${value}%`;
    };
    getCurrentValue = (value) => {
        const { showDetailId, setCustomerPhase, setSliderValue } = this.props;
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
        setSliderValue(value);
        setCustomerPhase(showDetailId, phase);
    };
    render() {
        let phaseLogChildren = [];
        const { customerDetail, phaseLog, showDetail, cancelShowDetail, sliderValue } = this.props;
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
                <p>{item['tagName']}将客户{customerDetail.name}标记为了{title}</p>
            </Card>);
        });
        return(
            <Modal
                title="客户详情"
                visible={showDetail}
                footer={null}
                onCancel={cancelShowDetail}
                style={{ top: 40 }}
            >
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
                            disabled={this.props.type === "share"}
                            marks={marks}
                            step={null}
                            value={sliderValue}
                            tipFormatter={this.formatter}
                            onChange={(value) => this.getCurrentValue(value)}
                        />
                    </div>
                    <div className="phaseDetail">
                        {phaseLogChildren}
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        customerDetail: state.customerDetailReducer.customerDetail,
        phaseLog: state.customerDetailReducer.phaseLog,
        sliderValue: state.customerDetailReducer.sliderValue
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCustomerPhase: (id, phase) => {
            dispatch(customerAjax.setCustomerPhase(id, phase));
        },
        setSliderValue:(sliderValue) => {
            dispatch(customerDetailAction.setSlideValue(sliderValue));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail);