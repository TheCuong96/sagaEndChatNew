import React, { useState } from 'react'
import { Trans } from 'react-i18next'

const InputCheckboxWhite = (props) => {
    const { label, checked, onChange } = props
    const [state, setState] = useState({
        checked: checked != undefined ? checked : false,
    });

    const checkboxOnChange = e => {
        setState({
            checked: e.target.checked,
        });
        onChange(e.target.checked)
    }
    return (
        <label onChange={checkboxOnChange} className={state.checked ? "checkbox-inline active" : "checkbox-inline"} type="checkbox">
            <input defaultValue={1} type="checkbox" className="checkbox-custom" />
            <span className="checkbox-custom-dummy" />
            <Trans>{label}</Trans>
        </label>
    )
}

export default InputCheckboxWhite;