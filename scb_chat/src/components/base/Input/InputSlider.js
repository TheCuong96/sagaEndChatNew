import { InputNumber, Slider } from 'antd';
import React from 'react';


const InputNumberCustoms = props => {
    let { readOnly, label, onChange, value, addonBefore, className, classNameInput,
        style, min, max, step, classNameSlider, titleClassName,
        classNameUnit, unit, classNameGroupSlider, classNameGroupInput, classNameGroupInputSlider } = props;
    return (
        <div className={className ? className : "form-group"}>
            {
                label &&
                <label className={titleClassName ? titleClassName : "fw-medium"}>
                    {label}
                    {
                        unit ? <span className={classNameUnit ? classNameUnit : "unit"}>({unit})</span> : ""
                    }
                </label>
            }
            <div className={classNameGroupSlider ? classNameGroupSlider : "pull-range"}>
                <div className={classNameGroupInputSlider ? classNameGroupInputSlider : "slider-wrapper"}>
                    <Slider
                        tipFormatter={null}
                        className={classNameSlider ? classNameSlider : ""}
                        min={min}
                        max={max}
                        onChange={onChange}
                        step={step ? step : 1}
                        value={value} />
                </div>
                {classNameGroupInput ?
                    <div className={classNameGroupInput}>
                        <InputNumber
                            min={min ? min : 0}
                            max={max ? max : 0}
                            style={style ? style : { margin: '0 16px' }}
                            value={value}
                            readOnly={readOnly ? true : false}
                            step={step ? step : 1}
                            // disabled={readOnly ? true : false}
                            onChange={onChange}
                            className={classNameInput ? classNameInput : "form-control"}
                        />
                        {addonBefore &&
                            <div className="input-group-append">
                                <span className="input-group-text">
                                    {addonBefore}
                                </span>
                            </div>
                        }
                    </div>
                    :
                    [<InputNumber
                        min={min ? min : 0}
                        max={max ? max : 0}
                        style={style ? style : { margin: '0 16px' }}
                        value={value}
                        step={step ? step : 1}
                        readOnly={readOnly ? true : false}
                        // disabled={readOnly ? true : false}
                        onChange={onChange}
                        className={classNameInput ? classNameInput : "form-control"}
                        key={1}
                    />,
                    addonBefore &&
                    <div className="input-group-append" key={2}>
                        <span className="input-group-text">
                            {addonBefore}
                        </span>
                    </div>
                    ]
                }

            </div>
        </div>
    )
}
export default InputNumberCustoms;