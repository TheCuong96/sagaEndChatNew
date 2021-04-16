import React, { useState } from 'react';
import { Trans } from 'react-i18next';

const InputCheckbox = (props) => {
    const { label } = props;
    const [state, setState] = useState({
        checked: false,
    });
    const checkboxOnChange = (target) => {
        setState({...state, checked: target.checked });
    }
    return (
        <label onChange={event => checkboxOnChange(event.target)} 
            className={`checkbox-inline checkbox-black ${state.checked ? 'active': '' }`}>
            <input name="checkbox-1" defaultValue={0} type="checkbox" className="checkbox-custom" />
            <span className="checkbox-custom-dummy" /><Trans>{label}</Trans>
        </label>
    )
}

export default InputCheckbox;