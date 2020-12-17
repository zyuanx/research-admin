import axios from "axios"
import {
    Message
} from "element-ui"
import store from "@/store"
import {
    getToken
} from "@/utils/auth"

// 创建axios实例
const service = axios.create({
    baseURL: "http://127.0.0.1:8001/api/", // url = base url + request url
    // baseURL: "https://researchapi.zyuanlee.cn/api/",
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request拦截器
service.interceptors.request.use(
    config => {
        // do something before request is sent

        if (store.getters.token) {
            config.headers["Authorization"] = "Bearer " + getToken()
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        console.log(res)
        console.log(res instanceof Blob)
        if (res instanceof Blob) {
            return res;
        }
        else if (res.code !== 20000) {
            Message({
                message: res.message || "Error",
                type: "error",
                duration: 3 * 1000,
            });
            return Promise.reject(new Error(res.message || "Error"))
        }
        return res

    },
    error => {
        console.log("err" + error) // for debug
        const res = error.response.data
        console.log(res)
        return Promise.reject(new Error(res.message || "Error"))
    }
)

export default service
