import React, { useState, useEffect } from 'react';
import UserMenu from './UserMenu';
const TopMenu = (props) => {
    return (
        <header className="header d-flex align-items-center" name-c="TopMenu">
            <div class="header_text_center">
                <i class="icon fas fa-plus-square"></i>
            </div>
            <UserMenu />
        </header>
    );
}

export default TopMenu;