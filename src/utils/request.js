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
    // baseURL: "http://127.0.0.1:8001/api/", // url = base url + request url
    baseURL: "https://researchapi.zyuanlee.cn/api/",
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request拦截器
service.interceptors.request.use(
    config => {
        // do something before request is sent

        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
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
        if (res.code >= 400) {
            Message({
                message: res.msg || "Error",
                type: "error",
                duration: 3 * 1000,
            });
            return Promise.reject(new Error(res.msg || "Error"))
        }
        return res

    },
    error => {
        // if (error.response) {
        //     // The request was made and the server responded with a status code
        //     // that falls out of the range of 2xx
        //     console.log(error.response.data);
        //     console.log(error.response.status);
        //     console.log(error.response.headers);
        // } else if (error.request) {
        //     // The request was made but no response was received
        //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        //     // http.ClientRequest in node.js
        //     console.log(error.request);
        // } else {
        //     // Something happened in setting up the request that triggered an Error
        //     console.log("Error", error.message);
        // }
        // console.log(error.config);
        console.log("err" + error) // for debug
        const res = error.response.data
        console.log(res)
        // Message({
        //     message: res.msg,
        //     type: "error",
        //     duration: 5 * 1000
        // })
        return Promise.reject(new Error(res.msg || "Error"))
    }
)

export default service
