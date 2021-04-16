import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

function handleChange() {
    console.log('sfsdfsd');
}
const SelectMultiple = (props) => {
    return (
        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange} mode="multiple">
            <Option value="1">Jack</Option>
            <Option value="2">Lucy</Option>
            <Option value="8">2</Option>
            <Option value="3">4</Option>
            <Option value="3">3</Option>
            <Option value="4">7</Option>
            <Option value="5">9</Option>
            <Option value="6">88</Option>
            <Option value="7">0</Option>
        </Select>
    )
}

export default SelectMultiple;
