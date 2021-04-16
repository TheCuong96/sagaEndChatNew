import React, { useEffect } from 'react';
import TableProject from './TableProject';
import Pagination from 'components/common/Pagination';
import { LoadDataPaging } from 'functions/Utils';
import {historyMonitorAction, projectAction} from "store/action";
import {useDispatch} from "react-redux";

import { chatProfileAction } from 'store/action'
const ProjectMain = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(chatProfileAction.getUserListResquest())
        return () => {
            
        }
    }, [])
    const { dataPagination, dataTableProject, translate ,setToggle, setProjectUpdate} = props
    const handleChangePage = (page) => {
        console.log({page});
        dispatch(projectAction.getProjectList({
            page:page
        }));
    }
    return (
        <div className="card">
            <div className="title__card">Danh sách Project</div>

            <TableProject setToggle={setToggle} setProjectUpdate={setProjectUpdate} dataSource={dataTableProject}
            translate={translate}/>

            <div className="footer-table">
                <div className="footer-table__total">
                {`${translate('history_total')}`}: <span className="text-primary">{dataPagination && dataPagination.total_record}</span>
                </div>
                {   dataPagination &&
                    <Pagination
                        data={LoadDataPaging(dataPagination.total_record, dataPagination.page, dataPagination.total_page, 9)}
                        limit={9}
                        onChange={handleChangePage}
                    />}

            </div>
        </div>
    )
}
export default ProjectMain;