import React from 'react';
import { Input } from 'antd';
import { mapModifiers } from 'functions/Utils';

const InputPassword = (props) => {
    const { size, modifiers, ...remainingProps } = props;
    const className = mapModifiers('rc_textfield', size, modifiers);

    return (
        <div className={`${className} rc_textfield_password`}>
            <Input.Password
                prefix={<i className="la la-lock" ></i>}
                {...remainingProps}
            />
        </div>
    )
}
export default InputPassword;