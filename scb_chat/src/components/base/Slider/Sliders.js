import React from 'react';
import { Slider, Switch } from 'antd';


const Sliders = (props) => {
  const { defaultValue, reverse, tooltipVisible, disabled, onChange, range, value } = props
  return (
    <div className="slider-wrapper">
      <Slider
        range={range}
        defaultValue={defaultValue}
        reverse={reverse}
        tooltipVisible={tooltipVisible}
        disabled={disabled}
        onChange={onChange}
        style={{ marginTop: 0 }}
      />
    </div>
  );
}
export default Sliders
