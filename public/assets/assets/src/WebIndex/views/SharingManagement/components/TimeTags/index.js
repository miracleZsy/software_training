import React, { Component } from 'react';
import { Tag } from 'antd';
import { connect } from 'react-redux';
// import { fetch } from '../../actions';

const { CheckableTag } = Tag;

const tags = ['不限', '今天', '昨天', '最近7天', '最近30天'];

class TimeTags extends Component {
    state = {
        selectedTime: 0,
    }
    handleChange = (index, checked) => {
        this.setState({
            selectedTime: index,
        });
        // fetchStaff
    }
    render() {
        const { selectedTime } = this.state;
        return (
            <div>
                <span style={{
                    marginRight: "23px",
                }}>共享时间</span>
                {tags.map((tag, index) => (
                    <CheckableTag
                        key={index}
                        checked={selectedTime === index}
                        onChange={checked => this.handleChange(index, checked)}
                    >{tag}</CheckableTag>
                ))}
            </div>
        );
    }
}

const mapStateToProps = () => {

};

const mapDispatchToProps = () => {

};

export default connect(mapStateToProps, mapDispatchToProps)(TimeTags);
