import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
import App from "components/App/App";
import * as serviceWorker from "config/serviceWorker";

ReactDOM.render(<App />,document.getElementById("reactApp"));

if (process.env.NODE_ENV === "production") {
  serviceWorker.register();
}
