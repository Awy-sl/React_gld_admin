import React, { lazy, Component, Suspense } from "react";
import "./assets/style/index.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const Login = lazy(() => import("./pages/login"));
const Index = lazy(() => import("./pages/index"));

export default class App extends Component {
  render() {
    return (
      <BrowserRouter className="main">
        <Suspense fallback="加载中">
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/" component={Index}></Route>
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}
