import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import configureStore from './server/store';
import './index.css';
import 'foundation-sites/dist/css/foundation.min.css';
import Layout from './containers/Layout';
import * as serviceWorker from './serviceWorker';

const renderApp = preloadedState => {
    const store = configureStore(preloadedState);
    if (localStorage.Auth) {
        store.dispatch({type: 'INIT_SESSION_SUCCESS', session: localStorage.Auth});
    }
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <Layout/>
            </BrowserRouter>
        </Provider>,
        document.getElementById("root")
    );
};

renderApp();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
