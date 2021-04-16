import React, { useState, useEffect, Suspense } from 'react';
import { withTranslation, I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import i18n from '../i18n';

import { GUESTS } from "routes";
import StaticLoading from '../components/common/Loading/StaticLoading';
//components

const MainLogin = (props) => {
    return (
        <I18nextProvider i18n={i18n}>
            <Suspense fallback={<StaticLoading />}>
                <Switch >
                    {GUESTS.map((data, idx) => (
                        <Route exact key={idx} path={data.path}>
                            <data.component />
                        </Route>
                    ))}
                </Switch>
            </Suspense>
        </I18nextProvider>
    );
}

export default withTranslation()(MainLogin);