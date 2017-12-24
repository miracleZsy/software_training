import React from 'react';
import 'public/iconFont/iconfont.scss';
import NavItem from './NavItem';
import '../css/index.scss';



const NavBarMap = {
    1:{
        url:'/customer',
        tag:<div>客户管理</div>,
    },
    2:{
        url: '/staff',
        tag: <div>员工管理</div>,
    }
};

const NavBar = ({ sidebarClosed }) => {
    return (
        <div className={`nav-bar  ${sidebarClosed ? 'close' : ''}`}>
            {Object.values(NavBarMap).map((item, index) => (
                <li className="nav-li" key={index} >
                    <NavItem tag={item.tag} url={item.url} sidebarClosed={sidebarClosed} />
                </li>
            ))}
        </div>
    );
};

export default NavBar;