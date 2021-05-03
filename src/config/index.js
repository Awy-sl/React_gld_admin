// 获取数据
import $http from "./axios.js";
// import { message } from "antd";
import axios from "axios";

//*  登录请求
export const resLogin = async (user) => {
  const response = await $http("/login", user, "PSOT");
  return response;
};

//  * 获取天气数据
// * https://devapi.qweather.com/v7/weather/now?location=108.33,22.84&key=511ff110400549f0818db74fe490708e
export const getWeather = async () => {
  const { data } = await axios.get(
    "https://devapi.qweather.com/v7/weather/now?location=108.320004,22.82402&key=511ff110400549f0818db74fe490708e"
  );
  return data;
};

// * 获取商品分类列表
export const getCategoryList = async (parentId) => {
  const response = await $http("/manage/category/list", { parentId }, "GET");
  return response;
};
// * 添加商品分类
export const addCategory = async (params) => {
  const response = await $http("/manage/category/add", params, "POST");
  return response;
};
// * 修改商品分类名称
export const changeCategory = async (params) => {
  const response = await $http("/manage/category/update", params, "POST");
  return response;
};
