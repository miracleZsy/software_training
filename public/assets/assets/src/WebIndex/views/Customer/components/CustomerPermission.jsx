import React, { Component } from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
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
        // console.log(value);
    };
    selectStaff = (value) => {
        const{ phaseType, time, currentPage, customerType, fetchCustomer, setStaffUuid, fetchCustomerTypeCount } = this.props;
        // console.log(value);
        setStaffUuid(value);
        fetchCustomer(phaseType, time, currentPage, customerType, value);
        fetchCustomerTypeCount(value);
    };
    blurStaff = (value) => {
        console.log(value);
        const{ phaseType, time, currentPage, customerType, fetchCustomer, setStaffUuid, fetchCustomerTypeCount } = this.props;
        setStaffUuid(value);
        fetchCustomer(phaseType, time, currentPage, customerType, value);
        fetchCustomerTypeCount(value);
    };
    render() {
        const { children } = this.state;
        const childrenList = [];
        if(children != [] && children != undefined) {
            for (let item of children) {
                childrenList.push(<Option key={item.uuid} title={item.name}>{item.name}</Option>);
            }
        }
        return(
            <Select
                mode="combobox"
                size="default"
                placeholder="根据员工查看客户"
                optionLabelProp="title"
                onChange={this.handleChange}
                onSearch={debounce(this.searchStaffInCustomer, 800)}
                style={{ width: '100%' }}
                showArrow={false}
                filterOption={false}
                onSelect={this.selectStaff}
                onBlur={this.blurStaff}
            >
                {childrenList}
            </Select>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        phaseType: state.phaseAndTimeReducer.phaseType,
        time: state.phaseAndTimeReducer.time,
        currentPage:state.phaseAndTimeReducer.currentPage,
        customerType: state.phaseAndTimeReducer.customerType
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchCustomer: (phaseType, time, page, customerType, staffUuid) => {
            dispatch(customerAjax.fetchCustomer(phaseType, time, page, customerType, staffUuid));
        },
        fetchCustomerTypeCount:(staffUuid) => {
            dispatch(customerAjax.fetchCustomerTypeCount(staffUuid));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerPermission);