import React, { useState, useEffect } from "react";
import { DatePicker} from 'antd';
const { RangePicker } = DatePicker
import moment from 'moment';
import { datePichkerLocation, translate } from "functions/Utils";
import { useTranslation } from "react-i18next";
import Icon from '@ant-design/icons';
import { useLocation } from "react-router";
const InputDatePicker = (props) => {
    
    const dateFormat = "YYYY-MM-DD"
    const { placeholder, name, value, isClear, disabledDate , setDateHistory ,onChange } = props
    const [date, setDate] = useState(new Date());
    const { t  : translate} = useTranslation()
    const location = useLocation();
    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)
        // location.search === " "  && setDate()
        return function cleanup() {
            clearInterval(timer)
        }
    }, []);
    const onChangedate = (value , dateString) =>{ 
        console.log({dateString})
        onChange(dateString)
    }
 
    const IconTime = () => {
        return (<i className="color_f4a239 fas fa-calendar-alt"></i>)
    }
    
    return (
              
            <RangePicker
                locale={datePichkerLocation()}
                defaultValue={value ? null : isClear ? null : moment(date, dateFormat ? dateFormat : "DD/MM/YYYY")}
                defaultValue={value ? moment(value, dateFormat) : null}
                value={value && moment(value, dateFormat)}
                name={name}
                className="colo_bg_23262d w-100"
                format={dateFormat}
                placeholder={translate(placeholder, translate)}
                style={{ width: '100%', height: 36, backgroundColor: '#0080ff' }}
                onChange={ onChangedate}
                disabledDate={disabledDate}
                suffixIcon={<Icon component={IconTime} />}
                />
     

    )
}

export default InputDatePicker