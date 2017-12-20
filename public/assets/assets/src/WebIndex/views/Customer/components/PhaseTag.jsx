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
        const { selectedTags } = this.state;
        // const nextSelectedTags = checked ?
        //     [...selectedTags, index] :
        //     selectedTags.filter(t => t !== index);
        let nextSelectedTags ;
        if(checked) {
            nextSelectedTags = [...selectedTags, index];
        }else {
            nextSelectedTags = selectedTags.filter(t => t !== index);
        }
        // console.log('You are interested in: ', nextSelectedTags);
        this.setState({ selectedTags: nextSelectedTags });
        // console.log(selectedTags.length);
    }

    render() {
        const { selectedTags } = this.state;
        const { tagsFromServer, summarize } = this.props;
        return (
            <div className="tagContainer">
                <div style={{ marginRight: 8, display: 'inline' }}>{summarize}</div>
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