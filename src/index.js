import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";

import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils";

storageUtils.saveUser(memoryUtils.user);


ReactDOM.render(<App />, document.getElementById("app"));
