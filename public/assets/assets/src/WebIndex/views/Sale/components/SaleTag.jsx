import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as phaseAndTimeAction from '../actions/phaseAndTimeAction';
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
        const { summarize } = this.props;
        let nextSelectedTags ;
        nextSelectedTags = [index];
        if(summarize  === '时间') {

        }
    }

    render() {
        const { tagsFromServer, summarize, timeType } = this.props;
        // const staffArr = [staffType];
        const timeArr = [timeType];
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

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhaseTag);