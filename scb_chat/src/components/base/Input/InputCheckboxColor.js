import React, { useState, useEffect } from 'react'

const InputCheckboxColor = (props) => {

    const { visible, id, onChange, yellow, isChecked, defaultChecked } = props;
    const [state, setState] = useState({
        checked: defaultChecked ? defaultChecked : false,
    });

    const checkboxOnChange = () => {
        onChange && onChange(!state.checked, id)
        setState({ checked: !state.checked })
    }

    useEffect(() => {
        setState({
            checked: defaultChecked ? defaultChecked : false,
        })
    }, [visible])

    useEffect(() => {
        if (isChecked != undefined) {
            setState({
                checked: isChecked,
            })
        }
    }, [isChecked])
    
    return (
        <label className={`checkbox_custom ${yellow ? "checkbox_yellow" : "checkbox_red"} ${state.checked ? "active" : ""} ${visible ? "" : "d-none"}`}>
            <input type="checkbox" checked={state.checked ? state.checked : false} className="checkbox_custom__input" onChange={checkboxOnChange} />
            <span className="checkbox" />
        </label>
    )
}

export default InputCheckboxColor;