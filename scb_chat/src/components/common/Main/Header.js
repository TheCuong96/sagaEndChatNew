import React, { useEffect, useState } from 'react';
import Logo from '../../../../public/images/logo-bg.png';
import Avatar from '../../../../public/images/avt_admin.jpg';
import { useDispatch, useSelector } from 'react-redux';
import {mainAction, staffAction} from 'store/action';
import { PAGES_URL } from 'contant';
import { useHistory } from 'react-router';
import ChangeLanguage from './ChangeLanguage';
import {getLocalStorage} from "functions/Utils";
import {useTranslation} from "react-i18next";

const Header = () => {
    const { t: translate } = useTranslation();
    const [isVisible, setVisible] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const isToggle = useSelector(state => state.mainReducer.toggle);
    const onToggle = () => {
        dispatch(mainAction.toggleExam(isToggle));
    }

    useEffect(() => {
        dispatch(staffAction.loadStaffProfile());
    }, []);

    const staff = getLocalStorage('user')


    return (
        <header class="header d-flex align-items-center">
            <div class={`sidebar__logo ${isToggle ? 'hide' : ''}`}>
                <a href="#" class="link">
                    <img class="logo_with_text" src={Logo} alt="logo_with_text"/>
                </a>
                <div class="sidebar__toggle_icon" onClick={onToggle}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div class="header_text_center">
                <i class="icon las la-cog"></i>
            </div>
            <div class="user">
                <ChangeLanguage/>
                <div class="user__notification">
                    <div class="item user__conversation active">
                        <i class="icon fas fa-comments"></i>
                        <i class="number">17</i>
                    </div>
                </div>
                <div class="user__wrap d-flex" onClick={() => setVisible(!isVisible)}>
                    <figure class="user__avatar">
                        <img src={staff.avatar_url} alt="avatar user"/>
                    </figure>
                    <div class="user__info">
                        <span class="name">{staff.name}</span>
                        <span class="position">{staff.email}</span>
                    </div>
                </div>
                <div class={`user__actions ${isVisible ? 'active' : ''}`}>
                    <ul>
                        <li>
                            <a onClick={() => {
                                history.push(PAGES_URL.profile),
                                    setVisible(!isVisible)
                            }}>
                                <i className="icon fas fa-user"></i>
                                {translate('my_profile')}
                            </a>
                        </li>
                        <li class="log-out">
                            <a onClick={() => {
                                localStorage.removeItem('user'),
                                    history.push(PAGES_URL.login),
                                    window.location.reload();
                            }}>
                                <i class="icon fas fa-sign-out-alt"></i>
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

        </header>
    )
}
export default Header;