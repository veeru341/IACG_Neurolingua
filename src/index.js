import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SocketContext, socket } from "./context/socketContext";
import App from "./App";
import Store from "./store";

import "./index.css";

ReactDOM.render(
  <Provider store={Store}>
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SocketContext.Provider>
  </Provider>,
  document.getElementById("root")
);
