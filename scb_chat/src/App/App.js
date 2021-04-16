//libs
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from 'store';
import MainPage from "./MainPage";
import MainLogin from "./MainLogin";
import { TOKEN } from 'functions/Utils'
import { GUESTS, getPathList, MAIN } from "routes";
import { PAGES_URL } from 'contant';
import StompConnect from '../realtime/StompConnect';
const PrivateLoginRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        TOKEN === null
            // true
            ? <MainLogin /> :
            <Redirect to={PAGES_URL.home} />
    )} />
)
const PrivateRoute = ({ component: Component, ...rest }) => (
    < Route {...rest} render={(props) => (
        //check nếu chưa login thì ko được vào mainPage
        TOKEN
            ?
            <MainPage />
            : <Redirect to={PAGES_URL.login} />
    )} />
)
const App = () => {
    const store = configureStore();
    return (
        <Provider store={store}>
            <Router>
                 <StompConnect />
                <Switch >
                    <Route exact path={getPathList(GUESTS)} >
                        <Route render={props => <PrivateLoginRoute {...props} />} />
                    </Route>
                    <Route exact path={getPathList(MAIN)} >
                        <Route render={props => <PrivateRoute {...props} />} />
                    </Route>
                    {/* <Route component={Error404} /> */}
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
