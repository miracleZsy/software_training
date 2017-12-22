import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as phaseAndTimeAction from '../actions/phaseAndTimeAction';
import * as customerAjax from '../ajaxOperation/customerAjax';
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
        const { summarize, setPhaseType, setTime, fetchCustomer, phaseType, time, currentPage, customerType } = this.props;
        let nextSelectedTags ;
        nextSelectedTags = [index];
        this.setState({ selectedTags: nextSelectedTags });
        if(summarize  === '客户阶段') {
            // console.log('客户阶段');
            // console.log(nextSelectedTags[0]);
            setPhaseType(nextSelectedTags[0]);
            fetchCustomer(nextSelectedTags[0], time, currentPage, customerType);
        }else {
            // console.log('创建时间');
            setTime(nextSelectedTags[0]);
            fetchCustomer(phaseType, nextSelectedTags[0], currentPage, customerType);
        }
    }

    render() {
        const { selectedTags } = this.state;
        const { tagsFromServer, summarize } = this.props;
        return (
            <div className="tagContainer">
                <div style={{ marginRight: 23, display: 'inline', fontSize: 15 }}>{summarize}</div>
                {tagsFromServer.map((tag, index) => (
                    <CheckableTag
                        key={index}
                        checked={selectedTags.indexOf(index) > -1}
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
        phaseType: state.phaseAndTimeReducer.phaseType,
        time: state.phaseAndTimeReducer.time,
        currentPage: state.phaseAndTimeReducer.currentPage,
        customerType: state.phaseAndTimeReducer.customerType
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPhaseType: (phaseType) => {
            dispatch(phaseAndTimeAction.setPhaseType(phaseType));
        },
        setTime: (time) => {
            dispatch(phaseAndTimeAction.setTime(time));
        },
        fetchCustomer: (phaseType, time, currentPage, customerType) => {
            dispatch(customerAjax.fetchCustomer(phaseType, time, currentPage, customerType));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhaseTag);