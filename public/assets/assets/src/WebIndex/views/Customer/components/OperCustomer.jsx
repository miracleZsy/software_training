import React, { Component } from 'react';
import { Popconfirm } from 'antd';

class OperCustomer extends Component {

    onDeleteCustomer = () => {
        // const { deleteCustomer } = this.props;
        // deleteCustomer(key, index);
    };
    onUpdateCustomer = () => {
        // const { deleteCustomer } = this.props;
        // deleteCustomer(key, index);
        // this.setState({ visible: true });
        const { customerKey, customerIndex, showModel } =  this.props;
        showModel();
        console.log(customerKey);
        console.log(customerIndex);
    };
    onShareCustomer = () => {
        // const { deleteUser } = this.props;
        // console.log('delete');
        // deleteUser(key, index);
        // console.log(key);
    };
    render() {
        return(
            <span>
                <Popconfirm title="确认删除?" onConfirm={() => {
                    this.onDeleteCustomer();
                }}>
                    <a href="#">删除用户</a>
                </Popconfirm>
                <span style={{ paddingLeft: 10, paddingRight: 10, cursor: 'point' }} onClick={() => {
                    this.onUpdateCustomer();
                }} >修改用户</span>
                <Popconfirm title="确认共享?" onConfirm={() => {
                    this.onShareCustomer();
                }}>
                    <a href="#">共享用户</a>
                </Popconfirm>
            </span>
        );
    }
}

export default OperCustomer;