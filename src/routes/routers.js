import { lazy } from "react";
const Login = lazy(() => import("../pages/login"));
const Home = lazy(() => import("../pages/home"));

export const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/home",
    component: Home,
  },
];
