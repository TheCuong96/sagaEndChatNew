import React from 'react';
import {Trans } from 'react-i18next';
import {Link} from 'react-router-dom'
import {convertDateYYYYMMDD} from 'functions/Utils'

const ButtonStyle = (props) => {
    const {className,dateFrom, dateTo, label, href, onClick, paramsSearch, titleNews} = props
        const fromDate = convertDateYYYYMMDD(dateFrom)
        const toDate =  convertDateYYYYMMDD(dateTo)
    return <Link  onClick={onClick} to={{
        pathname: href, state:{paramsSearch, titleNews, fromDate, toDate}}}
     className={className}><Trans>{label}</Trans></Link>
}

export default ButtonStyle;
