import { chatContant } from 'contant';
import React from 'react';
import IconExcel from './IconExcel'
import IconOther from './IconOther'
import IconPDF from './IconPDF'
import IconPowerpoint from './IconPowerpoint'
import IconWord from './IconWord'

const IconTypeMedia = (props) => {
    const { type, style } = props
    if (chatContant.LIST_WORD_EXTENSION.some(v => type === v)) {
        return <IconWord style={style} />
    } else if (chatContant.LIST_EXCEL_EXTENSION.some(v => type === v)) {
        return <IconExcel style={style} />
    } else if (chatContant.LIST_PDF_EXTENSION.some(v => type === v)) {
        return <IconPDF style={style} />
    } else if (chatContant.LIST_POWERPOINT_EXTENSION.some(v => type === v)) {
        return <IconPowerpoint style={style} />
    } else {
        return <IconOther style={style} />
    }
}
export default IconTypeMedia