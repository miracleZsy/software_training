import React, { Component } from 'react';
import "../css/index.scss";
import cookieUtil from '../../../../lib/cookieUtil';
import jwt from 'jsonwebtoken';


const logo = 'assets/assets/public/img/logo.jpg';
class SideBarHeader extends Component {
    constructor() {
        super();
        this.state = {
            username: ''
        };
    }
    componentWillMount() {
        if(jwt.decode(cookieUtil.get('token')) !== null) {
            let username = jwt.decode(cookieUtil.get('token')).username;
            this.setState({
                username:username
            });
        }
    }
    render() {
        const { sidebarClosed } = this.props;
        const { username } = this.state;
        return (
            <div className={`logo-wrap  ${sidebarClosed ? 'close' : ''}`}>
                <div className={`logo  ${sidebarClosed ? 'close' : ''}`}>
                    <img src={logo} />
                    <span className={`userText  ${sidebarClosed ? 'close' : ''}`}>{username}</span>
                </div>
            </div>
        );
    }
}

export default SideBarHeader;