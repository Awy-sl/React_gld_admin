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

// * 获取商品分页列表
export const getProductList = async (pageNum, pageSize) =>
  await $http("/manage/product/list", { pageNum, pageSize });

// * 根据分类ID获取分类名称
export const reqCategoryName = async (categoryId) =>
  await $http("/manage/category/info", { categoryId });

// * 添加商品
export const addProduct = async (product) => {
  const response = await $http("/manage/product/add", product, "POST");
  return response;
};

// * 更新商品
export const updateProduct = async (product) => {
  console.log(product);
  const response = await $http("/manage/product/update", product, "POST");
  return response;
};
// * 按商品名称和描述搜索商品
export const reqSearchProducts = async ({
  pageNum,
  pageSize,
  searchName,
  searchType,
}) => {
  const response = await $http("/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName,
  });
  return response;
};
//  * 对商品进行上下架处理
export const updateStatus = async (productId, status) => {
  const response = await $http(
    "/manage/product/updateStatus",
    { productId, status },
    "POST"
  );
  return response;
};

// * 删除图片
export const removeImage = async (name) => {
  const response = await $http("/manage/img/delete", { name }, "POST");
  return response;
};
