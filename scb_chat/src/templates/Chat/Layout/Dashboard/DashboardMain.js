import React from 'react';
import ChartLine from "components/common/Chart/ChartLine";
import ChartColumn from "components/common/Chart/ChartColumn";

const DashboardMain = ({data, data_conversion,translate}) => {

    return (
        <>
            <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column">
                <div className="card h-100">
                    <div className="title__card"><span>{`${translate('dashboard_participants')}`} </span></div>
                    <div className="row">
                        <div className="col-lg-3 col-md-12">
                            <div className="chart-notes">
                                <div className="chart-notes__block">
                                    <div className="chart-notes__number blue-dot">+ {data && data.total_join}</div>
                                    <span className="chart-notes__text">{`${translate('dashboard_join')}`} </span></div>
                                <div className="chart-notes__block">
                                    <div className="chart-notes__number gray-dot">- {data && data.total_leave}</div>
                                    <span className="chart-notes__text">{`${translate('dashboard_leave')}`} </span></div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-12">
                            {data && data.statistical_customer &&
                            <ChartColumn data_chart={data.statistical_customer}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column">
                <div className="card h-100">
                    <div className="title__card"><span>{`${translate('dashboard_talk')}`} </span></div>
                    <div className="col-lg-12 col-md-12">
                        {data_conversion &&
                        <ChartLine data_c={data_conversion}/>}
                    </div>
                </div>
            </div>
        </>
    )
}
export default DashboardMain;