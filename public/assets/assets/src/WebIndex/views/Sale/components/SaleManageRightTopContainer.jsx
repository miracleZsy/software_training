import React, { Component } from 'react';
import SaleTag from "../../Sale/components/SaleTag";
import '../css/index.scss';

// const staffTags = ['不限', '筛选'];
const timeTags = ['最近2天', '最近七天', '最近30天'];
const timePlanTags = ['不限', '最近2天', '最近七天', '最近30天'];

class SaleManageRightTopContainer extends Component {
    render() {
        const { setSaleTimeType, saleTimeType, fetchSaleAnalyse, saleTab, fetchSalePlan, saleCurrentPage } = this.props;
        return(
            <div className="saleManageRightTop">
                {/*<SaleTag summarize="员工" tagsFromServer={staffTags} />*/}
                <SaleTag
                    summarize="时间"
                    tagsFromServer={saleTab == 1 ? timePlanTags : timeTags}
                    setSaleTimeType={setSaleTimeType}
                    saleTimeType={saleTimeType}
                    fetchSaleAnalyse={fetchSaleAnalyse}
                    fetchSalePlan={fetchSalePlan}
                    saleTab={saleTab}
                    saleCurrentPage={saleCurrentPage}
                />
            </div>
        );
    }
}

export default SaleManageRightTopContainer;