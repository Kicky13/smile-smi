import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./routes";
import * as action from "./store/actions";
import * as serviceWorker from "./serviceWorker";
import { initializeFirebase } from './push';
//import firebase from 'firebase';



// import 'bootstrap/dist/css/bootstrap.css';
// import "./asset/css/dashboard.css";
// import "./asset/css/offcanvas.min.css";
// import "./asset/css/owl.carousel.css";
// import "./asset/css/owl.theme.default.min.css";

import "./asset/css/style.css";
import "./asset/css/navbar/navstyle.css";
import "./asset/css/carousel.css";
import "./asset/css/slidedua.css";
import "./asset/css/react-table.css";
import "./asset/css/slidetiga.css";
import "./asset/css/slideempat.css";
import "./asset/css/slidelima.css";
import "./asset/css/login.css";
import "./asset/css/footer/footercss.css";
import "./asset/css/bootstrap.min.css";
import "./asset/fonts/font-awesome/css/font-awesome.css";
import "./asset/fonts/font-awesome/css/font-awesome.min.css";
//PunyaRObbyGanteng
//import "./asset/css/fuks/fuks.css";

// Article

import "./asset/css/article/article.css";

// SMI news
import "./asset/css/sminews/sminews.css";

// Jurnal news
import "./asset/css/jurnal/jurnal.css";

// Search
import "./asset/css/search/search.css";

// buku telepon
import "./asset/css/smioffice/bukutelepon.css";

// Display Sppd
import "./asset/css/smioffice/displaysppd.css";

// SMI Activity

import "./asset/css/smiactivity/smiactivity.css";

// SMI Gallery

import "./asset/css/smigallery/smigallery.css";

store.dispatch(action.authCheck());
initializeFirebase();



render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
