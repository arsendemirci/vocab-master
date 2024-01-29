import "./style/index.scss";
import * as React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SplashScreen } from "components";

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(
  <Provider store={store}>
    <BrowserRouter>
      <SplashScreen />
      <App />
    </BrowserRouter>
  </Provider>
);
