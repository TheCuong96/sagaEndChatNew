import React from 'react';
import { Input } from 'antd';

const InputIcon = (props) => {

    const { className, data, onDataChange, icon, inputType, disabled } = props

    return (
        <Input className={className}
            value={data ? data : undefined}
            onChange={onDataChange ? onDataChange : undefined}
            disabled={disabled ? true : false}
            type={inputType} suffix={icon}
        />
    )
}

export default InputIcon;