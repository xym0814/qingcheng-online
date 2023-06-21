import axios from "axios";
import { getToken } from "./auth";

// 创建axios实例
const service = axios.create({
  baseURL: "http://8.141.164.231/prod-api", // lixian 2022.10.11修改
  // baseURL: "https://www.qingcheng.net.cn/prod-api",   // lixian 2022.3.28修改
  // baseURL: "http://123.56.149.85:11080",
  // baseURL: "https://www.zhongkeruitong.top/qingcheng_online",
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    // "Access-Control-Allow-Origin": "*", //cors错误是因为请求头没加Access-Control-Allow-XXX信息
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false;
    if (getToken() && !isToken) {
      // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers["Authorization"] = getToken();
    }
    return config;
  },
  (error) => {
    console.info(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
