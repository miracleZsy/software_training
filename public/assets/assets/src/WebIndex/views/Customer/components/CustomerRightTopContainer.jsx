import React, { Component } from 'react';
import PhaseTag from "./PhaseTag";
import '../css/index.scss';

const phaseTags = ['不限', '新入库', '初步沟通', '立项分析', '方案制定', '合同签订'];
const createTimeTags = ['不限', '今天', '最近2天', '最近7天', '最近30天'];

class CustomerRightTopContainer extends Component {
    render() {
        return(
            <div className="customerRightTop">
                <PhaseTag summarize="客户阶段" tagsFromServer={phaseTags} />
                <PhaseTag summarize="创建时间" tagsFromServer={createTimeTags} />
            </div>
        );
    }
}

export default CustomerRightTopContainer;