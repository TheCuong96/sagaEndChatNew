import { Input } from "antd";
import { showNotification } from "functions/Utils";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PaginationPage from "react-js-pagination";

const Pagination = (props) => {
    const { t: translate } = useTranslation()
    let { data, onChange, limit } = props;
    const [activePage, setActivePage] = useState(1);
    const [inputNumber, setInputNumber] = useState('');
    const handlePageChange = (pageNumber) => {
        onChange(pageNumber);
        setActivePage(pageNumber);
        setInputNumber('');
    }

    useEffect(() => {
        if (data && data.page) {
            setActivePage(data.page);
        }
    }, [data]);
    const handleInputChange = (e) => {
        setInputNumber(e.target.value);
    }
    const handleKeypress = (e) => {
        const regexNumber = new RegExp("^[0-9]");
        const key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        const inputVal = e.target.value;
        if (e.key === "Enter") {
            let pageSearch = parseInt(inputVal)
            if (pageSearch == '0') {
                setInputNumber('');
                showNotification({
                    type: 'error',
                    message: translate('invalid_page'),
                    title: translate('error'),
                })
            }
            else
                if (data && data.total_page && pageSearch < data.total_page + 1) {
                    onChange && onChange(pageSearch);
                    setActivePage(pageSearch);
                } else {
                    setInputNumber('');
                    showNotification({
                        type: 'error',
                        message: translate('invalid_page'),
                        title: translate('error'),
                    })
                }
        }

        if (!regexNumber.test(key)) {
            e.preventDefault();
            return false;
        }
    }
    return (
        // data && data.total_page > 0 ?
        <div className="cus-pagination">
            <div className={'pagination '}>
                <label className="mb-0" style={{ padding: "5px 11px" }}>{translate('pagination_page')}:</label>
                <PaginationPage
                    itemClass="icon"
                    linkClass="number"
                    activeLinkClass="active"
                    prevPageText={translate('pagination_prev')}
                    nextPageText={translate('pagination_next')}
                    firstPageText={translate('pagination_first')}
                    lastPageText={translate('pagination_last')}
                    activePage={activePage}
                    itemsCountPerPage={limit}
                    totalItemsCount={data && data.total_record || 0}
                    pageRangeDisplayed={data && data.total_page}
                    onChange={handlePageChange}
                />
                <label className="mb-0 pr-2" style={{ padding: "5px 11px" }}>
                    <span style={{ padding: "0 3px", color: "#0080ff" }}>{activePage}</span> {`${translate('of')}`}
                    <span style={{ padding: "0 3px", color: "#0080ff" }}> {data && data.total_page} </span>
                    {`${translate('pagination_in_total')} ${data && data.total_record} ${translate('pagination_records')}`}
                </label>
                {/* <label className="vertical-dash mb-0 pr-2" >|</label>
                <label className="text-page d-inline-flex mb-0 pr-2">{translate('pagination_search_page')}:</label>
                <Input
                    type="number"
                    className="form-control square page-number text-center"
                    placeholder={translate('page_id')}
                    value={inputNumber}
                    onKeyPress={handleKeypress}
                    onChange={handleInputChange}
                /> */}
            </div>
        </div>
        //             :
        // <div className={'pagination m_pager'}>
        //     <label className="mb-0 pr-2" style={{ padding: "5px 11px" }}>
        //         {`${t('pagination_in_total')} ${data && data.total_record} ${t('pagination_records')}`}
        //     </label>
        // </div>
    )
}

export default Pagination;