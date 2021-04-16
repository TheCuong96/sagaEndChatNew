import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import rootReducer from "../reducers";
import rootSaga from "../rootSaga";

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [thunk,sagaMiddleware];
    const enhancers = compose(
        applyMiddleware(...middleware),
        window.devToolsExtension && process.env.NODE_ENV === 'none' ? window.devToolsExtension() : f => f
      );
    const store = createStore(rootReducer, enhancers);
    sagaMiddleware.run(rootSaga)
    return store;   
}
export default configureStore;