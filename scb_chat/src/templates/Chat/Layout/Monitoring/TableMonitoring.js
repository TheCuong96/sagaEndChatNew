import Table from 'components/base/Table/Table';
import {showConfirm} from 'libs/confirmation';
import React, {useEffect, useState} from 'react';
import ImgLeave from '../../../../../public/images/exit-m.svg';
import {useDispatch, useSelector} from "react-redux";
import {monitoringAction} from "store/action";
import {contantStatus} from "contant";

const TableMonitoring = ({dataSource, translate: translate, onClickRow}) => {
    // const renderMessage = () => {
    //     return (
    //         <div>
    //             Bạn có muốn thoát khỏi thread ?
    //         </div>
    //     )
    // }

    const dispatch = useDispatch()


    function onLeave(room_id,) {

        function handleLeave(room_id,) {
            dispatch(monitoringAction.actionMonitor({
                room_id: room_id,
            }));

        }

        showConfirm({
            onOk: () => {
                handleLeave(room_id,)
            },
            okText: translate('dashboard_leave'),
            img: ImgLeave,
            cancelText: 'Hủy bỏ',
            message: <div>Bạn có muốn thoát khỏi thread ? </div>,

        })
    }

    function onJoin(room_id,) {
        function handleJoin(room_id,) {
            dispatch(monitoringAction.actionMonitor({
                room_id: room_id,
            }));

        }

        showConfirm({
            onOk: () => {
                handleJoin(room_id,)
            },
            okText: 'Xác nhận',
            img: ImgLeave,
            cancelText: 'Hủy bỏ',
            message: <div>Bạn có muốn tham gia vào thread ? </div>,
        })
    }

    const columns = [
        {
            title: translate('STT'),
            render: (_text, _record, index) => index + 1,
            width: "100px",
        },
        {
            title: translate('action'),
            dataIndex: 'statusId',
            key: 'action',
            width: '10%',
            ellipsis: true,
            render: (statusId, record) => {
                if (statusId === 2) {
                    return <div className="action action-out" onClick={() => onLeave(record.roomId)}>Leave</div>
                } else if (statusId === 1) {
                    return <div className="action action-join" onClick={() => onJoin(record.roomId)}>Join</div>
                }
            }
        },
        {
            title: translate('status'),
            dataIndex: 'statusId',
            key: 'status',
            width: '15%',

            render: (statusId) => {
                return translate(contantStatus[statusId])
            },
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
            render: (text) => <div className="logoTheme" style={{width: "32px", height: '32px'}}>
                <img className="w-100" src={text}/>
            </div>
        },
        {
            title: translate('monitoring_message'),
            dataIndex: 'message',
            key: 'message',
            width: '10%',
            ellipsis: true,
            render: (text) => <div style={{textDecoration: "underline", cursor: 'pointer'}}>{text}</div>
        },
        {
            title: translate('project'),
            key: 'project',
            dataIndex: 'project',
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
    ];
    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            onRow={onClickRow}
        />
    )
}
export default TableMonitoring;