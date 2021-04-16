import React from 'react'
import { Select as SelectAntd } from 'antd'
import { useTranslation } from 'react-i18next';
import { mapModifiers } from 'functions/Utils';

const { Option } = SelectAntd;

const Select = (props) => {
    const {
        data,
        modifiers, // Temporary unknown
        defaultValue,
        onChange,
        size = 'large',
        defaultOptionText,
        ...atrr
    } = props;
    const { t: translate } = useTranslation();

    const dropdownRender = menu => {
        if (menu.props.options.length === 0) {
            return <div style={{ padding: '10px 10px', textAlign: 'center', color: 'white' }}>{translate('no_data')}</div>;
        }
        return menu;
    };

    return (
        <div className={mapModifiers('rc_pulldown', modifiers)}>
            <SelectAntd
                className="rc_pulldown_select"
                size={size}
                defaultValue={defaultValue ? defaultValue.toString() : undefined}
                onChange={onChange}
                dropdownRender={dropdownRender}
                getPopupContainer={(trigger) => trigger.parentNode}
                suffixIcon={<i className="rc_pulldown_arrow fas fa-angle-down"></i>}
                {...atrr}
            >
                {
                    defaultOptionText && <Option value="">
                        {defaultOptionText}
                    </Option>
                }
                {
                    data && data.map((item, index) =>
                        <Option value={item.value.toString()} key={index}>
                            {translate(item.label)}
                            {item.floor && <a style={{ position: 'absolute', right: '15px' }}>{item.floor}</a>}
                        </Option>)
                }
            </SelectAntd>
        </div >
    )
}

export default Select;
