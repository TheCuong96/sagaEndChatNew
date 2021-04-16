import React, { useRef, useEffect, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Menu, Dropdown, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory, NavLink, Link } from 'react-router-dom';
import { getLocalStorage } from 'functions/Utils';
import { IMAGE_URL, PAGES_URL } from '../../../contant';


const UserActionMenu = (props) => {
    const userLocal = getLocalStorage('user')
    const [user, setUser] = useState(userLocal)

    const logOut = () => {
        // xóa data storage 
        getLocalStorage('user', true)

        //reload page and auto run /login
        window.location.reload()
    }

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);

    useEffect(() => {
        const pageClickEvent = (e) => {
            // If the active element exists and is clicked outside of
            if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
                setIsActive(!isActive);
            }
        };
        // If the item is active (ie open) then listen for clicks
        if (isActive) {
            window.addEventListener('click', pageClickEvent);
        }
        return () => {
            window.removeEventListener('click', pageClickEvent);
        }
    }, [isActive]);

    return (
        <>
            {/* user info  */}
            

            {/* user menu dropdown  */}
            <div class={`user__actions ${isActive ? 'active' : ''}`} ref={dropdownRef}>
                <ul>
                    <li class="log-out">
                        <Link to="/login" onClick={logOut} className="w-100 justify-content-start">
                            <i class="icon fas fa-sign-out-alt"></i>
                            <span><Trans>login_profile_logout</Trans></span>
                        </Link>
                    </li>
                </ul>
            </div>
        </>

    )
}
export default UserActionMenu