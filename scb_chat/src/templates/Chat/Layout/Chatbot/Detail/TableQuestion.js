import Table from 'components/base/Table/Table';
import React from 'react';

import { translate } from 'functions/Utils';

const TableQuestion = ({dataSource}) => {
    const onSelectRow = (e) => {
        console.log({ e });
    }
    const onEdit = (id) => {
        console.log('edit tai id nay ne: ', id);
    }
    const onDelete = (id) => {
        console.log('Delete id nay ne: ', id);
    }
    const Column = [
        {
            title: translate('question'),
            dataIndex: 'question',
            key: 'question',
            width: '40%',
            render: (text) => <div style={{ wordWrap: 'break-word' }}>{text}</div>
        },
        {
            title: translate('answer'),
            dataIndex: 'answer',
            key: 'answer',
            width: '45%',
            render: (text) => <div style={{ wordWrap: 'break-word' }}>{text}</div>
        },
        {
            title: translate('action'),
            width: '15%',
            render: (text, record) => <div className="d-flex" style={{ alignItems: 'center' }}>
                <span style={{ color: '#0080ff', padding: '5px 17px', backgroundColor: 'rgba(0, 128, 255, 0.1)', cursor: 'pointer' }}>Câu mẫu</span>
                <i className="fas fa-pen ml-3" style={{ cursor: 'pointer' }} onClick={() => onEdit(record.id)}></i>
                <i className="fas fa-trash-alt ml-3" style={{ cursor: 'pointer' }} onClick={() => onDelete(record.id)}></i>
            </div>
        },
    ]
    return (
        <Table
            columns={Column}
            dataSource={dataSource}
            onSelectRow={onSelectRow}
        />
    )
}
export default TableQuestion;