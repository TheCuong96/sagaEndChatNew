import React, { useState, Suspense, useEffect } from 'react';
import { I18nextProvider, withTranslation } from 'react-i18next';
import { Switch, Route } from "react-router-dom";
import { Animated } from 'react-animated-css';
import i18n from '../i18n';
import { MAIN } from "routes";
import StaticLoading from '../components/common/Loading/StaticLoading';
import Header from 'components/common/Main/Header';
import Sidebar from 'components/common/Main/Sidebar/Sidebar';

const MainPage = (props) => {
    useEffect(() => {
        localStorage.setItem('paths', JSON.stringify(["/"]))
    }, [])

    return (
        <main className="main_wapper">
            <Header />
            <div className="main_container mainPage" >
                <Sidebar />
                <div className="main_content">
                    <I18nextProvider i18n={i18n}>
                        <Suspense fallback={<StaticLoading className="spinner-container" />}>
                            <Switch >
                                {MAIN.map((data, idx) => (
                                    <Route exact key={idx} path={data.path}>
                                        <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                                            <data.component />
                                        </Animated>
                                    </Route>
                                ))}
                            </Switch>
                        </Suspense>
                    </I18nextProvider>
                </div>
            </div>
        </main>
    );
}

export default withTranslation()(MainPage);