import axios from "axios";
import { message } from "antd";

// axios.defaults.baseURL = "http://localhost:5000/";

export default function $http(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    let promise;
    if (type === "GET") {
      promise = axios.get(url, { params: data });
    } else {
      promise = axios.post(url, data);
    }
    promise
      .then((v) => {
        resolve(v);
      })
      .catch((err) => {
        reject(err);
        message.error("出错了呢!");
      });
  });
}
