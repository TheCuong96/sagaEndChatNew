import React, {useEffect, useState} from 'react';
import Pagination from 'components/common/Pagination';
import TableMonitoring from './TableMonitoring';
import {LoadDataPaging} from 'functions/Utils';
import {useDispatch} from 'react-redux';
import {monitoringAction} from 'store/action';
import {useSelector} from 'react-redux';
import {listMonitorMapping} from './Mapping/listMonitorMapping';
import {useHistory, useLocation} from 'react-router';

const MonitoringMain = (props) => {
    const {translate} = props
    const dispatch = useDispatch();
    const dataPagination = useSelector((state) => state.monitoringReducer.meta);

    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const project_id = searchParams.get("project_id")
    const status = searchParams.get("status")

    const [state, setState] = useState({dataMap: {}, data: []})
    const listMonitoringReducer = useSelector((state) => state.monitoringReducer.list);
    const actionMonitorReducer = useSelector(state => state.actionMonitorReducer)
    const {detail, success} = actionMonitorReducer

    useEffect(() => {
        if (listMonitoringReducer) {
            setState({
                ...state, data: listMonitoringReducer.length > 0 ? listMonitorMapping(listMonitoringReducer) : null
            })
        }

    }, [listMonitoringReducer])

    const onClickRow = (record) => {
        return {
            onClick: () => {
                setState({...state, dataMap: record})
            },
        };
    }

    useEffect(() => {
        dispatch(monitoringAction.getListMonitoring({
            ...(project_id ? {project_id: project_id} : []),
            ...(status ? {status: status} : []),
            limit: 10,
        }));
    }, []);

    useEffect(() => {
        if (success) {
            var data = state.data;
            var index = data.findIndex(model => model.roomId === detail.room_id);
            data[index].statusId = detail.status;
            setState({...state, data: data});

            dispatch(monitoringAction.clearData());
        }

    }, [detail, success])


    const handleChangePage = (page) => {
        console.log({page});
        dispatch(monitoringAction.getListMonitoring({
            ...(project_id ? {project_id: project_id} : []),
            ...(status ? {status: status} : []),
            page: page,
            limit: 10,
        }));
    }

    return (
        <div className="card">
            <div className="title__card">{`${translate('monitoring_list')}`}</div>
            <TableMonitoring dataSource={state.data} translate={translate} onClickRow={onClickRow}/>
            {
                dataPagination &&
                <div className="footer-table">
                    <div className="footer-table__total">
                        Tổng số người tham gia: <span className="text-primary">{dataPagination.total_record}</span>
                    </div>

                    <Pagination
                        data={LoadDataPaging(dataPagination.total_record, dataPagination.page, dataPagination.total_page, 9)}
                        limit={9}
                        onChange={handleChangePage}
                    />

                </div>
            }

        </div>
    )
}
export default MonitoringMain;