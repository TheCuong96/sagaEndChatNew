import React, {useEffect} from 'react';

import HeaderPageDate from 'components/common/HeaderPageAction/HeaderPageDate';
import HeaderPageBlue from 'components/common/HeaderPageAction/HeaderPageBlue';
import DashboardMain from './Layout/Dashboard/DashboardMain';
import {useDispatch, useSelector} from "react-redux";
import {dashboardAction} from "store/action";

import { useTranslation } from 'react-i18next';
import {optionProject} from "contant";


const PageDashboard = () => {
    const { t : translate } = useTranslation();

    const dispatch = useDispatch();
    const dataDashboard = useSelector((state) => state.dashboardReducer.list);
    const {customer, conversion} = dataDashboard;
    const currentPath = location.pathname;
    // const searchParams = new URLSearchParams(location.search);
    // console.log({searchParams})
    const param = {
        // project_id:1
    }
    useEffect(() => {
        dispatch(dashboardAction.getDashboardInfo({
            ...param,
        }));
    }, []);


    const handleChangeProject = (values) => {
        const something = "project_id=" + values
        param['project_id'] = values
        const pathName = currentPath.replace(currentPath, currentPath + `?${something.toString()}`);
        history.push(pathName);
        dispatch(dashboardAction.getDashboardInfo({
            ...param,
        }));
    }
    return (
        <div className="container-fluid">
            <div className="dashboard">
                <div className="row">
                    <div className="col-12">
                        <div className="header-page">
                            <div className="header-page__title">
                            {`${translate('dashboard')}`}
                            </div>
                            <div className="header-page__action">

                                <HeaderPageBlue title= {`${translate('project')} :`} data={optionProject}/>
                                <HeaderPageDate translate ={translate}/>
                            </div>  

                        </div>
                    </div>
                </div>
                <div className="row">
                    {customer && customer.customer_chart &&
                    <DashboardMain data={customer.customer_chart}
                                   translate={translate}
                                   data_conversion={conversion.conversion_chart}/>}
                </div>

                <div className="row">
                    <div className="col-lg-3 col-md-6 mb-3">
                        <div className="statistical_card">
                            <div className="title__card"><span>{`${translate('dashboard_active')}`}</span></div>
                            <div className="statistical_card__block card_blue"><i className="statistical_card__icon las la-user-check"></i>
                                <div className="statistical_card__number">{customer && customer.online_customer}</div>
                                <div className="statistical_card__content">{`${translate('dashboard_People')}`}</div>
                                <div className="statistical_card__counter">+{customer && customer.online_percent}% {`${translate('dashboard_People_active')}`}</div>
                            </div>
                            <div className="progress statistical_card__progress">
                                <div className="progress-bar" role="progressbar" style={{width: "60%"}} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-3">
                        <div className="statistical_card card">
                            <div className="title__card"><span>{`${translate('dashboard_participants')}`}</span></div>
                            <div className="statistical_card__block card_blue"><i className="statistical_card__icon las la-user"></i>
                                <div className="statistical_card__number">{customer && customer.participants_customer}</div>
                                <div className="statistical_card__content">{`${translate('dashboard_People')}`}/{`${translate('year')}`}</div>
                                <div className="statistical_card__counter">+{customer && customer.participants_percent}% {`${translate('dashboard_People_active')}`}</div>
                            </div>
                            <div className="progress statistical_card__progress">
                                <div className="progress-bar" role="progressbar" style={{width: "60%"}} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12 mb-3">
                        <div className="statistical_card card">
                            <div className="title__card"><span>{`${translate('dashboard_chats')}`}</span></div>
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                    <div className="statistical_card__block card_blue"><i className="statistical_card__icon las la-question-circle"></i>

                                        <div className="statistical_card__number">{conversion && conversion.total_question}</div>
                                        <div className="statistical_card__content">{`${translate('dashboard_list_question')}`}</div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                    <div className="statistical_card__block border_absolute card_green"><i className="statistical_card__icon las la-check-circle"></i>
                                        <div className="statistical_card__number">{conversion && conversion.total_answer}</div>
                                        <div className="statistical_card__content">{`${translate('dashboard_answer')}`}</div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                    <div className="statistical_card__block card_red"><i className="statistical_card__icon las la-exclamation-circle"></i>
                                        <div className="statistical_card__number">{conversion && conversion.total_no_answer}</div>
                                        <div className="statistical_card__content">{`${translate('dashboard_no_answer')}`}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    )
}
export default PageDashboard;