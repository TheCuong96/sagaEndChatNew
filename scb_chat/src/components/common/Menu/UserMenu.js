import React from 'react';
import UserActionMenu from './UserActionMenu'
import UserLangMenu from './UserLangMenu'
const UserMenu = (props) => {
    return (
        <div className="user">
            <UserLangMenu />
            <UserActionMenu />
        </div>
    )
}
export default UserMenu