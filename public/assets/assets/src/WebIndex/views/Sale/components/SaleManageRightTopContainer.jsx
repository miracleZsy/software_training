import React, { Component } from 'react';
import PhaseTag from "../../Customer/components/PhaseTag";
import '../css/index.scss';

const staffTags = ['不限', '筛选'];
const timeTags = ['最近2天', '最近七天', '最近30天'];

class CustomerRightTopContainer extends Component {
    render() {
        return(
            <div className="saleManageRightTop">
                <PhaseTag summarize="员工" tagsFromServer={staffTags} />
                <PhaseTag summarize="时间" tagsFromServer={timeTags} />
            </div>
        );
    }
}

export default CustomerRightTopContainer;