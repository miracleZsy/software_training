import React, { Component } from 'react';
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
        this.setState({ selectedTags: nextSelectedTags });
        if(summarize  === '客户阶段') {
            // console.log('客户阶段');
        }else {
            // console.log('创建时间');
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

export default PhaseTag;