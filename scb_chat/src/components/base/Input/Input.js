import React from 'react';
import { Input as InputAntd } from 'antd';
import { useTranslation } from 'react-i18next';
import { mapModifiers } from 'functions/Utils';

const Input = (props) => {
    const { modifiers, size, prefix, placeholder, onlyNumber, ...atrr } = props;
    const { t } = useTranslation();
    const className = mapModifiers('rc_textfield', size, modifiers);

    const isNumberKey = (evt) => {
        const regexNumber = new RegExp("^[0-9]");
        const key = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode);
        if (!regexNumber.test(key)) {
            evt.preventDefault();
            return false;
        }
    }

    return (
        <div className={className}>
            <InputAntd
                prefix={prefix}
                className={className}
                placeholder={placeholder && t(placeholder)}
                onKeyPress={onlyNumber ? isNumberKey : undefined}
                type="text"
                autoComplete={'off'}
                {...atrr}
            />
        </div>
    )
}
export default Input;