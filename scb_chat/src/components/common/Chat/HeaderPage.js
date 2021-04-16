import React from 'react';
import Select from 'components/base/Select/Select'
import { optionProject } from 'contant';

const HeaderPage = () => {
    return (
        <div className="header-page">
            <div className="header-page__title">
                Monitoring
            </div>
            <div className="header-page__action">
                <div className="header-page__action-blue">
                    <span className="text">Project :</span>
                    <Select
                        data={optionProject}
                        defaultValue={optionProject[0].value} />
                </div>
                <div className="header-page__action-blue">
                    <span className="text">Project :</span>
                    <Select
                        data={optionProject}
                        defaultValue={optionProject[0].value} />
                </div>
            </div>
        </div>
    )
}
export default HeaderPage;