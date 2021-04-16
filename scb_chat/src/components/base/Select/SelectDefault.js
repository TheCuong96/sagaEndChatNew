import React from 'react';
import { Select } from 'antd';
import { Trans } from 'react-i18next';



const SelectDefault = (props) => {
    const { name, value, defaultValue, label, errors, style, datas, placeholder, onChange, isClear, classNameGroup, trans, require, disabled, titleClassName, classNameSelect } = props;
    const { Option } = Select;
    return (
        <div className={classNameGroup ? classNameGroup : "form-group"}>
            {
                label &&
                <label className={titleClassName ? titleClassName : "fw-medium"}>
                    <Trans>{label}</Trans>
                    {
                        require ? <span className="star"> *</span> : ""
                    }
                </label>
            }
            <Select
                defaultValue={defaultValue}
                style={style}
                dropdownClassName="js-select2"
                className={classNameSelect ? classNameSelect : "form-control"}
                onChange={onChange}
                disabled={disabled}
                value={isClear ? null : value}
                placeholder={<Trans>{placeholder}</Trans>}
                children={datas && datas.map((e, key) => {
                    return <Option name={name} key={key} value={e.value}>{trans ? <Trans>{e.label}</Trans> : e.label}</Option>;
                })} /><br />
            <span style={{ color: 'red', fontSize: 12 }}><Trans>{errors}</Trans></span>
        </div>
    )
}

export default SelectDefault;
