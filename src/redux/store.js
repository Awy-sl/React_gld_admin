//** 创建管理对象 store */

// * 安装 redux redux-thunk redux-devtools-extension 插件 并引入

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// 引入 reducer
import reducer from "./reducer";

// 暴露 store

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
