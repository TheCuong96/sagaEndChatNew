import React, {useEffect} from 'react';
import MonitoringMain from './Layout/Monitoring/MonitoringMain';

import {Form} from 'antd';
import Select from 'components/base/Select/Select';
import {useHistory, useLocation} from 'react-router';
import {monitoringAction} from "store/action";
import {useDispatch} from "react-redux";
import { useTranslation } from 'react-i18next';
import {optionProject} from "contant";

const PageMonitoring = () => {
    const [formSearch] = Form.useForm();
    const location = useLocation();
    const { t : translate} = useTranslation();

    const searchParams = new URLSearchParams(location.search);
    const currentPath = location.pathname;
    const history = useHistory();
    const dispatch = useDispatch()
    const onFinish = (values) => {
        console.log({values});
    }

    useEffect(() => {   
        formSearch.setFieldsValue({
            ...{"project_id": searchParams.get("project_id")}
        })
        formSearch.setFieldsValue({
            ...{"status": searchParams.get("status")}
        })
    }, [formSearch])

    const handleSearchProject = () => {
        const formValues = formSearch.getFieldValue();
        const project_id = formValues.project_id
        const status = formValues.status

        if (status) {
            searchParams.set('status', formValues.status);
        }
        if (project_id) {
            searchParams.set('project_id', formValues.project_id);
        }

        const pathName = currentPath.replace(currentPath, currentPath + `?${searchParams.toString()}`);
        history.push(pathName);

        dispatch(monitoringAction.getListMonitoring({
            ...(project_id ? { project_id: project_id } : []),
            ...(status ? { status: status } : []),
            limit: 10
        }));
    }

    return (
        <>
            <div className="header-page">
                <div className="header-page__title">
                {`${translate('monitoring')}`}
                </div>
                <Form
                    form={formSearch}
                    name="formSearch"
                    onFinish={onFinish}
                >
                    <div className="header-page__action">
                        <div className="header-page__action-blue">
                            <span className="text"> {`${translate('project')} :`}</span>
                            <Form.Item name='project_id'>
                                <Select
                                    data={optionProject}
                                    onChange={handleSearchProject}
                                />
                            </Form.Item>
                        </div>
                        <div className="header-page__action-blue">
                            <span className="text"> {`${translate('status')}`} :</span>
                            <Form.Item name='status'>
                                <Select
                                    data={optionProject}
                                    onChange={handleSearchProject}
                                />
                            </Form.Item>
                        </div>
                        <button hidden type="submit"/>
                    </div>
                </Form>
            </div>
            <MonitoringMain translate={translate} handler={handleSearchProject}/>
        </>
    )
}
export default PageMonitoring;