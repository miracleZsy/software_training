import React, { Component } from 'react';
import './css/searchInputComponent.scss';
import { Input, Button } from 'antd';
const Search = Input.Search;
import cookieUtil from '../../lib/cookieUtil';
import jwt from 'jsonwebtoken';


const HeaderComponent = (props) => {
    const { sidebarClosed = false, closeSideBar } = props;
    const logOut = () => {
        cookieUtil.unset('token', '/');
        window.location.href = '/software_training/public/index';
    };
    return(
        <div className={`header  ${sidebarClosed ? 'close' : ''}`}>
            <div className="sideButton" onClick={ () => closeSideBar(!sidebarClosed) }>
                <i className="iconfont close-icon">{ sidebarClosed ? '\ue646' : '\ue645' }</i>
            </div>
            <div className="logOutInput">
                <Button type="primary" onClick={logOut}>退出</Button>
            </div>
        </div>
    );
};

export default HeaderComponent;