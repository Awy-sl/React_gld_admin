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
    "https://devapi.qweather.com/v7/weather/now?location=108.33,22.84&key=511ff110400549f0818db74fe490708e"
  );
  return data;
};
