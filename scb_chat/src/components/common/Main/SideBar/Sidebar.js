import { SIDEBAR_MENU_DATA } from 'contant';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const { t } = useTranslation();
    const location = useLocation()
    const isToggle = useSelector(state => state.mainReducer.toggle);
    console.log("loca :" , location.pathname)
  
  
    return (
        <nav class={`sidebar ${isToggle ? 'hide' : ''}`}>
            <div class="sidebar__wrap">
                <div class="sidebar__sticky">
                    <div class="sidebar__sticky-item">
                        <div class="sidebar__item">
                            <ul class="nav flex-column">
                                {
                                    SIDEBAR_MENU_DATA.map((item, index) =>
                                        <li  
                                    
                                            className="nav-item" 
                                            key={index}>
                                            <Link to={item.url} className={"nav-link" +
                                            (item.url === location.pathname ? " active" : "")
                                            }>
                                                <i class={item.iconName}></i>
                                                <span class="text">{`${t(item.label)}`}</span>
                                            </Link>
                                        </li>
                                    )
                                }   
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="sidebar__footer">
                    <span class="copyright">Copyright @ 2020, Minerva</span>
                </div>
            </div>
        </nav>
    )
}
export default Sidebar;