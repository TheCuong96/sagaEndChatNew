import React, { useState } from 'react'

const InputCheckboxViolet = (props) => {
    const [state, setState] = useState({
        checked: false,
    });
    const { checked } = props;
    const checkboxOnChange = e => {
        setState({
            checked: !state.checked,
        });
        props.onChange && props.onChange(!state.checked)
    }
    React.useEffect(() => {
        setState({ checked: props.checked })
    }, [props])
    return (
        <label onChange={checkboxOnChange} className={state.checked ? "checkbox-inline style_02 active" : "checkbox-inline style_02"} type="checkbox">
            <input className="checkbox-custom" defaultValue={1} type="checkbox" />
            <span className="checkbox-custom-dummy" />
        </label>
    )
}

export default InputCheckboxViolet;