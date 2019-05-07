import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./store";
import "./stylesheets/app.scss";

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
