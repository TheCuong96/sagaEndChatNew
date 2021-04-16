import React from 'react';
import { convertFloatToString, convertStringToFloat, validatoInputCurrency } from 'functions/Utils';

const InputCurrency = props => {
    let { disabled, defaultValue, type, className, readOnly } = props;
    const [value, setValue] = React.useState(false)
    const onChange = (value) => {
        let text = value

        if (typeof text == "string") {
            text = convertStringToFloat(text, true)
        }
        console.log(text);
        if (validatoInputCurrency(text) || text == "") {

            if (props.onChange) {
                props.onChange(text == "" ? 0 : text)
            }
        }
    }
    React.useEffect(() => {
        if (props.value) {
            if (typeof props.value == "string") {
                if (props.value.indexOf(",") != -1) {
                    setValue(convertStringToFloat(props.value))
                }
                else {
                    setValue((props.value))
                }
            }
            else {
                setValue((props.value))
            }
        }
        else {
            setValue(0)
        }
    }, [props.value])
    return (
        <input
            disabled={disabled}
            value={convertFloatToString(value)}
            type={type}
            readOnly={readOnly}
            onChange={e => onChange(e.target.value)}
            className={className} />
    )
}
export default InputCurrency;