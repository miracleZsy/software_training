import React, { Component } from 'react';
import SaleTag from "../../Sale/components/SaleTag";
import '../css/index.scss';

// const staffTags = ['不限', '筛选'];
const timeTags = ['最近2天', '最近七天', '最近30天'];

class CustomerRightTopContainer extends Component {
    render() {
        return(
            <div className="saleManageRightTop">
                {/*<SaleTag summarize="员工" tagsFromServer={staffTags} />*/}
                <SaleTag summarize="时间" tagsFromServer={timeTags} />
            </div>
        );
    }
}

export default CustomerRightTopContainer;