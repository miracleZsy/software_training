import React, { Component } from 'react';
import { Tag } from 'antd';
const { CheckableTag } = Tag;

class SaleTag extends Component {
    constructor() {
        super();
        this.state = {
            selectedTags: [0],
        };
    }

    handleChange(index, checked) {
        const { summarize, setSaleTimeType, fetchSaleAnalyse, saleTab, fetchSalePlan, saleCurrentPage, setSaleCurrentPage } = this.props;
        let nextSelectedTags;
        nextSelectedTags = [index];
        if (summarize === '时间') {
            if(saleTab == 0) {
                setSaleTimeType(nextSelectedTags[0]);
                fetchSaleAnalyse(nextSelectedTags[0] + 1);
            }else if(saleTab == 1) {
                setSaleTimeType(nextSelectedTags[0]);
                fetchSalePlan(nextSelectedTags[0], 0);
                setSaleCurrentPage(0);
            }
        }
    }

    render() {
        const { tagsFromServer, summarize, saleTimeType } = this.props;
        // const staffArr = [staffType];
        const timeArr = [saleTimeType];
        return (
            <div className="tagContainer">
                <div style={{ marginRight: 23, display: 'inline', fontSize: 15 }}>{summarize}</div>
                {tagsFromServer.map((tag, index) => (
                    <CheckableTag
                        key={index}
                        checked={timeArr.indexOf(index) > -1}
                        onChange={checked => this.handleChange(index, checked)}
                    >
                        {tag}
                    </CheckableTag>
                ))}
            </div>
        );
    }
}

export default SaleTag;