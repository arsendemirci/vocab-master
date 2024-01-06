import "./style/index.scss";
import * as React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
