import React, { Component } from 'react';
import './css/searchInputComponent.scss';
import { Input } from 'antd';
const Search = Input.Search;

const SearchInputComponent = (props) => {
    const { sidebarClosed = false, closeSideBar } = props;
    return(
        <div className={`header  ${sidebarClosed ? 'close' : ''}`}>
            <div className="sideButton" onClick={ () => closeSideBar(!sidebarClosed) }>
                <i className="iconfont close-icon">{ sidebarClosed ? '\ue646' : '\ue645' }</i>
            </div>
            <div className="searchInput">
                <Search
                    placeholder="搜索"
                    onSearch={value => {
                        console.log(value);
                    }}
                />
            </div>
        </div>
    );
};

export default SearchInputComponent;