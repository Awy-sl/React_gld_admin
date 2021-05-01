/* */
import { lazy } from "react";

const Home = lazy(() => import("../pages/home"));
const Category = lazy(() => import("../pages/category"));
const Order = lazy(() => import("../pages/order"));
const Product = lazy(() => import("../pages/product"));
const Role = lazy(() => import("../pages/role"));
const Bar = lazy(() => import("../pages/charts/bar"));
const Line = lazy(() => import("../pages/charts/line"));
const Pie = lazy(() => import("../pages/charts/pie"));
const User = lazy(() => import("../pages/user"));

export const configPath = [
  { path: "/home", component: Home },
  { path: "/category", component: Category },
  { path: "/product", component: Product },
  { path: "/role", component: Role },
  { path: "/user", component: User },
  { path: "/charts/bar", component: Bar },
  { path: "/charts/line", component: Line },
  { path: "/charts/pie", component: Pie },
  { path: "/order", component: Order },
];
