import React, { Component } from 'react';
import '../css/index.scss';
import { Slider } from 'antd';

const customerImg = 'assets/assets/public/img/logo.jpg';
const marks = {
    0: '新入库',
    20: '初步沟通',
    40: '立项分析',
    80: '方案制定',
    100: '合同签订',
};
class CustomerDetail extends Component {
    formatter = (value) => {
        return `${value}%`;
    };
    getCurrentValue = (value) => {
        console.log(value);
    };
    render() {
        return(
            <div className="customerDetailContainer">
                <div className="customerTopContainer">
                    <div src={customerImg} className="customerImg"></div>
                    <div className="customerInfor">
                        <span className="customerName">刘小哈 主管</span>
                        <span>女</span>
                        <span className="followUpPerson">跟进人: zhouqianyu</span>
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

                </div>
            </div>
        );
    }
}

export default CustomerDetail;