// 获取数据
import $http from "./axios.js";
// import { message } from "antd";

export const resLogin = async (user) => {
  const response = await $http("/login", user, "PSOT");
  return response;
};
