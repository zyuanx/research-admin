import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 5000,
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers["Authorization"] = "Bearer " + getToken();
    }
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code >= 400) {
      Message({
        message: res.message || "请求出错",
        type: "error",
        duration: 3 * 1000,
      });
      return Promise.reject(new Error(res.message || "请求出错"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
