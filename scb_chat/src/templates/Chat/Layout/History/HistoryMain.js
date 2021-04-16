import {LoadDataPaging} from 'functions/Utils';
import React, {useEffect} from 'react';
import Pagination from 'components/common/Pagination';
import TableHistory from './TableHistory';
import {useDispatch} from 'react-redux';
import {listHistoryMonitorMapping} from './Mapping/listHistoryMonitorMapping';
import {historyMonitorAction} from 'store/action';
import {useSelector} from 'react-redux';
import {useHistory, useLocation} from 'react-router';


const HistoryMain = (props) => {
    const {translate} =props
    const location = useLocation();
    const dispatch = useDispatch();
    const listHistoryMonitorReducer = useSelector((state) => state.historyMonitorReducer.list);
    const dataPagination = useSelector((state) => state.historyMonitorReducer.meta);
    const dataHistoryMonitor = listHistoryMonitorReducer.length > 0 ? listHistoryMonitorMapping(listHistoryMonitorReducer) : null;

    const searchParams = new URLSearchParams(location.search);
    const project_id = searchParams.get("project_id")
    const status = searchParams.get("status")

    useEffect(() => {
        dispatch(historyMonitorAction.getListHistoryMonitor({
            ...(project_id ? {project_id: project_id} : []),
            ...(status ? {status: status} : []),
            limit: 10,
        }));
    }, []);

    const handleChangePage = (page) => {
        console.log({page});
        dispatch(historyMonitorAction.getListHistoryMonitor({
            ...(project_id ? {project_id: project_id} : []),
            ...(status ? {status: status} : []),
            page: page,
            limit: 10,
        }));
    }

    return (
        <div className="card">
            <div className="title__card">{`${translate('monitoring_list')}`}</div>
            <TableHistory dataSource={dataHistoryMonitor} translate={translate}/>
            <div className="footer-table">
                <div className="footer-table__total">
                {`${translate('history_total')}`}: <span className="text-primary">{
                        dataPagination &&
                        dataPagination.total_record
                    }</span>
                </div>
                {
                    dataPagination &&
                    <Pagination
                        data={LoadDataPaging(dataPagination.total_record, dataPagination.page, dataPagination.total_page, 9)}
                        limit={9}
                        onChange={handleChangePage}
                    />
                }

            </div>
        </div>
    )
}
export default HistoryMain;