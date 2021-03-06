import React from 'react';
import 'public/iconFont/iconfont.scss';
import NavItem from './NavItem';
import '../css/index.scss';
import jwt from 'jsonwebtoken';
import isBoss from '../../../../lib/isBoss';

const NavBarMap = isBoss ? 
    {
        1:{
            url:'/customer',
            tag:'客户管理',
        },
        2:{
            url: '/sale',
            tag: '销售管理',
        },
        3:{
            url: '/staff',
            tag: '员工管理',
        },
        4:{
            url: '/sharing',
            tag: '共享管理',
        }
    } : {
        1:{
            url:'/customer',
            tag:'客户管理',
        },
        2:{
            url: '/sale',
            tag: '销售管理',
        },
        3:{
            url: '/sharing',
            tag: '共享管理',
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