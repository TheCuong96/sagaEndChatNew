import React, { useState } from 'react';
import { Switch } from 'antd';

const ButtonSwitch = () => {
    const [isActive, setActive] = useState(false);
    const onChange = (e) => {
        setActive(e)
    }
    return (
        <div className="rc_button-switch">
            <Switch onChange={onChange} />
            <span className={`name pl-2 ${isActive ? 'active' : ''}`}>Hoạt động</span>
        </div>

    )
}
export default ButtonSwitch;