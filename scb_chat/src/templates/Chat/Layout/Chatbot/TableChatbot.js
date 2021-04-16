import ButtonSwitch from 'components/base/Button/ButtonSwitch';
import Table from 'components/base/Table/Table';
import { PAGES_URL } from 'contant';

import {convertToLinkUrl } from 'functions/Utils';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TableChatbot = ({dataSource ,translate}) => {
    const columns = [
        {
            title: translate('STT'),
            render: (_text, _record, index) => index + 1,
            width: "100px",
        },
        {
            title: translate('chatbot_img'),
            dataIndex: 'image',
            key: 'image',
            width: '20%',
            ellipsis: true,
            render: (text) => <div className="logoTheme" style={{ width: "32px", height: '32px' }}>
                <img className="w-100" src={text} />
            </div>
        },
        {
            title: translate('chatbot_name'),
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ellipsis: true,
            render: (text, record) =>
                <Link to={convertToLinkUrl(PAGES_URL.chatbot_detail, [record.id])} style={{ color: '#666b77' }}>
                    <div style={{ textDecoration: "underline", cursor: 'pointer' }}>{text}</div>
                </Link>
        },
        {
            title: translate('chatbot_number'),
            dataIndex: 'total_question',
            key: 'total_question',
            width: '20%',
            ellipsis: true,
        },
        {
            title: translate('chatbot_import'),
            dataIndex: 'agent',
            key: 'agent',
            width: '10%',
            ellipsis: true,
            render: () => <i className="fas fa-download " style={{ cursor: 'pointer' }}></i>
        },
    ];
    return (
        <Table
            columns={columns}
            dataSource={dataSource} />
    )
}
export default TableChatbot;