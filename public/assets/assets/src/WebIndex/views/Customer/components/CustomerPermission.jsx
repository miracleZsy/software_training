import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;
import debounce from 'lodash.debounce';
import * as customerAjax from '../ajaxOperation/customerAjax';



class CustomerPermission extends Component {
    constructor() {
        super();
        this.state = {
            children: []
        };
    }
    searchStaffInCustomer = (value) => {
        const { customerList } = this.props;
        if (value !== '') {
            customerAjax.fetchStaffInCustomerList(value)
                .then((res) => {
                    if (res !== 500 && res !== undefined) {
                        this.setState({
                            children: res
                        });
                    }
                });
        }
    };
    handleChange = (value) => {
        // const { setStaffUuid } = this.props;
        console.log(value);
    };
    render() {
        const childrenList = [];
        for (let i = 10; i < 20; i++) {
            childrenList.push(<Option key={i.toString(36) + i}>舒小台 + {i}</Option>);
        }
        const { children } = this.state;
        return(
            <Select
                mode="combobox"
                size="default"
                placeholder="根据员工查看客户"
                onChange={this.handleChange}
                onSearch={debounce(this.searchStaffInCustomer, 800)}
                style={{ width: '100%' }}
                showArrow={false}
                filterOption={false}
                labelInValue
            >
                {childrenList}
            </Select>
        );
    }
}

export default CustomerPermission;