/*****/

/*
 * 可选  使用  store 库简化操作  `yarn add store`
 *  import store from 'store'
 */

const USER_KEY = "user_key";

let storeage = {
  // * 保存 user
  saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  // * 读取 user
  getUser() {
    //  默认返回空对象 user存在就返回 user 对象
    return JSON.parse(localStorage.getItem(USER_KEY)) || {};
  },
  // * 删除 user
  deleteUser() {
    localStorage.removeItem(USER_KEY);
  },
};

export default storeage;
