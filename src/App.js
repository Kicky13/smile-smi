import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'
import * as action from './store/actions'
import * as serviceWorker from './serviceWorker';
import "./asset/css/bootstrap.min.css";
import "./asset/css/dashboard.css";
import "./asset/css/offcanvas.min.css";
import "./asset/css/owl.carousel.css";
import "./asset/css/owl.theme.default.min.css";
import "./asset/css/style.css";



store.dispatch(action.authCheck());


render(
    <Provider store={store}>
        <Routes/>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register();
