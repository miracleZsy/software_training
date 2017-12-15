import React, { Component } from 'react';
import './css/searchInputComponent.scss';

const SearchInputComponent = (props) => {
    const { sidebarClosed = false, closeSideBar } = props;
    return(
        <div className="header">
            <div className="searchButton" onClick={ () => closeSideBar(!sidebarClosed) }>
                <i className="iconfont close-icon">{ sidebarClosed ? '\ue646' : '\ue645' }</i>
            </div>
        </div>
    );
};

export default SearchInputComponent;