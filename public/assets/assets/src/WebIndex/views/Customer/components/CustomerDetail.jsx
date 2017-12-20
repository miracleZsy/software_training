import React, { Component } from 'react';
import '../css/index.scss';
import { Slider } from 'antd';

const userImg = 'assets/assets/public/img/logo.jpg';
const marks = {
    0: '新入库',
    20: '初步沟通',
    40: '立项分析',
    60: '方案制定',
    100: '合同签订',
};
class CustomerDetail extends Component {
    formatter = (value) => {
        return `${value}%`;
    };
    render() {
        return(
            <div>
                <div>
                    <img src={userImg} className="userImg" />
                    <span>刘小丽</span>
                </div>
                <div>
                    <Slider marks={marks} step={null} defaultValue={0} tipFormatter={this.formatter} />
                </div>
            </div>
        );
    }
}

export default CustomerDetail;