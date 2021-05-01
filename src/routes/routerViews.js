import React from "react";
import { Switch, Route, Redirect } from "react-router";

export default function RouterViews(props) {
  const { routes } = props;
  return (
    <Switch>
      {routes.map((item, i) => {
        return (
          <Route key={i} path={item.path} component={item.component}></Route>
        );
      })}
      <Redirect to="/home" />
    </Switch>
  );
}
