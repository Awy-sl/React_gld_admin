import { Route, Switch, Redirect } from "react-router-dom";

import React from "react";

export default function routeView(props) {
  const { routes } = props;
  return (
    <Switch>
      
      {routes.map((item, i) => {
        return (
          <Route
            key={i}
            path={item.path}
            render={(props) => {
              if (item.children) {
                return (
                  <item.component
                    {...props}
                    routes={item.children}
                  ></item.component>
                );
              } else {
                return <item.component {...props}></item.component>;
              }
            }}
          ></Route>
        );
      })}
      <Redirect exact to="/login"></Redirect>
    </Switch>
  );
}
