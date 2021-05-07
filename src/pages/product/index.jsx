import React, { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const ProductAddUpdate = lazy(() => import("./add-update"));
const ProductDetail = lazy(() => import("./detail"));
const ProductHome = lazy(() => import("./productHome"));

export default function Product() {
  return (
    <Switch>
      {/* exact 精确匹配 */}
      <Route exact path="/product" component={ProductHome}></Route>
      <Route path="/product/addupdate" component={ProductAddUpdate}></Route>
      <Route path="/product/detail" component={ProductDetail}></Route>
      <Redirect to="/product" />
    </Switch>
  );
}
