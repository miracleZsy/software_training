import React from 'react';
import SideBarHeader from './SideBarHeader';
import NavBar from "./NavBar";
import "../css/index.scss";

const SideBar = (props) => {
    const { sidebarClosed = false } = props;
    return (
        <div>
            <div className={`side  ${sidebarClosed ? 'close' : ''}`}>
                <SideBarHeader sidebarClosed={sidebarClosed} />
                <NavBar sidebarClosed={sidebarClosed} />
            </div>
        </div>

    );
};
export default SideBar;








