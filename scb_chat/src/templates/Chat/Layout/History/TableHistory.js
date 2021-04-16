import Table from 'components/base/Table/Table';



import React from 'react';


const TableHistory = ({dataSource , translate}) => {
    const columns = [
        {
            title: translate('STT'),
            render: (_text, _record, index) => index + 1,
            width: "70px",
        },
        {
            title: translate('status'),
            dataIndex: 'status',
            key: 'status',
            width: '8%',
            ellipsis: true,
        },
        {
            title: translate('monitoring_visitor'),
            dataIndex: 'visitor',
            key: 'visitor',
            width: '10%',
            ellipsis: true,
        },
        {
            title: translate('monitoring_agents'),
            dataIndex: 'agent',
            key: 'agent',
            width: '10%',
            ellipsis: true,
            render: (text) => <div className="logoTheme" style={{ width: "32px", height: '32px' }}>
                <img className="w-100" src={text} />
            </div>
        },
        {
            title: translate('monitoring_message'),
            dataIndex: 'message',
            key: 'message',
            width: '14%',
            ellipsis: true,
            render: (text) => <div style={{textDecoration: "underline", cursor: 'pointer'}}>{text}</div>
        },
        {
            title: translate('project'),
            key: 'project',
            dataIndex: 'projectName',
            width: '10%',
            ellipsis: true
        },
        {
            title: translate('monitoring_duration'),
            key: 'duration',
            dataIndex: 'duration',
            width: '10%',
            ellipsis: true
        },
        {
            title: translate('history_export'),
            key: 'export',
            dataIndex: 'export',
            width: '5%',
            ellipsis: true,
            render: () => <div>
                <i className="fas fa-download table-icon"></i>
            </div>
        },
    ];
    return (
        <Table
            columns={columns}
            dataSource={dataSource}/>
    )
}
export default TableHistory;