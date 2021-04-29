import React, { Component, Suspense, lazy } from "react";
import "./assets/style/index.css";
import { BrowserRouter } from "react-router-dom";
import { routes } from "./routes/routers.js";



const RouteView = lazy(() => import("./routes/routeView.js"));

export default class App extends Component {
  render() {
    return (
      <BrowserRouter className="main">
        <Suspense fallback="加载中">
          <RouteView routes={routes}></RouteView>
        </Suspense>
      </BrowserRouter>
    );
  }
}
