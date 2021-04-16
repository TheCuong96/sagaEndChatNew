import React from 'react'
import { Input, Form } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { translate } from 'functions/Utils';

const InputBase = (props) => {
    const {
        className,
        top,
        background,
        titleClassName,
        errors,
        name,
        value,
        label,
        addonAfter,
        addonBefore,
        placeholder,
        onChange,
        require,
        disabled,
        style,
        type,
        unit,
        classNameUnit,
        classNameInput,
        nameItem, rules,
        ...attr } = props;

    const { t } = useTranslation();

    const renderInput = () => {
        return (
            <div className={className ? className : "form-group"}>
                {
                    label &&
                    <label className={titleClassName ? titleClassName : "fw-medium"}>
                        <Trans>{label}</Trans>
                        {
                            require ? <span className="star"> *</span> : ""

                        }
                        {
                            unit ? <span className={classNameUnit ? classNameUnit : "unit"}>({unit})</span> : ""
                        }
                    </label>
                }
                <div className="input-group">
                    {nameItem ?
                        <Form.Item name={nameItem} rules={rules}>
                            <Input
                                className={classNameInput ? classNameInput : ""}
                                style={style ? style : { height: 48, backgroundColor: background }}
                                addonAfter={addonAfter}
                                addonBefore={addonBefore}
                                onChange={onChange}
                                placeholder={translate(placeholder, t)}
                                value={value}
                                name={name}
                                type={type}
                                {...attr}
                                readOnly={props.readOnly ? props.readOnly : undefined}
                                disabled={disabled ? disabled : undefined} />
                        </Form.Item>
                        :
                        <Input
                            className={classNameInput ? classNameInput : ""}
                            style={style ? style : { height: 48, backgroundColor: background }}
                            addonAfter={addonAfter}
                            addonBefore={addonBefore}
                            onChange={onChange}
                            placeholder={t(placeholder)}
                            value={value}
                            name={name}
                            type={type}
                            {...attr}
                            readOnly={props.readOnly ? props.readOnly : undefined}
                            disabled={disabled ? disabled : undefined} />}
                    <span style={{ color: 'red', fontSize: 12, marginTop: top }}>{errors}</span>
                </div>
            </div>
        )
    }

    //return default
    if (className) {
        return (
            <div className={className}>
                {renderInput()}
            </div>
        )
    }
    else {
        return renderInput()
    }
    //end
}

export default InputBase;