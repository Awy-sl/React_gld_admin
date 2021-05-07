/***/
import { combineReducers } from "redux";
import { IMG_NAMES } from "./action-types";

//**上传图片的  reducer函数 */
const imgNames = [];
function imgNameReducer(preState = imgNames, action) {
  const { type, data } = action;
  switch (type) {
    case IMG_NAMES:
      return data;
    default:
      return preState;
  }
}


export default combineReducers({ imgNameReducer });
