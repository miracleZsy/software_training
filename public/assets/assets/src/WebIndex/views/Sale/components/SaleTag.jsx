import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as saleManageAction from '../actions/saleManageAction';
// import * as customerAjax from '../ajaxOperation/customerAjax';
import { Tag } from 'antd';
const { CheckableTag } = Tag;

class PhaseTag extends Component {
    constructor() {
        super();
        this.state = {
            selectedTags: [0],
        };
    }
    handleChange(index, checked) {
        const { summarize, setSaleTimeType } = this.props;
        let nextSelectedTags ;
        nextSelectedTags = [index];
        if(summarize  === '时间') {
            setSaleTimeType(nextSelectedTags[0] + 1);
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

const mapStateToProps = (state) => {
    return {
        saleTimeType: state.saleManageReducer.saleTimeType
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSaleTimeType: (saleTimeType) => {
            dispatch(saleManageAction.setSaleTimeType(saleTimeType));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhaseTag);