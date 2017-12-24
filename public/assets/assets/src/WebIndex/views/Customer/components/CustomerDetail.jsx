import React, { Component } from 'react';
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
        return(
            <div className="customerDetailContainer">
                <div className="customerTopContainer">
                    <div src={customerImg} className="customerImg"></div>
                    <div className="customerInfor">
                        <span className="customerName">刘小哈 主管</span>
                        <span>女</span>
                        <span className="followUpPerson">跟进人: zhouqianyu</span>
                    </div>
                    <div className="customerInfor">
                        <span className="customerTel">电话: 18748844949</span>
                        <span>生日: 2019-01-02</span>
                        <span>qq: 2349759437</span>
                        <span>邮件: 234975943@qq.com</span>
                        <span>工作: 销售</span>
                        <span>来源: 百度</span>
                        <span>地址: 杭州西湖的西湖西湖</span>
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

export default CustomerDetail;