import Select from 'components/base/Select/Select';
import React from 'react';

const HeaderPageBlue = ({ title, data, onChange }) => {
    return (
        <div className="header-page__action-blue">
            <span className="text">{title}</span>
            <Select
                data={data}
                defaultValue={data[0].value}
                onChange={onChange}
            />
        </div>
    )
}
export default HeaderPageBlue;