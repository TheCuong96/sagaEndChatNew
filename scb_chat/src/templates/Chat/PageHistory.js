import React, {useEffect, useState} from 'react';
import HeaderPageBlue from 'components/common/HeaderPageAction/HeaderPageBlue';

import HeaderPageDateDouble from 'components/common/HeaderPageAction/HeaderPageDateDouble';
import HistoryMain from './Layout/History/HistoryMain';
import {Form} from "antd";
import {useHistory, useLocation} from 'react-router';
import Select from "components/base/Select/Select";
import {historyMonitorAction} from "store/action";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {optionProject, optionStatus} from "contant";

const PageHistory = () => {
    const [dateHistory, setDateHistory] = useState([])
    const { t : translate } = useTranslation();
    const defaultProject = optionProject[0].value;
    const defaultStatus = optionStatus[0].value;
    const [formSearch] = Form.useForm();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    // const project_id = searchParams.get("project_id")
    const currentPath = location.pathname;
    const history = useHistory();
    const dispatch = useDispatch()
    const onFinish = (values) => {
        console.log({values});
    }
    useEffect(() => {
        dispatch(historyMonitorAction.getListHistoryMonitor({
            project_id: defaultProject,
            status: defaultStatus,
            limit: 10
        }));
    }, [])
    useEffect(() => {
        formSearch.setFieldsValue({
            ...{"project_id": searchParams.get("project_id") || defaultProject.toString() }
        })
        formSearch.setFieldsValue({
            ...{"status": searchParams.get("status") || defaultStatus.toString()}
        })
       
    }, [formSearch])
    
    const handleSearchProject = ( value ) => {
        const formValues = formSearch.getFieldValue();
        const project_id = formValues.project_id
        const status = formValues.status
        const searchDateDouble = formValues.searchDateDouble
        setDateHistory(value)
        dateHistory.length > 0 && formSearch.setFieldsValue({
            ...{"searchDateDouble": dateHistory}
        })
        
        if (status) {
            searchParams.set('status', formValues.status);
        }
        if (project_id) {
            searchParams.set('project_id', formValues.project_id);
        }        
        if (searchDateDouble) {
            searchParams.set('start_date', searchDateDouble[0]);
            searchParams.set('end_date', searchDateDouble[1]);
        }

        const pathName = currentPath.replace(currentPath, currentPath + `?${searchParams.toString()}`);
        history.push(pathName);

        dispatch(historyMonitorAction.getListHistoryMonitor({
            ...(project_id ? {project_id: project_id} : []),
            ...(status ? {status: status} : []),
            ...(searchDateDouble[0] ? {from_date: searchDateDouble[0]} : {}),
            ...(searchDateDouble[1] ? {to_date: searchDateDouble[1]} : {}),
            limit: 10
        }));
    }

    return (
        <>
            <div className="header-page">
                <div className="header-page__title">{`${translate('history')}`}</div>
                <Form
                    form={formSearch}
                    name="formSearch"
                    onFinish={onFinish}
                >
                    <div className="header-page__action">
                        <div className="header-page__action-blue">
                            <span className="text">Project :</span>
                            <Form.Item name='project_id' initialValue={defaultProject.toString()}>
                                <Select
                                    data={optionProject}
                                    onChange={handleSearchProject}

                                />
                            </Form.Item>
                        </div>

                        <div className="header-page__action-blue">
                            <span className="text">Status :</span>
                            <Form.Item name='status' initialValue={defaultStatus.toString()}>
                                <Select
                                    data={optionStatus}
                                    onChange={handleSearchProject}

                                />
                            </Form.Item>
                        </div>
                        <Form.Item name='searchDateDouble'>
                            <HeaderPageDateDouble onChange={handleSearchProject}  setDateHistory ={ setDateHistory} translate={translate}/>
                        </Form.Item>
                        <button hidden type="submit"/>
                    </div>
                </Form>
            </div>
            <HistoryMain translate={translate}  />
        </>
    )
}
export default PageHistory;