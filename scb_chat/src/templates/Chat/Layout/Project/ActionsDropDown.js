import useClickOutside from 'hooks/useClickOutside';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ActionsDropDown = (props) => {
    const { edit } = props;
    const { ref, active, toggle } = useClickOutside();
    const { t: translate } = useTranslation();

    const showMenu = () => {
        toggle()
    }

    return (
        <div className="dropdown">
            <a data-toggle="dropdown">
                <i className="icon-dots las la-ellipsis-h" onClick={showMenu}></i>
            </a>
            <div
                className={`dropdown-menu ${active ? 'show' : ''}`}
                ref={ref}
                style={{
                    willChange: 'transform',
                    position: 'absolute',
                    transform: 'translate3d(-120px, 22px, 0px)',
                    top: '0px',
                    left: '0px',
                }}
            >
                <a className="dropdown-item" onClick={edit}>
                    <i className="icon-dropdown las la-pen" ></i>
                    {translate('edit')}
                </a>
            </div>
        </div>
    )
}
export default ActionsDropDown;