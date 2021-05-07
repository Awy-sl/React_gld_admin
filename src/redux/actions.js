import { IMG_NAMES } from "./action-types";

// 上传图片的 action
export const imgName = (imgNames) => ({ type: IMG_NAMES, data: imgNames });
